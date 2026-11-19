'use client';

import React, { useState } from 'react';
import {
  Compass,
  Image as ImageIcon,
  Sparkles,
  Smartphone,
  CheckCircle2,
  AlertTriangle,
  Info,
  Copy,
  Check,
  Maximize2
} from 'lucide-react';
import { NewsProject, GoogleDiscoverAnalysis, ImageSeoResult } from '@/lib/news-seo/types';

interface DiscoverOptimizerViewProps {
  project: NewsProject;
  onUpdateProject: (updated: Partial<NewsProject>) => void;
  onNavigateTab: (tab: string) => void;
}

export default function DiscoverOptimizerView({
  project,
  onUpdateProject,
  onNavigateTab,
}: DiscoverOptimizerViewProps) {
  const discover = project.discover;
  const [imageSeo, setImageSeo] = useState<ImageSeoResult>(
    project.imageSeo || {
      imageUrl: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1200&h=675&fit=crop',
      filename: 'hindi-news-ground-photo.jpg',
      altText: project.headline,
      title: project.headline,
      caption: '',
      description: '',
      imageType: 'Real News Photo',
    }
  );

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const handleImageFieldChange = (field: keyof ImageSeoResult, val: any) => {
    const updated = { ...imageSeo, [field]: val };
    setImageSeo(updated);
    onUpdateProject({ imageSeo: updated });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Compass className="w-5 h-5 text-blue-600" />
          Google Discover Optimizer &amp; Image SEO Module
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Maximize visual engagement, mobile feed eligibility, high-res image compliance, and ethical reporting standards.
        </p>
      </div>

      {/* Discover Score Overview Card */}
      {discover && (
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Google Discover Readiness Audit
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                Content Quality &amp; Feed Recommendation Signals
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                  {discover.discoverScore} / 100
                </span>
                <p className="text-[10px] text-slate-400 font-medium">Readiness Index</p>
              </div>
            </div>
          </div>

          {/* 7 Key Evaluation Criteria */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1">
              <p className="font-bold text-slate-700 dark:text-slate-200">1. Interesting &amp; Accurate Headline</p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{discover.headlineAssessment}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1">
              <p className="font-bold text-slate-700 dark:text-slate-200">2. Useful Opening Paragraph</p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{discover.openingParagraphAssessment}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1">
              <p className="font-bold text-slate-700 dark:text-slate-200">3. Original Reporting Value</p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{discover.originalReportingValue}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1">
              <p className="font-bold text-slate-700 dark:text-slate-200">4. Image Suitability (≥1200px)</p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{discover.imageSuitability}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1">
              <p className="font-bold text-slate-700 dark:text-slate-200">5. Mobile Experience</p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{discover.mobileReadiness}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1">
              <p className="font-bold text-slate-700 dark:text-slate-200">6. Content Freshness &amp; Relevance</p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{discover.contentFreshness}</p>
            </div>
          </div>

          {/* Discover Recommended Headline */}
          <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Discover-Friendly Headline Recommendation
            </span>
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                {discover.recommendedHeadline}
              </p>
              <button
                onClick={() => handleCopy(discover.recommendedHeadline, 'dh')}
                className="px-2.5 py-1 text-xs font-semibold rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 flex items-center gap-1"
              >
                {copiedKey === 'dh' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                Copy
              </button>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="p-3.5 rounded-lg border border-amber-200 dark:border-amber-900/50 bg-amber-50/40 dark:bg-amber-950/20 text-xs text-amber-900 dark:text-amber-300 flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <p>{discover.disclaimer}</p>
          </div>
        </div>
      )}

      {/* Image SEO Module */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-emerald-600" />
              Featured Image SEO &amp; Provenance Details
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Configure image URL, alt text, filename, caption, and clearly label synthetic vs real photographs.
            </p>
          </div>

          {/* Provenance badge toggle */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Type:</span>
            <select
              value={imageSeo.imageType}
              onChange={(e) => handleImageFieldChange('imageType', e.target.value as any)}
              className="px-2.5 py-1 rounded-md font-bold text-xs bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200"
            >
              <option value="Real News Photo">Real News Photo (प्रामाणिक फोटो)</option>
              <option value="Illustrative / AI-Generated">Illustrative / AI-Generated (प्रतीकात्मक)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Image Preview & Specs */}
          <div className="space-y-3">
            <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 relative group aspect-video">
              <img
                src={imageSeo.imageUrl || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1200&h=675&fit=crop'}
                alt={imageSeo.altText}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-black/70 text-white backdrop-blur-sm">
                {imageSeo.imageType}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 text-xs space-y-1">
              <p className="text-slate-500 font-medium">Recommended Dimensions:</p>
              <p className="font-bold text-slate-800 dark:text-slate-200">
                {discover?.recommendedDimensions || '1200 x 675 px (16:9 ratio)'}
              </p>
              <p className="text-[11px] text-slate-400">
                Rule: Google Discover requires width of at least 1200px and max_image_preview:large robot tag.
              </p>
            </div>
          </div>

          {/* Form Fields: 2 Cols */}
          <div className="lg:col-span-2 space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Image URL (Direct link)
              </label>
              <input
                type="url"
                value={imageSeo.imageUrl}
                onChange={(e) => handleImageFieldChange('imageUrl', e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800/80 p-2 rounded-lg border border-slate-300 dark:border-slate-700 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Target Filename (SEO friendly)
                </label>
                <input
                  type="text"
                  value={imageSeo.filename}
                  onChange={(e) => handleImageFieldChange('filename', e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800/80 p-2 rounded-lg border border-slate-300 dark:border-slate-700 font-mono text-xs focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Image Title Attribute
                </label>
                <input
                  type="text"
                  value={imageSeo.title}
                  onChange={(e) => handleImageFieldChange('title', e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800/80 p-2 rounded-lg border border-slate-300 dark:border-slate-700 text-xs focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Alt Text (ऑल्ट टेक्स्ट — स्क्रीन रीडर व इमेज सर्च)
              </label>
              <input
                type="text"
                value={imageSeo.altText}
                onChange={(e) => handleImageFieldChange('altText', e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800/80 p-2 rounded-lg border border-slate-300 dark:border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Editorial Caption (कैप्शन — पाठकों के लिए विवरण)
              </label>
              <textarea
                rows={2}
                value={imageSeo.caption}
                onChange={(e) => handleImageFieldChange('caption', e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800/80 p-2 rounded-lg border border-slate-300 dark:border-slate-700 text-xs focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Nav */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={() => onNavigateTab('meta-seo')}
          className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900"
        >
          ← Back to Meta SEO
        </button>
        <button
          onClick={() => onNavigateTab('schema')}
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm"
        >
          Generate Schema JSON-LD →
        </button>
      </div>
    </div>
  );
}
