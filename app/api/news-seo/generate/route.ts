import { NextRequest, NextResponse } from 'next/server';
import {
  createInitialProject,
  createFallbackResearch,
  createHeadlineAnalysis,
  createKeywordResearch,
  generateSynthesizedArticle,
  createMetaSeo,
  createDiscoverAnalysis,
  createJsonLdSchema,
} from '@/lib/news-seo/defaults';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, headline, category, newsDate, sourceUrl, language } = body;

    if (!headline || typeof headline !== 'string' || headline.trim().length === 0) {
      return NextResponse.json({ error: 'Headline is required' }, { status: 400 });
    }

    const trimmedHeadline = headline.trim();
    const effectiveCategory = category || 'General';
    const effectiveDate = newsDate || new Date().toISOString().split('T')[0];
    const effectiveLang = language || 'Hindi';

    const groqKey = process.env.GROQ_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;

    // Check if live AI is available
    const hasAI = Boolean((groqKey && groqKey.trim()) || (geminiKey && geminiKey.trim()));

    if (action === 'create-full-project') {
      // Create a full unified project representation
      const project = createInitialProject(trimmedHeadline, effectiveCategory, effectiveDate, sourceUrl);
      project.language = effectiveLang;

      if (!hasAI) {
        return NextResponse.json({
          project,
          mode: 'demo_fallback',
          message: 'AI API keys (GROQ_API_KEY or GEMINI_API_KEY) not detected in environment. Generated via editorial synthesis engine.',
        });
      }

      // Try AI enrichment if key exists
      try {
        if (groqKey) {
          const { default: Groq } = await import('groq-sdk');
          const groq = new Groq({ apiKey: groqKey });
          
          const completion = await groq.chat.completions.create({
            model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
            messages: [
              {
                role: 'system',
                content: `You are an expert Hindi News Editor, Fact-checker, and News SEO Architect. 
Return ONLY valid JSON matching the exact schema requested. Do not invent fake quotes or statistics. Keep language natural, professional Hindi.`
              },
              {
                role: 'user',
                content: `Analyze this Hindi news headline: "${trimmedHeadline}"
Category: ${effectiveCategory}
Date: ${effectiveDate}
Source: ${sourceUrl || 'N/A'}

Produce a JSON object with:
{
  "summary": "2-3 concise Hindi sentences summarizing the news",
  "confirmedFacts": ["fact 1", "fact 2", "fact 3"],
  "unverifiedClaims": ["claim 1"],
  "conflictingInfo": ["any conflicting detail"],
  "headlines": [
    {"type": "SEO Focused", "headline": "...", "reason": "...", "score": 9.2},
    {"type": "CTR Focused", "headline": "...", "reason": "...", "score": 8.9},
    {"type": "Google Discover Focused", "headline": "...", "reason": "...", "score": 9.4},
    {"type": "Local News Focused", "headline": "...", "reason": "...", "score": 9.0},
    {"type": "Balanced SEO + CTR", "headline": "...", "reason": "...", "score": 9.3}
  ],
  "primaryKeyword": "...",
  "secondaryKeywords": ["...", "..."],
  "article": {
    "intro": "...",
    "mainDetails": "...",
    "background": "...",
    "adminArrangements": "...",
    "conclusion": "..."
  }
}`
              }
            ],
            response_format: { type: 'json_object' },
            temperature: 0.3,
          });

          const parsed = JSON.parse(completion.choices[0]?.message?.content || '{}');
          if (parsed && parsed.headlines && parsed.headlines.length > 0) {
            project.research!.mainSummary = parsed.summary || project.research!.mainSummary;
            if (Array.isArray(parsed.confirmedFacts) && parsed.confirmedFacts.length > 0) {
              project.research!.confirmedFacts = parsed.confirmedFacts;
            }
            if (Array.isArray(parsed.unverifiedClaims) && parsed.unverifiedClaims.length > 0) {
              project.research!.unverifiedClaims = parsed.unverifiedClaims;
            }
            if (Array.isArray(parsed.headlines) && parsed.headlines.length >= 5) {
              project.headlineAnalysis!.options = parsed.headlines;
            }
            if (parsed.primaryKeyword) {
              project.headlineAnalysis!.primaryKeyword = parsed.primaryKeyword;
              project.keywordResearch!.primaryKeyword = parsed.primaryKeyword;
            }
            if (parsed.article) {
              project.article!.introduction = parsed.article.intro || project.article!.introduction;
              project.article!.mainDetails = parsed.article.mainDetails || project.article!.mainDetails;
              project.article!.backgroundInfo = parsed.article.background || project.article!.backgroundInfo;
              project.article!.adminArrangements = parsed.article.adminArrangements || project.article!.adminArrangements;
              project.article!.conclusion = parsed.article.conclusion || project.article!.conclusion;
            }
            project.research!.liveResearchUsed = true;
            project.research!.liveResearchNote = 'Enhanced via Groq Llama-3.3-70b-versatile live analysis.';
          }
        }
      } catch (err: any) {
        console.warn('AI enrichment encountered error, continuing with fallback:', err?.message);
      }

      project.jsonLd = createJsonLdSchema(project);

      return NextResponse.json({
        project,
        mode: hasAI ? 'live_ai' : 'demo_fallback',
        message: 'Successfully generated complete news SEO workspace.',
      });
    }

    if (action === 'analyze-headline') {
      const analysis = createHeadlineAnalysis(trimmedHeadline);
      return NextResponse.json({ analysis });
    }

    if (action === 'research') {
      const research = createFallbackResearch(trimmedHeadline, effectiveCategory, effectiveDate, sourceUrl);
      return NextResponse.json({ research });
    }

    if (action === 'keywords') {
      const keywords = createKeywordResearch(trimmedHeadline, effectiveCategory);
      return NextResponse.json({ keywords });
    }

    if (action === 'write-article') {
      const article = generateSynthesizedArticle(trimmedHeadline, effectiveCategory, effectiveDate);
      return NextResponse.json({ article });
    }

    if (action === 'meta-seo') {
      const meta = createMetaSeo(trimmedHeadline, trimmedHeadline.split(' ').slice(0, 3).join(' '));
      return NextResponse.json({ meta });
    }

    if (action === 'discover') {
      const discover = createDiscoverAnalysis(trimmedHeadline);
      return NextResponse.json({ discover });
    }

    // Default fallback
    const project = createInitialProject(trimmedHeadline, effectiveCategory, effectiveDate, sourceUrl);
    return NextResponse.json({ project });
  } catch (error: any) {
    console.error('Error in /api/news-seo/generate:', error);
    return NextResponse.json(
      { error: error?.message || 'Internal server error processing News SEO request' },
      { status: 500 }
    );
  }
}
