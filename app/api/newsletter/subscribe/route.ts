import { NextResponse } from 'next/server';
import { isValidEmail, subscribe } from '@/lib/newsletter';
import { clientKey, rateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';

// Rate limit: 5 subscribes per IP per hour. Generous for real users; blocks
// script kiddies signing your list up for mailing-list-spam services.
const LIMIT = 5;
const WINDOW_MS = 60 * 60 * 1000;

export async function POST(request: Request) {
  const ip = clientKey(request);
  const rl = rateLimit(`newsletter-subscribe:${ip}`, LIMIT, WINDOW_MS);
  if (!rl.success) {
    return NextResponse.json(
      { error: 'Too many requests. Try again later.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(rl.retryAfterSec),
        },
      },
    );
  }

  let body: { email?: unknown; source?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const email = typeof body.email === 'string' ? body.email : '';
  const source = typeof body.source === 'string' ? body.source.slice(0, 60) : undefined;

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: 'Please enter a valid email address.' },
      { status: 400 },
    );
  }

  const result = await subscribe(email, source);
  if (!result.ok) {
    // Surface DB/config errors but don't leak internals.
    return NextResponse.json(
      { error: result.error ?? 'Could not complete subscription' },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    created: result.created,
  });
}
