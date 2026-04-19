import { NextResponse } from 'next/server';
import {
  ADMIN_COOKIE,
  ADMIN_SESSION_MAX_AGE_SEC,
  assertSameOrigin,
  checkCreds,
  isAdminAuthConfigured,
  signAdminToken,
} from '@/lib/admin-auth';
import { clientKey, rateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';

// Generous first line of defence: 10 login attempts per IP per 15 minutes.
// Legitimate users should never hit this; attackers do almost immediately.
const LOGIN_LIMIT = 10;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;

export async function POST(request: Request) {
  // Fail fast if the server is not set up. Prevents accidental anonymous
  // access in production when env vars are missing.
  if (!isAdminAuthConfigured()) {
    return NextResponse.json(
      { error: 'Admin auth is not configured on this server.' },
      { status: 503 },
    );
  }

  // CSRF defence: same-origin check
  const csrfRejection = assertSameOrigin(request);
  if (csrfRejection) return csrfRejection;

  // Rate limit BEFORE doing any credential comparison so brute-force can't
  // amortise the HMAC cost either.
  const ip = clientKey(request);
  const rl = rateLimit(`admin-login:${ip}`, LOGIN_LIMIT, LOGIN_WINDOW_MS);
  if (!rl.success) {
    return NextResponse.json(
      { error: 'Too many attempts. Try again later.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(rl.retryAfterSec),
          'X-RateLimit-Limit': String(rl.limit),
          'X-RateLimit-Remaining': '0',
        },
      },
    );
  }

  let body: { username?: unknown; password?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const username = typeof body.username === 'string' ? body.username : '';
  const password = typeof body.password === 'string' ? body.password : '';

  if (!username || !password) {
    return NextResponse.json(
      { error: 'Username and password are required' },
      { status: 400 },
    );
  }

  if (!checkCreds(username, password)) {
    // Log failed attempts so ops can spot a brute force.
    // eslint-disable-next-line no-console
    console.warn(
      `[admin-auth] Failed login from ${ip} for user=${JSON.stringify(username)} ` +
        `(${rl.count}/${rl.limit} attempts in window)`,
    );
    // Deliberately generic — don't leak which field was wrong.
    return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
  }

  const token = await signAdminToken();
  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: ADMIN_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: ADMIN_SESSION_MAX_AGE_SEC,
  });
  // Successful login — log for audit trail.
  // eslint-disable-next-line no-console
  console.info(`[admin-auth] Login success from ${ip} for user=${JSON.stringify(username)}`);
  return response;
}
