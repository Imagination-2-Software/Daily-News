import { NextResponse } from 'next/server';
import { unsubscribeByToken } from '@/lib/newsletter';

export const runtime = 'nodejs';

/**
 * One-click unsubscribe endpoint.
 *
 * Supports both GET (from the link in every email footer) and POST (from
 * the RFC 8058 `List-Unsubscribe-Post: List-Unsubscribe=One-Click` header
 * that Gmail / Apple Mail use). Both flows idempotently deactivate.
 *
 * After a GET, redirects the browser to /unsubscribe for a human-friendly
 * confirmation page.
 */
async function handle(token: string | null): Promise<Response> {
  if (!token) {
    return NextResponse.json({ error: 'Missing token' }, { status: 400 });
  }
  const result = await unsubscribeByToken(token);
  return NextResponse.json(result, { status: result.ok ? 200 : 400 });
}

export async function POST(request: Request) {
  // Mailbox providers may deliver the token via form body OR query string.
  const url = new URL(request.url);
  let token = url.searchParams.get('token');
  if (!token) {
    const ct = request.headers.get('content-type') || '';
    if (ct.includes('application/json')) {
      try {
        const body = (await request.json()) as { token?: string };
        token = body?.token ?? null;
      } catch {}
    } else if (ct.includes('application/x-www-form-urlencoded')) {
      const form = await request.formData();
      token = (form.get('token') as string) ?? null;
    }
  }
  return handle(token);
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get('token');
  // Redirect the browser to the pretty confirmation page rather than
  // returning raw JSON. The page itself re-verifies the token.
  if (token) {
    const dest = new URL('/unsubscribe', url);
    dest.searchParams.set('token', token);
    return NextResponse.redirect(dest);
  }
  return handle(token);
}
