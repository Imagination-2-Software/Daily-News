'use client';

import React, { useState } from 'react';
import {
  CodeXml,
  Copy,
  Check,
  CheckCircle2,
  AlertCircle,
  FileCode,
  ShieldCheck,
  ExternalLink,
  RefreshCw
} from 'lucide-react';
import { NewsProject } from '@/lib/news-seo/types';
import { createJsonLdSchema } from '@/lib/news-seo/defaults';

interface SchemaGeneratorViewProps {
  project: NewsProject;
  onUpdateProject: (updated: Partial<NewsProject>) => void;
  onNavigateTab: (tab: string) => void;
}

export default function SchemaGeneratorView({
  project,
  onUpdateProject,
  onNavigateTab,
}: SchemaGeneratorViewProps) {
  const [copied, setCopied] = useState(false);
  const [jsonText, setJsonText] = useState(
    project.jsonLd || createJsonLdSchema(project)
  );
  const [validationStatus, setValidationStatus] = useState<{
    valid: boolean;
    error?: string;
  }>({ valid: true });

  const handleValidate = (text: string) => {
    try {
      JSON.parse(text);
      setValidationStatus({ valid: true });
    } catch (err: any) {
      setValidationStatus({ valid: false, error: err.message });
    }
  };

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setJsonText(text);
    handleValidate(text);
    onUpdateProject({ jsonLd: text });
  };

  const handleRegenerate = () => {
    const regenerated = createJsonLdSchema(project);
    setJsonText(regenerated);
    setValidationStatus({ valid: true });
    onUpdateProject({ jsonLd: regenerated });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <CodeXml className="w-5 h-5 text-blue-600" />
          Structured Data Schema Generator (JSON-LD)
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Generate valid Google News compatible JSON-LD markup: NewsArticle, BreadcrumbList, and FAQPage with instant syntax validation.
        </p>
      </div>

      {/* Editor & Validation Toolbar */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Generated Schemas:
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
              NewsArticle
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
              BreadcrumbList
            </span>
            {project.article?.faqs && project.article.faqs.length > 0 && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                FAQPage ({project.article.faqs.length})
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRegenerate}
              className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Re-sync with Article
            </button>
            <button
              onClick={handleCopy}
              className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy JSON-LD'}
            </button>
          </div>
        </div>

        {/* Validation Status Banner */}
        <div
          className={`p-3 rounded-lg text-xs font-medium flex items-center gap-2 ${
            validationStatus.valid
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
              : 'bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800'
          }`}
        >
          {validationStatus.valid ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Syntax Valid: Compliant with Schema.org JSON-LD structural grammar.
            </>
          ) : (
            <>
              <AlertCircle className="w-4 h-4 text-red-500" />
              JSON Parsing Error: {validationStatus.error}
            </>
          )}
        </div>

        {/* Code Editor */}
        <div className="relative">
          <textarea
            rows={18}
            value={jsonText}
            onChange={handleJsonChange}
            spellCheck={false}
            className="w-full bg-slate-950 text-emerald-400 font-mono text-xs p-4 rounded-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed custom-scrollbar selection:bg-blue-600 selection:text-white"
          />
        </div>

        {/* Schema Integrity Checklist */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs pt-2">
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 space-y-1">
            <span className="font-bold text-slate-700 dark:text-slate-300">datePublished</span>
            <p className="text-[11px] text-slate-500">{project.newsDate || 'Present in schema'}</p>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 space-y-1">
            <span className="font-bold text-slate-700 dark:text-slate-300">Author &amp; Organization</span>
            <p className="text-[11px] text-slate-500">Declared as NewsMediaOrganization</p>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 space-y-1">
            <span className="font-bold text-slate-700 dark:text-slate-300">MainEntityOfPage</span>
            <p className="text-[11px] text-slate-500">Canonical news article permalink</p>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 space-y-1">
            <span className="font-bold text-slate-700 dark:text-slate-300">Language</span>
            <p className="text-[11px] text-slate-500">{project.language === 'English' ? 'en' : 'hi'}</p>
          </div>
        </div>
      </div>

      {/* Footer Nav */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={() => onNavigateTab('discover')}
          className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900"
        >
          ← Back to Discover Optimizer
        </button>
        <button
          onClick={() => onNavigateTab('fact-check')}
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm"
        >
          Review Fact-Checker Audit Table →
        </button>
      </div>
    </div>
  );
}
