import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, assertSameOrigin } from '@/lib/admin-auth';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const csrfRejection = assertSameOrigin(request);
  if (csrfRejection) return csrfRejection;

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: ADMIN_COOKIE,
    value: '',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  });
  return response;
}
