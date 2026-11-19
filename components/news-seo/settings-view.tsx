'use client';

import React, { useState } from 'react';
import {
  Settings,
  Key,
  Database,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Shield,
  Save,
  Server,
  Sparkles
} from 'lucide-react';

export default function SettingsView() {
  const [groqKey, setGroqKey] = useState('');
  const [geminiKey, setGeminiKey] = useState('');
  const [savedNote, setSavedNote] = useState(false);

  const handleSaveLocal = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNote(true);
    setTimeout(() => setSavedNote(false), 3000);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-blue-600" />
          Settings, API Architecture &amp; Credentials Configuration
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Configure AI reasoning engines (Groq Llama-3.3-70B, Google Gemini), research connectors, and environment security.
        </p>
      </div>

      {/* Security Architecture Principle */}
      <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50/60 dark:bg-blue-950/30 text-xs text-blue-950 dark:text-blue-200 flex items-start gap-3">
        <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold">Zero-Frontend-Leak Architecture</p>
          <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-300">
            All LLM requests and research scrapers are executed exclusively via server-side API endpoints (`/api/news-seo/generate`). Secret keys are kept in server environment files (`.env`) and never sent or exposed to client-side bundles.
          </p>
        </div>
      </div>

      {/* Environment Setup Guide */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <Server className="w-4 h-4 text-emerald-600" />
          Configuring Your Environment (.env)
        </h3>

        <div className="space-y-3 text-xs">
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            To enable live high-speed AI news synthesis with free tiers, configure your root <code className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded font-mono text-blue-600">.env</code> file with either or both providers:
          </p>

          <div className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-xs space-y-1 overflow-x-auto">
            <p className="text-slate-500"># 1. Groq (Free high-speed Llama 3.3 70B editorial synthesis)</p>
            <p className="text-blue-400">GROQ_API_KEY=<span className="text-slate-400">gsk_your_groq_api_key_here</span></p>
            <p className="text-slate-500 mt-2"># 2. Google Gemini (Free up to 1500 req/day)</p>
            <p className="text-emerald-400">GEMINI_API_KEY=<span className="text-slate-400">AIzaSy_your_gemini_key_here</span></p>
            <p className="text-slate-500 mt-2"># 3. Optional Jina Reader / Search live connector</p>
            <p className="text-purple-400">JINA_API_KEY=<span className="text-slate-400">jina_your_api_key_here</span></p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
          <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 space-y-1">
            <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
              <span>Groq Cloud Portal</span>
              <a
                href="https://console.groq.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline flex items-center gap-1 text-[11px]"
              >
                console.groq.com <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p className="text-slate-500">Recommended for lightning fast Hindi editorial prose and reasoning.</p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 space-y-1">
            <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
              <span>Google AI Studio</span>
              <a
                href="https://aistudio.google.com/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline flex items-center gap-1 text-[11px]"
              >
                aistudio.google.com <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p className="text-slate-500">Free API tier for Gemini 1.5/2.5 models and search synthesis.</p>
          </div>
        </div>
      </div>

      {/* Demo Mode / Fallback Indicator */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          Autonomous Editorial Heuristic Engine
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          When external AI keys are not configured or encounter quota rate limits, the application automatically switches to its high-fidelity <strong>Editorial Synthesis Engine</strong>. It guarantees:
        </p>
        <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span>5 strategic headline variations generated using proven news CTR algorithms.</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span>Structured Hindi article sections (Lead 5Ws, Facts, Background, Administration, FAQs).</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span>W3C &amp; Google News compliant JSON-LD structured data (NewsArticle, BreadcrumbList, FAQPage).</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span>Zero hallucinated quote attribution or fabricated statistical claims.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
