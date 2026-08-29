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
          "relative fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-[var(--line)] bg-[var(--background)]/85 backdrop-blur-xl"
            : "bg-transparent"
        )}
      >
        <div className="flex h-16 w-full items-center justify-between gap-2 pl-4 pr-[max(2px,env(safe-area-inset-right))] md:h-[4.5rem] md:px-4">
          <Link
            href="/"
            className="relative z-[60] shrink-0"
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

          <div className="pointer-events-none absolute inset-x-0 hidden justify-center sm:flex">
            <div className="pointer-events-none text-center">
              <p className="text-[0.68rem] tracking-[0.22em] text-[var(--muted)] uppercase">
                {PAGE_LABELS[pathname] || content.settings.logoText}
              </p>
              <div className="mx-auto mt-2 h-px w-16 overflow-hidden bg-[var(--line)]">
                <div className="h-full w-1/2 bg-[var(--accent)]" />
              </div>
            </div>
          </div>

          <div className="relative z-[61] ml-auto flex shrink-0 items-center justify-end gap-1.5">
            <PrimaryButton href="/iletisim" size="sm" className="px-3 py-2 text-xs sm:px-4 sm:text-sm">
              Teklif Al
            </PrimaryButton>
            <button
              type="button"
              aria-label="Menüyü aç"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="group mr-0 flex h-10 w-10 shrink-0 items-center justify-center border border-[var(--line)] hover:border-[var(--foreground)]"
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
