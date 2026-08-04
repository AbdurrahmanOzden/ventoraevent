"use client";

import { ToastViewport } from "@/components/ui/Toast";
import { LoadingScreen } from "@/components/ui/Feedback";
import { useMessagesStore } from "@/store/messages";
import { useSiteContentStore } from "@/store/site-content";
import { useEffect, useState, type ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  const hydrateContent = useSiteContentStore((s) => s.hydrate);
  const hydrated = useSiteContentStore((s) => s.hydrated);
  const content = useSiteContentStore((s) => s.content);
  const hydrateMessages = useMessagesStore((s) => s.hydrate);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    hydrateContent();
    hydrateMessages();
  }, [hydrateContent, hydrateMessages]);

  useEffect(() => {
    if (!hydrated) return;
    const timer = window.setTimeout(() => setShowLoader(false), 700);
    return () => window.clearTimeout(timer);
  }, [hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.style.setProperty("--accent", content.settings.primaryAccent);
    document.documentElement.style.setProperty("--primary", content.settings.primaryAccent);
    document.documentElement.style.setProperty("--secondary", content.settings.secondaryAccent);
    document.documentElement.style.setProperty(
      "--accent-soft",
      `${content.settings.primaryAccent}29`
    );
  }, [hydrated, content.settings.primaryAccent, content.settings.secondaryAccent]);

  return (
    <>
      <LoadingScreen companyName={content.settings.logoText} visible={showLoader} />
      {children}
      <ToastViewport />
    </>
  );
}
