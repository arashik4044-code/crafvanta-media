import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ServiceItem } from '../types';

interface ServiceDetailPageProps {
  service: ServiceItem;
  allServices: ServiceItem[];
  onBack: () => void;
  onSelectService: (service: ServiceItem) => void;
  onOpenContact: (serviceName?: string) => void;
}

// Detailed extended information map for all 9 services
const serviceDetailsMap: Record<string, {
  tagline: string;
  overview: string;
  extendedDescription: string;
  keyDeliverables: { title: string; desc: string; icon: string }[];
  process: { step: string; title: string; desc: string }[];
  tools: string[];
  metrics: { value: string; label: string }[];
  pricingTiers: { name: string; price: string; period: string; features: string[]; popular?: boolean }[];
  faqs: { q: string; a: string }[];
}> = {
  'social-media': {
    tagline: 'Transform your social channels into active, high-converting brand engines that build trust and drive organic growth.',
    overview: 'In today’s hyper-connected marketplace, social media is your primary digital storefront. At Crafvanta Media, our Social Media Management service combines creative storytelling, strategic content calendars, proactive audience engagement, and data-driven insights to establish market dominance.',
    extendedDescription: 'We handle every single aspect of your brand’s social footprint—from editorial strategy and high-definition visual assets to daily publishing, comment moderation, and performance tracking across Facebook, Instagram, LinkedIn, TikTok, and YouTube.',
    keyDeliverables: [
      { title: 'Monthly Content Strategy', desc: 'Custom content pillar blueprint aligned with your sales goals, campaigns, and target demographic.', icon: '📅' },
      { title: 'Branded Graphics & Motion Reels', desc: '15-30 stunning static posts, carousels, and scroll-stopping short-form video reels per month.', icon: '🎬' },
      { title: 'Copywriting & Hashtags', desc: 'Persuasive captions engineered for high engagement, brand tone consistency, and SEO searchability.', icon: '✍️' },
      { title: '24/7 Community Engagement', desc: 'Active comment moderation, direct message responses, and audience nurturing to boost brand loyalty.', icon: '💬' },
      { title: 'Cross-Platform Publishing', desc: 'Automated, optimal timing scheduling across Facebook, Instagram, LinkedIn, TikTok & X.', icon: '🚀' },
      { title: 'Comprehensive Analytics', desc: 'Monthly performance reports detailing reach, impression growth, follower retention, and ROI metrics.', icon: '📊' },
    ],
    process: [
      { step: '01', title: 'Brand Audit & Alignment', desc: 'We analyze your current social presence, competitor benchmarks, and audience persona to define content pillars.' },
      { step: '02', title: 'Content Calendar & Production', desc: 'Our creative squad designs graphics, edits video reels, and drafts compelling copies for full review approval.' },
      { step: '03', title: 'Publishing & Engagement', desc: 'Content goes live at peak traffic hours accompanied by active community monitoring and inbox management.' },
      { step: '04', title: 'Analytics & Monthly Optimization', desc: 'We evaluate engagement data and double down on winning formats for continuous month-over-month growth.' },
    ],
    tools: ['Meta Business Suite', 'Adobe Premiere Pro', 'Photoshop & Illustrator', 'Buffer Pro', 'Canva Enterprise', 'Sprout Social'],
    metrics: [
      { value: '+350%', label: 'Average Impression Growth' },
      { value: '4.8x', label: 'Higher Audience Engagement' },
      { value: '< 15 mins', label: 'Avg Inbox Response Rate' },
      { value: '100%', label: 'Brand Voice Consistency' },
    ],
    pricingTiers: [
      {
        name: 'Starter Social',
        price: '৳8,500',
        period: 'per month',
        features: ['12 Custom Branded Graphics', '3 Short Video Reels', 'Caption & Hashtag Research', '2 Platforms Management', 'Monthly Report'],
      },
      {
        name: 'Growth Accelerator',
        price: '৳18,000',
        period: 'per month',
        popular: true,
        features: ['24 Custom Branded Graphics', '8 High-Converting Reels', '4 Platforms Management', 'Community & DM Nurturing', 'Bi-Weekly Growth Call', 'Dedicated Content Manager'],
      },
      {
        name: 'Enterprise Dominance',
        price: '৳35,000',
        period: 'per month',
        features: ['30+ Premium Visual Assets', '15 Short Video Reels / Shorts', 'All Platforms Included', 'Influencer Outreach Assistance', '24/7 Priority Support', 'Dedicated Creative Squad'],
      },
    ],
    faqs: [
      { q: 'Do I get to approve content before it is published?', a: 'Yes! We provide an interactive content calendar where you can preview, request edits, and approve all posts before live deployment.' },
      { q: 'Can you handle both video reels and static graphics?', a: 'Absolutely. We specialize in high-converting short-form reels for Instagram, Facebook, and TikTok along with carousel posts.' },
      { q: 'What platforms do you support?', a: 'We manage Facebook, Instagram, LinkedIn, TikTok, YouTube Shorts, X (Twitter), and Pinterest.' },
      { q: 'How quickly can we start after sign-up?', a: 'Onboarding starts within 24 hours. We usually deliver the first week’s approved content batch within 3-5 business days.' },
    ],
  },

  'web-design': {
    tagline: 'Custom, lightning-fast, and responsive web applications built to convert visitors into loyal clients.',
    overview: 'Your website is the heart of your digital presence. We build ultra-modern, high-performing web applications using React, Next.js, and Tailwind CSS engineered for seamless user experience, sub-second page loads, and high conversion rates.',
    extendedDescription: 'Whether you need a sleek corporate landing page, an enterprise web platform, or a complex portal, our full-stack engineering team builds scalable code tailored around your business workflow.',
    keyDeliverables: [
      { title: 'Custom UI/UX Wireframing', desc: 'Bespoke Figma design prototypes crafted around modern aesthetics and seamless user journeys.', icon: '🎨' },
      { title: 'Responsive Frontend Stack', desc: 'React, Next.js, and Tailwind CSS for flawless rendering on mobile, tablet, and desktop devices.', icon: '⚡' },
      { title: 'Conversion Rate Architecture', desc: 'Strategically placed CTAs, lead capture forms, and fast checkout flows engineered for conversion.', icon: '📈' },
      { title: 'SEO & Speed Optimization', desc: '95+ Google Lighthouse speed scores, structured metadata, schema markup, and search indexing.', icon: '🚀' },
      { title: 'CMS & Admin Dashboard', desc: 'User-friendly administration panels for easy content updates, media management, and inquiries.', icon: '🛠️' },
      { title: 'Security & SSL Compliance', desc: 'Bank-grade encryption, HTTPS certificates, DDOS protection, and automated cloud backups.', icon: '🔒' },
    ],
    process: [
      { step: '01', title: 'Discovery & Wireframing', desc: 'We map site structure, brand guidelines, and conversion funnels into clickable Figma prototypes.' },
      { step: '02', title: 'Agile Frontend & Backend', desc: 'Clean, modern TypeScript/React development integrated with secure backend systems and APIs.' },
      { step: '03', title: 'Cross-Device Testing', desc: 'Rigorous testing across browsers, screen sizes, page speed benchmarks, and security protocols.' },
      { step: '04', title: 'Deployment & Training', desc: 'Domain setup, cloud deployment, SSL activation, and hands-on admin dashboard training.' },
    ],
    tools: ['React & Next.js', 'Tailwind CSS', 'TypeScript', 'Node.js Express', 'Vite & Webpack', 'Figma', 'Vercel / Cloudflare'],
    metrics: [
      { value: '< 0.8s', label: 'Average Page Load Time' },
      { value: '98+', label: 'Google Lighthouse Performance' },
      { value: '100%', label: 'Mobile & Responsive Compliant' },
      { value: '99.9%', label: 'Uptime SLA Guarantee' },
    ],
    pricingTiers: [
      {
        name: 'Essential Web',
        price: '৳20,000',
        period: 'one-time',
        features: ['5 Page Modern Website', 'Mobile Responsive', 'Contact Form Integration', 'Basic SEO Setup', '1 Month Free Support'],
      },
      {
        name: 'Business Pro Web',
        price: '৳35,000',
        period: 'one-time',
        popular: true,
        features: ['Up to 10 Pages / Custom UI', 'CMS Admin Panel', 'Fast Speed Optimization', 'WhatsApp & Live Chat', 'Full SEO & Meta Setup', '3 Months Support & Hosting'],
      },
      {
        name: 'Custom Web Suite',
        price: '৳65,000+',
        period: 'one-time',
        features: ['Complex Web Application', 'Custom Database & API', 'Payment Gateway Integration', 'Advanced Security Audit', '1 Year Free Maintenance', 'Dedicated Developer'],
      },
    ],
    faqs: [
      { q: 'Will my website work well on mobile phones?', a: '100% yes. We follow a mobile-first responsive design philosophy ensuring perfect display across all screen sizes.' },
      { q: 'Can I edit content on my website myself later?', a: 'Yes! We provide an intuitive Admin Panel / CMS so you can update text, add images, and post updates without any coding.' },
      { q: 'How long does a web design project take?', a: 'Standard business websites take 1-2 weeks. Complex custom web applications take 2-4 weeks.' },
      { q: 'Do you provide web hosting and SSL certificates?', a: 'Yes, we handle complete domain setup, high-speed SSD hosting, SSL certificates, and technical support.' },
    ],
  },

  'software-solutions': {
    tagline: 'Custom business software, ERPs, POS systems, and SaaS dashboards designed to streamline operations and scale.',
    overview: 'Eliminate manual bottlenecks and optimize operational workflows with tailormade software solutions. Crafvanta Media develops secure enterprise systems, POS tools, CRM dashboards, and cloud platforms.',
    extendedDescription: 'We build end-to-end cloud platforms with real-time analytics, user role permissions, inventory tracking, financial auditing, and automated reporting systems customized specifically for your enterprise requirements.',
    keyDeliverables: [
      { title: 'Custom ERP & POS Platforms', desc: 'Full inventory control, sales point systems, customer history, and automated invoice management.', icon: '🖥️' },
      { title: 'CRM & Lead Dashboards', desc: 'Track sales leads, pipeline status, employee tasks, and customer communications in one portal.', icon: '🎯' },
      { title: 'Role-Based Security (RBAC)', desc: 'Granular permissions for Super Admin, Manager, Cashier, and Accounting staff.', icon: '🔐' },
      { title: 'Cloud Database Architecture', desc: 'Real-time database sync, cloud back-ups, data encryption, and high availability.', icon: '☁️' },
      { title: 'Custom API Integrations', desc: 'Seamlessly connect with local payment gateways (bKash/Nagad), SMS gateways, and accounting tools.', icon: '🔌' },
      { title: 'Automated PDF & Reports', desc: 'Instant generation of receipts, monthly profit/loss reports, and inventory export files.', icon: '📄' },
    ],
    process: [
      { step: '01', title: 'Requirements & Architecture', desc: 'We document your exact operational workflow, database schema, user roles, and data relationships.' },
      { step: '02', title: 'Core Engine Development', desc: 'Building high-performance backend APIs and secure database models with real-time sync.' },
      { step: '03', title: 'Admin UI & User Testing', desc: 'Crafting responsive management dashboards followed by simulated load testing and user security audits.' },
      { step: '04', title: 'Deployment & Staff Training', desc: 'Server provisioning, database migration, staff hands-on training, and ongoing technical maintenance.' },
    ],
    tools: ['Node.js & Express', 'PostgreSQL / SQL', 'Firebase Cloud', 'React & TypeScript', 'Docker', 'RESTful & GraphQL APIs'],
    metrics: [
      { value: '99.9%', label: 'System Uptime SLA' },
      { value: '10x', label: 'Faster Operational Workflow' },
      { value: '0%', label: 'Manual Accounting Errors' },
      { value: '24/7', label: 'Monitored Cloud Servers' },
    ],
    pricingTiers: [
      {
        name: 'Basic POS / CRM',
        price: '৳25,000',
        period: 'project basis',
        features: ['Single-Location POS / CRM', 'Inventory & Sales Tracking', 'Invoice Printing & PDF', 'Basic Staff Roles', '1 Month Tech Support'],
      },
      {
        name: 'Custom ERP System',
        price: '৳55,000',
        period: 'project basis',
        popular: true,
        features: ['Multi-Branch Management', 'Advanced Inventory & Stock Alert', 'bKash/Nagad Payment API', 'SMS Gateway Integration', 'Financial Profit/Loss Reports', '6 Months SLA Maintenance'],
      },
      {
        name: 'SaaS / Enterprise',
        price: 'Custom Quote',
        period: 'tailored scope',
        features: ['Full SaaS Cloud Platform', 'Unlimited Active Users & Roles', 'Custom Mobile App Companion', 'Dedicated Cloud Server', '24/7 On-Call Support', 'Dedicated Dev Manager'],
      },
    ],
    faqs: [
      { q: 'Is the software hosted on local servers or the cloud?', a: 'We support both! We recommend secure cloud hosting for 24/7 access anywhere, but can also deploy locally on internal servers.' },
      { q: 'Can we integrate bKash, Nagad, and local SMS gateways?', a: 'Yes, we have ready-made integration modules for all major Bangladeshi payment and SMS services.' },
      { q: 'What happens if we need new features later?', a: 'Our software is built with modular microservice architecture, making it easy to add new modules or features anytime.' },
    ],
  },
};

