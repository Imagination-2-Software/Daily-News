'use client';

import React from 'react';
import {
  FileText,
  Sparkles,
  TrendingUp,
  ShieldAlert,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
  PlusCircle,
  Calendar,
  Globe
} from 'lucide-react';
import { NewsProject } from '@/lib/news-seo/types';

interface DashboardViewProps {
  projects: NewsProject[];
  currentProject: NewsProject;
  onSelectProject: (id: string) => void;
  onNavigateTab: (tab: string) => void;
  onNewArticle: () => void;
}

export default function DashboardView({
  projects,
  currentProject,
  onSelectProject,
  onNavigateTab,
  onNewArticle,
}: DashboardViewProps) {
  // Compute analytics
  const totalAnalyzed = projects.length;
  const headlinesOptimized = projects.filter((p) => p.headlineAnalysis).length;
  const articlesGenerated = projects.filter((p) => p.article).length;
  const pendingFactChecks = projects.reduce((acc, p) => {
    return acc + (p.factChecks?.filter((c) => c.status === 'Unverified' || c.status === 'Conflicting').length || 0);
  }, 0);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner / Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border border-slate-800 p-6 md:p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            Next-Gen Hindi Editorial & News SEO Suite
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            AI News SEO Assistant &amp; Publishing Dashboard
          </h1>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            Accelerate newsroom turnaround from breaking headline to SEO-optimized, fact-checked Hindi news reporting with Google Discover guidance, automated JSON-LD schemas, and editorial safeguards.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigateTab('research')}
              className="px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs md:text-sm flex items-center gap-2 transition-transform active:scale-95 shadow-md shadow-blue-500/20"
            >
              Start New News Research
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigateTab('preview')}
              className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-xs md:text-sm flex items-center gap-2 transition-all"
            >
              <Eye className="w-4 h-4" />
              Preview Current Story
            </button>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-80 h-80 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Analyzed */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between group hover:border-blue-500 transition-colors">
          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Total Articles Analyzed
            </p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {totalAnalyzed}
            </p>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> All active workspaces
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-105 transition-transform">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        {/* Headlines Optimized */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between group hover:border-blue-500 transition-colors">
          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Headlines Optimized
            </p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {headlinesOptimized}
            </p>
            <p className="text-[11px] text-blue-600 dark:text-blue-400 font-medium flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> 5-angle variant scoring
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>

        {/* Articles Generated */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between group hover:border-blue-500 transition-colors">
          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Articles Generated
            </p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {articlesGenerated}
            </p>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Editorial Hindi format
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        {/* Pending Fact Checks */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between group hover:border-amber-500 transition-colors">
          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Pending Fact Checks
            </p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {pendingFactChecks}
            </p>
            <p className="text-[11px] text-amber-600 dark:text-amber-400 font-medium flex items-center gap-1">
              <ShieldAlert className="w-3 h-3" /> Requires audit action
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-105 transition-transform">
            <ShieldAlert className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Current Active Workspace Highlight */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
              Active Project in Editor
            </span>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
              {currentProject.headline}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> {currentProject.newsDate}
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
              SEO: {currentProject.seoScore}/10
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
            <p className="text-slate-400">Category</p>
            <p className="font-semibold text-slate-700 dark:text-slate-200 mt-0.5">{currentProject.category}</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
            <p className="text-slate-400">Language</p>
            <p className="font-semibold text-slate-700 dark:text-slate-200 mt-0.5">{currentProject.language}</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
            <p className="text-slate-400">Verified Claims</p>
            <p className="font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
              {currentProject.factChecks?.filter((c) => c.status === 'Verified').length || 0} claims
            </p>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
            <p className="text-slate-400">Publishing Status</p>
            <p className="font-semibold text-blue-600 dark:text-blue-400 mt-0.5">{currentProject.status}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-2">
          <button
            onClick={() => onNavigateTab('writer')}
            className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <FileText className="w-3.5 h-3.5" /> Edit Hindi Article
          </button>
          <button
            onClick={() => onNavigateTab('headline')}
            className="px-3.5 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <TrendingUp className="w-3.5 h-3.5" /> Headline Variations
          </button>
          <button
            onClick={() => onNavigateTab('fact-check')}
            className="px-3.5 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <ShieldAlert className="w-3.5 h-3.5" /> Audit Claims
          </button>
          <button
            onClick={() => onNavigateTab('schema')}
            className="px-3.5 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Globe className="w-3.5 h-3.5" /> JSON-LD Schema
          </button>
        </div>
      </div>

      {/* Recent News Projects Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Recent News Projects</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Manage stories, SEO assessments, and publication pipelines.
            </p>
          </div>
          <button
            onClick={onNewArticle}
            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            New Headline
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="px-5 py-3.5">News Headline</th>
                <th className="px-4 py-3.5">Category</th>
                <th className="px-4 py-3.5">Date</th>
                <th className="px-4 py-3.5">SEO Score</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {projects.map((proj) => {
                const isSelected = proj.id === currentProject.id;
                return (
                  <tr
                    key={proj.id}
                    className={`hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors ${
                      isSelected ? 'bg-blue-50/40 dark:bg-blue-950/20' : ''
                    }`}
                  >
                    <td className="px-5 py-4 max-w-md">
                      <div className="font-semibold text-slate-900 dark:text-slate-100 line-clamp-1">
                        {proj.headline}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate mt-0.5">
                        ID: {proj.id} • Slug: {proj.metaSeo?.urlSlug || 'n/a'}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-slate-600 dark:text-slate-300 font-medium">
                      {proj.category}
                    </td>
                    <td className="px-4 py-4 text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(proj.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
                        {proj.seoScore}/10
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                          proj.status === 'Ready to Publish' || proj.status === 'Published'
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                            : proj.status === 'Reviewed'
                            ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                            : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                        }`}
                      >
                        {proj.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            onSelectProject(proj.id);
                            onNavigateTab('writer');
                          }}
                          className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-700 dark:text-slate-300 font-medium transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            onSelectProject(proj.id);
                            onNavigateTab('preview');
                          }}
                          className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium transition-colors"
                        >
                          Preview
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
