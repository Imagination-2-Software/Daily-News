'use client';

import React, { useState } from 'react';
import {
  Monitor,
  Tablet,
  Smartphone,
  Share2,
  Calendar,
  User,
  Clock,
  Bookmark,
  Heart,
  MessageSquare,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Check,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { NewsProject } from '@/lib/news-seo/types';

interface ArticlePreviewViewProps {
  project: NewsProject;
  onNavigateTab: (tab: string) => void;
}

export default function ArticlePreviewView({
  project,
  onNavigateTab,
}: ArticlePreviewViewProps) {
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [copiedShare, setCopiedShare] = useState(false);

  const article = project.article;
  const imageSeo = project.imageSeo;
  const headline = article?.headline || project.headline;

  const handleShareCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title & Device Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Monitor className="w-5 h-5 text-blue-600" />
            Realistic Hindi News Website Live Preview
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Simulate exact desktop, tablet, and mobile user experiences for readability and visual layout.
          </p>
        </div>

        {/* Viewport controls */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl self-start sm:self-auto border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setDeviceMode('desktop')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              deviceMode === 'desktop'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" /> Desktop
          </button>
          <button
            onClick={() => setDeviceMode('tablet')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              deviceMode === 'tablet'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" /> Tablet
          </button>
          <button
            onClick={() => setDeviceMode('mobile')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              deviceMode === 'mobile'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" /> Mobile
          </button>
        </div>
      </div>

      {/* Simulator Container */}
      <div className="flex justify-center p-4 sm:p-6 bg-slate-100 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 min-h-[700px] overflow-hidden">
        <div
          className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl transition-all duration-300 overflow-hidden flex flex-col ${
            deviceMode === 'desktop'
              ? 'w-full max-w-4xl'
              : deviceMode === 'tablet'
              ? 'w-[768px] max-w-full'
              : 'w-[400px] max-w-full'
          }`}
        >
          {/* Simulated News Site Top Navbar */}
          <div className="bg-red-700 text-white px-5 py-3 flex items-center justify-between border-b border-red-800">
            <div className="flex items-center gap-3">
              <span className="font-serif font-black tracking-tighter text-lg md:text-xl uppercase">
                दैनिक समाचार
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-red-900/60 border border-red-600/50">
                24×7 लाइव
              </span>
            </div>
            <div className="text-xs text-red-100 hidden sm:flex items-center gap-4 font-medium">
              <span>{project.newsDate || '2026'}</span>
              <span>•</span>
              <span>नई दिल्ली / राज्य ब्यूरो</span>
            </div>
          </div>

          {/* Secondary News Site Sub-navigation */}
          <div className="px-5 py-2 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-xs flex items-center gap-4 text-slate-600 dark:text-slate-300 font-semibold overflow-x-auto whitespace-nowrap">
            <span className="text-red-600 dark:text-red-400">होम</span>
            <span>देश</span>
            <span className="font-bold underline decoration-red-600 underline-offset-4 text-slate-900 dark:text-white">
              {project.category}
            </span>
            <span>राज्य</span>
            <span>विश्व</span>
            <span>मनोरंजन</span>
            <span>बिजनेस</span>
          </div>

          {/* Article Page Content */}
          <div className="p-5 md:p-8 space-y-6 flex-1 overflow-y-auto">
            {/* Breadcrumb */}
            <div className="text-xs text-slate-400 flex items-center gap-1.5 flex-wrap">
              <span>होम</span>
              <span>›</span>
              <span className="text-red-600 dark:text-red-400">{project.category}</span>
              <span>›</span>
              <span className="text-slate-600 dark:text-slate-300 truncate max-w-xs">{headline}</span>
            </div>

            {/* Category Pill & Live Badge */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-1 rounded bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300">
                {project.category}
              </span>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                ग्राउंड रिपोर्ट
              </span>
            </div>

            {/* Article Headline */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight font-serif">
              {headline}
            </h1>

            {/* Bylines & Metadata */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-slate-700 dark:text-slate-200">
                  सं
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">विशेष संपादकीय डेस्क</p>
                  <p className="text-[11px] text-slate-400">
                    अपडेट किया गया: {project.newsDate} | 5 मिनट रीडिंग
                  </p>
                </div>
              </div>

              {/* Social Share bar */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleShareCopy}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center gap-1"
                  title="Share Link"
                >
                  {copiedShare ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span className="text-[11px] font-semibold">{copiedShare ? 'Copied' : 'शेयर करें'}</span>
                </button>
              </div>
            </div>

            {/* Featured Image */}
            <div className="space-y-2">
              <div className="rounded-xl overflow-hidden aspect-video bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 relative">
                <img
                  src={imageSeo?.imageUrl || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1200&h=675&fit=crop'}
                  alt={imageSeo?.altText || headline}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold bg-black/75 text-white backdrop-blur-sm">
                  फोटो: {imageSeo?.imageType || 'न्यूज डेस्क'}
                </span>
              </div>
              {imageSeo?.caption && (
                <p className="text-[11px] text-slate-500 italic px-1">
                  कैप्शन: {imageSeo.caption}
                </p>
              )}
            </div>

            {/* Article Body */}
            {article && (
              <div className="space-y-6 text-slate-800 dark:text-slate-200 leading-relaxed font-sans text-sm md:text-base">
                {/* Intro */}
                <p className="text-base md:text-lg font-medium text-slate-900 dark:text-slate-100 border-l-4 border-red-600 pl-4 py-1 bg-red-50/20 dark:bg-red-950/10">
                  {article.introduction}
                </p>

                {/* Main Details */}
                <div className="space-y-2">
                  <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white pt-2">
                    विस्तृत घटनाक्रम एवं मुख्य बिंदु
                  </h2>
                  <p>{article.mainDetails}</p>
                </div>

                {/* Important Facts Box */}
                {article.importantFacts && article.importantFacts.length > 0 && (
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
                    <h3 className="text-sm font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">
                      मुख्य तथ्य एक नजर में:
                    </h3>
                    <ul className="space-y-1.5 text-xs md:text-sm">
                      {article.importantFacts.map((fact, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-red-500 font-bold">•</span>
                          <span>{fact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Background info */}
                {article.backgroundInfo && (
                  <div className="space-y-2">
                    <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white pt-2">
                      ऐतिहासिक एवं सामाजिक संदर्भ
                    </h2>
                    <p>{article.backgroundInfo}</p>
                  </div>
                )}

                {/* Administrative Directives */}
                {article.adminArrangements && (
                  <div className="space-y-2">
                    <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white pt-2">
                      प्रशासनिक व्यवस्था एवं सुरक्षा निर्देश
                    </h2>
                    <p>{article.adminArrangements}</p>
                  </div>
                )}

                {/* Related developments */}
                {article.relatedDevelopments && (
                  <div className="space-y-2">
                    <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white pt-2">
                      स्थानीय प्रभाव एवं जनप्रतिक्रिया
                    </h3>
                    <p>{article.relatedDevelopments}</p>
                  </div>
                )}

                {/* FAQs */}
                {article.faqs && article.faqs.length > 0 && (
                  <div className="space-y-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      अक्सर पूछे जाने वाले सवाल (FAQ)
                    </h3>
                    <div className="space-y-2 text-xs md:text-sm">
                      {article.faqs.map((faq, i) => (
                        <div key={i} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-1">
                          <p className="font-bold text-slate-900 dark:text-white">
                            प्र: {faq.question}
                          </p>
                          <p className="text-slate-600 dark:text-slate-300">
                            उ: {faq.answer}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Conclusion */}
                {article.conclusion && (
                  <div className="p-4 rounded-xl bg-slate-100/70 dark:bg-slate-800/40 text-xs md:text-sm text-slate-700 dark:text-slate-300 font-medium italic border-l-2 border-slate-400">
                    {article.conclusion}
                  </div>
                )}
              </div>
            )}

            {/* Related Articles Box */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                सम्बंधित खबरें (Related Stories)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors space-y-1">
                  <p className="font-bold text-slate-900 dark:text-white line-clamp-1">
                    वाराणसी में सुरक्षा के पुख्ता इंतजाम, 5000 पुलिसकर्मी तैनात
                  </p>
                  <p className="text-[10px] text-slate-400">2 घंटे पहले • स्थानीय समाचार</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors space-y-1">
                  <p className="font-bold text-slate-900 dark:text-white line-clamp-1">
                    गंगा आरती के लिए घाटों पर विशेष एलइडी स्क्रीन लगाई गईं
                  </p>
                  <p className="text-[10px] text-slate-400">4 घंटे पहले • संस्कृति</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Nav */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={() => onNavigateTab('checklist')}
          className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900"
        >
          ← Back to Publishing Checklist
        </button>
        <button
          onClick={() => onNavigateTab('dashboard')}
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm"
        >
          Return to Dashboard Overview →
        </button>
      </div>
    </div>
  );
}
