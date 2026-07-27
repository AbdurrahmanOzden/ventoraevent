"use client";

import { fadeUp } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
import Link from "next/link";
import * as Icons from "lucide-react";

interface ServiceCardProps {
  number: string;
  title: string;
  description: string;
  icon?: string;
  href?: string;
  className?: string;
}

export function ServiceCard({
  number,
  title,
  description,
  icon = "Sparkles",
  href = "/neler-yapiyoruz",
  className,
}: ServiceCardProps) {
  const Icon = (Icons[icon as keyof typeof Icons] as LucideIcon) || Icons.Sparkles;

  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -6 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]/80 p-6 transition-shadow hover:shadow-[0_0_40px_var(--glow-primary)]",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/0 via-transparent to-[var(--secondary)]/10 opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="relative z-10">
        <div className="mb-8 flex items-start justify-between">
          <div className="rounded-xl border border-[var(--border)] bg-white/5 p-3 text-[var(--primary)]">
            <Icon className="h-6 w-6" aria-hidden />
          </div>
          <span className="font-display text-sm text-[var(--muted)]">{number}</span>
        </div>
        <h3 className="font-display text-xl font-semibold">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{description}</p>
        <Link
          href={href}
          className="mt-6 inline-flex items-center gap-2 text-sm text-white transition-colors group-hover:text-[var(--primary)]"
        >
          Detaylar
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.article>
  );
}

interface ValueCardProps {
  title: string;
  description: string;
  icon?: string;
  index: number;
}

export function ValueCard({ title, description, icon = "Sparkles", index }: ValueCardProps) {
  const Icon = (Icons[icon as keyof typeof Icons] as LucideIcon) || Icons.Sparkles;

  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -4 }}
      className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8"
    >
      <div className="mb-6 flex items-center justify-between">
        <div className="rounded-xl bg-[var(--primary)]/15 p-3 text-[var(--primary)]">
          <Icon className="h-6 w-6" aria-hidden />
        </div>
        <span className="font-display text-3xl font-bold text-white/10">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="font-display text-2xl font-semibold">{title}</h3>
      <p className="mt-3 leading-relaxed text-[var(--muted)]">{description}</p>
    </motion.article>
  );
}

interface ReferenceCardProps {
  companyName: string;
  projectTitle: string;
  category: string;
  eventDate: string;
  shortDescription: string;
  coverImageUrl: string;
}

export function ReferenceCard({
  companyName,
  projectTitle,
  category,
  eventDate,
  shortDescription,
  coverImageUrl,
}: ReferenceCardProps) {
  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -6 }}
      className="group overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--surface-light)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={coverImageUrl}
          alt={`${projectTitle} görseli`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent" />
        <span className="absolute top-4 left-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs backdrop-blur">
          {category}
        </span>
      </div>
      <div className="p-6">
        <p className="text-sm text-[var(--primary)]">{companyName}</p>
        <h3 className="mt-1 font-display text-xl font-semibold">{projectTitle}</h3>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{shortDescription}</p>
        <p className="mt-4 text-xs text-[var(--muted)]">
          {new Date(eventDate).toLocaleDateString("tr-TR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </motion.article>
  );
}
