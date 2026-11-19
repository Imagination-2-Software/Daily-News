'use client';

import React, { useState } from 'react';
import {
  Search,
  RotateCcw,
  Link as LinkIcon,
  Calendar,
  Layers,
  Languages,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  ExternalLink,
  ShieldAlert,
  Sparkles,
  Info
} from 'lucide-react';
import { NewsProject, NewsResearchResult } from '@/lib/news-seo/types';

interface NewsResearchViewProps {
  project: NewsProject;
  onUpdateProject: (updated: Partial<NewsProject>) => void;
  onNavigateTab: (tab: string) => void;
}

export default function NewsResearchView({
  project,
  onUpdateProject,
  onNavigateTab,
}: NewsResearchViewProps) {
  const [headline, setHeadline] = useState(project.headline || '');
  const [sourceUrl, setSourceUrl] = useState(project.sourceUrl || '');
  const [newsDate, setNewsDate] = useState(project.newsDate || new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState(project.category || 'National');
  const [language, setLanguage] = useState<'Hindi' | 'English'>(project.language || 'Hindi');
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const sampleHeadline = 'काशी में देव दीपावली की तैयारी, गंगा घाटों पर जलेंगे 11 लाख दीये';

  const handleClear = () => {
    setHeadline('');
    setSourceUrl('');
  };

  const handleApplySample = () => {
    setHeadline(sampleHeadline);
    setCategory('Culture & Regional');
    setNewsDate(new Date().toISOString().split('T')[0]);
  };

  const handleRunResearch = async () => {
    if (!headline.trim()) return;
    setIsLoading(true);
    setStatusMessage('Querying news research engine and fact verification models...');

    try {
      const res = await fetch('/api/news-seo/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create-full-project',
          headline: headline.trim(),
          category,
          newsDate,
          sourceUrl: sourceUrl.trim(),
          language,
        }),
      });

      if (!res.ok) {
        throw new Error('Research failed to process.');
      }

      const data = await res.json();
      if (data.project) {
        onUpdateProject({
          ...data.project,
          headline: headline.trim(),
          category,
          newsDate,
          sourceUrl: sourceUrl.trim(),
          language,
        });
        setStatusMessage(data.message || 'Research workspace updated successfully.');
      }
    } catch (err: any) {
      setStatusMessage('Error executing research: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const research = project.research;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Page Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Search className="w-5 h-5 text-blue-600" />
          News Headline Input &amp; Deep Research Workspace
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Input your raw breaking headline, source materials, and category to synthesize confirmed facts, unverified claims, and editorial angles.
        </p>
      </div>

      {/* Input Form Card */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Hindi News Headline <span className="text-red-500">*</span>
            </label>
            <button
              onClick={handleApplySample}
              type="button"
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-medium"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Use Example: देव दीपावली काशी
            </button>
          </div>
          <textarea
            rows={2}
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            placeholder="Enter your Hindi news headline here... (e.g. काशी में देव दीपावली की तैयारी, गंगा घाटों पर जलेंगे 11 लाख दीये)"
            className="w-full text-base font-semibold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/80 p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-900 transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Supplementary inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* Source URL */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
              <LinkIcon className="w-3.5 h-3.5 text-slate-400" /> Source URL (Optional)
            </label>
            <input
              type="url"
              placeholder="https://pib.gov.in/news..."
              value={sourceUrl}
              onChange={(e) => setSourceUrl(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Date of news */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" /> Date of News
            </label>
            <input
              type="date"
              value={newsDate}
              onChange={(e) => setNewsDate(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-slate-400" /> News Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="National">National (राष्ट्रीय)</option>
              <option value="State & Regional">State & Regional (राज्य/प्रादेशिक)</option>
              <option value="Politics">Politics (राजनीति)</option>
              <option value="Culture & Regional">Culture & Spiritual (धर्म/संस्कृति)</option>
              <option value="Crime & Law">Crime & Law (अपराध व कानून)</option>
              <option value="Economy & Business">Business & Economy (अर्थव्यवस्था)</option>
              <option value="Technology">Technology (तकनीक)</option>
              <option value="Sports">Sports (खेल)</option>
              <option value="Weather & Climate">Weather & Environment (मौसम)</option>
            </select>
          </div>

          {/* Language Selection */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
              <Languages className="w-3.5 h-3.5 text-slate-400" /> Language
            </label>
            <div className="flex rounded-lg border border-slate-300 dark:border-slate-700 overflow-hidden p-0.5 bg-slate-50 dark:bg-slate-800">
              <button
                type="button"
                onClick={() => setLanguage('Hindi')}
                className={`flex-1 py-1.5 font-bold rounded ${
                  language === 'Hindi'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                Hindi (हिंदी)
              </button>
              <button
                type="button"
                onClick={() => setLanguage('English')}
                className={`flex-1 py-1.5 font-bold rounded ${
                  language === 'English'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                English
              </button>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleRunResearch}
              disabled={isLoading || !headline.trim()}
              className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs md:text-sm flex items-center gap-2 shadow-sm transition-all active:scale-95 disabled:opacity-50"
            >
              <Search className="w-4 h-4" />
              {isLoading ? 'Synthesizing Intelligence...' : 'Research News & Verify'}
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="px-4 py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Clear
            </button>
          </div>

          {statusMessage && (
            <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
              {statusMessage}
            </p>
          )}
        </div>
      </div>

      {/* Live Research Notice Banner */}
      <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/70 dark:bg-blue-950/30 text-xs text-blue-950 dark:text-blue-200 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold">Strict Editorial Integrity &amp; Grounded Verification</p>
          <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
            {research?.liveResearchUsed
              ? `Connected Live Research Active: ${research.liveResearchNote}`
              : 'Live external web search API is currently running in local verified editorial synthesis mode. Source citations, quotes, and statistics are never fabricated. Provide official source URLs above to ground findings directly.'}
          </p>
        </div>
      </div>

      {/* 6 Structured Research Result Cards */}
      {research && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* 1. Main News Summary */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              1. Main News Summary
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
              {research.mainSummary}
            </p>
          </div>

          {/* 2. Confirmed Facts */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400 border-b border-slate-100 dark:border-slate-800 pb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              2. Confirmed Facts ({research.confirmedFacts.length})
            </div>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              {research.confirmedFacts.map((fact, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Unverified Claims */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-amber-200 dark:border-amber-900/60 bg-amber-50/20 dark:bg-amber-950/10 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-amber-700 dark:text-amber-400 border-b border-amber-100 dark:border-amber-900/40 pb-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              3. Unverified Claims ({research.unverifiedClaims.length})
            </div>
            <ul className="space-y-2 text-xs text-amber-900 dark:text-amber-200">
              {research.unverifiedClaims.map((claim, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{claim}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Conflicting Information */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-red-200 dark:border-red-900/60 bg-red-50/20 dark:bg-red-950/10 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-red-600 dark:text-red-400 border-b border-red-100 dark:border-red-900/40 pb-2">
              <XCircle className="w-4 h-4 text-red-500" />
              4. Conflicting Information
            </div>
            <ul className="space-y-2 text-xs text-red-900 dark:text-red-200">
              {research.conflictingInfo.map((conf, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span>{conf}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 5. Source Comparison */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600" />
              5. Source Comparison ({research.sourceComparison.length})
            </div>
            <div className="space-y-3 text-xs">
              {research.sourceComparison.map((src, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 space-y-1">
                  <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-between">
                    <span>{src.sourceName}</span>
                    {src.publishDate && (
                      <span className="text-[10px] text-slate-400">{src.publishDate}</span>
                    )}
                  </div>
                  <p className="text-[11px] text-blue-600 dark:text-blue-400 italic">
                    Angle: {src.reportingAngle}
                  </p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300">
                    Points: {src.keyPoints.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Missing Information */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
              <HelpCircle className="w-4 h-4 text-purple-500" />
              6. Missing Information / Next Steps
            </div>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              {research.missingInfo.map((miss, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-purple-500 font-bold">•</span>
                  <span>{miss}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Navigation action footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
        <p className="text-xs text-slate-400">Next recommended step: Headline SEO & CTR Analyzer</p>
        <button
          onClick={() => onNavigateTab('headline')}
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm"
        >
          Proceed to Headline Analyzer →
        </button>
      </div>
    </div>
  );
}
