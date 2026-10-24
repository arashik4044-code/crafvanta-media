import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import {
  initialLeads,
  initialServices,
  initialPortfolio,
  initialClients,
  initialSettings,
  initialHeroSlides,
} from './data';
import {
  LeadInquiry,
  ServiceItem,
  PortfolioCategory,
  ClientBrand,
  AgencySettings,
  HeroSlideItem,
} from './types';
import AdminPanel from './components/AdminPanel';
import { TestimonialSlider } from './components/TestimonialSlider';
import { ServicesPage } from './components/ServicesPage';
import { PricingPage } from './components/PricingPage';
import { ServiceDetailPage } from './components/ServiceDetailPage';
import { PortfolioCategoryPage } from './components/PortfolioCategoryPage';
import { ContactPage } from './components/ContactPage';
import { BlurImage } from './components/BlurImage';
import { CustomCursor } from './components/CustomCursor';

// Helper for Hero Slide Icons
export const getSlideIcon = (id?: string) => {
  if (id === 'software' || id?.toLowerCase().includes('soft') || id?.toLowerCase().includes('dev')) {
    return (
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    );
  }
  return (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
    </svg>
  );
};

// 9 Services Data
const servicesData = [
  {
    id: 'web-design',
    title: 'Web Design & Development',
    description: 'Modern, responsive, and scalable websites built around your business goals, user experience, and technical excellence.',
    badge: 'Modern · Responsive · Scalable',
    category: 'Engineering',
    iconColor: 'from-blue-600 to-cyan-500',
    tags: ['Next.js', 'React', 'Tailwind', 'Custom UI'],
  },
  {
    id: 'software-solutions',
    title: 'Software & Digital Solutions',
    description: 'Custom software, business systems, dashboards, and digital solutions designed to simplify operations and scale.',
    badge: 'ERP · POS · CRM · SaaS',
    category: 'Enterprise',
    iconColor: 'from-cyan-600 to-blue-500',
    tags: ['Cloud Systems', 'APIs', 'Database', 'Admin Panels'],
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing & Growth',
    description: 'Strategic digital marketing solutions designed to strengthen your online presence, reach the right audience, and convert.',
    badge: 'Meta Ads · Google Ads · SEO',
    category: 'Growth',
    iconColor: 'from-blue-500 to-indigo-600',
    tags: ['ROI Optimization', 'Search Ads', 'Lead Gen', 'PPC'],
  },
  {
    id: 'social-media',
    title: 'Social Media Management',
    description: 'Complete social media management including strategy, content planning, publishing, audience engagement, and branding.',
    badge: 'Strategy · Community · Growth',
    category: 'Social',
    iconColor: 'from-sky-500 to-blue-600',
    tags: ['Content Calendar', 'Viral Reels', 'Community', 'Influencers'],
  },
  {
    id: 'creative-branding',
    title: 'Creative Design & Branding',
    description: 'Professional visual identities, brand materials, social creatives, and digital designs that communicate your unique story.',
    badge: 'Logos · Brand Books · UI/UX',
    category: 'Creative',
    iconColor: 'from-indigo-500 to-purple-600',
    tags: ['Brand Guidelines', 'Typography', 'Assets', 'Packaging'],
  },
  {
    id: 'video-production',
    title: 'Video & Content Production',
    description: 'Creative video, commercial content, reels, promotional media, and digital content produced to communicate value.',
    badge: '4K Commercials · Reels · Motion',
    category: 'Media',
    iconColor: 'from-violet-600 to-pink-500',
    tags: ['Motion Graphics', 'Short Form', 'Editing', 'Audio Mixing'],
  },
  {
    id: 'ai-automation',
    title: 'AI & Automation Solutions',
    description: 'Smart AI-powered and automated solutions designed to streamline workflows, improve efficiency, and scale operations.',
    badge: 'Workflows · Chatbots · LLMs',
    category: 'Innovation',
    iconColor: 'from-blue-600 to-teal-500',
    tags: ['Automation', 'Custom Agents', 'Integration', 'Data Sync'],
  },
  {
    id: 'it-consulting',
    title: 'IT Consulting & Support',
    description: 'Practical technology guidance, digital transformation support, and ongoing IT solutions tailored to evolving challenges.',
    badge: 'Security · DevOps · 24/7',
    category: 'Consulting',
    iconColor: 'from-slate-700 to-blue-800',
    tags: ['Cloud Architecture', 'Security Audit', 'Migration', 'Support'],
  },
  {
    id: 'ecommerce',
    title: 'E-commerce Solutions',
    description: 'Complete e-commerce solutions designed to help businesses build, manage, and grow their online sales and logistics.',
    badge: 'Shopify · WooCommerce · Custom',
    category: 'Commerce',
    iconColor: 'from-blue-700 to-sky-500',
    tags: ['Payment Gateways', 'Inventory', 'Conversion', 'Checkout UX'],
  },
];

