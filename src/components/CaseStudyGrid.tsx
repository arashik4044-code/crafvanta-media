import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  X, 
  Sparkles, 
  Clock, 
  ArrowUpRight, 
  Layers, 
  BarChart3, 
  Quote, 
  ExternalLink,
  ShieldCheck,
  Zap,
  ArrowRightLeft
} from 'lucide-react';
import { CaseStudyItem, BeforeAfterMetric } from '../types';
import { BlurImage } from './BlurImage';

interface CaseStudyGridProps {
  caseStudies: CaseStudyItem[];
  onSelectServiceForContact?: (serviceName: string) => void;
}

export const CaseStudyGrid: React.FC<CaseStudyGridProps> = ({ 
  caseStudies,
  onSelectServiceForContact 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalStudy, setActiveModalStudy] = useState<CaseStudyItem | null>(null);
  const [comparisonMode, setComparisonMode] = useState<'cards' | 'bars'>('cards');

  const categories = ['All', 'Software & ERP', 'eCommerce & Web', 'Performance Marketing', 'Mobile & SaaS'];

  const filteredStudies = selectedCategory === 'All' 
    ? caseStudies 
    : caseStudies.filter(item => item.category === selectedCategory);

  const handleOpenModal = (study: CaseStudyItem) => {
    setActiveModalStudy(study);
  };

  const handleCloseModal = () => {
    setActiveModalStudy(null);
  };

  const handleContactAction = (study: CaseStudyItem) => {
    handleCloseModal();
    if (onSelectServiceForContact) {
      onSelectServiceForContact(study.category);
    }
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="casestudies" className="py-20 md:py-28 bg-white dark:bg-[#030712] relative overflow-hidden transition-colors border-b border-slate-100 dark:border-slate-800/80">
      {/* Ambient background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-teal-500/5 dark:bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400 text-xs font-bold tracking-wider uppercase mb-3 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Proven Results & Case Studies</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
              Engineering Tangible <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 dark:from-emerald-400 dark:via-teal-300 dark:to-emerald-300">
                Business Growth.
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Explore documented engineering and marketing case studies with verified before-and-after performance metrics, showing how our custom systems drive measurable revenue and efficiency.
            </p>
          </div>

          {/* Quick Metrics Badge Ribbon */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs self-start md:self-end shadow-xs">
            <span className="text-slate-500 dark:text-slate-400 px-2 font-medium">Metric View:</span>
            <button
              onClick={() => setComparisonMode('cards')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                comparisonMode === 'cards'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Side-by-Side
            </button>
            <button
              onClick={() => setComparisonMode('bars')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                comparisonMode === 'bars'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Progress Bars
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => {
            const count = cat === 'All' 
              ? caseStudies.length 
              : caseStudies.filter(c => c.category === cat).length;
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 border ${
                  isActive
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20 ring-2 ring-emerald-500/20'
                    : 'bg-white dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 border-slate-200/90 dark:border-slate-800 hover:border-emerald-500/50 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <span>{cat}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                  isActive 
                    ? 'bg-white/25 text-white' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Case Studies Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <AnimatePresence>
            {filteredStudies.map((study, idx) => (
              <motion.article
                layout
                key={study.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group relative bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xs hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Media & Client Banner */}
                  <div className="relative h-64 sm:h-72 overflow-hidden border-b border-slate-100 dark:border-slate-800/80 bg-slate-950">
                    <BlurImage
                      src={study.imageUrl}
                      alt={study.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />

                    {/* Top Floating Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-slate-950/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30 shadow-xs">
                        {study.category}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-slate-950/80 backdrop-blur-md text-slate-300 border border-slate-700/60">
                        <Clock className="w-3 h-3 text-emerald-400" />
                        <span>{study.timeline}</span>
                      </span>
                    </div>

                    {/* Bottom Media Title Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 z-10">
                      <div className="text-emerald-400 text-xs font-bold tracking-wider uppercase font-mono mb-1">
                        {study.client} {study.clientSub ? `· ${study.clientSub}` : ''}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-white leading-snug drop-shadow-sm">
                        {study.title}
                      </h3>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 sm:p-7">
                    
                    {/* Key Outcome Highlight Banner */}
                    <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/5 border border-emerald-500/30 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/30">
                          <TrendingUp className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                            Headline Impact
                          </div>
                          <div className="text-lg sm:text-xl font-black text-slate-950 dark:text-white tracking-tight">
                            {study.keyOutcomeHighlight}
                          </div>
                        </div>
                      </div>
                      <div className="text-right hidden sm:block">
                        <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                          {study.keyOutcomeSubtitle}
                        </span>
                      </div>
                    </div>

                    {/* Summary Paragraph */}
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                      {study.summary}
                    </p>

                    {/* DEDICATED 'BEFORE VS AFTER' METRICS SECTION */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3.5">
                        <div className="flex items-center gap-2">
                          <BarChart3 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 font-mono">
                            Before vs After Performance
                          </h4>
                        </div>
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200/60 dark:border-emerald-800/60">
                          Verified Metric Shift
                        </span>
                      </div>

                      {/* Display Mode: Cards vs Bars */}
                      {comparisonMode === 'cards' ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {study.beforeAfterMetrics.map((metric, mIdx) => (
                            <div 
                              key={mIdx}
                              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between hover:border-emerald-500/40 transition-colors"
                            >
                              <div className="flex items-start justify-between gap-1 mb-2">
                                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 leading-tight">
                                  {metric.metricName}
                                </span>
                                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 shrink-0 font-mono">
                                  {metric.improvement}
                                </span>
                              </div>

                              <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-800/80 mt-auto">
                                <div>
                                  <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                                    Before
                                  </span>
                                  <span className="text-xs font-bold text-rose-500/90 dark:text-rose-400/90 line-through decoration-rose-500/60">
                                    {metric.before}
                                  </span>
                                </div>
                                <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0 mx-1" />
                                <div className="text-right">
                                  <span className="block text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                                    After
                                  </span>
                                  <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 font-mono">
                                    {metric.after}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {study.beforeAfterMetrics.map((metric, mIdx) => (
                            <div 
                              key={mIdx}
                              className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800"
                            >
                              <div className="flex items-center justify-between text-xs mb-1.5">
                                <span className="font-bold text-slate-800 dark:text-slate-200 text-[11px]">
                                  {metric.metricName}
                                </span>
                                <span className="text-emerald-600 dark:text-emerald-400 font-extrabold text-[11px] font-mono">
                                  {metric.improvement}
                                </span>
                              </div>
                              {/* Comparative Progress Bar */}
                              <div className="space-y-1">
                                <div className="flex items-center gap-2 text-[10px]">
                                  <span className="w-12 text-slate-400 font-mono">Before:</span>
                                  <div className="flex-1 h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                                    <div className="h-full bg-slate-400 dark:bg-slate-600 rounded-full w-2/5" />
                                  </div>
                                  <span className="w-16 text-right font-semibold text-slate-500 dark:text-slate-400 font-mono">
                                    {metric.before}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-[10px]">
                                  <span className="w-12 text-emerald-600 dark:text-emerald-400 font-bold font-mono">After:</span>
                                  <div className="flex-1 h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full w-full" />
                                  </div>
                                  <span className="w-16 text-right font-black text-emerald-600 dark:text-emerald-400 font-mono">
                                    {metric.after}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-6">
                      {study.tags.map((tag, tIdx) => (
                        <span 
                          key={tIdx}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-medium font-mono"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Client Quote Preview */}
                    {study.clientQuote && (
                      <div className="p-3.5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 flex items-start gap-3 mb-6">
                        <Quote className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <div className="text-xs text-slate-700 dark:text-slate-300 italic leading-relaxed">
                          "{study.clientQuote.text}"
                          <span className="block not-italic font-bold text-[10px] text-emerald-700 dark:text-emerald-400 mt-1">
                            — {study.clientQuote.author}, {study.clientQuote.role}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer with Actions */}
                <div className="px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3">
                  <button
                    onClick={() => handleOpenModal(study)}
                    className="inline-flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer py-1.5"
                  >
                    <span>View Full Case Study</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleContactAction(study)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs hover:shadow-md hover:shadow-emerald-600/20 transition-all cursor-pointer"
                  >
                    <span>Get Similar Results</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Callout Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 border border-emerald-900/40 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-emerald-500/20 to-transparent pointer-events-none" />
          <div className="relative z-10 max-w-xl text-center md:text-left">
            <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-400 font-mono">
              Ready for measurable transformation?
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight mt-1">
              Let's engineer your next success story.
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              Whether you need an automated cloud ERP system, a high-converting web storefront, or scaled performance ad campaigns, we deliver verified return on investment.
            </p>
          </div>
          <div className="relative z-10 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="px-6 py-3 rounded-full text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              Start Free Discovery Call
            </a>
            <a
              href="#services"
              className="px-5 py-3 rounded-full text-xs font-bold border border-slate-700 hover:border-slate-500 bg-slate-900/80 text-white transition-colors cursor-pointer"
            >
              Browse All Services
            </a>
          </div>
        </div>

      </div>

      {/* DETAIL MODAL DEEP DIVE */}
      <AnimatePresence>
        {activeModalStudy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between gap-4 bg-slate-50 dark:bg-slate-950/40">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      {activeModalStudy.category}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Timeline: {activeModalStudy.timeline}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white">
                    {activeModalStudy.title}
                  </h3>
                  <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-1 font-mono">
                    Client: {activeModalStudy.client} {activeModalStudy.clientSub ? `(${activeModalStudy.clientSub})` : ''}
                  </div>
                </div>

                <button
                  onClick={handleCloseModal}
                  aria-label="Close modal"
                  className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content Scroll Area */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
                
                {/* Visual Cover Banner with Key Outcome */}
                <div className="relative rounded-2xl overflow-hidden aspect-21/9 border border-slate-200 dark:border-slate-800 bg-slate-950">
                  <BlurImage
                    src={activeModalStudy.imageUrl}
                    alt={activeModalStudy.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 font-mono">
                        Primary Accomplishment
                      </span>
                      <div className="text-2xl sm:text-3xl font-black text-white">
                        {activeModalStudy.keyOutcomeHighlight}
                      </div>
                      <div className="text-xs text-slate-300">
                        {activeModalStudy.keyOutcomeSubtitle}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Challenge vs Solution Breakdown Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Challenge */}
                  <div className="p-5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40">
                    <div className="flex items-center gap-2 mb-2 text-rose-600 dark:text-rose-400 font-bold text-xs uppercase tracking-wider font-mono">
                      <span>The Challenge</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {activeModalStudy.challenge}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40">
                    <div className="flex items-center gap-2 mb-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider font-mono">
                      <Zap className="w-4 h-4" />
                      <span>Crafvanta Engineering Solution</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {activeModalStudy.solution}
                    </p>
                  </div>
                </div>

                {/* Comprehensive Before vs After Metric Matrix */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-black text-slate-950 dark:text-white uppercase tracking-wider font-mono flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      Detailed Before vs After Comparison Matrix
                    </h4>
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                      Audit Verified
                    </span>
                  </div>

                  <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
                    {activeModalStudy.beforeAfterMetrics.map((m, idx) => (
                      <div 
                        key={idx}
                        className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900/80 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                      >
                        <div className="max-w-xs">
                          <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                            {m.metricName}
                          </div>
                          {m.unitOrContext && (
                            <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                              {m.unitOrContext}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-4 sm:gap-6 self-start sm:self-auto">
                          {/* Before value */}
                          <div className="text-left sm:text-right">
                            <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                              Before
                            </span>
                            <span className="text-xs sm:text-sm font-semibold text-rose-500/90 dark:text-rose-400 line-through">
                              {m.before}
                            </span>
                          </div>

                          <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0" />

                          {/* After value */}
                          <div className="text-left sm:text-right">
                            <span className="block text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                              After Crafvanta
                            </span>
                            <span className="text-sm sm:text-base font-black text-emerald-600 dark:text-emerald-400 font-mono">
                              {m.after}
                            </span>
                          </div>

                          {/* Delta Badge */}
                          <div className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-black font-mono whitespace-nowrap">
                            {m.improvement}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Deployed */}
                <div>
                  <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono mb-3">
                    Technologies & Architecture Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeModalStudy.tags.map((t, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium font-mono"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Testimonial Quote */}
                {activeModalStudy.clientQuote && (
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50/70 to-teal-50/50 dark:from-emerald-950/30 dark:to-slate-900 border border-emerald-200/80 dark:border-emerald-900/50">
                    <Quote className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mb-2" />
                    <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 italic leading-relaxed">
                      "{activeModalStudy.clientQuote.text}"
                    </p>
                    <div className="mt-3 pt-3 border-t border-emerald-200/60 dark:border-emerald-800/60">
                      <div className="text-xs font-bold text-slate-950 dark:text-white">
                        {activeModalStudy.clientQuote.author}
                      </div>
                      <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono">
                        {activeModalStudy.clientQuote.role}
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Modal Sticky Footer CTA */}
              <div className="p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
                  Want similar business performance and architecture?
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={handleCloseModal}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-full text-xs font-bold border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => handleContactAction(activeModalStudy)}
                    className="flex-1 sm:flex-none px-6 py-2.5 rounded-full text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/25 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Request Similar Project</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
