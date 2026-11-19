'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/news-seo/sidebar';
import Header from '@/components/news-seo/header';
import DashboardView from '@/components/news-seo/dashboard-view';
import NewsResearchView from '@/components/news-seo/news-research-view';
import HeadlineAnalyzerView from '@/components/news-seo/headline-analyzer-view';
import KeywordResearchView from '@/components/news-seo/keyword-research-view';
import ArticleWriterView from '@/components/news-seo/article-writer-view';
import MetaSeoView from '@/components/news-seo/meta-seo-view';
import DiscoverOptimizerView from '@/components/news-seo/discover-optimizer-view';
import SchemaGeneratorView from '@/components/news-seo/schema-generator-view';
import FactCheckerView from '@/components/news-seo/fact-checker-view';
import PublishingChecklistView from '@/components/news-seo/publishing-checklist-view';
import ArticlePreviewView from '@/components/news-seo/article-preview-view';
import SettingsView from '@/components/news-seo/settings-view';
import { NewsProject } from '@/lib/news-seo/types';
import { createInitialProject } from '@/lib/news-seo/defaults';

const STORAGE_KEY = 'news_seo_projects_v2';
const ACTIVE_ID_KEY = 'news_seo_active_id_v2';

export default function NewsSeoApp() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isSaving, setIsSaving] = useState(false);

  // Initial demo project
  const initialDefaultProject = createInitialProject(
    'काशी में देव दीपावली की तैयारी, गंगा घाटों पर जलेंगे 11 लाख दीये',
    'Culture & Regional'
  );

  const [projects, setProjects] = useState<NewsProject[]>([initialDefaultProject]);
  const [currentProject, setCurrentProject] = useState<NewsProject>(initialDefaultProject);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const savedProjects = localStorage.getItem(STORAGE_KEY);
      const savedActiveId = localStorage.getItem(ACTIVE_ID_KEY);

      if (savedProjects) {
        const parsed: NewsProject[] = JSON.parse(savedProjects);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProjects(parsed);
          const matched = parsed.find((p) => p.id === savedActiveId) || parsed[0];
          setCurrentProject(matched);
        }
      }
    } catch (e) {
      console.warn('Failed to load projects from localStorage:', e);
    }
  }, []);

  // Save to localStorage whenever project changes
  const persistProjects = (updatedProjects: NewsProject[], activeProj: NewsProject) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProjects));
      localStorage.setItem(ACTIVE_ID_KEY, activeProj.id);
    } catch (e) {
      console.warn('Failed to persist to localStorage:', e);
    }
  };

  const handleUpdateCurrentProject = (updatedFields: Partial<NewsProject>) => {
    const updated = {
      ...currentProject,
      ...updatedFields,
      updatedAt: new Date().toISOString(),
    };
    setCurrentProject(updated);

    const updatedList = projects.map((p) => (p.id === updated.id ? updated : p));
    setProjects(updatedList);
    persistProjects(updatedList, updated);
  };

  const handleSelectProject = (id: string) => {
    const found = projects.find((p) => p.id === id);
    if (found) {
      setCurrentProject(found);
      try {
        localStorage.setItem(ACTIVE_ID_KEY, id);
      } catch (e) {}
    }
  };

  const handleNewArticle = () => {
    const newProj = createInitialProject(
      'नई ब्रेकिंग खबर का शीर्षक यहाँ दर्ज करें',
      'National'
    );
    const updatedList = [newProj, ...projects];
    setProjects(updatedList);
    setCurrentProject(newProj);
    persistProjects(updatedList, newProj);
    setCurrentTab('research');
  };

  const handleManualSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      persistProjects(projects, currentProject);
      setIsSaving(false);
    }, 400);
  };

  const handleSearchFilter = (query: string) => {
    if (!query.trim()) return;
    const lower = query.toLowerCase();
    const matched = projects.find(
      (p) =>
        p.headline.toLowerCase().includes(lower) ||
        p.category.toLowerCase().includes(lower) ||
        p.keywordResearch?.primaryKeyword.toLowerCase().includes(lower)
    );
    if (matched) {
      setCurrentProject(matched);
    }
  };

  // Compute checklist completion percentage
  const checklist = currentProject.checklist || [];
  const checkedCount = checklist.filter((i) => i.checked).length;
  const completionPercent = checklist.length > 0 ? Math.round((checkedCount / checklist.length) * 100) : 0;

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="flex-1 flex bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen font-sans antialiased">
        {/* Left Sidebar */}
        <Sidebar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          completionPercent={completionPercent}
        />

        {/* Right Main Body */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Top Header */}
          <Header
            activeHeadline={currentProject.headline}
            onSearch={handleSearchFilter}
            isSaving={isSaving}
            onSaveProject={handleManualSave}
            theme={theme}
            setTheme={setTheme}
            onNewArticle={handleNewArticle}
            projectsCount={projects.length}
          />

          {/* Page Workspaces Content Area */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 custom-scrollbar">
            <div className="max-w-7xl mx-auto">
              {currentTab === 'dashboard' && (
                <DashboardView
                  projects={projects}
                  currentProject={currentProject}
                  onSelectProject={handleSelectProject}
                  onNavigateTab={setCurrentTab}
                  onNewArticle={handleNewArticle}
                />
              )}

              {currentTab === 'research' && (
                <NewsResearchView
                  project={currentProject}
                  onUpdateProject={handleUpdateCurrentProject}
                  onNavigateTab={setCurrentTab}
                />
              )}

              {currentTab === 'headline' && (
                <HeadlineAnalyzerView
                  project={currentProject}
                  onUpdateProject={handleUpdateCurrentProject}
                  onNavigateTab={setCurrentTab}
                />
              )}

              {currentTab === 'keywords' && (
                <KeywordResearchView
                  project={currentProject}
                  onUpdateProject={handleUpdateCurrentProject}
                  onNavigateTab={setCurrentTab}
                />
              )}

              {currentTab === 'writer' && (
                <ArticleWriterView
                  project={currentProject}
                  onUpdateProject={handleUpdateCurrentProject}
                  onNavigateTab={setCurrentTab}
                />
              )}

              {currentTab === 'meta-seo' && (
                <MetaSeoView
                  project={currentProject}
                  onUpdateProject={handleUpdateCurrentProject}
                  onNavigateTab={setCurrentTab}
                />
              )}

              {currentTab === 'discover' && (
                <DiscoverOptimizerView
                  project={currentProject}
                  onUpdateProject={handleUpdateCurrentProject}
                  onNavigateTab={setCurrentTab}
                />
              )}

              {currentTab === 'schema' && (
                <SchemaGeneratorView
                  project={currentProject}
                  onUpdateProject={handleUpdateCurrentProject}
                  onNavigateTab={setCurrentTab}
                />
              )}

              {currentTab === 'fact-check' && (
                <FactCheckerView
                  project={currentProject}
                  onUpdateProject={handleUpdateCurrentProject}
                  onNavigateTab={setCurrentTab}
                />
              )}

              {currentTab === 'checklist' && (
                <PublishingChecklistView
                  project={currentProject}
                  onUpdateProject={handleUpdateCurrentProject}
                  onNavigateTab={setCurrentTab}
                />
              )}

              {currentTab === 'preview' && (
                <ArticlePreviewView
                  project={currentProject}
                  onNavigateTab={setCurrentTab}
                />
              )}

              {currentTab === 'settings' && <SettingsView />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
