export interface LeadInquiry {
  id: string;
  name: string;
  contact: string;
  service: string;
  message: string;
  timestamp: string;
  status: 'New' | 'In Progress' | 'Contacted' | 'Converted' | 'Archived';
  notes?: string;
  budget?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  badge: string;
  category: string;
  tags: string[];
  active: boolean;
  iconColor?: string;
  imageUrl?: string;
}

export interface PortfolioCategory {
  id: string;
  title: string;
  projectCount: string;
  gradientClass: string;
  borderClass: string;
  tags: string[];
  imageUrl?: string;
}

export interface ClientBrand {
  id: string;
  name: string;
  sub: string;
  color: string;
}

export interface HeroSlideItem {
  id: string;
  tabNumber: string;
  tabName: string;
  title: string;
  badge: string;
  description: string;
  image: string;
}

export interface AgencySettings {
  agencyName: string;
  tagline: string;
  email: string;
  phone: string;
  whatsapp: string;
  location: string;
  heroHeadline: string;
  heroNotice: string;
  heroSmallLabel?: string;
  heroButtonText?: string;
  heroButtonLink?: string;
  heroSecondaryButtonText?: string;
  heroSecondaryButtonLink?: string;
  seoTitle: string;
  seoDescription: string;
  socialImageURL: string;
  facebookURL?: string;
  instagramURL?: string;
  linkedinURL?: string;
  twitterURL?: string;
  youtubeURL?: string;
  githubURL?: string;
  logoUrl?: string;
  bkashNumber?: string;
  nagadNumber?: string;
  bankDetails?: string;
}
