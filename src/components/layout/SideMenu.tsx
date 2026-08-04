"use client";

import { menuItem, menuOverlay, menuPanel } from "@/lib/animations";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useEscapeKey, useLockedBody, useReducedMotion } from "@/hooks/use-ui";
import { useSiteContent } from "@/hooks/use-site-content";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface SideMenuProps {
  open: boolean;
  onClose: () => void;
  logoText: string;
  tagline: string;
}

export function SideMenu({ open, onClose, logoText, tagline }: SideMenuProps) {
  const pathname = usePathname();
  const { content } = useSiteContent();
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();
  useLockedBody(open);
  useEscapeKey(onClose, open);

  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[70]">
          <motion.button
            type="button"
            aria-label="Menüyü kapat"
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
            variants={reduced ? undefined : menuOverlay}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />
          <motion.nav
            role="dialog"
            aria-modal="true"
            aria-label="Ana menü"
            className="absolute inset-0 flex flex-col bg-[var(--background)] md:inset-y-0 md:right-0 md:left-auto md:w-[min(100%,720px)] md:border-l md:border-[var(--line)]"
            variants={reduced ? undefined : menuPanel}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex items-start justify-between border-b border-[var(--line)] px-6 py-6 md:px-10">
              <div>
                <p className="font-display text-2xl font-semibold">{logoText}</p>
                <p className="mt-2 max-w-sm text-sm text-[var(--muted)]">{tagline}</p>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Menüyü kapat"
                className="border border-[var(--line)] p-3 hover:border-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid flex-1 gap-8 overflow-y-auto px-6 py-8 md:grid-cols-[1.1fr_0.9fr] md:px-10">
              <ul className="space-y-1">
                {NAV_ITEMS.map((item, index) => {
                  const active = pathname === item.href;
                  return (
                    <motion.li
                      key={item.href}
                      custom={index}
                      variants={reduced ? undefined : menuItem}
                      initial="hidden"
                      animate="visible"
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "group flex items-baseline gap-4 border-b border-white/5 py-4 transition",
                          active ? "text-white" : "text-white/55 hover:text-white"
                        )}
                      >
                        <span className="text-xs tabular-nums text-[var(--muted)]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
                          {item.label}
                        </span>
                        <span
                          className={cn(
                            "ml-auto h-px bg-[var(--accent)] transition-all",
                            active ? "w-10" : "w-0 group-hover:w-8"
                          )}
                        />
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              <div className="flex flex-col justify-between border border-[var(--line)] bg-[var(--surface)] p-6">
                <div>
                  <p className="text-xs tracking-[0.2em] text-[var(--accent)] uppercase">
                    İletişim
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
                    {content.contactInfo.address}
                  </p>
                  <a
                    href="tel:+905321715043"
                    className="mt-4 block text-white hover:text-[var(--accent)]"
                  >
                    {content.contactInfo.mobilePhone}
                  </a>
                  <a
                    href={`mailto:${content.contactInfo.email}`}
                    className="mt-2 block text-white hover:text-[var(--accent)]"
                  >
                    {content.contactInfo.email}
                  </a>
                </div>
                <Link
                  href="/iletisim"
                  onClick={onClose}
                  className="mt-8 inline-flex bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white"
                >
                  Teklif Al
                </Link>
              </div>
            </div>
          </motion.nav>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
