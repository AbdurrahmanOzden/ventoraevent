"use client";

import { create } from "zustand";
import { defaultSiteContent } from "@/data/default-site-content";
import { STORAGE_KEY } from "@/lib/constants";
import { normalizeSiteContent } from "@/lib/normalize";
import { generateId, reorderList } from "@/lib/utils";
import type {
  AboutPageContent,
  ContactInfo,
  HomePageContent,
  ReferenceItem,
  ServiceItem,
  SiteContent,
  SiteSettings,
} from "@/types/content";

interface SiteContentState {
  content: SiteContent;
  hydrated: boolean;
  hydrate: () => void;
  setContent: (content: SiteContent) => void;
  persist: (content: SiteContent) => void;
  updateHomePage: (home: Partial<HomePageContent>) => void;
  updateAboutPage: (about: Partial<AboutPageContent>) => void;
  addService: (service: Omit<ServiceItem, "id" | "sortOrder">) => void;
  updateService: (id: string, updates: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;
  reorderServices: (fromIndex: number, toIndex: number) => void;
  addReference: (reference: Omit<ReferenceItem, "id" | "sortOrder">) => void;
  updateReference: (id: string, updates: Partial<ReferenceItem>) => void;
  deleteReference: (id: string) => void;
  reorderReferences: (fromIndex: number, toIndex: number) => void;
  updateContactInfo: (info: Partial<ContactInfo>) => void;
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
  resetContent: () => void;
}

function withTimestamp(content: SiteContent): SiteContent {
  return { ...content, lastUpdated: new Date().toISOString() };
}

function readStoredContent(): SiteContent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return migrateContent(JSON.parse(raw) as SiteContent);
  } catch {
    return null;
  }
}

const SERVICE_IMAGE_BY_ID: Record<string, string> = {
  svc1: "/images/services/kurumsal-etkinlikler-2026.jpg",
  svc3: "/images/services/festival-konser-yonetimi.mp4",
  svc4: "/images/services/ozel-davetler-2026.jpg",
  svc5: "/images/services/mezuniyet.png",
  svc6: "/images/services/mice-event.png",
};

const REFERENCE_IMAGE_BY_ID: Record<string, string> = {
  ref2: "/images/services/mezuniyet.png",
  ref3: "/images/projects/acik-hava-muzik-festivali.jpg",
};

const REMOVED_SERVICE_IDS = new Set(["svc2", "svc7", "svc8"]);
const REMOVED_SERVICE_TITLES = new Set([
  "Lansman ve Marka Deneyimleri",
  "Sahne ve Teknik Prodüksiyon",
  "Kongre ve Toplantı Yönetimi",
  "Kreatif Konsept Tasarımı",
  "Dijital ve Hibrit Etkinlikler",
]);
const REMOVED_REFERENCE_TITLES = new Set([
  "Yeni Ürün Lansmanı",
  "Stad Konser Prodüksiyonu",
  "Yıllık Liderlik Zirvesi 2025",
  "Gala ve Ödül Töreni",
]);

