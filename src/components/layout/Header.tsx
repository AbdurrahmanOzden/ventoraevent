"use client";

import { SideMenu } from "@/components/layout/SideMenu";
import { PrimaryButton } from "@/components/ui/Button";
import { useSiteContent } from "@/hooks/use-site-content";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const PAGE_LABELS: Record<string, string> = {
  "/": "Ana Sayfa",
  "/biz-kimiz": "Biz Kimiz",
  "/neler-yapiyoruz": "Neler Yapıyoruz",
  "/referanslar": "Referanslar",
  "/iletisim": "İletişim",
};

export function Header() {
  const { content } = useSiteContent();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
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
            ? "border-b border-[var(--line)] bg-[var(--background)]/85 backdrop-blur-xl"
            : "bg-transparent"
        )}
      >
        <div className="grid h-16 w-full grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 md:h-[4.5rem] md:px-5">
          <Link
            href="/"
            className="relative z-[60] justify-self-start"
            onClick={(event) => {
              if (pathname === "/") {
                event.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            <span className="font-display text-lg font-semibold tracking-tight md:text-xl">
              {content.settings.logoText}
            </span>
          </Link>

          <div className="hidden text-center sm:block">
            <p className="text-[0.68rem] tracking-[0.22em] text-[var(--muted)] uppercase">
              {PAGE_LABELS[pathname] || content.settings.logoText}
            </p>
            <div className="mx-auto mt-2 h-px w-16 overflow-hidden bg-[var(--line)]">
              <div className="h-full w-1/2 bg-[var(--accent)]" />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <PrimaryButton href="/iletisim" size="sm" className="hidden sm:inline-flex">
              Teklif Al
            </PrimaryButton>
            <button
              type="button"
              aria-label="Menüyü aç"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="group flex h-10 w-10 items-center justify-center border border-[var(--line)] hover:border-[var(--foreground)]"
            >
              <span className="flex w-4 flex-col gap-1.5">
                <span className="h-px w-full bg-white transition group-hover:translate-x-0.5" />
                <span className="h-px w-3 self-end bg-white transition group-hover:w-full" />
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
