'use client';

import React, { useState } from 'react';
import {
  Tags,
  Copy,
  Check,
  CheckCircle2,
  AlertTriangle,
  Globe,
  Share2,
  Link2,
  Image as ImageIcon
} from 'lucide-react';
import { NewsProject, MetaSeoResult } from '@/lib/news-seo/types';

interface MetaSeoViewProps {
  project: NewsProject;
  onUpdateProject: (updated: Partial<NewsProject>) => void;
  onNavigateTab: (tab: string) => void;
}

export default function MetaSeoView({
  project,
  onUpdateProject,
  onNavigateTab,
}: MetaSeoViewProps) {
  const [meta, setMeta] = useState<MetaSeoResult>(
    project.metaSeo || {
      seoTitle: project.headline,
      metaDescription: '',
      urlSlug: 'hindi-news-story',
      focusKeyword: '',
      secondaryKeywords: [],
      ogTitle: project.headline,
      ogDescription: '',
      socialImageAlt: '',
    }
  );

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const handleChange = (field: keyof MetaSeoResult, val: any) => {
    const updated = { ...meta, [field]: val };
    setMeta(updated);
    onUpdateProject({ metaSeo: updated });
  };

  const titleLength = meta.seoTitle.length;
  const descLength = meta.metaDescription.length;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Tags className="w-5 h-5 text-blue-600" />
          Meta SEO, URL Slug &amp; Social Open Graph Suite
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Precision character length monitors, snippet preview, clean URL slug builder, and social sharing metadata.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Form: 2 Cols */}
        <div className="lg:col-span-2 space-y-5">
          {/* SEO Title */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                SEO Meta Title (शीर्षक)
              </label>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-semibold ${
                    titleLength > 60
                      ? 'text-red-500 font-bold'
                      : titleLength >= 40
                      ? 'text-emerald-500'
                      : 'text-amber-500'
                  }`}
                >
                  {titleLength} / 60 characters
                </span>
                <button
                  onClick={() => handleCopy(meta.seoTitle, 'title')}
                  className="p-1 text-slate-400 hover:text-blue-500 transition-colors"
                >
                  {copiedKey === 'title' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
            <input
              type="text"
              value={meta.seoTitle}
              onChange={(e) => handleChange('seoTitle', e.target.value)}
              className="w-full text-sm font-semibold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/80 p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {titleLength > 60 && (
              <p className="text-[11px] text-red-500 flex items-center gap-1 font-medium">
                <AlertTriangle className="w-3 h-3" /> Exceeds 60 characters; search engines may truncate the trailing text.
              </p>
            )}
          </div>

          {/* Meta Description */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Meta Description (मेटा विवरण)
              </label>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-semibold ${
                    descLength > 160
                      ? 'text-red-500 font-bold'
                      : descLength >= 120
                      ? 'text-emerald-500'
                      : 'text-amber-500'
                  }`}
                >
                  {descLength} / 160 characters
                </span>
                <button
                  onClick={() => handleCopy(meta.metaDescription, 'desc')}
                  className="p-1 text-slate-400 hover:text-blue-500 transition-colors"
                >
                  {copiedKey === 'desc' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
            <textarea
              rows={3}
              value={meta.metaDescription}
              onChange={(e) => handleChange('metaDescription', e.target.value)}
              className="w-full text-sm text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/80 p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
            />
            {descLength > 160 && (
              <p className="text-[11px] text-red-500 flex items-center gap-1 font-medium">
                <AlertTriangle className="w-3 h-3" /> Exceeds 160 characters; meta description will get truncated in Google SERPs.
              </p>
            )}
          </div>

          {/* URL Slug & Focus Keyword */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <Link2 className="w-3.5 h-3.5 text-blue-500" /> URL Slug (Permanent Link)
              </label>
              <div className="flex items-center">
                <span className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-2 rounded-l-lg border border-r-0 border-slate-300 dark:border-slate-700 select-none">
                  /news/
                </span>
                <input
                  type="text"
                  value={meta.urlSlug}
                  onChange={(e) => handleChange('urlSlug', e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                  className="flex-1 text-xs font-mono text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/80 p-2 rounded-r-lg border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <Tags className="w-3.5 h-3.5 text-indigo-500" /> Focus Keyword
              </label>
              <input
                type="text"
                value={meta.focusKeyword}
                onChange={(e) => handleChange('focusKeyword', e.target.value)}
                className="w-full text-xs font-medium text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/80 p-2 rounded-lg border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Open Graph & Social Sharing */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
              <Share2 className="w-4 h-4 text-emerald-500" />
              Open Graph (Facebook, WhatsApp, LinkedIn, X Card)
            </h3>

            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-500">OG Title</label>
                <input
                  type="text"
                  value={meta.ogTitle}
                  onChange={(e) => handleChange('ogTitle', e.target.value)}
                  className="w-full text-xs text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/80 p-2 rounded border border-slate-300 dark:border-slate-700 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-500">OG Description</label>
                <textarea
                  rows={2}
                  value={meta.ogDescription}
                  onChange={(e) => handleChange('ogDescription', e.target.value)}
                  className="w-full text-xs text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/80 p-2 rounded border border-slate-300 dark:border-slate-700 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-500">Social Image Alt Text</label>
                <input
                  type="text"
                  value={meta.socialImageAlt}
                  onChange={(e) => handleChange('socialImageAlt', e.target.value)}
                  className="w-full text-xs text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/80 p-2 rounded border border-slate-300 dark:border-slate-700 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Preview Card: SERP + Social Card Simulation */}
        <div className="space-y-5">
          {/* Google Search Snippet Simulation */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
              <Globe className="w-4 h-4 text-blue-500" />
              Google SERP Desktop Simulation
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-1 font-sans">
              <div className="flex items-center gap-1 text-[11px] text-slate-500 truncate">
                <span className="font-semibold text-slate-700 dark:text-slate-300">yournewsdomain.com</span>
                <span>› news › {meta.urlSlug}</span>
              </div>
              <h4 className="text-sm md:text-base font-semibold text-blue-700 dark:text-blue-400 hover:underline cursor-pointer line-clamp-1">
                {meta.seoTitle || 'समाचार शीर्षक यहाँ दिखेगा'}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                {meta.metaDescription || 'मेटा विवरण यहाँ प्रदर्शित होगा। गूगल सर्च परिणाम में पाठकों को यह दो पंक्तियों का सारांश दिखाई देता है।'}
              </p>
            </div>
          </div>

          {/* Social Share Card Preview */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
              <Share2 className="w-4 h-4 text-emerald-500" />
              WhatsApp / Facebook Social Card
            </div>

            <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
              <div className="h-32 bg-slate-200 dark:bg-slate-800 flex items-center justify-center relative overflow-hidden">
                <img
                  src={project.imageSeo?.imageUrl || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1200&h=675&fit=crop'}
                  alt={meta.socialImageAlt || 'News Cover'}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 space-y-1">
                <p className="text-[10px] uppercase font-bold text-slate-400">YOURNEWSDOMAIN.COM</p>
                <p className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                  {meta.ogTitle || meta.seoTitle}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                  {meta.ogDescription || meta.metaDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Nav */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={() => onNavigateTab('writer')}
          className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900"
        >
          ← Back to Article Writer
        </button>
        <button
          onClick={() => onNavigateTab('discover')}
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm"
        >
          Check Google Discover &amp; Image SEO →
        </button>
      </div>
    </div>
  );
}
