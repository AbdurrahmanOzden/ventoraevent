"use client";

import { fadeUp, staggerContainer } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/use-ui";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
}

export function AnimatedText({
  text,
  as: Tag = "p",
  className,
  delay = 0,
}: AnimatedTextProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className}>
      <motion.span
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
        className="inline-block"
      >
        {text}
      </motion.span>
    </Tag>
  );
}

interface SplitTextProps {
  text: string;
  mode?: "letters" | "words";
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export function SplitText({
  text,
  mode = "words",
  className,
  as: Tag = "span",
}: SplitTextProps) {
  const reduced = useReducedMotion();
  const parts = mode === "letters" ? Array.from(text) : text.split(" ");

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className}>
      <motion.span
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="inline"
        aria-label={text}
      >
        {parts.map((part, index) => (
          <motion.span
            key={`${part}-${index}`}
            variants={fadeUp}
            className="inline-block"
            style={{ whiteSpace: mode === "words" ? "pre" : undefined }}
          >
            {mode === "words" ? `${part}${index < parts.length - 1 ? "\u00A0" : ""}` : part === " " ? "\u00A0" : part}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}

interface TextRevealProps {
  children: ReactNode;
  className?: string;
}

export function TextReveal({ children, className }: TextRevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <motion.div
        initial={{ y: "110%", opacity: 0 }}
        whileInView={{ y: "0%", opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

interface MarqueeTextProps {
  items: string[];
  className?: string;
  separator?: string;
}

export function MarqueeText({
  items,
  className,
  separator = " • ",
}: MarqueeTextProps) {
  const content = items.join(separator);
  const loop = `${content}${separator}${content}${separator}`;

  return (
    <div className={`overflow-hidden border-y border-[var(--border)] bg-[var(--surface)]/60 ${className ?? ""}`}>
      <div className="marquee-track py-5">
        <span className="font-display px-4 text-2xl font-semibold tracking-[0.18em] text-white/80 md:text-4xl whitespace-nowrap">
          {loop}
        </span>
        <span
          className="font-display px-4 text-2xl font-semibold tracking-[0.18em] text-white/80 md:text-4xl whitespace-nowrap"
          aria-hidden
        >
          {loop}
        </span>
      </div>
    </div>
  );
}

interface PageTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function PageTitle({ title, subtitle, className }: PageTitleProps) {
  return (
    <div className={className}>
      <TextReveal>
        <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
          <span className="gradient-text">{title}</span>
        </h1>
      </TextReveal>
      {subtitle ? (
        <AnimatedText
          text={subtitle}
          className="mt-6 max-w-2xl text-lg text-[var(--muted)] md:text-xl"
          delay={0.1}
        />
      ) : null}
    </div>
  );
}

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionTitle({ title, subtitle, align = "left" }: SectionTitleProps) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <TextReveal>
        <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">{title}</h2>
      </TextReveal>
      {subtitle ? (
        <p
          className={`mt-4 max-w-2xl text-[var(--muted)] md:text-lg ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
