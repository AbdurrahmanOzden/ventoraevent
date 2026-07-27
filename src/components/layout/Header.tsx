"use client";

import { SideMenu } from "@/components/layout/SideMenu";
import { PrimaryButton } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useSiteContent } from "@/hooks/use-site-content";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Header() {
  const { content } = useSiteContent();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-xl"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <Link href="/" className="group min-w-0">
            <span className="font-display block truncate text-xl font-bold tracking-tight md:text-2xl">
              {content.settings.logoText}
            </span>
            <span className="mt-0.5 hidden text-xs text-[var(--muted)] sm:block">
              {content.settings.tagline}
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <PrimaryButton href="/iletisim" size="sm" className="hidden sm:inline-flex">
              Teklif Al
            </PrimaryButton>
            <button
              type="button"
              aria-label="Menüyü aç"
              aria-expanded={open}
              aria-controls="side-menu"
              onClick={() => setOpen(true)}
              className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-white/5 hover:bg-white/10"
            >
              <span className="sr-only">Menü</span>
              <span className="flex w-5 flex-col gap-1.5">
                <span className="h-0.5 w-full rounded bg-white transition-transform group-hover:translate-x-0.5" />
                <span className="h-0.5 w-3.5 self-end rounded bg-white transition-all group-hover:w-full" />
                <span className="h-0.5 w-full rounded bg-white transition-transform group-hover:-translate-x-0.5" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <SideMenu
        open={open}
        onClose={() => setOpen(false)}
        logoText={content.settings.logoText}
        tagline={content.settings.tagline}
      />
    </>
  );
}
