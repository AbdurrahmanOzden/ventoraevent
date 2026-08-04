import { generateId } from "@/lib/utils";
import type {
  ServiceFeature,
  ServiceItem,
  ServiceLayoutVariant,
  SiteContent,
} from "@/types/content";

const LAYOUTS: ServiceLayoutVariant[] = [
  "split",
  "full-image",
  "editorial",
  "collage",
];

export function normalizeService(
  service: Partial<ServiceItem>,
  index = 0
): ServiceItem {
  const features: ServiceFeature[] = Array.isArray(service.features)
    ? service.features.map((feature, featureIndex) => ({
        id: feature.id || generateId(`f${featureIndex}`),
        text: feature.text || "",
      }))
    : [];

  const layout =
    service.layoutVariant && LAYOUTS.includes(service.layoutVariant)
      ? service.layoutVariant
      : LAYOUTS[index % LAYOUTS.length];

  return {
    id: service.id || generateId("svc"),
    title: service.title || "Yeni Hizmet",
    shortDescription: service.shortDescription || "",
    detailedDescription: service.detailedDescription || "",
    imageUrl: service.imageUrl || "/images/services/kurumsal-etkinlikler.jpg",
    features,
    buttonText: service.buttonText || "Hizmeti İncele",
    active: service.active ?? true,
    sortOrder: service.sortOrder ?? index + 1,
    eyebrow: service.eyebrow || "VENTORA",
    accentLabel: service.accentLabel || "",
    featured: service.featured ?? index < 4,
    layoutVariant: layout,
  };
}

export function normalizeSiteContent(content: SiteContent): SiteContent {
  return {
    ...content,
    services: content.services
      .map((service, index) => normalizeService(service, index))
      .sort((a, b) => a.sortOrder - b.sortOrder),
  };
}
