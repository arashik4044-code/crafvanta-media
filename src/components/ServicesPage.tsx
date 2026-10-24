import React, { useState } from 'react';
import { motion } from 'motion/react';

import { ServiceItem } from '../types';

interface ServicesPageProps {
  onOpenContact: () => void;
  onOpenServiceDetail?: (serviceId: string) => void;
}

export function ServicesPage({ onOpenContact, onOpenServiceDetail }: ServicesPageProps) {
  const [activeCoreTab, setActiveCoreTab] = useState(0);
  const [activePhase, setActivePhase] = useState(0);
  const [selectedCapabilities, setSelectedCapabilities] = useState<string[]>([
    'Video Reels',
    'Meta Ads',
  ]);

  const coreAdvantages = [
    {
      title: 'Data-Driven Strategy',
      badge: 'STANDARD OF EXCELLENCE',
      description:
        '“Every service we engineer is rooted in strategic vision, robust technical architecture, and a performance-first mindset.”',
      subtext: 'Tailored insights designed to outpace market competitors.',
    },
    {
      title: 'Agile Execution',
      badge: 'RAPID DEPLOYMENT',
      description:
        '“We deploy agile squads to iterate rapidly, test hypotheses in real-time, and ship high-performance campaigns without bottlenecks.”',
      subtext: 'Speed-to-market coupled with uncompromising execution quality.',
    },
    {
      title: 'Quality Assured',
      badge: 'ZERO DEFECT ARCHITECTURE',
      description:
        '“Rigorous testing, continuous monitoring, and automated pipelines ensure 99.9% uptime and bulletproof security across all solutions.”',
      subtext: 'Enterprise-grade reliability for ambitious brands.',
    },
  ];

  const strategicServices = [
    {
      num: '01',
      serviceId: 'video-production',
      category: 'CONTENT CREATION',
      title: 'VIDEO EDITING FOR ADS & REELS',
      desc: 'High-converting short-form video content specifically crafted for Reels, TikTok, and paid ad campaigns.',
      footerQuote: '“Designed to capture attention instantly and turn viewers into buyers.”',
      tags: ['Scroll-stopping visuals', 'Clear storytelling', 'Platform optimized', 'Performance driven'],
    },
    {
      num: '02',
      serviceId: 'social-media',
      category: 'BRAND BUILDING',
      title: 'SOCIAL MEDIA PAGE MANAGEMENT',
      desc: 'Complete end-to-end management to keep your brand consistent, active, and engaging across all channels.',
      footerQuote: '“Building long-term organic trust and meaningful audience connections.”',
      tags: ['Content scheduling', 'Brand consistency', 'Audience engagement', 'Reliable presence'],
    },
    {
      num: '03',
      serviceId: 'digital-marketing',
      category: 'PAID GROWTH',
      title: 'FACEBOOK & INSTAGRAM ADS',
      desc: 'Data-driven paid campaign setup and management optimized for high ROAS and scalable business growth.',
      footerQuote: '“Generating high-quality leads and sales with maximum ad efficiency.”',
      tags: ['Audience targeting', 'Creative optimization', 'Campaign setup', 'ROAS monitoring'],
    },
    {
      num: '04',
      serviceId: 'web-design',
      category: 'DIGITAL ENGINEERING',
      title: 'WEBSITE DESIGN & DEVELOPMENT',
      desc: 'Modern, ultra-responsive, and fast-loading web applications tailored to boost conversion rates.',
      footerQuote: '“Transforming your web presence into a 24/7 client generation engine.”',
      tags: ['Modern UI/UX', 'Mobile responsive', 'Fast performance', 'Conversion focused'],
    },
  ];

  const workflowPhases = [
    {
      phase: 'PHASE 01',
      name: 'Discovery & Analysis',
      subtitle: 'UNDERSTANDING BUSINESS GOALS',
      desc: 'We start by diving deep into your business objectives, target audience, and market gaps to ensure complete strategy alignment.',
      deliverables: ['Business Audit', 'Competitor Research', 'Target Definition'],
    },
    {
      phase: 'PHASE 02',
      name: 'Strategic Planning',
      subtitle: 'PLANNING THE RIGHT DIGITAL APPROACH',
      desc: 'No execution without a precise map. We structure every milestone based on data, project scope, and targeted insights.',
      deliverables: ['Roadmap Blueprint', 'Architecture Plan', 'Growth KPIs'],
    },
    {
      phase: 'PHASE 03',
      name: 'Precision Execution',
      subtitle: 'EXECUTING WITH CREATIVITY & SPEED',
      desc: 'Our creative and engineering team brings the strategy to life through high-converting visuals and modern production code.',
      deliverables: ['UI/UX Production', 'Agile Execution', 'Quality Assurance'],
    },
    {
      phase: 'PHASE 04',
      name: 'Insightful Growth',
      subtitle: 'IMPROVING THROUGH INSIGHTS',
      desc: 'We dont just launch and leave. We continuously analyze real-world metrics to optimize performance and compound overall ROI.',
      deliverables: ['Analytics Tracking', 'Conversion Tuning', 'Continuous Scaling'],
    },
  ];

  const toggleCapability = (cap: string) => {
    if (selectedCapabilities.includes(cap)) {
      setSelectedCapabilities(selectedCapabilities.filter((c) => c !== cap));
    } else {
      setSelectedCapabilities([...selectedCapabilities, cap]);
    }
  };

  return (
    <div className="pt-24 pb-20 bg-white dark:bg-[#040810] text-slate-900 dark:text-white transition-colors">
      {/* 1. Services Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
                <span>✦</span> CORE DIGITAL EXPERTISE
              </div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-950 dark:text-white uppercase leading-none">
                CORE <span className="text-blue-600 dark:text-blue-500">SERVICES</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                At Crafvanta Media, we engineer scalable, high-impact digital solutions designed to drive real market performance.
              </p>
            </motion.div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#strategic-services"
                className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-500/25 flex items-center gap-2 transition-all"
              >
                <span>Explore Services</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
              <button
                onClick={onOpenContact}
                className="px-6 py-3 rounded-full border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-800 dark:text-slate-200 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                Get Custom Quote
              </button>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-slate-200 dark:border-slate-800">
              <div>
                <div className="text-3xl font-black text-slate-950 dark:text-white">99%</div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">CLIENT SATISFACTION</div>
              </div>
              <div>
                <div className="text-3xl font-black text-slate-950 dark:text-white">24/7</div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">DEDICATED SUPPORT</div>
              </div>
            </div>
          </div>

          {/* Right Interactive Advantage Card */}
          <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                ✓
              </div>
              <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-full">
                {coreAdvantages[activeCoreTab].badge}
              </span>
            </div>

            <div className="py-8 min-h-[180px]">
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed italic mb-4">
                {coreAdvantages[activeCoreTab].description}
              </p>
              <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                {coreAdvantages[activeCoreTab].subtext}
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-3">
                SELECT CORE ADVANTAGE
              </span>
              {coreAdvantages.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCoreTab(idx)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                    activeCoreTab === idx
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-400'
                  }`}
                >
                  <span>{item.title}</span>
                  <span className="text-[10px] uppercase opacity-80">
                    {activeCoreTab === idx ? 'ACTIVE' : 'VIEW'}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between text-[11px] font-bold uppercase text-slate-400">
              <span>READY FOR DEPLOYMENT</span>
              <span className="w-5 h-5 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center">↓</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 2. Strategic Services Grid */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        id="strategic-services"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-100 dark:border-slate-800"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-3">
              <span>✦</span> CORE CAPABILITIES
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white uppercase tracking-tight">
              STRATEGIC <span className="text-blue-600 dark:text-blue-500">SERVICES</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm">
            Tailored digital solutions engineered to scale brands, capture high-intent audiences, and optimize business growth.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {strategicServices.map((s, idx) => (
            <div
              key={idx}
              className="bg-slate-50/80 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 flex flex-col justify-between hover:border-blue-500/50 transition-all group shadow-sm hover:shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-200/60 dark:border-blue-800/60">
                    {s.category}
                  </div>
                  <span className="text-2xl font-black text-slate-300 dark:text-slate-700 group-hover:text-blue-600 transition-colors">
                    {s.num}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white mb-3">
                  {s.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  {s.desc}
                </p>

                {/* Check list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                  {s.tags.map((tag, tIdx) => (
                    <div key={tIdx} className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                      <span className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center text-[10px] font-bold">✓</span>
                      <span>{tag}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between flex-wrap gap-4">
                <span className="text-xs italic text-slate-500 dark:text-slate-400">
                  {s.footerQuote}
                </span>
                <button
                  onClick={() => onOpenServiceDetail?.(s.serviceId)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-blue-500/30 text-xs font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
                >
                  <span>Learn more</span>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 3. Methodology & Workflow ("How We Deliver") */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-100 dark:border-slate-800"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-3">
            <span>✦</span> METHODOLOGY & WORKFLOW
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white uppercase tracking-tight">
            HOW WE <span className="text-blue-600 dark:text-blue-500">DELIVER</span>
          </h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            A battle-tested 4-step execution framework engineered to guarantee consistent quality, execution speed, and long-term value.
          </p>
        </motion.div>

        {/* Phase Timeline Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {workflowPhases.map((phase, idx) => (
            <button
              key={idx}
              onClick={() => setActivePhase(idx)}
              className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                activePhase === idx
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xl'
                  : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-blue-400'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                  activePhase === idx ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}>
                  {phase.phase}
                </span>
                <span className="text-xs font-bold">0{idx + 1}</span>
              </div>
              <h4 className="font-bold text-sm">{phase.name}</h4>
            </button>
          ))}
        </div>

        {/* Active Phase Detail Card */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative z-10 grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
                {workflowPhases[activePhase].subtitle}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black">
                {workflowPhases[activePhase].name}
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {workflowPhases[activePhase].desc}
              </p>
            </div>

            <div className="md:col-span-5 bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 block mb-2">
                KEY DELIVERABLES
              </span>
              {workflowPhases[activePhase].deliverables.map((deliv, dIdx) => (
                <div key={dIdx} className="flex items-center gap-3 text-xs font-semibold text-slate-200 bg-slate-900/60 px-4 py-3 rounded-xl border border-slate-700/50">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span>{deliv}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* 4. Tailored For Your Business ("Need a Custom Solution?") */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-100 dark:border-slate-800"
      >
        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-14 grid lg:grid-cols-12 gap-10 items-center shadow-xl">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
              <span>✦</span> TAILORED FOR YOUR BUSINESS
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white uppercase tracking-tight">
              NEED A <span className="text-blue-600 dark:text-blue-500">CUSTOM SOLUTION?</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Every brand has unique goals. Select your core focus areas below or talk directly with us to build a fully custom growth package.
            </p>

            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block">
                CLICK TO SELECT REQUIRED CAPABILITIES:
              </span>
              <div className="flex flex-wrap gap-2.5">
                {['Video Reels', 'Meta Ads', 'Web Design', 'Page Management', 'Full Strategy', 'SEO & Analytics', 'SaaS Development'].map((cap) => {
                  const isSelected = selectedCapabilities.includes(cap);
                  return (
                    <button
                      key={cap}
                      onClick={() => toggleCapability(cap)}
                      className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-md border border-blue-600'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-400'
                      }`}
                    >
                      <span>{isSelected ? '✓' : '+'}</span>
                      <span>{cap}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-md">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">PACKAGE CONFIG</span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                {selectedCapabilities.length} SELECTED
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900 dark:text-white">Explore Structured Packages</span>
                <button onClick={onOpenContact} className="text-xs font-bold text-blue-600 hover:underline">
                  Browse →
                </button>
              </div>
              <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Book Custom Strategy Call</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Talk with our digital growth team</p>
                </div>
                <button
                  onClick={onOpenContact}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  Call →
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 5. Ready to Get Started CTA Banner */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="bg-[#031535] text-white rounded-3xl p-8 sm:p-16 text-center relative overflow-hidden shadow-2xl border border-blue-900/60">
          <div className="absolute inset-0 bg-radial from-blue-600/20 to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/50 border border-blue-700/60 text-blue-300 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              ACCEPTING NEW PROJECTS · RESPONSE TIME &lt; 15 MINS
            </div>

            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              READY TO <span className="text-blue-400">GET STARTED?</span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Partner with Crafvanta Media to transform your vision into measurable growth, scroll-stopping creative, and high-converting results.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={onOpenContact}
                className="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-500/25 flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>Book Strategy Call</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
              <button
                onClick={onOpenContact}
                className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                Direct Inquiry
              </button>
            </div>

            <p className="text-[11px] text-slate-400 tracking-wider uppercase pt-2">
              No commitment required · Free project estimation
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-blue-900/60 text-xs text-slate-300 font-semibold">
              <div className="flex items-center justify-center gap-2">
                <span>✓</span> Custom Strategy Map
              </div>
              <div className="flex items-center justify-center gap-2">
                <span>✓</span> Rapid Execution Speed
              </div>
              <div className="flex items-center justify-center gap-2">
                <span>✓</span> No Hidden Charges
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
