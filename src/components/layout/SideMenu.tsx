"use client";

import { menuItem, menuOverlay, menuPanel } from "@/lib/animations";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useEscapeKey, useLockedBody, useReducedMotion } from "@/hooks/use-ui";
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
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
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
            className="absolute inset-y-0 right-0 flex w-full max-w-xl flex-col border-l border-[var(--border)] bg-[var(--background)] px-8 py-8 md:px-14"
            variants={reduced ? undefined : menuPanel}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="mb-12 flex items-start justify-between">
              <div>
                <p className="font-display text-2xl font-bold">{logoText}</p>
                <p className="mt-2 max-w-xs text-sm text-[var(--muted)]">{tagline}</p>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Menüyü kapat"
                className="rounded-full border border-[var(--border)] p-3 text-white hover:bg-white/5"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <ul className="flex flex-1 flex-col gap-2">
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
                      className={cn(
                        "group flex items-center justify-between border-b border-white/5 py-4 font-display text-3xl font-semibold tracking-tight transition-colors md:text-5xl",
                        active ? "text-white" : "text-white/55 hover:text-white"
                      )}
                      aria-current={active ? "page" : undefined}
                    >
                      <span className="relative">
                        {item.label}
                        <span
                          className={cn(
                            "absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] transition-all duration-300",
                            active ? "w-full" : "w-0 group-hover:w-full"
                          )}
                        />
                      </span>
                      <span className="text-sm text-[var(--muted)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </Link>
                  </motion.li>
                );
              })}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/iletisim"
                onClick={onClose}
                className="inline-flex rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-medium text-white shadow-[0_0_24px_var(--glow-primary)]"
              >
                Teklif Al
              </Link>
              <a
                href="tel:+905321715043"
                className="inline-flex rounded-full border border-[var(--border)] px-5 py-3 text-sm text-white hover:bg-white/5"
              >
                Ara
              </a>
              <a
                href="https://wa.me/905321715043"
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-full border border-[var(--border)] px-5 py-3 text-sm text-white hover:bg-white/5"
              >
                WhatsApp
              </a>
            </div>
          </motion.nav>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
