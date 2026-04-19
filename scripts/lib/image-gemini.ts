/**
 * Cover-image generation via Google Gemini 2.5 Flash Image ("Nano Banana").
 *
 * Uses the Gemini REST API directly rather than the SDK because image-output
 * support in @google/generative-ai lags behind the API surface, and we don't
 * need to pull in another npm dep for two HTTP calls.
 *
 * Model: `gemini-2.5-flash-image` (preview / free tier on Google AI Studio).
 * If the model id changes or the quota is exhausted, the caller falls back
 * to Pollinations — we return null on any failure.
 */

const API_BASE = 'https://generativelanguage.googleapis.com/v1beta';
const MODEL = process.env.GEMINI_IMAGE_MODEL || 'gemini-2.5-flash-image';
const FETCH_TIMEOUT_MS = 60_000;

interface GeminiImagePart {
  inlineData?: {
    mimeType: string;
    data: string;
  };
}

interface GeminiImageResponse {
  candidates?: Array<{
    content?: {
      parts?: GeminiImagePart[];
    };
    finishReason?: string;
  }>;
  promptFeedback?: {
    blockReason?: string;
  };
}

/**
 * Request one cover image. Returns a JPEG-ish buffer on success, null on
 * any error (including safety blocks, quota, network, wrong model id).
 */
export async function generateCoverWithGemini(
  prompt: string,
): Promise<Buffer | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  const url = `${API_BASE}/models/${MODEL}:generateContent?key=${apiKey}`;

  let res: Response;
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }],
          },
        ],
        // Explicit temperature keeps the style stable across posts.
        generationConfig: {
          temperature: 0.7,
          // Ask Gemini for image output. Some API versions accept TEXT too;
          // the image part is what we care about.
          responseModalities: ['IMAGE'],
        },
      }),
    });
  } catch (err) {
    console.warn(
      `[gemini-image] network error: ${(err as Error).message}`,
    );
    return null;
  }

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    console.warn(
      `[gemini-image] HTTP ${res.status}: ${body.slice(0, 200)}`,
    );
    return null;
  }

  let json: GeminiImageResponse;
  try {
    json = (await res.json()) as GeminiImageResponse;
  } catch (err) {
    console.warn(
      `[gemini-image] JSON parse error: ${(err as Error).message}`,
    );
    return null;
  }

  if (json.promptFeedback?.blockReason) {
    console.warn(
      `[gemini-image] blocked by safety: ${json.promptFeedback.blockReason}`,
    );
    return null;
  }

  const part = json.candidates?.[0]?.content?.parts?.find(
    (p) => p.inlineData?.data,
  );
  if (!part?.inlineData?.data) {
    console.warn(
      `[gemini-image] no image part in response (finish=${json.candidates?.[0]?.finishReason ?? 'unknown'})`,
    );
    return null;
  }

  try {
    return Buffer.from(part.inlineData.data, 'base64');
  } catch (err) {
    console.warn(
      `[gemini-image] base64 decode error: ${(err as Error).message}`,
    );
    return null;
  }
}
