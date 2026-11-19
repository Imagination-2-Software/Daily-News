export interface SourceClaim {
  id: string;
  claim: string;
  source: string;
  sourceUrl?: string;
  status: 'Verified' | 'Partially Verified' | 'Unverified' | 'Conflicting';
  notes: string;
  verifiedBy?: string;
  verifiedAt?: string;
}

export interface NewsResearchResult {
  headline: string;
  category: string;
  language: 'Hindi' | 'English';
  newsDate: string;
  sourceUrl?: string;
  liveResearchUsed: boolean;
  liveResearchNote?: string;
  mainSummary: string;
  confirmedFacts: string[];
  unverifiedClaims: string[];
  conflictingInfo: string[];
  sourceComparison: {
    sourceName: string;
    reportingAngle: string;
    keyPoints: string[];
    url?: string;
    publishDate?: string;
  }[];
  missingInfo: string[];
}

export interface HeadlineOption {
  type: 'SEO Focused' | 'CTR Focused' | 'Google Discover Focused' | 'Local News Focused' | 'Balanced SEO + CTR';
  headline: string;
  reason: string;
  score: number; // out of 10
}

export interface HeadlineAnalysis {
  originalHeadline: string;
  overallScore: number; // out of 10
  primaryKeyword: string;
  keywordPlacement: 'Beginning' | 'Middle' | 'End' | 'Missing';
  searchIntent: 'Informational' | 'Breaking News' | 'Navigational' | 'Transactional';
  readabilityScore: number;
  clarityScore: number;
  curiosityScore: number;
  ctrPotentialScore: number;
  accuracyScore: number;
  characterCount: number;
  wordCount: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  options: HeadlineOption[];
}

export interface KeywordResearchResult {
  primaryKeyword: string;
  secondaryKeywords: string[];
  longTailKeywords: string[];
  relatedQueries: string[];
  localKeywords: string[];
  searchIntent: string;
  isSimulatedNotice: string;
  placementRecommendations: {
    section: 'Headline' | 'Introduction' | 'H2 headings' | 'Body content' | 'Meta description' | 'URL slug';
    advice: string;
  }[];
}

export interface HindiArticleContent {
  headline: string;
  introduction: string;
  mainDetails: string;
  importantFacts: string[];
  backgroundInfo: string;
  adminArrangements: string;
  relatedDevelopments: string;
  faqs: { question: string; answer: string }[];
  conclusion: string;
  fullMarkdown?: string;
}

export interface MetaSeoResult {
  seoTitle: string;
  metaDescription: string;
  urlSlug: string;
  focusKeyword: string;
  secondaryKeywords: string[];
  ogTitle: string;
  ogDescription: string;
  socialImageAlt: string;
}

export interface GoogleDiscoverAnalysis {
  discoverScore: number; // 0-100
  headlineAssessment: string;
  openingParagraphAssessment: string;
  originalReportingValue: string;
  imageSuitability: string;
  mobileReadiness: string;
  contentFreshness: string;
  audienceRelevance: string;
  recommendedHeadline: string;
  featuredImageConcept: string;
  recommendedDimensions: string;
  recommendedFilename: string;
  recommendedAltText: string;
  disclaimer: string;
}

export interface ImageSeoResult {
  imageUrl?: string;
  filename: string;
  altText: string;
  title: string;
  caption: string;
  description: string;
  imageType: 'Real News Photo' | 'Illustrative / AI-Generated';
}

export interface PublishingChecklistItem {
  id: string;
  label: string;
  description: string;
  checked: boolean;
}

export interface NewsProject {
  id: string;
  createdAt: string;
  updatedAt: string;
  headline: string;
  category: string;
  language: 'Hindi' | 'English';
  newsDate: string;
  sourceUrl?: string;
  seoScore: number;
  status: 'Draft' | 'Researching' | 'Reviewed' | 'Ready to Publish' | 'Published';
  
  research?: NewsResearchResult;
  headlineAnalysis?: HeadlineAnalysis;
  keywordResearch?: KeywordResearchResult;
  article?: HindiArticleContent;
  metaSeo?: MetaSeoResult;
  discover?: GoogleDiscoverAnalysis;
  imageSeo?: ImageSeoResult;
  factChecks: SourceClaim[];
  checklist: PublishingChecklistItem[];
  jsonLd?: string;
}
