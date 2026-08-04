export type ProjectCategory =
  | "Kurumsal"
  | "Lansman"
  | "Festival"
  | "Konser"
  | "Özel Davet"
  | "Prodüksiyon";

export interface StatisticItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
}

export interface MarqueeItem {
  id: string;
  text: string;
}

export interface ValueItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  active: boolean;
  sortOrder: number;
}

export interface ServiceFeature {
  id: string;
  text: string;
}

export type ServiceLayoutVariant =
  | "split"
  | "full-image"
  | "editorial"
  | "collage";

export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  imageUrl: string;
  features: ServiceFeature[];
  buttonText: string;
  active: boolean;
  sortOrder: number;
  /** Optional display fields — normalized for older LocalStorage payloads */
  eyebrow?: string;
  accentLabel?: string;
  featured?: boolean;
  layoutVariant?: ServiceLayoutVariant;
}

export interface ReferenceItem {
  id: string;
  companyName: string;
  projectTitle: string;
  category: ProjectCategory;
  eventDate: string;
  shortDescription: string;
  logoUrl: string;
  coverImageUrl: string;
  active: boolean;
  sortOrder: number;
  testimonial?: string;
  testimonialAuthor?: string;
}

export interface ClientLogo {
  id: string;
  name: string;
  logoUrl: string;
}

export interface HomePageContent {
  heroHeadline: string;
  heroDescription: string;
  primaryButtonText: string;
  primaryButtonUrl: string;
  secondaryButtonText: string;
  secondaryButtonUrl: string;
  marqueeTexts: MarqueeItem[];
  aboutPreviewTitle: string;
  aboutPreviewDescription: string;
  servicesSectionTitle: string;
  projectsSectionTitle: string;
  statistics: StatisticItem[];
  valuesSectionTitle: string;
  contactCtaTitle: string;
  contactCtaDescription: string;
}

export interface AboutPageContent {
  pageTitle: string;
  pageSubtitle: string;
  companyStory: string;
  vision: string;
  mission: string;
  companyApproach: string;
  workCultureTitle: string;
  workCultureDescription: string;
  teamPhilosophy: string;
  statistics: StatisticItem[];
  ctaTitle: string;
  ctaDescription: string;
  marqueeTexts: MarqueeItem[];
}

export interface ContactInfo {
  /** @deprecated Prefer mobilePhone; kept for LocalStorage migration compatibility */
  phone?: string;
  mobilePhone: string;
  landlinePhone: string;
  email: string;
  address: string;
  workingHours: string;
  instagram: string;
  linkedin: string;
  youtube: string;
  mapUrl: string;
  whatsappUrl: string;
}

export interface SiteSettings {
  siteName: string;
  logoText: string;
  tagline: string;
  footerDescription: string;
  primaryAccent: string;
  secondaryAccent: string;
  seoTitle: string;
  seoDescription: string;
  copyrightText: string;
  instagram: string;
  linkedin: string;
  youtube: string;
}

export interface ContactMessage {
  id: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  message: string;
  kvkkAccepted: boolean;
  submittedAt: string;
  read: boolean;
}

export interface SiteContent {
  home: HomePageContent;
  about: AboutPageContent;
  values: ValueItem[];
  services: ServiceItem[];
  references: ReferenceItem[];
  clientLogos: ClientLogo[];
  contactInfo: ContactInfo;
  settings: SiteSettings;
  lastUpdated: string;
}

export type AdminSection =
  | "overview"
  | "home"
  | "about"
  | "values"
  | "services"
  | "references"
  | "contact-info"
  | "messages"
  | "settings";
