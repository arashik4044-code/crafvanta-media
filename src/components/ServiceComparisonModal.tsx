import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ServiceItem } from '../types';
import { 
  ArrowLeftRight, 
  Check, 
  X, 
  Sparkles, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle,
  Hash,
  FileText
} from 'lucide-react';

interface ServiceComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  allServices: ServiceItem[];
  initialServiceA?: ServiceItem | null;
  initialServiceB?: ServiceItem | null;
  onSelectServiceDetail?: (service: ServiceItem) => void;
  onInquireService?: (serviceTitle: string) => void;
}

export function ServiceComparisonModal({
  isOpen,
  onClose,
  allServices,
  initialServiceA,
  initialServiceB,
  onSelectServiceDetail,
  onInquireService,
}: ServiceComparisonModalProps) {
  const activeServices = allServices.filter((s) => s.active);

  const [serviceAId, setServiceAId] = useState<string>(
    initialServiceA?.id || activeServices[0]?.id || ''
  );
  const [serviceBId, setServiceBId] = useState<string>(
    initialServiceB?.id || activeServices[1]?.id || activeServices[0]?.id || ''
  );

  // Sync state if initial props change
  useEffect(() => {
    if (initialServiceA) setServiceAId(initialServiceA.id);
  }, [initialServiceA]);

  useEffect(() => {
    if (initialServiceB) {
      setServiceBId(initialServiceB.id);
    } else if (initialServiceA && activeServices.length > 1) {
      // Pick a smart different default
      const alternate = activeServices.find((s) => s.id !== initialServiceA.id);
      if (alternate) setServiceBId(alternate.id);
    }
  }, [initialServiceB, initialServiceA]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const serviceA = activeServices.find((s) => s.id === serviceAId) || activeServices[0];
  const serviceB = activeServices.find((s) => s.id === serviceBId) || activeServices[1] || activeServices[0];

  const handleSwap = () => {
    const temp = serviceAId;
    setServiceAId(serviceBId);
    setServiceBId(temp);
  };

  // Tag analysis
  const tagsA = serviceA ? serviceA.tags : [];
  const tagsB = serviceB ? serviceB.tags : [];
  
  const commonTags = tagsA.filter((t) => 
    tagsB.some((b) => b.toLowerCase() === t.toLowerCase())
  );
  const uniqueTagsA = tagsA.filter((t) => 
    !tagsB.some((b) => b.toLowerCase() === t.toLowerCase())
  );
  const uniqueTagsB = tagsB.filter((t) => 
    !tagsA.some((a) => a.toLowerCase() === t.toLowerCase())
  );

  // Quick audience / deliverable heuristics
  const getServicePersona = (service: ServiceItem) => {
    const cat = service.category.toLowerCase();
    if (cat.includes('eng') || cat.includes('soft') || service.id.includes('web')) {
      return {
        bestFor: 'High-growth startups & businesses needing digital infrastructure',
        outcome: 'High conversion rate, scalable speed, and seamless multi-device experience',
        pace: 'Agile 2-4 week sprint deployment'
      };
    }
    if (cat.includes('growth') || cat.includes('market') || service.id.includes('market')) {
      return {
        bestFor: 'E-commerce & B2B brands looking for immediate sales & leads',
        outcome: 'Optimized ROAS, profitable customer acquisition, and search dominance',
        pace: 'Weekly sprint optimization & daily monitoring'
      };
    }
    if (cat.includes('social') || service.id.includes('social')) {
      return {
        bestFor: 'Brands wanting consistent organic reach and audience loyalty',
        outcome: 'High engagement rates, branded aesthetic, and active community trust',
        pace: 'Monthly continuous retainers'
      };
    }
    if (cat.includes('media') || cat.includes('video') || service.id.includes('video')) {
      return {
        bestFor: 'Content creators, direct-to-consumer stores, and marketing teams',
        outcome: 'High retention scroll-stopping reels, commercials, and visual assets',
        pace: 'Batch production with rapid turnaround'
      };
    }
    return {
      bestFor: 'Modern enterprises modernizing their tech and brand presence',
      outcome: 'Systemized efficiency, modern aesthetics, and measurable return',
      pace: 'Structured iterative delivery'
    };
  };

  const personaA = serviceA ? getServicePersona(serviceA) : null;
  const personaB = serviceB ? getServicePersona(serviceB) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-5xl shadow-2xl relative my-auto max-h-[92vh] flex flex-col overflow-hidden text-slate-900 dark:text-white"
      >
        {/* Modal Top Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center shadow-xs">
              <ArrowLeftRight className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Side-by-Side Analysis
                </span>
                <span className="text-xs text-slate-400">·</span>
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  Compare Tags & Descriptions
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white">
                Compare Agency Services
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Comparison"
            className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Service Selectors Row */}
        <div className="p-4 sm:p-5 bg-emerald-500/5 border-b border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          {/* Service A Selector */}
          <div className="w-full sm:w-1/2 flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 shrink-0 w-16">
              Service A:
            </span>
            <select
              value={serviceAId}
              onChange={(e) => setServiceAId(e.target.value)}
              className="w-full text-xs sm:text-sm font-semibold rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs cursor-pointer"
            >
              {activeServices.map((s) => (
                <option key={s.id} value={s.id} disabled={s.id === serviceBId}>
                  {s.title} ({s.category})
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <button
            onClick={handleSwap}
            title="Swap Services"
            className="p-2 rounded-xl bg-slate-200/70 dark:bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-600 dark:text-slate-300 transition-all shrink-0 cursor-pointer shadow-xs"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </button>

          {/* Service B Selector */}
          <div className="w-full sm:w-1/2 flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 shrink-0 w-16">
              Service B:
            </span>
            <select
              value={serviceBId}
              onChange={(e) => setServiceBId(e.target.value)}
              className="w-full text-xs sm:text-sm font-semibold rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs cursor-pointer"
            >
              {activeServices.map((s) => (
                <option key={s.id} value={s.id} disabled={s.id === serviceAId}>
                  {s.title} ({s.category})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-8">
          
          {/* 1. Side-by-Side Hero Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Service A Card */}
            <div className="bg-slate-50 dark:bg-slate-800/40 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col justify-between">
              {serviceA.imageUrl && (
                <div className="relative h-40 w-full overflow-hidden bg-slate-900">
                  <img
                    src={serviceA.imageUrl}
                    alt={serviceA.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />
                  <div className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs">
                    {serviceA.category}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[11px] font-mono text-emerald-300 block">
                      {serviceA.badge}
                    </span>
                    <h3 className="text-lg font-bold">{serviceA.title}</h3>
                  </div>
                </div>
              )}
              {!serviceA.imageUrl && (
                <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    {serviceA.category}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{serviceA.title}</h3>
                </div>
              )}
            </div>

            {/* Service B Card */}
            <div className="bg-slate-50 dark:bg-slate-800/40 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col justify-between">
              {serviceB.imageUrl && (
                <div className="relative h-40 w-full overflow-hidden bg-slate-900">
                  <img
                    src={serviceB.imageUrl}
                    alt={serviceB.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />
                  <div className="absolute top-3 left-3 bg-teal-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs">
                    {serviceB.category}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[11px] font-mono text-teal-300 block">
                      {serviceB.badge}
                    </span>
                    <h3 className="text-lg font-bold">{serviceB.title}</h3>
                  </div>
                </div>
              )}
              {!serviceB.imageUrl && (
                <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                    {serviceB.category}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{serviceB.title}</h3>
                </div>
              )}
            </div>
          </div>

          {/* 2. Side-by-Side Detailed Descriptions Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Description Breakdown
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Service A Description */}
              <div className="p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/50 border border-emerald-500/20 dark:border-emerald-500/20">
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    {serviceA.title}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {serviceA.description.split(' ').length} words
                  </span>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                  {serviceA.description}
                </p>
                <div className="mt-4 pt-3 border-t border-slate-200/40 dark:border-slate-700/40 flex items-center gap-2 text-xs text-slate-500">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Badge Promise: <strong className="text-slate-800 dark:text-slate-200">{serviceA.badge}</strong></span>
                </div>
              </div>

              {/* Service B Description */}
              <div className="p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/50 border border-teal-500/20 dark:border-teal-500/20">
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-xs font-bold text-teal-600 dark:text-teal-400">
                    {serviceB.title}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {serviceB.description.split(' ').length} words
                  </span>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                  {serviceB.description}
                </p>
                <div className="mt-4 pt-3 border-t border-slate-200/40 dark:border-slate-700/40 flex items-center gap-2 text-xs text-slate-500">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-500" />
                  <span>Badge Promise: <strong className="text-slate-800 dark:text-slate-200">{serviceB.badge}</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Side-by-Side Tags Breakdown (Core Feature Highlight) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Hash className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Tags & Capabilities Breakdown
                </h4>
              </div>
              <div className="text-[11px] font-medium text-slate-500">
                {commonTags.length > 0 ? (
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    {commonTags.length} Shared Tag{commonTags.length > 1 ? 's' : ''}
                  </span>
                ) : (
                  <span>No overlapping tags (Distinct capabilities)</span>
                )}
              </div>
            </div>

            {/* Tag Comparison Matrix: Shared vs Distinct */}
            {commonTags.length > 0 && (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 mr-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Shared Capabilities:</span>
                </div>
                {commonTags.map((tag, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 shadow-2xs"
                  >
                    <Check className="w-3 h-3 text-emerald-500" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Side-by-Side Tag Lists */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Service A Tags */}
              <div className="p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {serviceA.title} Tags ({serviceA.tags.length})
                  </span>
                  <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                    Slot A
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {serviceA.tags.map((tag, idx) => {
                    const isShared = commonTags.some((c) => c.toLowerCase() === tag.toLowerCase());
                    return (
                      <div
                        key={idx}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                          isShared
                            ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-200 border border-emerald-400/50'
                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-2xs'
                        }`}
                      >
                        <span className="text-emerald-500 font-mono text-[11px]">#</span>
                        <span>{tag}</span>
                        {isShared && (
                          <span className="text-[9px] bg-emerald-600 text-white font-bold px-1.5 py-0.2 rounded-full ml-1">
                            Shared
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {uniqueTagsA.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800 text-xs text-slate-500">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Unique to this service:</span>{' '}
                    {uniqueTagsA.join(', ')}
                  </div>
                )}
              </div>

              {/* Service B Tags */}
              <div className="p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {serviceB.title} Tags ({serviceB.tags.length})
                  </span>
                  <span className="text-[10px] uppercase font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded-md border border-teal-200 dark:border-teal-800">
                    Slot B
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {serviceB.tags.map((tag, idx) => {
                    const isShared = commonTags.some((c) => c.toLowerCase() === tag.toLowerCase());
                    return (
                      <div
                        key={idx}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                          isShared
                            ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-200 border border-emerald-400/50'
                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-2xs'
                        }`}
                      >
                        <span className="text-teal-500 font-mono text-[11px]">#</span>
                        <span>{tag}</span>
                        {isShared && (
                          <span className="text-[9px] bg-emerald-600 text-white font-bold px-1.5 py-0.2 rounded-full ml-1">
                            Shared
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {uniqueTagsB.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800 text-xs text-slate-500">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Unique to this service:</span>{' '}
                    {uniqueTagsB.join(', ')}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 4. Strategic Alignment & Deliverables Matrix */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Strategic Alignment & Outcomes
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Persona A */}
              {personaA && (
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 space-y-3 text-xs">
                  <div>
                    <span className="text-slate-400 font-semibold block text-[11px]">Best Suited For</span>
                    <p className="font-semibold text-slate-900 dark:text-white mt-0.5">{personaA.bestFor}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block text-[11px]">Expected Primary Outcome</span>
                    <p className="text-slate-700 dark:text-slate-300 mt-0.5">{personaA.outcome}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block text-[11px]">Execution Velocity</span>
                    <p className="text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">{personaA.pace}</p>
                  </div>
                </div>
              )}

              {/* Persona B */}
              {personaB && (
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 space-y-3 text-xs">
                  <div>
                    <span className="text-slate-400 font-semibold block text-[11px]">Best Suited For</span>
                    <p className="font-semibold text-slate-900 dark:text-white mt-0.5">{personaB.bestFor}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block text-[11px]">Expected Primary Outcome</span>
                    <p className="text-slate-700 dark:text-slate-300 mt-0.5">{personaB.outcome}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block text-[11px]">Execution Velocity</span>
                    <p className="text-teal-600 dark:text-teal-400 font-bold mt-0.5">{personaB.pace}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 5. Direct Action CTA Row */}
          <div className="pt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Action A */}
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <button
                  onClick={() => {
                    onClose();
                    onInquireService?.(serviceA.title);
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <span>Inquire About {serviceA.title.split(' ')[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                {onSelectServiceDetail && (
                  <button
                    onClick={() => {
                      onClose();
                      onSelectServiceDetail(serviceA);
                    }}
                    className="w-full sm:w-auto py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all cursor-pointer whitespace-nowrap"
                  >
                    View Details
                  </button>
                )}
              </div>

              {/* Action B */}
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <button
                  onClick={() => {
                    onClose();
                    onInquireService?.(serviceB.title);
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <span>Inquire About {serviceB.title.split(' ')[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                {onSelectServiceDetail && (
                  <button
                    onClick={() => {
                      onClose();
                      onSelectServiceDetail(serviceB);
                    }}
                    className="w-full sm:w-auto py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all cursor-pointer whitespace-nowrap"
                  >
                    View Details
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Modal Bottom Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60 flex items-center justify-between shrink-0">
          <div className="text-[11px] text-slate-500">
            Tip: You can change the services at any time using the dropdowns above.
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors cursor-pointer"
          >
            Done Comparing
          </button>
        </div>
      </motion.div>
    </div>
  );
}
