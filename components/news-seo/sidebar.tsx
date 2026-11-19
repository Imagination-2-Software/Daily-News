'use client';

import React from 'react';
import {
  LayoutDashboard,
  Search,
  Heading,
  KeyRound,
  FileText,
  Tags,
  Compass,
  CodeXml,
  ShieldCheck,
  CheckSquare,
  Eye,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Newspaper
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  completionPercent: number;
}

export const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
  { id: 'research', label: 'News Research', icon: Search, badge: null },
  { id: 'headline', label: 'Headline Analyzer', icon: Heading, badge: '5 angles' },
  { id: 'keywords', label: 'Keyword Research', icon: KeyRound, badge: null },
  { id: 'writer', label: 'Article Writer', icon: FileText, badge: 'Hindi' },
  { id: 'meta-seo', label: 'Meta SEO Generator', icon: Tags, badge: null },
  { id: 'discover', label: 'Google Discover', icon: Compass, badge: null },
  { id: 'schema', label: 'Schema Generator', icon: CodeXml, badge: 'JSON-LD' },
  { id: 'fact-check', label: 'Fact Checker', icon: ShieldCheck, badge: null },
  { id: 'checklist', label: 'Publishing Checklist', icon: CheckSquare, badge: null },
  { id: 'preview', label: 'Live Article Preview', icon: Eye, badge: 'Responsive' },
  { id: 'settings', label: 'Settings & API Keys', icon: Settings, badge: null },
];

export default function Sidebar({
  currentTab,
  setCurrentTab,
  isCollapsed,
  setIsCollapsed,
  completionPercent,
}: SidebarProps) {
  return (
    <aside
      className={`relative flex flex-col bg-slate-900 border-r border-slate-800 text-slate-200 transition-all duration-300 z-30 select-none ${
        isCollapsed ? 'w-20' : 'w-72'
      }`}
    >
      {/* Brand header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-slate-800">
        {!isCollapsed && (
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-md shadow-blue-500/20">
              <Newspaper className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-base tracking-tight text-white flex items-center gap-1.5">
                News SEO <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">AI</span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium truncate">Hindi Editorial Studio</p>
            </div>
          </div>
        )}

        {isCollapsed && (
          <div className="mx-auto flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-md shadow-blue-500/20">
            <Newspaper className="w-5 h-5" />
          </div>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors ${
            isCollapsed ? 'absolute -right-3 top-5 bg-slate-800 border border-slate-700 shadow-md text-white' : ''
          }`}
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          aria-label={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Progress pill if not collapsed */}
      {!isCollapsed && (
        <div className="px-4 py-3 border-b border-slate-800/80 bg-slate-900/60">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5 font-medium">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Publishing Readiness
            </span>
            <span className="font-bold text-white">{completionPercent}%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 custom-scrollbar">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon
                className={`w-5 h-5 flex-shrink-0 transition-transform ${
                  isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'
                }`}
              />
              {!isCollapsed && (
                <span className="truncate flex-1 text-left">{item.label}</span>
              )}
              {!isCollapsed && item.badge && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded font-semibold uppercase tracking-wider ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-800 text-slate-400 border border-slate-700/60'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Sidebar footer status */}
      <div className="p-3 border-t border-slate-800 bg-slate-900/90">
        {!isCollapsed ? (
          <div className="flex items-center gap-3 px-2 py-1 text-xs text-slate-400">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <div className="truncate">
              <span className="text-white font-medium">News Engine Online</span>
              <p className="text-[10px] text-slate-400">Hindi SEO v2.5 Ready</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center py-1">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" title="System Online" />
          </div>
        )}
      </div>
    </aside>
  );
}
