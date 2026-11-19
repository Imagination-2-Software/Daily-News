'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  XCircle,
  CheckCircle2,
  PlusCircle,
  Edit2,
  Trash2,
  FileCheck2,
  UserCheck
} from 'lucide-react';
import { NewsProject, SourceClaim } from '@/lib/news-seo/types';

interface FactCheckerViewProps {
  project: NewsProject;
  onUpdateProject: (updated: Partial<NewsProject>) => void;
  onNavigateTab: (tab: string) => void;
}

export default function FactCheckerView({
  project,
  onUpdateProject,
  onNavigateTab,
}: FactCheckerViewProps) {
  const [claims, setClaims] = useState<SourceClaim[]>(project.factChecks || []);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newClaimText, setNewClaimText] = useState('');
  const [newClaimSource, setNewClaimSource] = useState('');
  const [newClaimStatus, setNewClaimStatus] = useState<SourceClaim['status']>('Verified');
  const [newClaimNotes, setNewClaimNotes] = useState('');

  const handleStatusChange = (id: string, status: SourceClaim['status']) => {
    const updated = claims.map((c) =>
      c.id === id
        ? {
            ...c,
            status,
            verifiedBy: 'Editorial Bureau Desk',
            verifiedAt: new Date().toLocaleDateString(),
          }
        : c
    );
    setClaims(updated);
    onUpdateProject({ factChecks: updated });
  };

  const handleNotesChange = (id: string, notes: string) => {
    const updated = claims.map((c) => (c.id === id ? { ...c, notes } : c));
    setClaims(updated);
    onUpdateProject({ factChecks: updated });
  };

  const handleAddClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClaimText.trim()) return;

    const newClaim: SourceClaim = {
      id: 'fc-' + Date.now().toString(36),
      claim: newClaimText.trim(),
      source: newClaimSource.trim() || 'Newsroom Editorial Verification',
      status: newClaimStatus,
      notes: newClaimNotes.trim() || 'Audited against official primary sources.',
      verifiedBy: 'Senior Editor',
      verifiedAt: new Date().toLocaleDateString(),
    };

    const updated = [newClaim, ...claims];
    setClaims(updated);
    onUpdateProject({ factChecks: updated });

    setNewClaimText('');
    setNewClaimSource('');
    setNewClaimNotes('');
  };

  const handleDeleteClaim = (id: string) => {
    const updated = claims.filter((c) => c.id !== id);
    setClaims(updated);
    onUpdateProject({ factChecks: updated });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-blue-600" />
          News Fact-Checker &amp; Claim Verification Audit Table
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Review claims extracted from reporting. Highlight unverified claims in orange and conflicting reports in red before publication approval.
        </p>
      </div>

      {/* Summary Counts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-slate-400 uppercase font-semibold">Total Audited Claims</span>
          <p className="text-xl font-bold text-slate-900 dark:text-white">{claims.length}</p>
        </div>
        <div className="bg-emerald-50/50 dark:bg-emerald-950/20 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800 shadow-sm space-y-1">
          <span className="text-emerald-700 dark:text-emerald-300 uppercase font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Verified
          </span>
          <p className="text-xl font-bold text-emerald-700 dark:text-emerald-300">
            {claims.filter((c) => c.status === 'Verified').length}
          </p>
        </div>
        <div className="bg-amber-50/50 dark:bg-amber-950/20 p-4 rounded-xl border border-amber-200 dark:border-amber-800 shadow-sm space-y-1">
          <span className="text-amber-700 dark:text-amber-300 uppercase font-semibold flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" /> Unverified
          </span>
          <p className="text-xl font-bold text-amber-700 dark:text-amber-300">
            {claims.filter((c) => c.status === 'Unverified').length}
          </p>
        </div>
        <div className="bg-red-50/50 dark:bg-red-950/20 p-4 rounded-xl border border-red-200 dark:border-red-800 shadow-sm space-y-1">
          <span className="text-red-700 dark:text-red-300 uppercase font-semibold flex items-center gap-1">
            <XCircle className="w-3.5 h-3.5" /> Conflicting
          </span>
          <p className="text-xl font-bold text-red-700 dark:text-red-300">
            {claims.filter((c) => c.status === 'Conflicting').length}
          </p>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-blue-600" />
            Verification Ledger
          </h3>
          <span className="text-[11px] text-slate-400">
            Click status dropdown to update editorial audit state
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="px-5 py-3.5 w-1/3">Claim (दावा / तथ्य)</th>
                <th className="px-4 py-3.5 w-1/5">Source (स्रोत)</th>
                <th className="px-4 py-3.5 w-1/6">Verification Status</th>
                <th className="px-4 py-3.5">Audit Notes &amp; Sign-off</th>
                <th className="px-4 py-3.5 text-right w-16">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {claims.map((item) => {
                const isUnverified = item.status === 'Unverified';
                const isConflicting = item.status === 'Conflicting';
                const isPartially = item.status === 'Partially Verified';
                const isVerified = item.status === 'Verified';

                return (
                  <tr
                    key={item.id}
                    className={`transition-colors ${
                      isConflicting
                        ? 'bg-red-50/40 dark:bg-red-950/20'
                        : isUnverified
                        ? 'bg-amber-50/40 dark:bg-amber-950/20'
                        : 'hover:bg-slate-50/60 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    {/* Claim text */}
                    <td className="px-5 py-4 font-semibold text-slate-900 dark:text-slate-100 leading-relaxed">
                      {item.claim}
                    </td>

                    {/* Source */}
                    <td className="px-4 py-4 text-slate-600 dark:text-slate-300">
                      <div className="font-medium truncate max-w-xs">{item.source}</div>
                      {item.sourceUrl && (
                        <a
                          href={item.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-blue-500 hover:underline truncate block"
                        >
                          {item.sourceUrl}
                        </a>
                      )}
                    </td>

                    {/* Status dropdown */}
                    <td className="px-4 py-4">
                      <select
                        value={item.status}
                        onChange={(e) => handleStatusChange(item.id, e.target.value as any)}
                        className={`text-xs font-bold px-2.5 py-1.5 rounded-lg border focus:outline-none ${
                          isVerified
                            ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                            : isUnverified
                            ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800'
                            : isConflicting
                            ? 'bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border-red-300 dark:border-red-800'
                            : 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-800'
                        }`}
                      >
                        <option value="Verified">Verified</option>
                        <option value="Partially Verified">Partially Verified</option>
                        <option value="Unverified">Unverified (Orange)</option>
                        <option value="Conflicting">Conflicting (Red)</option>
                      </select>
                    </td>

                    {/* Notes & Auditor */}
                    <td className="px-4 py-4 space-y-1">
                      <input
                        type="text"
                        value={item.notes}
                        onChange={(e) => handleNotesChange(item.id, e.target.value)}
                        placeholder="Add editorial verification note..."
                        className="w-full text-xs text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 p-1.5 rounded border border-slate-300 dark:border-slate-700 focus:outline-none"
                      />
                      {item.verifiedBy && (
                        <div className="flex items-center gap-1 text-[10px] text-slate-400">
                          <UserCheck className="w-3 h-3 text-emerald-500" />
                          <span>{item.verifiedBy} • {item.verifiedAt}</span>
                        </div>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4 text-right">
                      <button
                        onClick={() => handleDeleteClaim(item.id)}
                        className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                        title="Delete Claim"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Claim Form */}
      <form
        onSubmit={handleAddClaim}
        className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
      >
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
          <PlusCircle className="w-4 h-4 text-blue-600" />
          Add Custom Claim to Fact-Check Register
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="md:col-span-2 space-y-1">
            <label className="text-slate-500 font-semibold">Claim Text</label>
            <input
              type="text"
              placeholder="Enter fact or claim statement (e.g., मुख्य अतिथि का नाम या सुरक्षा बल संख्या)"
              value={newClaimText}
              onChange={(e) => setNewClaimText(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 p-2 rounded-lg border border-slate-300 dark:border-slate-700 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-500 font-semibold">Initial Status</label>
            <select
              value={newClaimStatus}
              onChange={(e) => setNewClaimStatus(e.target.value as any)}
              className="w-full bg-slate-50 dark:bg-slate-800 p-2 rounded-lg border border-slate-300 dark:border-slate-700 focus:outline-none font-bold"
            >
              <option value="Verified">Verified</option>
              <option value="Partially Verified">Partially Verified</option>
              <option value="Unverified">Unverified (Orange)</option>
              <option value="Conflicting">Conflicting (Red)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-slate-500 font-semibold">Source Name / Authority</label>
            <input
              type="text"
              placeholder="e.g. CMO Press Release, Police Commissioner"
              value={newClaimSource}
              onChange={(e) => setNewClaimSource(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 p-2 rounded-lg border border-slate-300 dark:border-slate-700 focus:outline-none"
            />
          </div>

          <div className="md:col-span-2 space-y-1">
            <label className="text-slate-500 font-semibold">Verification Audit Notes</label>
            <input
              type="text"
              placeholder="Documentation details, phone call confirmation, etc."
              value={newClaimNotes}
              onChange={(e) => setNewClaimNotes(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 p-2 rounded-lg border border-slate-300 dark:border-slate-700 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!newClaimText.trim()}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm active:scale-95 disabled:opacity-50"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            Append Claim to Ledger
          </button>
        </div>
      </form>

      {/* Footer Nav */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={() => onNavigateTab('schema')}
          className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900"
        >
          ← Back to Schema Generator
        </button>
        <button
          onClick={() => onNavigateTab('checklist')}
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm"
        >
          Open Publishing Checklist →
        </button>
      </div>
    </div>
  );
}
