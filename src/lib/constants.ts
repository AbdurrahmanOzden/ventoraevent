export const STORAGE_KEY = "event-site-content";
export const MESSAGES_KEY = "contactMessages";
export const AUTH_KEY = "nova-event-admin-auth";

/** LOCAL DEVELOPMENT ONLY — not secure. Replace before any production deploy. */
export const DEV_ADMIN_USERNAME = "admin";
export const DEV_ADMIN_PASSWORD = "admin123";

export const NAV_ITEMS = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/biz-kimiz", label: "Biz Kimiz" },
  { href: "/neler-yapiyoruz", label: "Neler Yapıyoruz" },
  { href: "/referanslar", label: "Referanslar" },
  { href: "/iletisim", label: "İletişim" },
] as const;

export const PROJECT_CATEGORIES = [
  "Kurumsal",
  "Festival",
  "Özel Davet",
  "Mezuniyet",
  "Prodüksiyon",
] as const;

export const EVENT_TYPES = [
  "Kurumsal Etkinlik",
  "Mezuniyet",
  "Festival / Açık Hava",
  "Özel Davet",
  "Kongre ve Toplantı",
  "M.I.C.E & Event",
  "Diğer",
] as const;