// Portfolio Category Cards Data
const portfolioCategories = [
  {
    id: 'ads-campaigns',
    title: 'Ads Campaigns',
    projectCount: '2 projects',
    gradientClass: 'from-[#0f3d2e] via-[#092b20] to-[#051c14]',
    borderClass: 'border-emerald-800/40 hover:border-emerald-500/50',
    tags: ['Meta Ads', 'Google PPC', 'TikTok Ads', 'Retargeting'],
    icon: (
      <svg className="w-5 h-5 text-emerald-300" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.757 3.63 8.25 4.51 8.25H6.75z" />
      </svg>
    ),
  },
  {
    id: 'website-projects',
    title: 'Website Projects',
    projectCount: '2 projects',
    gradientClass: 'from-[#142c4a] via-[#0e2139] to-[#071322]',
    borderClass: 'border-blue-800/40 hover:border-blue-500/50',
    tags: ['E-Commerce', 'Corporate', 'Landing Page', 'POS System'],
    icon: (
      <svg className="w-5 h-5 text-blue-300" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    id: 'video-editing',
    title: 'Video Editing',
    projectCount: '1 project',
    gradientClass: 'from-[#461729] via-[#310f1c] to-[#1d0710]',
    borderClass: 'border-rose-900/40 hover:border-rose-500/50',
    tags: ['Short-form', 'Commercial', 'Motion Graphics', 'Documentary'],
    icon: (
      <svg className="w-5 h-5 text-rose-300" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    id: 'social-media-management',
    title: 'Social Media Management',
    projectCount: '1 project',
    gradientClass: 'from-[#16273f] via-[#0f1d30] to-[#09121f]',
    borderClass: 'border-slate-800/40 hover:border-blue-400/50',
    tags: ['Strategy', 'Content', 'Influencer', 'Community'],
    icon: (
      <svg className="w-5 h-5 text-sky-300" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
      </svg>
    ),
  },
];

export const getCategoryIcon = (id: string) => {
  switch (id) {
    case 'ads-campaigns':
      return (
        <svg className="w-5 h-5 text-emerald-300" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.757 3.63 8.25 4.51 8.25H6.75z" />
        </svg>
      );
    case 'website-projects':
      return (
        <svg className="w-5 h-5 text-blue-300" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
      );
    case 'video-editing':
      return (
        <svg className="w-5 h-5 text-rose-300" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
        </svg>
      );
    default:
      return (
        <svg className="w-5 h-5 text-sky-300" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
        </svg>
      );
  }
};

export default function App() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<PortfolioCategory | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'services' | 'pricing' | 'contact' | 'service-detail' | 'portfolio-detail'>('home');
  const [activeServiceDetail, setActiveServiceDetail] = useState<ServiceItem | null>(null);
  const [activePortfolioCategory, setActivePortfolioCategory] = useState<PortfolioCategory | null>(null);
  const [portfolioFilter, setPortfolioFilter] = useState<string>('all');

  const handleOpenPortfolioCategory = (cat: PortfolioCategory) => {
    setActivePortfolioCategory(cat);
    setCurrentPage('portfolio-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenServiceDetail = (itemOrId: ServiceItem | string) => {
    if (typeof itemOrId === 'string') {
      const found = activeServices.find((s) => s.id === itemOrId);
      if (found) {
        setActiveServiceDetail(found);
      } else {
        setActiveServiceDetail(activeServices[0]);
      }
    } else {
      setActiveServiceDetail(itemOrId);
    }
    setCurrentPage('service-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Parallax scroll hooks (hoisted to top-level to obey Rules of Hooks)
  const { scrollYProgress } = useScroll();
  const heroParallaxY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Form states for contact modal
  const [contactName, setContactName] = useState('');
  const [contactContact, setContactContact] = useState('');
  const [contactService, setContactService] = useState('Software Development');
  const [contactMessage, setContactMessage] = useState('');

  // Dynamic Content States with LocalStorage Persistence
  const [leads, setLeads] = useState<LeadInquiry[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('crafvanta_leads');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return initialLeads;
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('crafvanta_services');
      if (saved) {
        try {
          const parsed: ServiceItem[] = JSON.parse(saved);
          // If stored services don't have imageUrl, merge with initialServices imageUrls
          return parsed.map((item) => {
            if (!item.imageUrl) {
              const matched = initialServices.find((s) => s.id === item.id);
              if (matched?.imageUrl) {
                return { ...item, imageUrl: matched.imageUrl };
              }
            }
            return item;
          });
        } catch (e) {
          console.error(e);
        }
      }
    }
    return initialServices;
  });

  const [portfolio, setPortfolio] = useState<PortfolioCategory[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('crafvanta_portfolio');
      if (saved) {
        try {
          const parsed: PortfolioCategory[] = JSON.parse(saved);
          return parsed.map((item) => {
            if (!item.imageUrl) {
              const matched = initialPortfolio.find((p) => p.id === item.id);
              if (matched?.imageUrl) {
                return { ...item, imageUrl: matched.imageUrl };
              }
            }
            return item;
          });
        } catch (e) {
          console.error(e);
        }
      }
    }
    return initialPortfolio;
  });

  const [clients, setClients] = useState<ClientBrand[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('crafvanta_clients');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return initialClients;
  });

  const [settings, setSettings] = useState<AgencySettings>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('crafvanta_settings');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return initialSettings;
  });

  const [heroSlides, setHeroSlides] = useState<HeroSlideItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('crafvanta_hero_slides');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return initialHeroSlides;
  });

  useEffect(() => {
    localStorage.setItem('crafvanta_hero_slides', JSON.stringify(heroSlides));
  }, [heroSlides]);

  useEffect(() => {
    localStorage.setItem('crafvanta_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('crafvanta_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('crafvanta_portfolio', JSON.stringify(portfolio));
  }, [portfolio]);

  useEffect(() => {
    localStorage.setItem('crafvanta_clients', JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem('crafvanta_settings', JSON.stringify(settings));
    if (settings.seoTitle) {
      document.title = settings.seoTitle;
    }
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && settings.seoDescription) {
      metaDesc.setAttribute('content', settings.seoDescription);
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && settings.seoTitle) {
      ogTitle.setAttribute('content', settings.seoTitle);
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && settings.seoDescription) {
      ogDesc.setAttribute('content', settings.seoDescription);
    }
  }, [settings]);

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newLeadItem: LeadInquiry = {
      id: `lead-${Date.now()}`,
      name: contactName || 'Website Visitor',
      contact: contactContact,
      service: contactService,
      message: contactMessage,
      timestamp: formattedDate,
      status: 'New',
      budget: 'Web Client Inquiry',
    };
    setLeads((prev) => [newLeadItem, ...prev]);
    setIsContactOpen(false);
    setContactName('');
    setContactContact('');
    setContactMessage('');
    alert('Thank you! Your project inquiry has been logged directly into the Crafvanta Media Admin CRM.');
  };

  const currentSlide = heroSlides[activeSlide] || heroSlides[0] || initialHeroSlides[0];
  const activeServices = services.filter((s) => s.active);

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-[#070b14] dark:text-slate-100 font-sans transition-colors duration-200 selection:bg-blue-600 selection:text-white">
      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* 1. Header / Navbar */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-[#070b14]/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Logo Lockup */}
          <a href="/" className="flex items-center gap-3 shrink-0 group">
            {settings.logoUrl ? (
              <img
                src={settings.logoUrl}
                alt={settings.agencyName}
                className="h-10 max-w-[200px] object-contain transition-transform group-hover:scale-105"
              />
            ) : (
              <>
                <div className="w-10 h-10 rounded-xl bg-slate-950 dark:bg-white flex items-center justify-center text-white dark:text-slate-950 shadow-sm group-hover:scale-105 transition-transform">
                  <span className="font-extrabold text-xl tracking-tighter">C</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-black tracking-widest text-slate-900 dark:text-white uppercase leading-none">
                    CRAFVANTA
                  </span>
                  <span className="text-[10px] font-bold tracking-[0.25em] text-blue-600 dark:text-blue-400 uppercase leading-tight">
                    MEDIA
                  </span>
                </div>
              </>
            )}
          </a>

          {/* Center Navigation Links in Rounded Container */}
          <nav className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50">
            <button
              onClick={() => {
                setCurrentPage('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-colors cursor-pointer ${
                currentPage === 'home'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => {
                setCurrentPage('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-4 py-1.5 text-xs font-medium rounded-full transition-colors cursor-pointer ${
                currentPage === 'services'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Services
            </button>
            <button
              onClick={() => {
                setCurrentPage('pricing');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-4 py-1.5 text-xs font-medium rounded-full transition-colors cursor-pointer ${
                currentPage === 'pricing'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Pricing
            </button>
            <a
              href="#portfolio"
              onClick={() => setCurrentPage('home')}
              className="px-4 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Portfolio
            </a>
            <a
              href="#clients"
              onClick={() => setCurrentPage('home')}
              className="px-4 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Clients
            </a>
            <button
              onClick={() => {
                setCurrentPage('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-4 py-1.5 text-xs font-medium rounded-full transition-colors cursor-pointer ${
                currentPage === 'contact'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Right Action Icons & Button */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Theme Switcher */}
            <button
              onClick={toggleTheme}
              type="button"
              aria-label="Toggle theme"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="w-9 h-9 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800 transition-colors cursor-pointer"
            >
              {theme === 'dark' ? (
                <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41m14.14-14.14l-1.41 1.41" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            {/* Mail Icon */}
            <button
              onClick={() => setIsContactOpen(true)}
              type="button"
              aria-label="Send direct message"
              className="w-9 h-9 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800 transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </button>

            {/* Admin Panel Access Button */}
            <button
              onClick={() => setIsAdminOpen(true)}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold border border-slate-200/80 dark:border-slate-700/80 transition-colors cursor-pointer"
              title="Open Admin Portal & CRM"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Admin Panel</span>
            </button>

            {/* Log in */}
            <button
              onClick={() => setIsAdminOpen(true)}
              type="button"
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              <span>Log in</span>
            </button>

            {/* Let's talk CTA */}
            <button
              onClick={() => setIsContactOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs hover:shadow-blue-500/20 transition-all cursor-pointer"
            >
              <span>Let's talk</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {currentPage === 'contact' ? (
        <ContactPage
          settings={settings}
          onLeadSubmitted={(lead) => {
            const now = new Date();
            const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
            const newLeadItem: LeadInquiry = {
              id: `lead-${Date.now()}`,
              name: lead.name,
              contact: lead.contact,
              service: lead.service,
              message: lead.message,
              timestamp: formattedDate,
              status: 'New',
              budget: lead.budget,
            };
            setLeads((prev) => [newLeadItem, ...prev]);
          }}
        />
      ) : currentPage === 'portfolio-detail' && activePortfolioCategory ? (
        <PortfolioCategoryPage
          category={activePortfolioCategory}
          allCategories={portfolio}
          onBack={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 900, behavior: 'smooth' });
          }}
          onSelectCategory={handleOpenPortfolioCategory}
          onOpenContact={(projName) => {
            if (projName) setContactService(projName);
            setIsContactOpen(true);
          }}
        />
      ) : currentPage === 'service-detail' && activeServiceDetail ? (
        <ServiceDetailPage
          service={activeServiceDetail}
          allServices={activeServices}
          onBack={() => {
            setCurrentPage('services');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onSelectService={handleOpenServiceDetail}
          onOpenContact={(svcName) => {
            if (svcName) setContactService(svcName);
            setIsContactOpen(true);
          }}
        />
      ) : currentPage === 'services' ? (
        <ServicesPage
          onOpenContact={() => setIsContactOpen(true)}
          onOpenServiceDetail={handleOpenServiceDetail}
        />
      ) : currentPage === 'pricing' ? (
        <PricingPage onOpenContact={(service) => {
          if (service) setContactService(service);
          setIsContactOpen(true);
        }} />
      ) : (
        <>
          {/* 2. Hero Section with Interactive Slider */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        id="home"
        className="relative pt-12 pb-16 md:pt-16 md:pb-24 overflow-hidden border-b border-slate-100 dark:border-slate-800/80"
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-blue-50/60 via-transparent to-transparent dark:from-blue-950/20 pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60">
                {getSlideIcon(currentSlide?.id)}
                <span>{currentSlide?.badge}</span>
              </div>

              {/* Headline with Animated Switch */}
              <AnimatePresence mode="wait">
                <motion.h1
                  key={currentSlide?.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.15]"
                >
                  {currentSlide?.title}
                </motion.h1>
              </AnimatePresence>

              {/* Description */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentSlide?.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed"
                >
                  {currentSlide?.description}
                </motion.p>
              </AnimatePresence>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href={settings.heroButtonLink || '#contact'}
                  onClick={(e) => {
                    if ((settings.heroButtonLink || '#contact') === '#contact') {
                      e.preventDefault();
                      setIsContactOpen(true);
                    }
                  }}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-md shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <span>{settings.heroButtonText || "Let's Work Together"}</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
                {settings.heroSecondaryButtonText !== '' && (
                  <a
                    href={settings.heroSecondaryButtonLink || '#services'}
                    className="px-6 py-3 rounded-full border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 text-slate-700 dark:text-slate-200 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                  >
                    {settings.heroSecondaryButtonText || 'Explore services'}
                  </a>
                )}
              </div>
            </div>

            {/* Right 3D Visual */}
            <div className="lg:col-span-6 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide?.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/20 border-2 border-blue-500 dark:border-blue-500/90 ring-1 ring-blue-400/30 bg-slate-50 dark:bg-slate-900 aspect-16/10"
                >
                  <BlurImage
                    src={currentSlide?.image}
                    alt={currentSlide?.title}
                    className="w-full h-full object-cover"
                    style={{
                      y: heroParallaxY,
                      scale: 1.1,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-transparent to-transparent pointer-events-none" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Interactive Hero Controls (Below hero split) */}
          <div className="flex items-center gap-3 pt-10">
            {/* Prev Arrow Button */}
            <button
              onClick={() => setActiveSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))}
              type="button"
              aria-label="Previous service"
              className="w-9 h-9 rounded-full flex items-center justify-center border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            {/* Service Selection Tabs */}
            <div className="flex items-center gap-2">
              {heroSlides.map((slide, idx) => {
                const isActive = activeSlide === idx;
                return (
                  <button
                    key={slide.id}
                    onClick={() => setActiveSlide(idx)}
                    className={`flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-950/70 border border-blue-500/80 text-blue-700 dark:text-blue-300 shadow-xs'
                        : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <span className="p-1 rounded-md bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-300">
                      {getSlideIcon(slide.id)}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold">{slide.tabNumber}</span>
                    <span>{slide.tabName}</span>
                  </button>
                );
              })}
            </div>

            {/* Next Arrow Button */}
            <button
              onClick={() => setActiveSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1))}
              type="button"
              aria-label="Next service"
              className="w-9 h-9 rounded-full flex items-center justify-center border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      </motion.section>

      {/* 3. Clients Strip Section with Continuous Animated Marquee (Left-to-Right) */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        id="clients"
        className="py-10 bg-slate-50/60 dark:bg-slate-950/60 border-b border-slate-100 dark:border-slate-800/80 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-4">
            {/* Dark "Our clients" Summary Card */}
            <div className="w-full lg:w-48 bg-[#031535] text-white rounded-2xl p-4 flex flex-col justify-center items-start shadow-md shrink-0 h-24 border border-blue-900/40 relative z-10">
              <span className="text-base font-bold tracking-tight">Our clients</span>
              <div className="flex items-center gap-1.5 mt-1 text-xs text-blue-300 font-medium">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span>25+ brands</span>
              </div>
            </div>

            {/* Continuous Marquee Ticker (Left-to-Right Animated) */}
            <div className="flex-1 overflow-hidden relative w-full py-1">
              {/* Left & Right subtle gradient fade overlays */}
              <div className="absolute top-0 left-0 bottom-0 w-8 bg-gradient-to-r from-slate-50 dark:from-[#070b14] to-transparent z-10 pointer-events-none" />
              <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-slate-50 dark:from-[#070b14] to-transparent z-10 pointer-events-none" />

              <div className="animate-marquee-ltr gap-3 flex items-center">
                {[...clients, ...clients, ...clients, ...clients].map((client, i) => (
                  <div
                    key={i}
                    className="w-40 shrink-0 bg-white dark:bg-slate-900/90 rounded-2xl p-3 border border-slate-200/80 dark:border-slate-800 flex flex-col items-center justify-center text-center shadow-xs hover:border-blue-500/50 hover:shadow-md transition-all h-24 group cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-black text-slate-800 dark:text-slate-200 mb-1.5 group-hover:scale-110 transition-transform">
                      {client.name.substring(0, 2).toUpperCase()}
                    </div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate w-full">
                      {client.name}
                    </span>
                    <span className="text-[10px] text-slate-400 truncate w-full">
                      {client.sub}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 3.1 Trust Stats Counter Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-14 bg-white dark:bg-[#040810] border-b border-slate-100 dark:border-slate-800/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '150+', label: 'Projects Completed', sub: 'Successfully Delivered', icon: '🚀' },
              { number: '25+', label: 'Active Retainer Clients', sub: 'Long-term Partnerships', icon: '🤝' },
              { number: '6+', label: 'Years of Experience', sub: 'Digital Excellence', icon: '⭐' },
              { number: '99%', label: 'Client Satisfaction', sub: 'Verified Rating', icon: '💎' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-slate-50/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 text-center hover:border-blue-500/50 transition-all shadow-xs group"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-xs">
                  {stat.icon}
                </div>
                <div className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight mb-1">
                  {stat.number}
                </div>
                <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
                  {stat.label}
                </div>
                <div className="text-[10px] text-slate-400 font-medium">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 4. What we do best (9 Services Grid) */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        id="services"
        className="py-16 md:py-24 border-b border-slate-100 dark:border-slate-800/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
          >
            <div>
              <span className="text-xs font-bold tracking-wider text-blue-600 dark:text-blue-400 uppercase">
                Services
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white mt-1">
                What we do best
              </h2>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors w-fit"
            >
              <span>All services</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </motion.div>

          {/* 9 Services 3x3 Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {activeServices.map((item) => (
              <motion.div
                key={item.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
                className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-xl hover:border-blue-500/40 dark:hover:border-blue-500/40 transition-all flex flex-col justify-between"
              >
                {/* Visual Device / Graphic Header with Image Support */}
                <div className="relative h-48 bg-gradient-to-br from-blue-50 to-indigo-50/60 dark:from-slate-800 dark:to-slate-900 p-4 flex flex-col justify-between overflow-hidden border-b border-slate-100 dark:border-slate-800">
                  {item.imageUrl ? (
                    <>
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-black/30 pointer-events-none" />
                    </>
                  ) : null}

                  <div className="flex items-center justify-between z-10">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase bg-white/90 dark:bg-slate-900/90 text-blue-700 dark:text-blue-300 shadow-xs border border-blue-100 dark:border-slate-700 backdrop-blur-xs">
                      {item.category}
                    </span>
                    <span className="text-[10px] font-extrabold tracking-widest text-white/80 dark:text-slate-400 uppercase drop-shadow-xs">
                      CRAFVANTA
                    </span>
                  </div>

                  {/* Ambient Backdrop Shapes */}
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-blue-400/20 rounded-full blur-xl pointer-events-none" />
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 font-mono mb-1.5">
                      {item.badge}
                    </div>
                    <h3
                      onClick={() => handleOpenServiceDetail(item)}
                      className="text-lg font-bold text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-pointer"
                    >
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <button
                      onClick={() => handleOpenServiceDetail(item)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors cursor-pointer group-hover:translate-x-0.5"
                    >
                      <span>Learn more</span>
                      <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </button>
                    <div className="flex gap-1">
                      {item.tags.slice(0, 2).map((t, idx) => (
                        <span key={idx} className="text-[10px] text-slate-400 font-mono">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* 5. Our work, by category (Portfolio Category Cards) */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        id="portfolio"
        className="py-16 md:py-24 border-b border-slate-100 dark:border-slate-800/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
          >
            <div>
              <span className="text-xs font-bold tracking-wider text-blue-600 dark:text-blue-400 uppercase">
                Portfolio
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white mt-1">
                Our work, <span className="text-blue-600 dark:text-blue-400">by category</span>
              </h2>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors w-fit"
            >
              <span>View all projects</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </motion.div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 mb-10">
            {[
              { id: 'all', label: 'All Categories' },
              { id: 'ads-campaigns', label: 'Ads Campaigns' },
              { id: 'website-projects', label: 'Website Projects' },
              { id: 'video-editing', label: 'Video Editing' },
            ].map((filterTab) => (
              <button
                key={filterTab.id}
                onClick={() => setPortfolioFilter(filterTab.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  portfolioFilter === filterTab.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50'
                }`}
              >
                {filterTab.label}
              </button>
            ))}
          </div>

          {/* 4 Tall Vertical Gradient Category Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolio
              .filter((cat) => portfolioFilter === 'all' || cat.id === portfolioFilter)
              .map((cat) => (
              <div
                key={cat.id}
                onClick={() => handleOpenPortfolioCategory(cat)}
                className={`group relative rounded-3xl bg-gradient-to-b ${cat.gradientClass} text-white p-6 min-h-[480px] flex flex-col justify-between border ${cat.borderClass} shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer overflow-hidden`}
              >
                {/* Background Demo Photo with atmospheric blend */}
                {cat.imageUrl && (
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <img
                      src={cat.imageUrl}
                      alt={cat.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-30 group-hover:opacity-40"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-b ${cat.gradientClass} opacity-85 group-hover:opacity-75 transition-opacity duration-300`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/30" />
                  </div>
                )}

                {/* Top Section */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/15">
                    {getCategoryIcon(cat.id)}
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/40 backdrop-blur-md border border-white/15 text-slate-200">
                    {cat.projectCount}
                  </span>
                </div>

                {/* Middle Showcase Demo Image Card */}
                {cat.imageUrl && (
                  <div className="relative z-10 my-4 w-full rounded-2xl overflow-hidden border border-white/20 shadow-2xl group-hover:border-white/40 transition-all duration-300">
                    <div className="relative h-36 w-full overflow-hidden">
                      <img
                        src={cat.imageUrl}
                        alt={`${cat.title} Showcase`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-semibold text-white/90">
                        <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>Demo Showcase</span>
                        </span>
                        <span className="opacity-80">↗ View</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Ambient Pattern */}
                <div className="absolute inset-0 bg-radial from-white/5 to-transparent pointer-events-none" />

                {/* Bottom Section */}
                <div className="relative z-10 space-y-3.5">
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-blue-200 transition-colors">
                    {cat.title}
                  </h3>

                  {/* Category Filter Chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {cat.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white/10 hover:bg-white/20 border border-white/10 text-slate-200 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Watch all CTA */}
                  <div className="pt-1 flex items-center gap-1.5 text-xs font-semibold text-white/90 group-hover:text-white">
                    <span>Watch all</span>
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Carousel Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <TestimonialSlider />
      </motion.div>
        </>
      )}

      {/* 6. Footer (Exact match to Crafvanta Media) */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="pt-16 pb-12 bg-white dark:bg-[#040810] border-t border-slate-100 dark:border-slate-800/80 transition-colors"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-100 dark:border-slate-800/80">
            {/* Column 1: Brand Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                {settings.logoUrl ? (
                  <img
                    src={settings.logoUrl}
                    alt={settings.agencyName}
                    className="h-12 max-w-[220px] object-contain"
                  />
                ) : (
                  <span className="text-2xl font-black tracking-tight text-slate-950 dark:text-white uppercase">
                    CRAFVANTA<span className="text-blue-600 dark:text-blue-400">.</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
                Architecting digital excellence through strategic creativity and data-driven performance. We help brands grow in the digital age.
              </p>
              {/* Social Circles */}
              <div className="flex items-center gap-2 pt-2 flex-wrap">
                {[
                  { name: 'Facebook', url: settings.facebookURL || 'https://facebook.com/crafvantamedia', icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
                  { name: 'Instagram', url: settings.instagramURL || 'https://instagram.com/crafvantamedia', icon: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 2h11A4.5 4.5 0 0122 6.5v11a4.5 4.5 0 01-4.5 4.5h-11A4.5 4.5 0 012 17.5v-11A4.5 4.5 0 016.5 2z' },
                  { name: 'LinkedIn', url: settings.linkedinURL || 'https://linkedin.com/company/crafvantamedia', icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z' },
                  { name: 'Twitter / X', url: settings.twitterURL || 'https://twitter.com/crafvantamedia', icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
                  { name: 'YouTube', url: settings.youtubeURL || 'https://youtube.com/@crafvantamedia', icon: 'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
                  { name: 'GitHub', url: settings.githubURL || 'https://github.com/crafvantamedia', icon: 'M12 2A10 10 0 002 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z' },
                ].map((s, idx) => (
                  <a
                    key={idx}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.name}
                    title={s.name}
                    className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-600 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: EXPLORE */}
            <div className="space-y-3">
              <span className="text-xs font-bold tracking-widest text-slate-900 dark:text-white uppercase">
                EXPLORE
              </span>
              <ul className="space-y-2 text-xs font-medium text-slate-600 dark:text-slate-400">
                <li><a href="#home" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">HOME</a></li>
                <li><a href="#services" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">SERVICES</a></li>
                <li><a href="#portfolio" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">PORTFOLIO</a></li>
                <li><a href="#services" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">PACKAGES</a></li>
              </ul>
            </div>

            {/* Column 3: GET IN TOUCH */}
            <div className="space-y-3">
              <span className="text-xs font-bold tracking-widest text-slate-900 dark:text-white uppercase">
                GET IN TOUCH
              </span>
              <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white uppercase tracking-wider text-[10px]">EMAIL US</div>
                    <a href={`mailto:${settings.email}`} className="hover:text-blue-600 dark:hover:text-blue-400">{settings.email}</a>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white uppercase tracking-wider text-[10px]">WHATSAPP / CALL</div>
                    <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="hover:text-blue-600 dark:hover:text-blue-400">{settings.phone}</a>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white uppercase tracking-wider text-[10px]">LOCATION</div>
                    <span>{settings.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 4: PAYMENT METHODS */}
            <div className="space-y-3">
              <span className="text-xs font-bold tracking-widest text-slate-900 dark:text-white uppercase">
                PAYMENT METHODS
              </span>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {/* bKash */}
                <div className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs font-bold text-pink-600">
                  bKash
                </div>
                {/* Nagad */}
                <div className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs font-bold text-orange-600">
                  Nagad
                </div>
                {/* Visa */}
                <div className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs font-bold text-blue-700">
                  VISA
                </div>
                {/* Mastercard */}
                <div className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs font-bold text-red-600">
                  MC
                </div>
              </div>
              <p className="text-[10px] tracking-widest uppercase text-slate-400 font-medium pt-1">
                SECURE PAYMENTS & INTERNATIONAL TRANSFERS
              </p>
            </div>
          </div>

          {/* Copyright & Legal Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 dark:text-slate-400 tracking-wider uppercase font-medium">
            <span>© 2026 CRAFVANTA MEDIA. ALL RIGHTS RESERVED.</span>
            <div className="flex items-center gap-6">
              <a href="#home" className="hover:text-slate-900 dark:hover:text-white transition-colors">PRIVACY POLICY</a>
              <a href="#home" className="hover:text-slate-900 dark:hover:text-white transition-colors">TERMS OF SERVICE</a>
            </div>
          </div>
        </div>
      </motion.footer>

      {/* 7. Floating Action Buttons */}
      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
            className="fixed bottom-20 right-6 z-40 w-11 h-11 bg-white dark:bg-slate-900 text-slate-800 dark:text-white rounded-full shadow-lg border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Admin Panel Launcher Pill */}
      <button
        onClick={() => setIsAdminOpen(true)}
        aria-label="Open Admin Dashboard"
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2 px-4 py-2.5 bg-slate-900/90 dark:bg-white/95 hover:bg-slate-900 text-white dark:text-slate-950 rounded-full shadow-2xl border border-slate-700 dark:border-slate-300 backdrop-blur-md text-xs font-bold hover:scale-105 active:scale-95 transition-all cursor-pointer group"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 group-hover:animate-ping" />
        <span>⚡ Admin Portal</span>
        {leads.filter((l) => l.status === 'New').length > 0 && (
          <span className="px-1.5 py-0.2 bg-blue-600 text-white rounded-full text-[10px]">
            {leads.filter((l) => l.status === 'New').length}
          </span>
        )}
      </button>

      {/* Floating Chat / WhatsApp Bubble */}
      <button
        onClick={() => setIsContactOpen(true)}
        aria-label="Contact us on WhatsApp or Live Chat"
        className="fixed bottom-6 right-6 z-40 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-xl shadow-blue-500/25 flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.1 21.9l4.9-1.238A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm1.096 14.93c-.22.062-.456.07-.696.07-2.868 0-5.328-2.18-5.328-5.006 0-2.827 2.46-5.006 5.328-5.006 2.869 0 5.329 2.18 5.329 5.006 0 1.348-.56 2.583-1.483 3.486l.654 1.95-2.004-.504a4.908 4.908 0 01-1.8.4z"/>
        </svg>
      </button>

      {/* 8. Interactive Modals */}
      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                ✕
              </button>

              {selectedService.imageUrl && (
                <div className="w-full h-44 rounded-2xl overflow-hidden mb-4 border border-slate-200/80 dark:border-slate-800 shadow-inner">
                  <img
                    src={selectedService.imageUrl}
                    alt={selectedService.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase">
                {selectedService.category}
              </span>
              <h3 className="text-2xl font-bold text-slate-950 dark:text-white mt-1">
                {selectedService.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                {selectedService.description}
              </p>

              <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs font-semibold text-slate-900 dark:text-white block mb-2">
                  Key Capabilities:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedService.tags.map((t, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  onClick={() => setSelectedService(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSelectedService(null);
                    setIsContactOpen(true);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold cursor-pointer shadow-sm"
                >
                  Request Proposal
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Category Project Modal */}
      <AnimatePresence>
        {selectedCategory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedCategory(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                ✕
              </button>

              {selectedCategory.imageUrl && (
                <div className="w-full h-44 rounded-2xl overflow-hidden mb-4 border border-slate-200/80 dark:border-slate-800 shadow-md relative group">
                  <img
                    src={selectedCategory.imageUrl}
                    alt={selectedCategory.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  <span className="absolute bottom-2.5 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/60 text-white backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Portfolio Production Showcase</span>
                  </span>
                </div>
              )}

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  {getCategoryIcon(selectedCategory.id)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-950 dark:text-white">
                    {selectedCategory.title}
                  </h3>
                  <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                    {selectedCategory.projectCount} in production
                  </span>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <div className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/50">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                    <span>Featured Enterprise Case Study</span>
                    <span className="text-emerald-600 dark:text-emerald-400">Live</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Delivered complete high-conversion architecture with data analytics, user portals, and multi-channel marketing campaigns.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setIsContactOpen(true);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold cursor-pointer shadow-sm"
                >
                  Discuss Project
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* "Let's Talk" Contact Modal */}
      <AnimatePresence>
        {isContactOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative"
            >
              <button
                onClick={() => setIsContactOpen(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                ✕
              </button>

              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase">
                Direct Contact
              </span>
              <h3 className="text-2xl font-bold text-slate-950 dark:text-white mt-1">
                Let's discuss your project
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Reach out to our Dhaka engineering & digital marketing headquarters.
              </p>

              <form
                onSubmit={handleContactSubmit}
                className="mt-5 space-y-3.5"
              >
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. Tanvir Ahmed"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-blue-600 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Email / WhatsApp Phone
                  </label>
                  <input
                    type="text"
                    required
                    value={contactContact}
                    onChange={(e) => setContactContact(e.target.value)}
                    placeholder="info@yourcompany.com or +880..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-blue-600 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Service of Interest
                  </label>
                  <select
                    value={contactService}
                    onChange={(e) => setContactService(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-blue-600 transition-colors"
                  >
                    {activeServices.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Project Overview
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Describe your requirements, goals, or timeline..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-blue-600 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                >
                  Send Inquiry Now
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 9. Comprehensive Admin Panel Portal */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        leads={leads}
        setLeads={setLeads}
        services={services}
        setServices={setServices}
        portfolio={portfolio}
        setPortfolio={setPortfolio}
        clients={clients}
        setClients={setClients}
        settings={settings}
        setSettings={setSettings}
        theme={theme}
        toggleTheme={toggleTheme}
        heroSlides={heroSlides}
        setHeroSlides={setHeroSlides}
      />
    </div>
  );
}
