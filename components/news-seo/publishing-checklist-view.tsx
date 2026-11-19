'use client';

import React from 'react';
import {
  CheckSquare,
  CheckCircle2,
  Circle,
  AlertCircle,
  Sparkles,
  Send,
  Eye,
  ShieldCheck
} from 'lucide-react';
import { NewsProject, PublishingChecklistItem } from '@/lib/news-seo/types';

interface PublishingChecklistViewProps {
  project: NewsProject;
  onUpdateProject: (updated: Partial<NewsProject>) => void;
  onNavigateTab: (tab: string) => void;
}

export default function PublishingChecklistView({
  project,
  onUpdateProject,
  onNavigateTab,
}: PublishingChecklistViewProps) {
  const checklist = project.checklist || [];

  const checkedCount = checklist.filter((item) => item.checked).length;
  const totalCount = checklist.length;
  const completionPercent = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;

  const handleToggle = (id: string) => {
    const updated = checklist.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    const newCheckedCount = updated.filter((i) => i.checked).length;
    const isComplete = newCheckedCount === updated.length;

    onUpdateProject({
      checklist: updated,
      status: isComplete ? 'Ready to Publish' : 'Reviewed',
    });
  };

  const handleCheckAll = () => {
    const updated = checklist.map((item) => ({ ...item, checked: true }));
    onUpdateProject({
      checklist: updated,
      status: 'Ready to Publish',
    });
  };

  const handleResetChecklist = () => {
    const updated = checklist.map((item) => ({ ...item, checked: false }));
    onUpdateProject({
      checklist: updated,
      status: 'Draft',
    });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <CheckSquare className="w-5 h-5 text-blue-600" />
          Editorial Quality &amp; Publishing Pre-flight Checklist
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          13-step journalistic &amp; technical gatekeeping: SEO metadata, fact-checks, high-res images, schema, and mobile responsiveness.
        </p>
      </div>

      {/* Progress & Readiness Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Publishing Readiness
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                {completionPercent}% Completed
              </h3>
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  completionPercent === 100
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                    : completionPercent >= 60
                    ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                    : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                }`}
              >
                {checkedCount} / {totalCount} Requirements Met
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCheckAll}
              className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors"
            >
              Mark All Checked
            </button>
            <button
              onClick={handleResetChecklist}
              className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              completionPercent === 100
                ? 'bg-emerald-500'
                : completionPercent >= 50
                ? 'bg-blue-600'
                : 'bg-amber-500'
            }`}
            style={{ width: `${completionPercent}%` }}
          />
        </div>
      </div>

      {/* Checklist items list */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
        {checklist.map((item, index) => {
          return (
            <div
              key={item.id}
              onClick={() => handleToggle(item.id)}
              className={`p-4 md:px-6 flex items-start gap-4 cursor-pointer transition-colors ${
                item.checked
                  ? 'bg-emerald-50/20 dark:bg-emerald-950/10'
                  : 'hover:bg-slate-50/60 dark:hover:bg-slate-800/40'
              }`}
            >
              <div className="mt-0.5 flex-shrink-0">
                {item.checked ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600 hover:text-blue-500" />
                )}
              </div>

              <div className="flex-1 space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-slate-400">Step {index + 1}.</span>
                  <p
                    className={`text-sm font-bold ${
                      item.checked
                        ? 'text-slate-900 dark:text-slate-100 line-through text-slate-400 dark:text-slate-500'
                        : 'text-slate-900 dark:text-slate-100'
                    }`}
                  >
                    {item.label}
                  </p>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {item.description}
                </p>
              </div>

              {item.checked && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 self-center">
                  Verified
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Editorial Sign-off Box */}
      <div className="p-5 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="font-bold text-sm text-blue-950 dark:text-blue-100 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            Editorial Gatekeeper Status: {completionPercent === 100 ? 'APPROVED FOR BROADCAST' : 'PENDING REQUIREMENTS'}
          </p>
          <p className="text-xs text-blue-900/80 dark:text-blue-300/80">
            {completionPercent === 100
              ? 'All 13 publishing checkpoints have been completed and verified against newsroom standards.'
              : `Please verify remaining ${totalCount - checkedCount} unchecked checkpoints before pushing to live feeds.`}
          </p>
        </div>

        <button
          onClick={() => onNavigateTab('preview')}
          className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs md:text-sm flex items-center gap-2 transition-transform active:scale-95 shadow-md shadow-blue-500/20 whitespace-nowrap"
        >
          <Eye className="w-4 h-4" />
          Open Live News Preview
        </button>
      </div>
    </div>
  );
}