function migrateContent(stored: SiteContent): SiteContent {
  const defaults = defaultSiteContent;
  const legacyPhone =
    "phone" in stored.contactInfo
      ? (stored.contactInfo as ContactInfo & { phone?: string }).phone
      : undefined;

  const looksLikeLegacyBrand =
    stored.settings.siteName === "Nova Event" ||
    stored.settings.logoText === "Nova Event" ||
    stored.contactInfo.email?.includes("novaevent") ||
    !stored.contactInfo.mobilePhone;

  const contactInfo: ContactInfo = {
    ...defaults.contactInfo,
    ...stored.contactInfo,
    mobilePhone:
      stored.contactInfo.mobilePhone ||
      legacyPhone ||
      defaults.contactInfo.mobilePhone,
    landlinePhone:
      stored.contactInfo.landlinePhone || defaults.contactInfo.landlinePhone,
    whatsappUrl:
      stored.contactInfo.whatsappUrl || defaults.contactInfo.whatsappUrl,
  };

  if (looksLikeLegacyBrand) {
    contactInfo.email = defaults.contactInfo.email;
    contactInfo.address = defaults.contactInfo.address;
    contactInfo.mobilePhone = defaults.contactInfo.mobilePhone;
    contactInfo.landlinePhone = defaults.contactInfo.landlinePhone;
    contactInfo.whatsappUrl = defaults.contactInfo.whatsappUrl;
    contactInfo.instagram = defaults.contactInfo.instagram;
    contactInfo.linkedin = defaults.contactInfo.linkedin;
    contactInfo.youtube = defaults.contactInfo.youtube;
  }

  const settings: SiteSettings = looksLikeLegacyBrand
    ? {
        ...stored.settings,
        siteName: defaults.settings.siteName,
        logoText: defaults.settings.logoText,
        seoTitle: defaults.settings.seoTitle,
        copyrightText: defaults.settings.copyrightText,
        instagram: defaults.settings.instagram,
        linkedin: defaults.settings.linkedin,
        youtube: defaults.settings.youtube,
      }
    : { ...defaults.settings, ...stored.settings };

  const about = looksLikeLegacyBrand
    ? {
        ...stored.about,
        pageSubtitle: defaults.about.pageSubtitle,
        companyStory: defaults.about.companyStory,
      }
    : stored.about;

  const home = {
    ...stored.home,
    marqueeTexts: stored.home.marqueeTexts.map((item) =>
      item.text === "TASARIM • PRODÜKSİYON • ORGANİZASYON"
        ? { ...item, text: "ORGANİZASYON" }
        : item
    ),
  };

  const mezuniyetService = defaults.services.find((service) => service.id === "svc5");
  const miceService = defaults.services.find((service) => service.id === "svc6");
  const mezuniyetReference = defaults.references.find((reference) => reference.id === "ref2");

  let services = stored.services
    .filter(
      (service) =>
        !REMOVED_SERVICE_IDS.has(service.id) &&
        !REMOVED_SERVICE_TITLES.has(service.title)
    )
    .map((service) => {
      if (service.id === "svc5") {
        return mezuniyetService ? { ...mezuniyetService } : service;
      }
      if (service.id === "svc6") {
        return miceService ? { ...miceService } : service;
      }
      const nextImage = SERVICE_IMAGE_BY_ID[service.id];
      return nextImage ? { ...service, imageUrl: nextImage } : service;
    });

  if (mezuniyetService && !services.some((service) => service.title === "Mezuniyet")) {
    services = [...services, mezuniyetService];
  }

  if (miceService && !services.some((service) => service.title === "M.I.C.E & EVENT")) {
    services = [...services, miceService];
  }

  services = services.map((service, index) => ({ ...service, sortOrder: index + 1 }));

  let references = stored.references.filter((reference) => {
    const category = String(reference.category);
    return (
      category !== "Lansman" &&
      category !== "Konser" &&
      !REMOVED_REFERENCE_TITLES.has(reference.projectTitle)
    );
  });

  if (mezuniyetReference && !references.some((reference) => reference.category === "Mezuniyet")) {
    references = [mezuniyetReference, ...references];
  }

  references = references.map((reference, index) => {
    const nextImage =
      REFERENCE_IMAGE_BY_ID[reference.id] ||
      (reference.projectTitle === "Açık Hava Müzik Festivali"
        ? "/images/projects/acik-hava-muzik-festivali.jpg"
        : reference.category === "Mezuniyet"
          ? "/images/services/mezuniyet.png"
          : undefined);
    return {
      ...reference,
      coverImageUrl: nextImage || reference.coverImageUrl,
      sortOrder: index + 1,
    };
  });

  const restStored = { ...stored } as SiteContent & { values?: unknown };
  delete restStored.values;

  return normalizeSiteContent({
    ...restStored,
    settings,
    contactInfo,
    home,
    about,
    services,
    references,
  });
}

export const useSiteContentStore = create<SiteContentState>((set, get) => ({
  content: defaultSiteContent,
  hydrated: false,

  hydrate: () => {
    const stored = readStoredContent();
    const content = normalizeSiteContent(stored ?? defaultSiteContent);
    set({
      content,
      hydrated: true,
    });
    if (stored && typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    }
  },

  setContent: (content) => set({ content }),

  persist: (content) => {
    const next = withTimestamp(content);
    set({ content: next });
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    }
  },

  updateHomePage: (home) => {
    const { content, persist } = get();
    persist({ ...content, home: { ...content.home, ...home } });
  },

  updateAboutPage: (about) => {
    const { content, persist } = get();
    persist({ ...content, about: { ...content.about, ...about } });
  },

  addService: (service) => {
    const { content, persist } = get();
    const sortOrder = content.services.length + 1;
    persist({
      ...content,
      services: [...content.services, { ...service, id: generateId("svc"), sortOrder }],
    });
  },

  updateService: (id, updates) => {
    const { content, persist } = get();
    persist({
      ...content,
      services: content.services.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    });
  },

  deleteService: (id) => {
    const { content, persist } = get();
    persist({
      ...content,
      services: content.services
        .filter((item) => item.id !== id)
        .map((item, index) => ({ ...item, sortOrder: index + 1 })),
    });
  },

  reorderServices: (fromIndex, toIndex) => {
    const { content, persist } = get();
    persist({
      ...content,
      services: reorderList(content.services, fromIndex, toIndex),
    });
  },

  addReference: (reference) => {
    const { content, persist } = get();
    const sortOrder = content.references.length + 1;
    persist({
      ...content,
      references: [
        ...content.references,
        { ...reference, id: generateId("ref"), sortOrder },
      ],
    });
  },

  updateReference: (id, updates) => {
    const { content, persist } = get();
    persist({
      ...content,
      references: content.references.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    });
  },

  deleteReference: (id) => {
    const { content, persist } = get();
    persist({
      ...content,
      references: content.references
        .filter((item) => item.id !== id)
        .map((item, index) => ({ ...item, sortOrder: index + 1 })),
    });
  },

  reorderReferences: (fromIndex, toIndex) => {
    const { content, persist } = get();
    persist({
      ...content,
      references: reorderList(content.references, fromIndex, toIndex),
    });
  },

  updateContactInfo: (info) => {
    const { content, persist } = get();
    persist({ ...content, contactInfo: { ...content.contactInfo, ...info } });
  },

  updateSiteSettings: (settings) => {
    const { content, persist } = get();
    persist({ ...content, settings: { ...content.settings, ...settings } });
  },

  resetContent: () => {
    const next = withTimestamp(structuredClone(defaultSiteContent));
    set({ content: next });
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    }
  },
}));
