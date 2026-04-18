import { getSupabaseAdmin } from '@/lib/supabase/admin';

const BUCKET = 'covers';

export async function generateAndUploadCover(
  prompt: string,
  slug: string,
): Promise<string> {
  const enhanced = `${prompt}, dark cinematic, editorial magazine cover, moody lighting, photorealistic, no text, no watermark`;
  const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(
    enhanced,
  )}?width=1280&height=800&nologo=true&enhance=true&seed=${Math.floor(Math.random() * 1_000_000)}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Pollinations failed: ${res.status} ${res.statusText}`);
  }
  const buffer = Buffer.from(await res.arrayBuffer());

  const supabase = getSupabaseAdmin();
  const path = `${slug}-${Date.now()}.jpg`;

  const { error: uploadErr } = await supabase.storage.from(BUCKET).upload(path, buffer, {
    contentType: 'image/jpeg',
    cacheControl: '31536000',
    upsert: false,
  });
  if (uploadErr) throw new Error(`Supabase upload failed: ${uploadErr.message}`);

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
