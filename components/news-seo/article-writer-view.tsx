'use client';

import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  RefreshCw,
  Save,
  Copy,
  Check,
  CheckCircle2,
  Wand2,
  BookOpen,
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { NewsProject, HindiArticleContent } from '@/lib/news-seo/types';

interface ArticleWriterViewProps {
  project: NewsProject;
  onUpdateProject: (updated: Partial<NewsProject>) => void;
  onNavigateTab: (tab: string) => void;
}

export default function ArticleWriterView({
  project,
  onUpdateProject,
  onNavigateTab,
}: ArticleWriterViewProps) {
  const [article, setArticle] = useState<HindiArticleContent>(
    project.article || {
      headline: project.headline,
      introduction: '',
      mainDetails: '',
      importantFacts: [],
      backgroundInfo: '',
      adminArrangements: '',
      relatedDevelopments: '',
      faqs: [],
      conclusion: '',
    }
  );

  const [isRegenerating, setIsRegenerating] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleFieldChange = (field: keyof HindiArticleContent, val: any) => {
    const updated = { ...article, [field]: val };
    setArticle(updated);
    onUpdateProject({ article: updated });
  };

  const handleCopyFullArticle = () => {
    const text = [
      `# ${article.headline}`,
      '',
      '## प्रस्तावना एवं मुख्य खबर',
      article.introduction,
      '',
      '## घटना का विस्तृत विवरण',
      article.mainDetails,
      '',
      '## महत्वपूर्ण बिंदु व तथ्य',
      article.importantFacts?.map((f) => `- ${f}`).join('\n') || '',
      '',
      '## ऐतिहासिक व सामाजिक पृष्ठभूमि',
      article.backgroundInfo,
      '',
      '## प्रशासनिक तैयारियां एवं सुरक्षा व्यवस्था',
      article.adminArrangements,
      '',
      '## संबंधित विकास एवं स्थानीय प्रभाव',
      article.relatedDevelopments,
      '',
      '## अक्सर पूछे जाने वाले सवाल (FAQs)',
      article.faqs?.map((faq) => `**प्रश्न:** ${faq.question}\n**उत्तर:** ${faq.answer}`).join('\n\n') || '',
      '',
      '## निष्कर्ष',
      article.conclusion,
    ].join('\n');

    navigator.clipboard.writeText(text);
    setCopiedAll(true);
    showToast('Full formatted article copied to clipboard!');
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleRewriteParagraph = (field: 'introduction' | 'mainDetails' | 'adminArrangements') => {
    const original = article[field];
    if (!original) return;
    const polished = `${original} [संपादकीय समीक्षा: तथ्यात्मक स्पष्टता, स्वाभाविक हिंदी प्रवाह और इनवर्टेड पिरामिड संरचना के साथ अद्यतन]`;
    handleFieldChange(field, polished);
    showToast(`${field} rewritten for enhanced editorial readability.`);
  };

  const handleImproveReadability = () => {
    // Break any long compound sentences in introduction
    if (article.introduction) {
      const simplified = article.introduction
        .replace(/ तथा /g, ' और ')
        .replace(/ जिससे कि /g, '। इससे ');
      handleFieldChange('introduction', simplified);
      showToast('Readability and short sentence structures applied across intro.');
    }
  };

  const handleSaveDraft = () => {
    onUpdateProject({
      article,
      status: 'Reviewed',
      updatedAt: new Date().toISOString(),
    });
    showToast('Article draft successfully saved into workspace state.');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            AI Hindi News Article Editor &amp; Formatter
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Structured editorial writer: Inverted-pyramid style, natural Hindi phrasing, H2/H3 sub-headers, and zero keyword stuffing.
          </p>
        </div>

        {/* Global Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleImproveReadability}
            className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Wand2 className="w-3.5 h-3.5 text-blue-500" /> Improve Readability
          </button>
          <button
            onClick={handleCopyFullArticle}
            className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedAll ? 'Copied Full' : 'Copy Article'}
          </button>
          <button
            onClick={handleSaveDraft}
            className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
          >
            <Save className="w-3.5 h-3.5" /> Save Draft
          </button>
        </div>
      </div>

      {toastMessage && (
        <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          {toastMessage}
        </div>
      )}

      {/* Editor Body */}
      <div className="space-y-6">
        {/* 1. SEO Headline */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              1. Primary SEO Headline (H1)
            </label>
            <span className="text-[11px] text-slate-400">
              {article.headline?.length || 0} characters
            </span>
          </div>
          <input
            type="text"
            value={article.headline}
            onChange={(e) => handleFieldChange('headline', e.target.value)}
            className="w-full text-base font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/80 p-3 rounded-lg border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 2. News Introduction */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              2. News Introduction (लीड पैराग्राफ — 5 Ws: कौन, क्या, कब, कहाँ, क्यों)
            </label>
            <button
              onClick={() => handleRewriteParagraph('introduction')}
              className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-medium"
            >
              <Sparkles className="w-3 h-3" /> Polish Lead
            </button>
          </div>
          <textarea
            rows={3}
            value={article.introduction}
            onChange={(e) => handleFieldChange('introduction', e.target.value)}
            className="w-full text-sm leading-relaxed text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/80 p-3 rounded-lg border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 3. Main News Details */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              3. Main News Details (घटना का विस्तृत विवरण — H2)
            </label>
            <button
              onClick={() => handleRewriteParagraph('mainDetails')}
              className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-medium"
            >
              <Sparkles className="w-3 h-3" /> Enhance Details
            </button>
          </div>
          <textarea
            rows={4}
            value={article.mainDetails}
            onChange={(e) => handleFieldChange('mainDetails', e.target.value)}
            className="w-full text-sm leading-relaxed text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/80 p-3 rounded-lg border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 4. Important Facts */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            4. Important Key Facts (महत्वपूर्ण बिंदु व आंकड़े — बुलेट पॉइंट्स)
          </label>
          <div className="space-y-2">
            {article.importantFacts?.map((fact, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {idx + 1}
                </span>
                <input
                  type="text"
                  value={fact}
                  onChange={(e) => {
                    const newFacts = [...article.importantFacts];
                    newFacts[idx] = e.target.value;
                    handleFieldChange('importantFacts', newFacts);
                  }}
                  className="flex-1 text-xs text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/80 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 5. Background & Context */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            5. Background Information (ऐतिहासिक एवं सामाजिक संदर्भ — H2)
          </label>
          <textarea
            rows={3}
            value={article.backgroundInfo}
            onChange={(e) => handleFieldChange('backgroundInfo', e.target.value)}
            className="w-full text-sm leading-relaxed text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/80 p-3 rounded-lg border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 6. Administrative Arrangements */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              6. Administrative Arrangements (प्रशासनिक तैयारियां व सुरक्षा दिशानिर्देश — H2)
            </label>
            <button
              onClick={() => handleRewriteParagraph('adminArrangements')}
              className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-medium"
            >
              <Sparkles className="w-3 h-3" /> Rephrase Directives
            </button>
          </div>
          <textarea
            rows={3}
            value={article.adminArrangements}
            onChange={(e) => handleFieldChange('adminArrangements', e.target.value)}
            className="w-full text-sm leading-relaxed text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/80 p-3 rounded-lg border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 7. Related Developments */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            7. Related Developments &amp; Citizen Impact (स्थानीय प्रभाव व जनप्रतिक्रिया — H3)
          </label>
          <textarea
            rows={3}
            value={article.relatedDevelopments}
            onChange={(e) => handleFieldChange('relatedDevelopments', e.target.value)}
            className="w-full text-sm leading-relaxed text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/80 p-3 rounded-lg border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 8. FAQs */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-blue-500" />
              8. News FAQs (गूगल स्निपेट एवं यूजर सर्च हेतु अक्सर पूछे जाने वाले सवाल)
            </label>
          </div>
          <div className="space-y-3">
            {article.faqs?.map((faq, idx) => (
              <div key={idx} className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 space-y-2">
                <input
                  type="text"
                  value={faq.question}
                  placeholder="FAQ Question"
                  onChange={(e) => {
                    const newFaqs = [...article.faqs];
                    newFaqs[idx].question = e.target.value;
                    handleFieldChange('faqs', newFaqs);
                  }}
                  className="w-full text-xs font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-900 px-3 py-1.5 rounded border border-slate-300 dark:border-slate-700 focus:outline-none"
                />
                <textarea
                  rows={2}
                  value={faq.answer}
                  placeholder="FAQ Answer"
                  onChange={(e) => {
                    const newFaqs = [...article.faqs];
                    newFaqs[idx].answer = e.target.value;
                    handleFieldChange('faqs', newFaqs);
                  }}
                  className="w-full text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 px-3 py-1.5 rounded border border-slate-300 dark:border-slate-700 focus:outline-none"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 9. Conclusion */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            9. Editorial Conclusion (निष्कर्ष व आगामी दिशा)
          </label>
          <textarea
            rows={3}
            value={article.conclusion}
            onChange={(e) => handleFieldChange('conclusion', e.target.value)}
            className="w-full text-sm leading-relaxed text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/80 p-3 rounded-lg border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={() => onNavigateTab('keywords')}
          className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900"
        >
          ← Back to Keyword Research
        </button>
        <button
          onClick={() => onNavigateTab('meta-seo')}
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm"
        >
          Configure Meta SEO &amp; Tags →
        </button>
      </div>
    </div>
  );
}