export function ServiceDetailPage({
  service,
  allServices,
  onBack,
  onSelectService,
  onOpenContact,
}: ServiceDetailPageProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'deliverables' | 'pricing' | 'faqs'>('overview');

  // Scroll to top when service changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [service.id]);

  // Fallback detail builder for services not explicitly in detail map
  const details = serviceDetailsMap[service.id] || {
    tagline: `Professional ${service.title} engineered to deliver measurable growth and operational efficiency for your business.`,
    overview: `${service.description} At Crafvanta Media, we execute every strategy with high precision, modern design standards, and a focus on maximizing ROI.`,
    extendedDescription: `Our team of dedicated creative and technical specialists collaborates closely with you to deliver end-to-end execution, continuous iteration, and transparent reporting.`,
    keyDeliverables: service.tags.map((t, idx) => ({
      title: t,
      desc: `High-quality execution of ${t} tailored around your industry requirements and target audience.`,
      icon: ['✨', '🚀', '🎯', '⚡', '💎'][idx % 5],
    })),
    process: [
      { step: '01', title: 'Consultation & Discovery', desc: 'Detailed business audit and goals alignment.' },
      { step: '02', title: 'Strategy & Execution', desc: 'Crafting tailored deliverables with rapid turnaround.' },
      { step: '03', title: 'Quality Review', desc: 'Rigorous QA and client feedback revisions.' },
      { step: '04', title: 'Deployment & Growth', desc: 'Live launch and continuous performance optimization.' },
    ],
    tools: ['Figma', 'Adobe Creative Cloud', 'Meta Ads', 'Google Cloud', 'React', 'Analytics Pro'],
    metrics: [
      { value: '100%', label: 'Client Satisfaction' },
      { value: '24/7', label: 'Dedicated Support' },
      { value: '< 24h', label: 'Fast Turnaround' },
      { value: 'ROI', label: 'Driven Strategy' },
    ],
    pricingTiers: [
      {
        name: 'Starter Package',
        price: '৳12,000',
        period: 'per month',
        features: ['Essential Scope Deliverables', 'Weekly Strategy Check-in', 'Dedicated Manager', 'Monthly Report'],
      },
      {
        name: 'Growth Suite',
        price: '৳25,000',
        period: 'per month',
        popular: true,
        features: ['Full Comprehensive Scope', 'Priority Turnaround', 'Multi-channel Support', 'Custom Strategy Workshop', 'Bi-weekly Reports'],
      },
      {
        name: 'Enterprise Custom',
        price: 'Custom Quote',
        period: 'tailored scope',
        features: ['Dedicated Full Squad', 'Uncapped Scope', '24/7 On-Call Access', 'Custom SLA Guarantee', 'Executive Review'],
      },
    ],
    faqs: [
      { q: `How does the onboarding process work for ${service.title}?`, a: 'Onboarding is simple. We conduct a 30-minute alignment call, collect necessary brand assets, and begin execution within 24 hours.' },
      { q: 'Can I request custom modifications to the package?', a: 'Yes! All our services and packages can be customized to match your exact business scope and budget.' },
    ],
  };

  return (
    <div className="min-h-screen pt-20 pb-24 bg-white dark:bg-[#040810] text-slate-900 dark:text-white transition-colors">
      {/* Top Sticky Breadcrumb Bar */}
      <div className="sticky top-16 z-30 bg-white/90 dark:bg-[#040810]/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer group"
          >
            <span className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center transition-colors">
              ←
            </span>
            <span>Back to All Services</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 font-mono">
            <span>Services</span>
            <span>/</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">{service.title}</span>
          </div>

          <button
            onClick={() => onOpenContact(service.title)}
            className="px-4 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            Inquire For This Service
          </button>
        </div>
      </div>

      {/* Hero Service Banner */}
      <section className="relative py-12 lg:py-16 overflow-hidden border-b border-slate-100 dark:border-slate-800">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Left Header Info */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  {service.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  {service.badge}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
                {service.title}
              </h1>

              <p className="text-base sm:text-lg text-emerald-600 dark:text-emerald-400 font-semibold leading-relaxed">
                {details.tagline}
              </p>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {details.overview}
              </p>

              {/* Service Action CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onOpenContact(service.title)}
                  className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-emerald-500/25 flex items-center gap-2 transition-all cursor-pointer"
                >
                  <span>Start Your Project</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </button>
                <a
                  href={`https://wa.me/8801700000000?text=${encodeURIComponent(`Hi, I want to learn more about ${service.title}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
                >
                  <span>💬 WhatsApp Us</span>
                </a>
              </div>
            </div>

            {/* Right Visual Image Mockup Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border-2 border-emerald-500/80 shadow-2xl ring-1 ring-emerald-400/30 group">
                {service.imageUrl ? (
                  <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-slate-900">
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-white/10 flex items-center justify-between text-white">
                      <div>
                        <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block">SPECIALIZED SERVICE</span>
                        <h4 className="text-xs font-bold">{service.title}</h4>
                      </div>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    </div>
                  </div>
                ) : (
                  <div className="h-72 sm:h-80 bg-gradient-to-br from-emerald-950 via-indigo-950 to-slate-950 p-8 flex flex-col justify-between text-white">
                    <span className="text-4xl">✦</span>
                    <div>
                      <span className="text-xs text-emerald-400 font-mono uppercase tracking-wider">{service.category}</span>
                      <h3 className="text-2xl font-bold mt-1">{service.title}</h3>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KPI Highlights Bar */}
      <section className="py-10 bg-slate-50/80 dark:bg-slate-950/60 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {details.metrics.map((m, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-center shadow-xs">
                <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">{m.value}</div>
                <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Tabbed Service Detail Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 border-b border-slate-200 dark:border-slate-800 pb-4">
          {[
            { id: 'overview', label: 'Overview & Scope' },
            { id: 'deliverables', label: 'Key Deliverables' },
            { id: 'pricing', label: 'Packages & Investment' },
            { id: 'faqs', label: 'Service FAQs' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Overview & Scope */}
        {activeTab === 'overview' && (
          <div className="space-y-12">
            <div className="bg-slate-50 dark:bg-slate-900/60 p-8 sm:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6">
              <h3 className="text-2xl font-bold text-slate-950 dark:text-white">Detailed Service Scope</h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {details.extendedDescription}
              </p>
            </div>

            {/* Step-by-Step Execution Workflow */}
            <div>
              <div className="mb-8">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">OUR WORKFLOW</span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white mt-1">4-Step Execution Framework</h3>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {details.process.map((p, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                      STEP {p.step}
                    </span>
                    <h4 className="font-bold text-base text-slate-900 dark:text-white">{p.title}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools & Tech Stack */}
            <div className="p-8 rounded-3xl bg-emerald-950 text-white border border-emerald-900/80">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block mb-2">TECHNOLOGY & TOOLS</span>
              <h3 className="text-xl font-bold mb-4">Technologies & Platforms We Use</h3>
              <div className="flex flex-wrap gap-2">
                {details.tools.map((tool, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-xl bg-emerald-900/80 border border-emerald-700/60 text-xs font-semibold text-emerald-200">
                    ⚡ {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Key Deliverables */}
        {activeTab === 'deliverables' && (
          <div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {details.keyDeliverables.map((item, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 transition-all shadow-xs group">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h4 className="text-lg font-bold text-slate-950 dark:text-white mb-2">{item.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Service Specific Packages */}
        {activeTab === 'pricing' && (
          <div>
            <div className="grid md:grid-cols-3 gap-8">
              {details.pricingTiers.map((tier, idx) => (
                <div
                  key={idx}
                  className={`rounded-3xl p-8 flex flex-col justify-between transition-all ${
                    tier.popular
                      ? 'bg-gradient-to-b from-emerald-950/60 to-slate-900 border-2 border-emerald-500 text-white shadow-xl'
                      : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white'
                  }`}
                >
                  <div>
                    {tier.popular && (
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-600 text-white inline-block mb-3">
                        RECOMMENDED PACKAGE
                      </span>
                    )}
                    <h4 className="text-xl font-bold mb-2">{tier.name}</h4>
                    <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-3xl font-black">{tier.price}</span>
                      <span className="text-xs text-slate-400">/{tier.period}</span>
                    </div>

                    <ul className="space-y-3 mb-8 text-xs font-medium">
                      {tier.features.map((f, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2">
                          <span className="text-emerald-500 font-bold">✓</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => onOpenContact(`${service.title} - ${tier.name}`)}
                    className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Select {tier.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Service FAQs */}
        {activeTab === 'faqs' && (
          <div className="max-w-3xl mx-auto space-y-4">
            {details.faqs.map((faq, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-sm text-slate-950 dark:text-white mb-2">❓ {faq.q}</h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-6">{faq.a}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Explore Other Services Footer Bar */}
      <section className="py-16 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">EXPLORE MORE</span>
              <h3 className="text-2xl font-black text-slate-950 dark:text-white mt-1">Other Specialized Services</h3>
            </div>
            <button onClick={onBack} className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
              View All 9 Services →
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {allServices
              .filter((s) => s.id !== service.id)
              .slice(0, 4)
              .map((other) => (
                <div
                  key={other.id}
                  onClick={() => onSelectService(other)}
                  className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer group"
                >
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase block mb-1">
                    {other.category}
                  </span>
                  <h4 className="font-bold text-sm text-slate-950 dark:text-white group-hover:text-emerald-600 transition-colors">
                    {other.title}
                  </h4>
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mt-3 inline-block group-hover:translate-x-1 transition-transform">
                    View Details →
                  </span>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="bg-[#062016] text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl border border-emerald-900/60">
          <h2 className="text-2xl sm:text-4xl font-black uppercase mb-3">Ready to scale with {service.title}?</h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mb-6">
            Get in touch with our strategy squad for a free consultation and customized project proposal.
          </p>
          <button
            onClick={() => onOpenContact(service.title)}
            className="px-8 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
          >
            Get Custom Strategy Proposal
          </button>
        </div>
      </section>
    </div>
  );
}
