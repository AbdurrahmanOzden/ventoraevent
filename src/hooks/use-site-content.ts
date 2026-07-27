"use client";

import { useEffect } from "react";
import { useSiteContentStore } from "@/store/site-content";

export function useSiteContent() {
  const hydrated = useSiteContentStore((s) => s.hydrated);
  const hydrate = useSiteContentStore((s) => s.hydrate);
  const content = useSiteContentStore((s) => s.content);
  const updateHomePage = useSiteContentStore((s) => s.updateHomePage);
  const updateAboutPage = useSiteContentStore((s) => s.updateAboutPage);
  const addService = useSiteContentStore((s) => s.addService);
  const updateService = useSiteContentStore((s) => s.updateService);
  const deleteService = useSiteContentStore((s) => s.deleteService);
  const reorderServices = useSiteContentStore((s) => s.reorderServices);
  const addReference = useSiteContentStore((s) => s.addReference);
  const updateReference = useSiteContentStore((s) => s.updateReference);
  const deleteReference = useSiteContentStore((s) => s.deleteReference);
  const reorderReferences = useSiteContentStore((s) => s.reorderReferences);
  const addValue = useSiteContentStore((s) => s.addValue);
  const updateValue = useSiteContentStore((s) => s.updateValue);
  const deleteValue = useSiteContentStore((s) => s.deleteValue);
  const reorderValues = useSiteContentStore((s) => s.reorderValues);
  const updateContactInfo = useSiteContentStore((s) => s.updateContactInfo);
  const updateSiteSettings = useSiteContentStore((s) => s.updateSiteSettings);
  const resetContent = useSiteContentStore((s) => s.resetContent);

  useEffect(() => {
    if (!hydrated) hydrate();
  }, [hydrated, hydrate]);

  return {
    content,
    hydrated,
    updateHomePage,
    updateAboutPage,
    addService,
    updateService,
    deleteService,
    reorderServices,
    addReference,
    updateReference,
    deleteReference,
    reorderReferences,
    addValue,
    updateValue,
    deleteValue,
    reorderValues,
    updateContactInfo,
    updateSiteSettings,
    resetContent,
  };
}
