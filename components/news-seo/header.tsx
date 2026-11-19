'use client';

import React, { useState } from 'react';
import {
  Search,
  Bell,
  Sun,
  Moon,
  ExternalLink,
  Save,
  Check,
  RefreshCw,
  FolderGit2
} from 'lucide-react';

interface HeaderProps {
  activeHeadline: string;
  onSearch: (q: string) => void;
  isSaving: boolean;
  onSaveProject: () => void;
  theme: 'light' | 'dark';
  setTheme: (t: 'light' | 'dark') => void;
  onNewArticle: () => void;
  projectsCount: number;
}

export default function Header({
  activeHeadline,
  onSearch,
  isSaving,
  onSaveProject,
  theme,
  setTheme,
  onNewArticle,
  projectsCount,
}: HeaderProps) {
  const [searchInput, setSearchInput] = useState('');
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [savedTick, setSavedTick] = useState(false);

  const handleSave = () => {
    onSaveProject();
    setSavedTick(true);
    setTimeout(() => setSavedTick(false), 2000);
  };

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-6 flex items-center justify-between gap-4 sticky top-0 z-20 transition-colors">
      {/* Current project or search */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search projects, keywords, or research claims..."
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              onSearch(e.target.value);
            }}
            className="w-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 pl-9 pr-4 py-1.5 rounded-lg text-sm border border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all placeholder:text-slate-400"
          />
        </div>

        {activeHeadline && (
          <div className="hidden lg:flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1.5 rounded-md max-w-xs truncate">
            <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
            <span className="truncate font-medium text-slate-700 dark:text-slate-300">
              {activeHeadline}
            </span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Quick New Article */}
        <button
          onClick={onNewArticle}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors hidden sm:flex items-center gap-1.5"
        >
          <FolderGit2 className="w-3.5 h-3.5 text-blue-500" />
          Projects ({projectsCount})
        </button>

        {/* Save button */}
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5 shadow-sm transition-all active:scale-95 disabled:opacity-50"
        >
          {savedTick ? (
            <>
              <Check className="w-3.5 h-3.5 text-white" />
              Saved
            </>
          ) : isSaving ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-3.5 h-3.5" />
              Save Workspace
            </>
          )}
        </button>

        {/* Theme toggle */}
        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          aria-label="Toggle Theme"
        >
          {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotificationOpen(!notificationOpen)}
            className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
          </button>

          {notificationOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl p-3 z-50 text-xs">
              <div className="flex items-center justify-between font-semibold pb-2 border-b border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white">
                <span>Editorial Alerts</span>
                <span className="text-[10px] text-blue-500">All caught up</span>
              </div>
              <div className="py-2 space-y-2">
                <div className="p-2 rounded bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200">
                  <p className="font-medium">SEO Algorithm Update</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Google Discover favors high-res featured images (≥1200px) with original reporting.
                  </p>
                </div>
                <div className="p-2 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200">
                  <p className="font-medium">Fact Verification Reminder</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Always confirm quotes & statistics with 2 independent sources before publishing.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User profile avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white text-xs font-bold ring-2 ring-blue-500/20">
            HN
          </div>
          <div className="hidden xl:block text-left">
            <p className="text-xs font-bold leading-tight text-slate-800 dark:text-slate-200">Hindi Desk Editor</p>
            <p className="text-[10px] text-slate-400">Chief Bureau</p>
          </div>
        </div>
      </div>
    </header>
  );
}
