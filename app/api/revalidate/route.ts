import { NextResponse, type NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');
  if (!process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'REVALIDATE_SECRET not configured' }, { status: 500 });
  }
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  revalidatePath('/');
  revalidatePath('/curation');
  revalidatePath('/perspectives');
  revalidatePath('/archives');
  revalidatePath('/admin');
  revalidatePath('/admin/posts');
  revalidatePath('/blog/[slug]', 'page');

  return NextResponse.json({ revalidated: true, at: new Date().toISOString() });
}
