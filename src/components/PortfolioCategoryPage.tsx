import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PortfolioCategory } from '../types';

interface MilestoneItem {
  phase: string;
  title: string;
  duration: string;
  status: 'Completed' | 'Delivered' | 'In Progress' | 'Active';
  summary: string;
  deliverables: string[];
  tools: string[];
  keyMetric: string;
}

interface ProjectCase {
  id: string;
  title: string;
  client: string;
  industry: string;
  duration: string;
  result: string;
  resultSub: string;
  description: string;
  tags: string[];
  coverImage?: string;
  milestones: MilestoneItem[];
}

interface PortfolioCategoryPageProps {
  category: PortfolioCategory;
  allCategories: PortfolioCategory[];
  onBack: () => void;
  onSelectCategory: (category: PortfolioCategory) => void;
  onOpenContact: (projectName?: string) => void;
}

export function PortfolioCategoryPage({
  category,
  allCategories,
  onBack,
  onSelectCategory,
  onOpenContact,
}: PortfolioCategoryPageProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [category.id]);

  // Active milestone tab indexed by project id
  const [activeMilestones, setActiveMilestones] = useState<{ [projectId: string]: number }>({});
  // Filter for project list within category
  const [projectSearch, setProjectSearch] = useState('');
  // Active roadmap tab for Category Lifecycle Overview
  const [activeCategoryPhase, setActiveCategoryPhase] = useState<number>(0);

  // Category Lifecycle Roadmap Phases
  const categoryRoadmap = [
    {
      phase: 'Phase 01',
      title: 'Discovery & Strategic Audit',
      duration: 'Week 1',
      icon: '🔍',
      desc: 'In-depth audience segmentation, competitor analysis, technical feasibility study, and growth KPI definition tailored to the client’s market in Bangladesh and internationally.',
      deliverables: ['Market Audit Document', 'User Persona Profile', 'Technical Architecture Blueprint', 'KPI Baseline Matrix'],
    },
    {
      phase: 'Phase 02',
      title: 'Experience Design & Prototyping',
      duration: 'Week 2 - 3',
      icon: '🎨',
      desc: 'Interactive Figma design systems, motion graphics storyboards, high-converting ad copy iterations, and wireframe prototypes validated against conversion benchmarks.',
      deliverables: ['Responsive UI Design System', 'Interactive Clickable Prototype', 'Ad Visual Hooks & Copy Briefs', 'Stakeholder Sign-Off'],
    },
    {
      phase: 'Phase 03',
      title: 'Execution & Quality Assurance',
      duration: 'Week 4 - 6',
      icon: '⚙️',
      desc: 'Full-stack engineering, production-grade video post-production, tracking pixel configuration (Meta CAPI & Google Analytics 4), and end-to-end user acceptance testing.',
      deliverables: ['Production Codebase / Video 4K Master', 'bKash/Nagad/Bank Payment API', 'Security & Load Testing Audit', 'Cross-Device QA Report'],
    },
    {
      phase: 'Phase 04',
      title: 'Deployment & Continuous Growth',
      duration: 'Week 7 & Ongoing',
      icon: '🚀',
      desc: 'Zero-downtime release, campaign launch with progressive budget scaling, real-time conversion monitoring, and bi-weekly strategic roadmap reviews.',
      deliverables: ['Production Launch on CDN', 'Live Conversion Tracking Hub', 'Bi-Weekly Retainer Reports', 'Continuous ROAS Tuning'],
    },
  ];

  // Specific Project Case Studies with Milestones based on Category
  const getProjectsForCategory = (catId: string): ProjectCase[] => {
    switch (catId) {
      case 'ads-campaigns':
        return [
          {
            id: 'proj-ads-1',
            title: 'Learning Kabbo Nationwide Meta & Google PPC Launch',
            client: 'Learning Kabbo Platform',
            industry: 'EdTech & Learning',
            duration: '45 Days Campaign',
            result: '4.8x ROAS Achieved',
            resultSub: '12,500+ Course Enrollments',
            description:
              'A targeted acquisition engine combining high-converting video reels, Meta CAPI conversion tracking, and Google Search Ads to capture intent-driven students nationwide.',
            tags: ['Meta Ads', 'Google PPC', 'Meta CAPI', 'Funnel Optimization'],
            coverImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
            milestones: [
              {
                phase: 'Phase 1',
                title: 'Funnel Architecture & Pixel Setup',
                duration: 'Days 1 - 7',
                status: 'Completed',
                summary: 'Configured Meta Conversions API (CAPI), Google Tag Manager, custom conversion events, and audience persona cohorts.',
                deliverables: ['Server-Side Meta CAPI Integration', 'GTM Container Configuration', 'Audience Segmentation Model', 'Competitor Ad Copy Audit'],
                tools: ['Meta Business Manager', 'Google Tag Manager', 'Google Analytics 4'],
                keyMetric: '100% Tracking Data Accuracy',
              },
              {
                phase: 'Phase 2',
                title: 'High-Converting Creative Production',
                duration: 'Days 8 - 18',
                status: 'Completed',
                summary: 'Produced 14 short-form video hooks, customer testimonial reels, dynamic carousel graphics, and tested multiple headlines.',
                deliverables: ['14 Dynamic Video Creatives (9:16 & 1:1)', 'Interactive Carousel Ad Packs', '8 Proven Ad Copy Variants', 'A/B Testing Matrix'],
                tools: ['Adobe Premiere Pro', 'Figma', 'After Effects'],
                keyMetric: '3.8% Average Click-Through Rate',
              },
              {
                phase: 'Phase 3',
                title: 'Multi-Channel Testing Sprint',
                duration: 'Days 19 - 32',
                status: 'Completed',
                summary: 'Launched 24 ad set variations across Facebook, Instagram, and Google Search with tight budget allocation algorithms.',
                deliverables: ['Lookalike & Custom Audiences', 'Search Intent Keywords Setup', 'Dynamic Bidding Optimizations', 'Fraud Click Filtering'],
                tools: ['Meta Ads API', 'Google Ads Keyword Planner'],
                keyMetric: '৳14.50 Average Cost Per Lead',
              },
              {
                phase: 'Phase 4',
                title: 'Scale & Retargeting Funnel',
                duration: 'Days 33 - 45',
                status: 'Delivered',
                summary: 'Scaled winning campaigns to ৳250,000 monthly ad spend while maintaining 4.8x ROAS and implementing WhatsApp remarketing.',
                deliverables: ['Dynamic Retargeting Engine', 'WhatsApp Automation Follow-up', 'Weekly Executive Performance Reports', 'LTV Optimization Roadmap'],
                tools: ['Meta Advantage+', 'WhatsApp Business API'],
                keyMetric: '4.8x Return on Ad Spend (ROAS)',
              },
            ],
          },
          {
            id: 'proj-ads-2',
            title: 'Kacchi Bhai Food Ordering & Nationwide Brand Blitz',
            client: 'Kacchi Bhai Food Group',
            industry: 'Food & Beverage',
            duration: '30 Days Sprint',
            result: '+185% Order Surge',
            resultSub: '2.4M Verified Video Views',
            description:
              'Hyper-local geolocation targeting and food videography reels that drove unprecedented walk-ins and direct online delivery orders across all branch locations.',
            tags: ['Geo-Targeting', 'Viral Reels', 'Local PPC', 'Order Funnel'],
            coverImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
            milestones: [
              {
                phase: 'Phase 1',
                title: 'Branch Geo-Radius Mapping',
                duration: 'Days 1 - 5',
                status: 'Completed',
                summary: 'Mapped 3km to 7km delivery radius boundaries around all restaurant branches in Dhaka, Chattogram, and Sylhet.',
                deliverables: ['Polygon Geofence Coordinates', 'Peak Dining Hours Schedule', 'Local Competitor Pricing Audit', 'Campaign Objectives Definition'],
                tools: ['Meta Geo-Radius Tool', 'Google Maps API'],
                keyMetric: '9 Outlets Geofenced',
              },
              {
                phase: 'Phase 2',
                title: 'Cinematic Food Visual Production',
                duration: 'Days 6 - 15',
                status: 'Completed',
                summary: 'Captured high-definition slow-motion b-roll of signature biryani dishes with appetizing sound design and mouthwatering hooks.',
                deliverables: ['6 Macro 4K Food Reels', 'Festive Offer Banners', 'Stories & Highlights Templates', 'Audio Soundscapes'],
                tools: ['Sony FX3 Cinema', 'DaVinci Resolve', 'Logic Pro'],
                keyMetric: '88% Video Completion Rate',
              },
              {
                phase: 'Phase 3',
                title: 'Lunch & Dinner Timed Ad Blitz',
                duration: 'Days 16 - 25',
                status: 'Completed',
                summary: 'Scheduled dynamic ad delivery specifically during 11:30 AM - 2:00 PM and 6:30 PM - 9:30 PM to intercept hungry consumers.',
                deliverables: ['Time-Parted Ad Delivery Schedule', 'Click-to-Call Direct Ordering', 'bKash Cashback Promotion Ads', 'Instant Lead Forms'],
                tools: ['Meta Dayparting Automation'],
                keyMetric: '+185% Inbound Order Calls',
              },
              {
                phase: 'Phase 4',
                title: 'Customer Retention & Review Campaign',
                duration: 'Days 26 - 30',
                status: 'Delivered',
                summary: 'Automated post-purchase review collection and VIP coupon retargeting for frequent food lovers.',
                deliverables: ['Review Incentive Mechanism', 'SMS Remarketing Integration', 'Lifetime Value Analysis', 'Final Campaign Deck'],
                tools: ['Twilio / BD SMS Gateway', 'Meta Custom Audiences'],
                keyMetric: '4.9 Star Google Rating across branches',
              },
            ],
          },
        ];

      case 'website-projects':
        return [
          {
            id: 'proj-web-1',
            title: 'Biyer Ghor Premium E-commerce & Wedding Registry Portal',
            client: 'Smoron Biyer Ghor',
            industry: 'E-commerce & Events',
            duration: '40 Days Sprint',
            result: '99.8% Uptime & 0.9s FCP',
            resultSub: '৳1.8M GMV in Month One',
            description:
              'A high-performance modern web storefront built with Next.js, featuring real-time inventory synchronization, gift registry, and seamless bKash/Nagad checkout.',
            tags: ['Next.js', 'React', 'bKash Gateway', 'Tailwind CSS', 'PostgreSQL'],
            coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
            milestones: [
              {
                phase: 'Phase 1',
                title: 'Architecture & UX Wireframes',
                duration: 'Days 1 - 8',
                status: 'Completed',
                summary: 'Formulated product schemas, multi-tier checkout journeys, merchant registry requirements, and mobile wireframes.',
                deliverables: ['Information Architecture Map', '28 Mobile & Desktop Wireframe Screens', 'Database ERD Diagram', 'Payment Gateway Security Spec'],
                tools: ['Figma', 'Whimsical', 'PostgreSQL Schema Designer'],
                keyMetric: 'Zero User Friction in Checkout Flow',
              },
              {
                phase: 'Phase 2',
                title: 'Design System & UI Components',
                duration: 'Days 9 - 18',
                status: 'Completed',
                summary: 'Created a luxury dark/light wedding theme with custom typography, responsive filters, and smooth micro-interactions.',
                deliverables: ['Comprehensive Design System', 'Component Library with Storybook', 'Accessible Color Contrast Guidelines', 'Interactive Prototype'],
                tools: ['Figma', 'Tailwind CSS', 'Framer Motion'],
                keyMetric: '100% Mobile Responsiveness',
              },
              {
                phase: 'Phase 3',
                title: 'Full-Stack Development & Integrations',
                duration: 'Days 19 - 32',
                status: 'Completed',
                summary: 'Coded frontend with Next.js App Router, built RESTful APIs, connected bKash & Nagad automated merchant webhooks, and SMS verification.',
                deliverables: ['Next.js React Frontend', 'Secure API Endpoints with JWT', 'bKash / Nagad Instant Webhook Verification', 'Automated PDF Invoice Engine'],
                tools: ['TypeScript', 'Next.js', 'Node.js', 'Prisma ORM'],
                keyMetric: 'Sub-second Server Response Time',
              },
              {
                phase: 'Phase 4',
                title: 'Load Testing, SEO & Zero-Downtime Launch',
                duration: 'Days 33 - 40',
                status: 'Delivered',
                summary: 'Conducted concurrent user stress tests, achieved 98 Google Lighthouse score, configured edge caching, and executed live cutover.',
                deliverables: ['Google Lighthouse 98+ Audit', 'Edge CDN Caching Configuration', 'Zero-Downtime Deployment Cutover', 'Staff Admin Training Session'],
                tools: ['Vercel Cloud', 'Cloudflare Enterprise', 'Lighthouse'],
                keyMetric: '0.9s First Contentful Paint (FCP)',
              },
            ],
          },
          {
            id: 'proj-web-2',
            title: 'SLSH Global Cloud ERP & Multi-Branch Management System',
            client: 'SLSH Global Group',
            industry: 'Corporate Enterprise & Logistics',
            duration: '60 Days Deployment',
            result: '65% Time Saved on Audits',
            resultSub: '5 Branches Synchronized',
            description:
              'Enterprise-grade web application featuring role-based access control, automated accounting invoices in BDT, inventory dispatch tracking, and live audit reports.',
            tags: ['Cloud ERP', 'RBAC Security', 'Real-Time Sync', 'Custom Dashboard'],
            coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
            milestones: [
              {
                phase: 'Phase 1',
                title: 'Enterprise Workflow Discovery',
                duration: 'Days 1 - 12',
                status: 'Completed',
                summary: 'Conducted interviews with branch managers and accountants to map transaction flows, inventory depreciation, and tax compliance.',
                deliverables: ['Workflow Gap Analysis', 'Custom Accounting Ledger Specifications', 'Role-Based Permission Matrix', 'Data Migration Plan'],
                tools: ['Miro', 'Enterprise Architecture Tools'],
                keyMetric: '100% Compliance Alignment',
              },
              {
                phase: 'Phase 2',
                title: 'Modular Dashboard UI & Prototyping',
                duration: 'Days 13 - 26',
                status: 'Completed',
                summary: 'Designed an ultra-dense, responsive data dashboard with data tables, exportable CSV/PDF modules, and dark mode for operations.',
                deliverables: ['Over 40 Dashboard Views', 'Dynamic Charting & Analytics Widgets', 'Keyboard Navigation Shortcuts', 'Executive Approval Sign-off'],
                tools: ['Figma', 'Recharts Design'],
                keyMetric: 'Optimized for 1080p and Mobile Tablets',
              },
              {
                phase: 'Phase 3',
                title: 'Core Engine & Real-Time Sync',
                duration: 'Days 27 - 48',
                status: 'Completed',
                summary: 'Engineered multi-tenant database partitioning, real-time stock transfer locks, and automated BDT invoicing with digital signatures.',
                deliverables: ['High-Concurrency Database Layer', 'WebSockets Real-Time Sync Engine', 'Automated Daily Backups to S3', 'Double-Entry Accounting Ledger'],
                tools: ['Node.js', 'PostgreSQL', 'Redis Cache', 'Docker'],
                keyMetric: 'Handles 100,000+ Daily Transactions',
              },
              {
                phase: 'Phase 4',
                title: 'Data Migration, Security Audit & Go-Live',
                duration: 'Days 49 - 60',
                status: 'Delivered',
                summary: 'Migrated 5 years of historical legacy records with 0% data loss, performed penetration tests, and deployed with 24/7 dedicated monitoring.',
                deliverables: ['Historical Data Verification Report', 'Penetration Testing Certificate', 'Admin & Branch Staff Manuals', '24/7 DevOps SLA Agreement'],
                tools: ['AWS Cloud', 'Datadog Monitoring'],
                keyMetric: '99.99% Operational Uptime',
              },
            ],
          },
        ];

      case 'video-editing':
        return [
          {
            id: 'proj-vid-1',
            title: 'Crafvanta Brand Reel & 4K Cinema Commercial',
            client: 'Crafvanta Media Studios',
            industry: 'Digital Agency / Commercial',
            duration: '21 Days Sprint',
            result: '4K Cinema Fidelity',
            resultSub: '500K+ Viral Social Reach',
            description:
              'A high-octane commercial brand showcase blending raw cinema footage, 3D motion graphics, kinetic typography, and custom atmospheric sound design.',
            tags: ['4K Commercial', 'Motion Graphics', 'Sound Design', 'Color Grading'],
            coverImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
            milestones: [
              {
                phase: 'Phase 1',
                title: 'Concept, Scripting & Storyboarding',
                duration: 'Days 1 - 4',
                status: 'Completed',
                summary: 'Developed high-energy narrative script, visual pacing boards, color palette boards, and curated licensed cinematic audio tracks.',
                deliverables: ['Treatment Deck & Visual Moodboard', 'Beat-by-Beat Storyboard Layout', 'Licensed Cinema Music Selection', 'Voiceover Script Brief'],
                tools: ['Milanote', 'Celtx Scriptwriting'],
                keyMetric: 'Clear 60-Second Narrative Arc',
              },
              {
                phase: 'Phase 2',
                title: 'Footage Assembly & Rough Cut',
                duration: 'Days 5 - 10',
                status: 'Completed',
                summary: 'Ingested raw RED and Sony 4K footage, synced multi-channel audio, and cut the first rhythm pass matched precisely to the music beats.',
                deliverables: ['Multi-Cam Synced Timeline', 'Assembly Cut (90 seconds)', 'Pacing Tightening (60s Main & 15s Teaser)', 'Director Approval Review'],
                tools: ['Adobe Premiere Pro', 'Frame.io Collaboration'],
                keyMetric: '100% Frame-Accurate Beat Alignment',
              },
              {
                phase: 'Phase 3',
                title: 'Motion Graphics & 3D Typography',
                duration: 'Days 11 - 17',
                status: 'Completed',
                summary: 'Designed sleek custom kinetic typography, 3D title lockups with chromatic aberration, and seamless match cuts.',
                deliverables: ['3D Extruded Logo Ident', 'Kinetic Lower Thirds & Metric Callouts', 'Camera Tracking & Masking Pass', 'Seamless Match Cut Transitions'],
                tools: ['After Effects', 'Cinema 4D', 'Mocha Pro'],
                keyMetric: 'Broadcast-Grade Motion Standards',
              },
              {
                phase: 'Phase 4',
                title: 'Color Grading, Audio Master & Exports',
                duration: 'Days 18 - 21',
                status: 'Delivered',
                summary: 'Applied a rich cinematic teal-and-orange grade, spatial Foley sound effects, -14 LUFS mastering, and exported cross-platform formats.',
                deliverables: ['DaVinci Resolve ACES Color Grade', '5.1 Surround & Stereo Audio Master', '16:9 4K Cinema Master (ProRes 422 HQ)', '9:16 Vertical Reel Cuts (H.265)'],
                tools: ['DaVinci Resolve Studio', 'iZotope RX 10'],
                keyMetric: 'True 4K UHD Broadcast Master',
              },
            ],
          },
          {
            id: 'proj-vid-2',
            title: 'Heaven Bakers Artisan Story Documentary & Reels Pack',
            client: 'HEAVEN BAKERS',
            industry: 'Artisan Food & Pastry',
            duration: '18 Days Sprint',
            result: '1.2M+ Organic Views',
            resultSub: '+340% IG Engagement',
            description:
              'A sensory, appetizing documentary showing the early morning craftsmanship of sourdough and pastries, adapted into 12 viral short-form clips.',
            tags: ['Documentary', 'Sensory Audio', 'Reels Pack', 'Storytelling'],
            coverImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
            milestones: [
              {
                phase: 'Phase 1',
                title: 'Visual Strategy & Sound Plan',
                duration: 'Days 1 - 3',
                status: 'Completed',
                summary: 'Planned ASMR sourdough crust crackle audio captures, morning sunlight b-roll schedules, and baker interviews.',
                deliverables: ['Shooting Shot List', 'ASMR Audio Microphone Strategy', 'Social Hook Ideation Matrix', 'Lighting Plan'],
                tools: ['Notion Project Suite'],
                keyMetric: 'Captured 40+ Unique High-FPS Angles',
              },
              {
                phase: 'Phase 2',
                title: 'Story Editing & Dialogue Weaving',
                duration: 'Days 4 - 9',
                status: 'Completed',
                summary: 'Selected authentic heartfelt soundbites from head bakers, weaving an emotional human story behind the brand.',
                deliverables: ['3-Minute Main Narrative Cut', 'Paced Story Arc with Warm Atmosphere', 'Subtitles in Bengali & English', 'Feedback Adjustments'],
                tools: ['Premiere Pro', 'Frame.io'],
                keyMetric: 'Compelling Emotional Hook',
              },
              {
                phase: 'Phase 3',
                title: 'Color Science & Sensory Audio Mixing',
                duration: 'Days 10 - 14',
                status: 'Completed',
                summary: 'Emphasized golden pastry tones, warm crust textures, and layered crisp Foley sound design with subtle acoustic score.',
                deliverables: ['Natural Warm Film Emulation LUT', 'Detailed ASMR Bread-Cutting Sound Mix', 'Loudness Balanced for Mobile Speakers', 'Subtitle Typography Package'],
                tools: ['DaVinci Resolve', 'Adobe Audition'],
                keyMetric: '99% Positive Audience Reactions',
              },
              {
                phase: 'Phase 4',
                title: 'Multi-Format Cutdowns & Social Launch',
                duration: 'Days 15 - 18',
                status: 'Delivered',
                summary: 'Created 12 vertical Reels/TikTok cutdowns with attention-grabbing first 3 seconds, resulting in immediate organic virality.',
                deliverables: ['12 Vertical Viral Reels with Hooks', 'Cover Thumbnails with Clean Typography', 'Posting Schedule Recommendations', 'Asset Archive Drive'],
                tools: ['Media Encoder', 'Photoshop'],
                keyMetric: '1.2M+ Organic Facebook & IG Views',
              },
            ],
          },
        ];

      case 'social-media-management':
      default:
        return [
          {
            id: 'proj-sm-1',
            title: 'Ranga Fashion 365-Day Social Growth Engine',
            client: 'Ranga Premium Fashion',
            industry: 'Apparel & Lifestyle',
            duration: 'Annual Retainer',
            result: '+180,000 Followers',
            resultSub: '38% Total Revenue via Social',
            description:
              'End-to-end strategic social media management spanning daily fashion reels, influencer partnerships, community DM automation, and viral aesthetic planning.',
            tags: ['Social Strategy', 'Content Calendar', 'Influencer Collabs', 'DM Automation'],
            coverImage: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80',
            milestones: [
              {
                phase: 'Phase 1',
                title: 'Brand Aesthetic & Grid Architecture',
                duration: 'Month 1',
                status: 'Completed',
                summary: 'Defined luxury color themes, moodboards, high-fashion typography, and established the 30-day recurring content pillar framework.',
                deliverables: ['Social Brand Book & Tone Guidelines', '9-Grid Instagram Layout System', 'Custom Story Templates & Highlights', 'Hashtag Repository by Category'],
                tools: ['Figma', 'Photoshop', 'Canva Enterprise'],
                keyMetric: 'Cohesive Visual Identity across 3 Channels',
              },
              {
                phase: 'Phase 2',
                title: 'Monthly Batch Content Production',
                duration: 'Monthly Sprints',
                status: 'Completed',
                summary: 'Conducted bi-weekly photoshoots and short-form video batching, producing 30 distinct feed posts, 15 reels, and 60 stories each month.',
                deliverables: ['30 High-Resolution Feed Creatives', '15 Short-Form Reels with Trending Audio', 'Engaging Interactive Poll Stories', 'Curated Bengali & English Copy'],
                tools: ['Lightroom', 'CapCut Pro', 'Premiere Pro'],
                keyMetric: 'Zero Missed Publishing Deadlines',
              },
              {
                phase: 'Phase 3',
                title: 'Influencer Seeding & Collaborations',
                duration: 'Ongoing Quarterly',
                status: 'Active',
                summary: 'Curated 25+ trusted lifestyle micro-influencers across Bangladesh to showcase festive collections with customized trackable discount codes.',
                deliverables: ['Vetted Influencer Roster & Contracts', 'Custom PR Gift Box Packaging', 'Unique Affiliate Link & Coupon Setup', 'ROI Attribution Tracking'],
                tools: ['Influencer CRM', 'Bitly Enterprise'],
                keyMetric: '6.4x Return on Influencer Gifting Spend',
              },
              {
                phase: 'Phase 4',
                title: 'Community Care & DM Automation',
                duration: '24/7 Ongoing',
                status: 'Delivered',
                summary: 'Configured automated chatbot reply flows for instant size guides, price inquiries, and seamless order handover to sales executives.',
                deliverables: ['Automated FAQ & Size Recommendation Bot', 'Average Response Time < 3 Minutes', 'Monthly Sentiment & Sentiment Analysis', 'Executive Revenue Attribution Deck'],
                tools: ['ManyChat', 'Meta Inbox Hub'],
                keyMetric: '96% Inquiries Converted Within 15 Mins',
              },
            ],
          },
          {
            id: 'proj-sm-2',
            title: 'Baby Care Store Omnichannel Community & Motherhood Hub',
            client: 'Baby Care Store Bangladesh',
            industry: 'Maternity & Retail',
            duration: '90 Days Transformation',
            result: '+450 Daily Inquiries',
            resultSub: '55,000+ Engaged Parents Community',
            description:
              'Built trust and organic authority through educational pediatric tips, authentic product demonstrations, and responsive parenting community groups.',
            tags: ['Community Hub', 'Educational Content', 'Live Q&A', 'Organic Growth'],
            coverImage: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
            milestones: [
              {
                phase: 'Phase 1',
                title: 'Parent Persona Research & Trust Strategy',
                duration: 'Days 1 - 14',
                status: 'Completed',
                summary: 'Audited common parental concerns, safety questions regarding baby skincare products, and mapped out an empathetic tone of voice.',
                deliverables: ['Parenting Pain-Point Heatmap', 'Doctor-Reviewed Content Guidelines', 'Brand Voice Safety Protocol', 'Community Rules Document'],
                tools: ['Google Surveys', 'Notion'],
                keyMetric: 'Identified Top 20 Parenting Inquiries',
              },
              {
                phase: 'Phase 2',
                title: 'Expert Educational Visuals & Video Series',
                duration: 'Days 15 - 45',
                status: 'Completed',
                summary: 'Produced animated infographics, pediatrician video soundbites, and unboxing videos showcasing verified genuine baby safety certifications.',
                deliverables: ['24 Educational Carousel Infographics', '8 Doctor Advice Video Snippets', 'Authenticity Verification Guides', 'Story Sticker Polls'],
                tools: ['Adobe Illustrator', 'After Effects'],
                keyMetric: 'Over 14,000 Post Saves & Shares',
              },
              {
                phase: 'Phase 3',
                title: 'Live Q&A & Parenting Support Group',
                duration: 'Days 46 - 70',
                status: 'Active',
                summary: 'Hosted monthly live streams with pediatric specialists, fostering a safe and supportive Facebook community group of over 55,000 members.',
                deliverables: ['Bi-Weekly Live Stream Broadcast Engine', 'Community Moderator Playbook', 'Weekly Motherhood Discussion Threads', 'Member Safety Moderation Filters'],
                tools: ['StreamYard', 'Facebook Groups Engine'],
                keyMetric: '84% Monthly Active Group Engagement',
              },
              {
                phase: 'Phase 4',
                title: 'Omnichannel Conversion & Repeat Orders',
                duration: 'Days 71 - 90',
                status: 'Delivered',
                summary: 'Integrated messenger ordering shortcuts with automated diaper and nutrition re-order reminders based on child age milestones.',
                deliverables: ['Age-Based Milestone Re-Order Engine', 'Direct bKash Payment Links in Messenger', 'Retention Rate Optimization Dashboard', 'Quarterly Scale Proposal'],
                tools: ['Meta Messenger API', 'Custom CRM Connector'],
                keyMetric: '42% Repeat Purchase Rate',
              },
            ],
          },
        ];
    }
  };

  const projectCases = getProjectsForCategory(category.id);
  const filteredProjects = projectCases.filter((p) => {
    if (!projectSearch) return true;
    const q = projectSearch.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.client.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen pt-20 pb-24 bg-white dark:bg-[#040810] text-slate-900 dark:text-white transition-colors selection:bg-blue-600 selection:text-white">
      {/* 1. Sticky Breadcrumb & Quick Action Bar */}
      <div className="sticky top-16 z-30 bg-white/95 dark:bg-[#040810]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 py-3 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer group"
          >
            <span className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-colors shadow-xs">
              ←
            </span>
            <span>Back to All Categories</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 font-mono">
            <span>Portfolio</span>
            <span>/</span>
            <span className="text-blue-600 dark:text-blue-400 font-bold">{category.title}</span>
            <span>/</span>
            <span className="text-slate-500">Interactive Milestones</span>
          </div>

          <button
            onClick={() => onOpenContact(`${category.title} Project Inquiry`)}
            className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20 cursor-pointer flex items-center gap-1.5 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Start Similar Project</span>
            <span>→</span>
          </button>
        </div>
      </div>

      {/* 2. Hero Header Banner */}
      <section className={`relative py-16 lg:py-24 bg-gradient-to-b ${category.gradientClass} text-white border-b border-white/10 overflow-hidden`}>
        {category.imageUrl && (
          <div className="absolute inset-0 z-0 opacity-25">
            <img src={category.imageUrl} alt={category.title} className="w-full h-full object-cover" />
            <div className={`absolute inset-0 bg-gradient-to-b ${category.gradientClass} opacity-90`} />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/10 backdrop-blur-md border border-white/20 shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="tracking-wider">CRAFVANTA MEDIA · PRODUCTION SHOWCASE & MILESTONE TIMELINE</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight uppercase leading-tight">
              {category.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
              Explore our proven end-to-end execution framework, development milestones, deliverable sign-offs, and verified business outcomes for {category.title.toLowerCase()}.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {category.tags.map((tag, idx) => (
                <span key={idx} className="px-3 py-1 rounded-lg text-xs font-semibold bg-white/10 border border-white/15 backdrop-blur-md">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Category Development Lifecycle Roadmap */}
      <section className="py-16 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 uppercase tracking-wider mb-2">
                <span>✦ PROVEN EXECUTION METHODOLOGY ✦</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">
                How Crafvanta Media Builds {category.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
                Click through each milestone phase to inspect our standard 4-stage delivery timeline, quality checks, and production deliverables.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 font-mono">4-STAGE SPRINT</span>
            </div>
          </div>

          {/* Stepper Timeline Nav Tabs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {categoryRoadmap.map((item, idx) => {
              const isSelected = activeCategoryPhase === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveCategoryPhase(idx)}
                  className={`p-4 rounded-2xl text-left transition-all cursor-pointer relative overflow-hidden border ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-500/20 scale-[1.02]'
                      : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg">{item.icon}</span>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                      {item.duration}
                    </span>
                  </div>
                  <div className={`text-[10px] font-bold uppercase tracking-wider mb-0.5 ${isSelected ? 'text-blue-200' : 'text-blue-600 dark:text-blue-400'}`}>
                    {item.phase}
                  </div>
                  <div className="font-extrabold text-xs sm:text-sm truncate">
                    {item.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Phase Deep Dive Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategoryPhase}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl"
            >
              <div className="grid md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-7 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl font-bold shadow-xs">
                      {categoryRoadmap[activeCategoryPhase].icon}
                    </span>
                    <div>
                      <span className="text-[10px] font-bold uppercase text-blue-600 dark:text-blue-400 font-mono tracking-wider">
                        {categoryRoadmap[activeCategoryPhase].phase} · {categoryRoadmap[activeCategoryPhase].duration}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white">
                        {categoryRoadmap[activeCategoryPhase].title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {categoryRoadmap[activeCategoryPhase].desc}
                  </p>
                </div>

                <div className="md:col-span-5 bg-slate-50 dark:bg-slate-950 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 space-y-3">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center justify-between">
                    <span>Key Milestones & Deliverables</span>
                    <span className="text-emerald-500 font-mono font-bold">100% Quality Audited</span>
                  </div>
                  <div className="space-y-2">
                    {categoryRoadmap[activeCategoryPhase].deliverables.map((deliv, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-200 font-medium">
                        <span className="w-4 h-4 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-[10px] font-bold shrink-0">
                          ✓
                        </span>
                        <span>{deliv}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 4. Individual Project Case Studies with Interactive Milestones */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              FEATURED CLIENT CASES & TIMELINES
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white mt-1">
              Project Milestones in {category.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Explore step-by-step progress, timeline duration, deliverables, and performance metrics for each real-world deployment.
            </p>
          </div>

          {/* Quick Search inside Category */}
          <div className="w-full sm:w-72 relative">
            <input
              type="text"
              value={projectSearch}
              onChange={(e) => setProjectSearch(e.target.value)}
              placeholder="Search projects or tags..."
              className="w-full px-4 py-2.5 pl-9 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 shadow-xs"
            />
            <span className="absolute left-3 top-3 text-xs text-slate-400">🔍</span>
          </div>
        </div>

        {/* Project Case Studies List */}
        <div className="space-y-16">
          {filteredProjects.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-2xl block mb-2">📂</span>
              <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">No project case studies matched your filter.</h4>
              <button
                onClick={() => setProjectSearch('')}
                className="mt-3 px-4 py-1.5 rounded-full bg-blue-600 text-white text-xs font-bold"
              >
                Clear Search
              </button>
            </div>
          ) : (
            filteredProjects.map((proj, pIdx) => {
              const currentMilestoneIdx = activeMilestones[proj.id] || 0;
              const currentMilestone = proj.milestones[currentMilestoneIdx];

              return (
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: pIdx * 0.1 }}
                  key={proj.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl hover:border-blue-500/40 transition-all"
                >
                  <div className="grid lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: Project Overview & High-Impact Stats */}
                    <div className="lg:col-span-5 space-y-5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/60">
                          {proj.duration}
                        </span>
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-800">
                          {proj.result}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          Client: <strong className="text-slate-900 dark:text-white">{proj.client}</strong> ({proj.industry})
                        </span>
                        <h3 className="text-2xl font-black text-slate-950 dark:text-white leading-tight">
                          {proj.title}
                        </h3>
                      </div>

                      {/* Project Visual Thumbnail */}
                      {proj.coverImage && (
                        <div className="relative rounded-2xl overflow-hidden aspect-16/9 border border-slate-200 dark:border-slate-800 shadow-md group">
                          <img
                            src={proj.coverImage}
                            alt={proj.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                            <span className="text-xs font-bold text-white drop-shadow-sm">
                              {proj.resultSub}
                            </span>
                          </div>
                        </div>
                      )}

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {proj.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {proj.tags.map((t, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] font-mono px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-slate-700/50"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>

                      <div className="pt-2">
                        <button
                          onClick={() => onOpenContact(`${proj.title} Consultation`)}
                          className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 hover:scale-[1.01]"
                        >
                          <span>Request Similar Project Scope</span>
                          <span>→</span>
                        </button>
                      </div>
                    </div>

                    {/* Right Column: Interactive Development Timeline & Milestone Explorer */}
                    <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-950/80 rounded-2xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between">
                      <div>
                        {/* Timeline Header */}
                        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200/80 dark:border-slate-800">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                              DEVELOPMENT TIMELINE
                            </span>
                            <h4 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                              Interactive Milestones & Deliverables
                            </h4>
                          </div>

                          <div className="text-right">
                            <span className="text-[10px] font-mono font-bold px-2 py-1 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                              Phase {currentMilestoneIdx + 1} of {proj.milestones.length}
                            </span>
                          </div>
                        </div>

                        {/* Interactive Milestone Stepper Nodes */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                          {proj.milestones.map((m, mIdx) => {
                            const isCurrent = currentMilestoneIdx === mIdx;
                            return (
                              <button
                                key={mIdx}
                                onClick={() =>
                                  setActiveMilestones((prev) => ({ ...prev, [proj.id]: mIdx }))
                                }
                                className={`p-3 rounded-xl text-left transition-all cursor-pointer border ${
                                  isCurrent
                                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-400'
                                }`}
                              >
                                <div className="flex items-center justify-between mb-1">
                                  <span className={`text-[10px] font-bold uppercase font-mono ${isCurrent ? 'text-blue-200' : 'text-slate-400'}`}>
                                    {m.phase}
                                  </span>
                                  <span className={`w-2 h-2 rounded-full ${isCurrent ? 'bg-white' : 'bg-emerald-500'}`} />
                                </div>
                                <div className="text-xs font-bold truncate">
                                  {m.title}
                                </div>
                                <span className={`text-[10px] mt-0.5 block truncate ${isCurrent ? 'text-blue-100' : 'text-slate-400'}`}>
                                  {m.duration}
                                </span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Active Milestone Detailed Inspector Card */}
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={currentMilestoneIdx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25 }}
                            className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4"
                          >
                            {/* Milestone Meta Bar */}
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900">
                                  {currentMilestone.duration}
                                </span>
                                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                                  ✓ {currentMilestone.status}
                                </span>
                              </div>

                              <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 font-mono">
                                🎯 {currentMilestone.keyMetric}
                              </span>
                            </div>

                            {/* Milestone Title & Summary */}
                            <div>
                              <h5 className="font-black text-base sm:text-lg text-slate-950 dark:text-white">
                                {currentMilestone.phase}: {currentMilestone.title}
                              </h5>
                              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                                {currentMilestone.summary}
                              </p>
                            </div>

                            {/* Deliverables Checklist */}
                            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                                Verified Deliverables & Artifacts:
                              </span>
                              <div className="grid sm:grid-cols-2 gap-2">
                                {currentMilestone.deliverables.map((deliv, dIdx) => (
                                  <div
                                    key={dIdx}
                                    className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-100 dark:border-slate-800 text-[11px] text-slate-700 dark:text-slate-300 flex items-center gap-2"
                                  >
                                    <span className="text-emerald-500 font-bold shrink-0">✓</span>
                                    <span className="truncate">{deliv}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Tooling & Technology Stack */}
                            {currentMilestone.tools && currentMilestone.tools.length > 0 && (
                              <div className="pt-2 flex flex-wrap items-center gap-1.5">
                                <span className="text-[10px] font-bold uppercase text-slate-400 mr-1">
                                  Tools:
                                </span>
                                {currentMilestone.tools.map((tool, tIdx) => (
                                  <span
                                    key={tIdx}
                                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-900/40"
                                  >
                                    {tool}
                                  </span>
                                ))}
                              </div>
                            )}
                          </motion.div>
                        </AnimatePresence>
                      </div>

                      {/* Timeline Navigation Controls */}
                      <div className="pt-4 mt-6 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                        <button
                          disabled={currentMilestoneIdx === 0}
                          onClick={() =>
                            setActiveMilestones((prev) => ({
                              ...prev,
                              [proj.id]: Math.max(0, currentMilestoneIdx - 1),
                            }))
                          }
                          className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                        >
                          ← Previous Phase
                        </button>

                        <div className="flex items-center gap-1">
                          {proj.milestones.map((_, dotIdx) => (
                            <button
                              key={dotIdx}
                              onClick={() =>
                                setActiveMilestones((prev) => ({ ...prev, [proj.id]: dotIdx }))
                              }
                              className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                                currentMilestoneIdx === dotIdx ? 'bg-blue-600 w-6' : 'bg-slate-300 dark:bg-slate-700'
                              }`}
                            />
                          ))}
                        </div>

                        <button
                          disabled={currentMilestoneIdx === proj.milestones.length - 1}
                          onClick={() =>
                            setActiveMilestones((prev) => ({
                              ...prev,
                              [proj.id]: Math.min(proj.milestones.length - 1, currentMilestoneIdx + 1),
                            }))
                          }
                          className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                        >
                          Next Phase →
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </section>

      {/* 5. Explore Other Categories Footer Bar */}
      <section className="py-16 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                DISCOVER MORE DISCIPLINES
              </span>
              <h3 className="text-2xl font-black text-slate-950 dark:text-white mt-1">
                Explore More Portfolio Categories
              </h3>
            </div>
            <button
              onClick={onBack}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
            >
              View All Categories Overview →
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allCategories
              .filter((c) => c.id !== category.id)
              .map((other) => (
                <div
                  key={other.id}
                  onClick={() => onSelectCategory(other)}
                  className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 font-bold uppercase">
                        {other.projectCount}
                      </span>
                    </div>
                    <h4 className="font-bold text-base text-slate-950 dark:text-white group-hover:text-blue-600 transition-colors">
                      {other.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                      Interactive milestones, development timelines, and conversion case studies.
                    </p>
                  </div>

                  <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 mt-4 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Inspect Timelines</span>
                    <span>→</span>
                  </span>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
