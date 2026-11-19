'use client';

import React, { useState } from 'react';
import {
  KeyRound,
  Compass,
  FileText,
  Search,
  Copy,
  Check,
  MapPin,
  HelpCircle,
  TrendingUp,
  Info
} from 'lucide-react';
import { NewsProject } from '@/lib/news-seo/types';

interface KeywordResearchViewProps {
  project: NewsProject;
  onUpdateProject: (updated: Partial<NewsProject>) => void;
  onNavigateTab: (tab: string) => void;
}

export default function KeywordResearchView({
  project,
  onUpdateProject,
  onNavigateTab,
}: KeywordResearchViewProps) {
  const kw = project.keywordResearch;
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <KeyRound className="w-5 h-5 text-blue-600" />
          News Keyword Research &amp; Placement Architecture
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Target authentic user queries, search intent, long-tail variations, and strategic editorial keyword placements.
        </p>
      </div>

      {/* Strict Ethical Transparency Notice */}
      <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/60 dark:bg-amber-950/20 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold">Zero-Fabrication Data Standard</p>
          <p className="text-[11px] leading-relaxed text-amber-800 dark:text-amber-300">
            {kw?.isSimulatedNotice ||
              'Keyword entities are extracted from journalistic heuristics and search intent. To maintain strict journalistic integrity, search volumes, CPC, and keyword difficulty are never simulated or fabricated without a verified API connection.'}
          </p>
        </div>
      </div>

      {kw && (
        <div className="space-y-6">
          {/* Primary & Search Intent Overview Card */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Primary Focus Keyword (प्राथमिक कीवर्ड)
                </span>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-slate-900 dark:text-white">
                    {kw.primaryKeyword}
                  </p>
                  <button
                    onClick={() => handleCopy(kw.primaryKeyword, 'primary')}
                    className="p-1.5 rounded-md hover:bg-white dark:hover:bg-slate-800 text-slate-500 hover:text-blue-600 transition-colors"
                    title="Copy primary keyword"
                  >
                    {copiedKey === 'primary' ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Detected Search Intent (सर्च इंटेंट)
                </span>
                <p className="text-base font-bold text-slate-900 dark:text-white">
                  {kw.searchIntent}
                </p>
              </div>
            </div>
          </div>

          {/* 4 Keyword Buckets */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Secondary Keywords */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 border-b border-slate-100 dark:border-slate-800 pb-2">
                <Search className="w-4 h-4 text-blue-500" />
                Secondary Keywords
              </div>
              <ul className="space-y-2">
                {kw.secondaryKeywords.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 text-xs font-medium text-slate-800 dark:text-slate-200 group"
                  >
                    <span className="truncate pr-1">{item}</span>
                    <button
                      onClick={() => handleCopy(item, `sec-${idx}`)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-blue-500 transition-opacity"
                    >
                      {copiedKey === `sec-${idx}` ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Long-Tail Keywords */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 border-b border-slate-100 dark:border-slate-800 pb-2">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                Long-Tail Keywords
              </div>
              <ul className="space-y-2">
                {kw.longTailKeywords.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 text-xs font-medium text-slate-800 dark:text-slate-200 group"
                  >
                    <span className="truncate pr-1">{item}</span>
                    <button
                      onClick={() => handleCopy(item, `long-${idx}`)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-emerald-500 transition-opacity"
                    >
                      {copiedKey === `long-${idx}` ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Related Search Queries */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 border-b border-slate-100 dark:border-slate-800 pb-2">
                <HelpCircle className="w-4 h-4 text-indigo-500" />
                Related Queries
              </div>
              <ul className="space-y-2">
                {kw.relatedQueries.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 text-xs font-medium text-slate-800 dark:text-slate-200 group"
                  >
                    <span className="truncate pr-1">{item}</span>
                    <button
                      onClick={() => handleCopy(item, `rel-${idx}`)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-indigo-500 transition-opacity"
                    >
                      {copiedKey === `rel-${idx}` ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Local News Keywords */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 border-b border-slate-100 dark:border-slate-800 pb-2">
                <MapPin className="w-4 h-4 text-teal-500" />
                Local News Keywords
              </div>
              <ul className="space-y-2">
                {kw.localKeywords.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 text-xs font-medium text-slate-800 dark:text-slate-200 group"
                  >
                    <span className="truncate pr-1">{item}</span>
                    <button
                      onClick={() => handleCopy(item, `loc-${idx}`)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-teal-500 transition-opacity"
                    >
                      {copiedKey === `loc-${idx}` ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Strategic Keyword Placement Recommendations Table */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Compass className="w-4 h-4 text-blue-600" />
                Editorial Keyword Placement Guide (Where to place what)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Actionable rules to preserve editorial flow while maximizing search crawlability.
              </p>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {kw.placementRecommendations.map((rec, idx) => (
                <div
                  key={idx}
                  className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="w-40 font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5 flex-shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    {rec.section}
                  </div>
                  <div className="flex-1 text-slate-700 dark:text-slate-300 font-medium">
                    {rec.advice}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={() => onNavigateTab('headline')}
          className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900"
        >
          ← Back to Headline Analyzer
        </button>
        <button
          onClick={() => onNavigateTab('writer')}
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm"
        >
          Draft Hindi Article with Keywords →
        </button>
      </div>
    </div>
  );
}
