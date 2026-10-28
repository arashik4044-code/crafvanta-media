import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight, ShieldCheck, MessageSquare, RefreshCw, Award, HelpCircle, Sparkles, Zap, Star } from 'lucide-react';

interface PricingPageProps {
  onOpenContact: (serviceName?: string) => void;
}

export function PricingPage({ onOpenContact }: PricingPageProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'project'>('monthly');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'social' | 'ads' | 'web' | 'content'>('all');

  const pricingPlans = [
    {
      id: 'starter-social',
      title: 'Starter Social Media',
      category: 'social',
      badge: 'Essential Growth',
      description: 'Perfect for small local businesses starting their social media journey.',
      priceMonthly: '৳8,500',
      priceProject: '৳25,000',
      period: 'per month',
      popular: false,
      features: [
        '12 Custom Branded Graphics / Month',
        '3 Short Reels / Video Edits',
        'Caption Writing & Hashtag Strategy',
        '2 Platforms Management (FB & Insta)',
        'Monthly Performance Analytics Report',
        'Dedicated Support Manager',
      ],
      idealFor: 'Small businesses & local startups',
    },
    {
      id: 'growth-brand',
      title: 'Growth Brand Accelerator',
      category: 'social',
      badge: 'Most Popular',
      description: 'Comprehensive social media & growth engine for scaling brands.',
      priceMonthly: '৳18,000',
      priceProject: '৳55,000',
      period: 'per month',
      popular: true,
      features: [
        '24 Custom Branded Graphics / Month',
        '8 High-Converting Reels / TikToks',
        'Advanced Meta Ad Campaign Setup',
        'Complete Community & Comment Management',
        'Bi-Weekly Strategy & Growth Sync',
        'Priority 24/7 WhatsApp Support',
        'Custom Content Calendar Planning',
      ],
      idealFor: 'E-commerce & growing enterprises',
    },
    {
      id: 'ads-scale',
      title: 'Performance Paid Ads Pro',
      category: 'ads',
      badge: 'High ROI',
      description: 'Laser-targeted Facebook, Instagram & Google ad campaigns engineered for max sales.',
      priceMonthly: '৳22,000',
      priceProject: '৳65,000',
      period: 'per month + ad spend',
      popular: false,
      features: [
        'Full Meta & Google Ads Management',
        'Custom Ad Creatives & Video Scripts',
        'Advanced Pixel & Conversion Tracking',
        'A/B Testing & Audience Retargeting',
        'Daily Budget Optimization',
        'Real-time ROI & Lead Dashboard',
      ],
      idealFor: 'Brands looking for immediate sales & leads',
    },
    {
      id: 'web-dev-pro',
      title: 'Modern Business Web Setup',
      category: 'web',
      badge: 'Full Solution',
      description: 'Lightning-fast responsive web application or e-commerce store built to convert.',
      priceMonthly: '৳35,000',
      priceProject: '৳35,000',
      period: 'one-time complete',
      popular: false,
      features: [
        'Custom UI/UX Design (Figma + React)',
        'Fully Responsive & Mobile Optimized',
        'SEO Friendly Architecture & Fast Speed',
        'Payment Gateway & Cart Integration',
        'Admin Dashboard & CMS Setup',
        '1 Year Free Hosting & Maintenance',
      ],
      idealFor: 'Companies needing high-end web presence',
    },
    {
      id: 'content-studio',
      title: 'Ultimate Content & Reels Factory',
      category: 'content',
      badge: 'Creative Power',
      description: 'End-to-end professional video editing and content creation for viral reach.',
      priceMonthly: '৳15,000',
      priceProject: '৳45,000',
      period: 'per month',
      popular: false,
      features: [
        '15 Professional Edited Short Reels',
        'Dynamic Captions & Sound Design',
        'Color Grading & Motion Graphics',
        'Scriptwriting Assistance',
        'Fast 48-Hour Turnaround',
      ],
      idealFor: 'Creators, coaches & brand influencers',
    },
    {
      id: 'enterprise-custom',
      title: 'Enterprise Custom Suite',
      category: 'web',
      badge: 'Tailored',
      description: 'Fully customized software, ERP, POS, mobile apps, and dedicated marketing team.',
      priceMonthly: 'Custom',
      priceProject: 'Custom',
      period: 'tailored scope',
      popular: false,
      features: [
        'Dedicated Full-Stack Engineering Team',
        'Custom ERP / CRM / POS Software',
        'iOS & Android Mobile Applications',
        'Omnichannel Marketing & PR',
        'SLA Guaranteed 99.9% Uptime',
        'Dedicated Account Director',
      ],
      idealFor: 'Large corporations & funded startups',
    },
  ];

  const filteredPlans = selectedCategory === 'all' 
    ? pricingPlans 
    : pricingPlans.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen pt-24 pb-20 bg-slate-50 dark:bg-[#040810] text-slate-900 dark:text-white transition-colors">
      {/* Pricing Header Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>✦ INVESTMENT & PACKAGES ✦</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6">
            Transparent Pricing Built For <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-400">
              Maximum Business Growth
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
            Choose from our pre-configured retainer packages or custom project tiers designed to deliver unmatched ROI without any hidden fees.
          </p>
        </motion.div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-10">
          {[
            { id: 'all', label: 'All Packages' },
            { id: 'social', label: 'Social Media' },
            { id: 'ads', label: 'Paid Ads & ROI' },
            { id: 'web', label: 'Web & Software' },
            { id: 'content', label: 'Video & Content' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/25'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </motion.section>

      {/* Pricing Cards Grid */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {filteredPlans.map((plan, idx) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`relative flex flex-col rounded-3xl p-8 transition-all duration-300 ${
                plan.popular
                  ? 'bg-gradient-to-b from-emerald-950/40 via-slate-900/90 to-slate-950 border-2 border-emerald-500 shadow-2xl shadow-emerald-500/10 lg:-translate-y-2'
                  : 'bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 shadow-lg shadow-slate-200/50 dark:shadow-none'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[11px] font-bold tracking-wider uppercase shadow-md flex items-center gap-1.5">
                  <Star className="w-3 h-3 fill-current" />
                  Most Popular Choice
                </div>
              )}

              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {plan.badge}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {plan.idealFor}
                </span>
              </div>

              <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
                {plan.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                {plan.description}
              </p>

              <div className="mb-6 pb-6 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl font-black tracking-tight text-slate-900 dark:text-white font-mono">
                    {plan.priceMonthly}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    / {plan.period}
                  </span>
                </div>
              </div>

              <div className="space-y-3.5 mb-8 flex-1">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  What's Included:
                </p>
                {plan.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-3">
                    <div className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-tight">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onOpenContact(plan.title)}
                className={`w-full py-3.5 px-6 rounded-2xl text-xs font-bold tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  plan.popular
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30'
                    : 'bg-slate-100 hover:bg-emerald-600 dark:bg-slate-800 dark:hover:bg-emerald-600 text-slate-900 hover:text-white dark:text-white transition-colors'
                }`}
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Enterprise Custom CTA Banner */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
      >
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-950 p-8 sm:p-12 text-white shadow-2xl border border-emerald-900/50">
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-cyan-300 backdrop-blur-md mb-4">
              <Zap className="w-3.5 h-3.5" />
              <span>Tailored Business Requirements</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-4">
              Need a Custom Package or Enterprise Solution?
            </h2>
            <p className="text-sm text-slate-300 font-normal mb-8 leading-relaxed">
              We understand every business is unique. Contact our senior technical consultants for a custom scope, tailored pricing, and dedicated team assignment.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenContact('Custom Enterprise Solution')}
                className="px-8 py-4 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs tracking-wider uppercase transition-all shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <span>Request Custom Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-3 text-xs text-slate-300 font-medium">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>Free 30-min Strategy Session Included</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* FAQ / Guarantee Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Everything you need to know about our billing, deliverables, and process.
          </p>
        </motion.div>

        <div className="space-y-4">
          {[
            {
              q: 'Can I upgrade or downgrade my package anytime?',
              a: 'Yes! You can easily upgrade, pause, or switch your package at any time based on your company growth and marketing demands.',
            },
            {
              q: 'Are there any hidden fees or long-term lock-ins?',
              a: 'Zero hidden fees. All deliverables, ad budgets, and timelines are agreed upon beforehand in a transparent service contract.',
            },
            {
              q: 'How fast do we start after payment confirmation?',
              a: 'Onboarding begins within 24 hours. You will be assigned a dedicated project manager and introduced via WhatsApp and Slack.',
            },
            {
              q: 'What payment methods do you accept?',
              a: 'We accept bank transfers, bKash, Nagad, Visa/Mastercard, and PayPal for international clients.',
            },
          ].map((faq, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs"
            >
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-500" />
                {faq.q}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 pl-6 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
