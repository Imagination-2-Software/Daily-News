'use client';

import React, { useState } from 'react';
import {
  Heading,
  TrendingUp,
  Copy,
  Check,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  Search,
  SlidersHorizontal,
  Info
} from 'lucide-react';
import { NewsProject, HeadlineOption } from '@/lib/news-seo/types';

interface HeadlineAnalyzerViewProps {
  project: NewsProject;
  onUpdateProject: (updated: Partial<NewsProject>) => void;
  onNavigateTab: (tab: string) => void;
}

export default function HeadlineAnalyzerView({
  project,
  onUpdateProject,
  onNavigateTab,
}: HeadlineAnalyzerViewProps) {
  const analysis = project.headlineAnalysis;
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [customHeadline, setCustomHeadline] = useState(project.headline);
  const [activeTab, setActiveTab] = useState<'All' | 'SEO Focused' | 'CTR Focused' | 'Google Discover Focused' | 'Local News Focused' | 'Balanced SEO + CTR'>('All');

  const handleCopyOption = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleAdoptHeadline = (newHeadline: string) => {
    onUpdateProject({
      headline: newHeadline,
      article: project.article ? { ...project.article, headline: newHeadline } : undefined,
    });
    setCustomHeadline(newHeadline);
  };

  const filteredOptions = analysis?.options.filter(
    (opt) => activeTab === 'All' || opt.type === activeTab
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Heading className="w-5 h-5 text-blue-600" />
          Interactive Headline SEO &amp; CTR Potential Analyzer
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Evaluate keyword placement, readability, clarity, search intent, and Discover appeal. Generate 5 targeted variations.
        </p>
      </div>

      {/* Main Headline Assessment Card */}
      {analysis && (
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div className="space-y-2 flex-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Current Active Headline
              </span>
              <p className="text-lg md:text-xl font-extrabold text-slate-900 dark:text-white leading-snug">
                "{project.headline}"
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 pt-1">
                <span>Characters: <strong className="text-slate-800 dark:text-slate-200">{analysis.characterCount}</strong> / 65 recommended</span>
                <span>•</span>
                <span>Words: <strong className="text-slate-800 dark:text-slate-200">{analysis.wordCount}</strong></span>
                <span>•</span>
                <span>Intent: <strong className="text-blue-600 dark:text-blue-400">{analysis.searchIntent}</strong></span>
                <span>•</span>
                <span>Keyword: <strong className="text-indigo-600 dark:text-indigo-400">"{analysis.primaryKeyword}"</strong> ({analysis.keywordPlacement})</span>
              </div>
            </div>

            {/* Overall Score Badge */}
            <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 flex-shrink-0">
              <div className="text-center">
                <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
                  {analysis.overallScore}
                  <span className="text-sm font-normal text-slate-400">/10</span>
                </div>
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
                  Overall SEO Score
                </div>
              </div>
            </div>
          </div>

          {/* Factor Breakdown Progress Meters */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Readability</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{analysis.readabilityScore}/10</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: `${analysis.readabilityScore * 10}%` }} />
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Clarity</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{analysis.clarityScore}/10</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${analysis.clarityScore * 10}%` }} />
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Curiosity</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{analysis.curiosityScore}/10</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div className="bg-purple-600 h-full rounded-full" style={{ width: `${analysis.curiosityScore * 10}%` }} />
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">CTR Potential</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{analysis.ctrPotentialScore}/10</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${analysis.ctrPotentialScore * 10}%` }} />
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 space-y-1.5 col-span-2 md:col-span-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Accuracy</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{analysis.accuracyScore}/10</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div className="bg-teal-600 h-full rounded-full" style={{ width: `${analysis.accuracyScore * 10}%` }} />
              </div>
            </div>
          </div>

          {/* Strengths, Weaknesses, Suggestions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/40 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Strengths
              </div>
              <ul className="space-y-1.5 text-xs text-emerald-950 dark:text-emerald-200">
                {analysis.strengths.map((str, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 dark:text-amber-300">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Weaknesses
              </div>
              <ul className="space-y-1.5 text-xs text-amber-950 dark:text-amber-200">
                {analysis.weaknesses.map((wk, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{wk}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/80 dark:border-blue-900/40 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-blue-800 dark:text-blue-300">
                <Lightbulb className="w-4 h-4 text-blue-600" />
                Improvement Suggestions
              </div>
              <ul className="space-y-1.5 text-xs text-blue-950 dark:text-blue-200">
                {analysis.suggestions.map((sug, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>{sug}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 5 Headline Variations Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Generated Editorial Headline Options (5 Strategic Angles)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Select any generated option to replace your active headline or copy for A/B testing.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-xs">
            {['All', 'SEO Focused', 'CTR Focused', 'Google Discover Focused', 'Local News Focused', 'Balanced SEO + CTR'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Options list */}
        <div className="grid grid-cols-1 gap-3.5">
          {filteredOptions?.map((opt, i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-900 rounded-xl p-4 md:p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-400 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900/50">
                    {opt.type}
                  </span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    Assessment: {opt.score}/10
                  </span>
                </div>
                <p className="text-sm md:text-base font-bold text-slate-900 dark:text-white leading-relaxed">
                  {opt.headline}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                  Rationale: {opt.reason}
                </p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-center">
                <button
                  onClick={() => handleCopyOption(opt.headline, i)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 transition-colors"
                  title="Copy to clipboard"
                >
                  {copiedIndex === i ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleAdoptHeadline(opt.headline)}
                  className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm active:scale-95"
                >
                  Apply Headline
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search Console / Algorithmic Guidance Disclaimer */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 text-xs text-slate-500 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
        <p>
          <strong>Editorial Compliance Note:</strong> In accordance with Google News guidelines, headline scores reflect structural search relevance, readability, and CTR best practices. No tool can guarantee exact search impressions, rankings, or Google Discover placement.
        </p>
      </div>
    </div>
  );
}
