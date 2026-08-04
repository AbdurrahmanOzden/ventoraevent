import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost" | "danger" | "line";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const variants = {
  primary:
    "bg-[var(--accent)] text-white hover:brightness-110 shadow-[0_0_0_1px_rgba(239,73,56,0.35)]",
  secondary:
    "border border-[var(--line-strong)] bg-transparent text-[var(--foreground)] hover:border-[var(--foreground)]",
  line: "rounded-none border-b border-[var(--line-strong)] px-0 pb-1 text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)]",
  ghost: "text-[var(--muted)] hover:text-white hover:bg-white/5",
  danger:
    "bg-[var(--danger)]/15 text-[var(--danger)] border border-[var(--danger)]/30 hover:bg-[var(--danger)]/25",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

export function PrimaryButton({
  children,
  href,
  className,
  size = "md",
  ...props
}: Omit<ButtonProps, "variant">) {
  return (
    <BaseButton href={href} variant="primary" size={size} className={className} {...props}>
      {children}
    </BaseButton>
  );
}

export function SecondaryButton({
  children,
  href,
  className,
  size = "md",
  ...props
}: Omit<ButtonProps, "variant">) {
  return (
    <BaseButton href={href} variant="secondary" size={size} className={className} {...props}>
      {children}
    </BaseButton>
  );
}

function isInternalPath(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

function BaseButton({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  const rounded = variant === "line" ? "" : "rounded-sm";
  const classes = cn(
    "inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:opacity-50 disabled:pointer-events-none",
    rounded,
    variants[variant],
    variant === "line" ? "text-sm tracking-wide" : sizes[size],
    className
  );

  if (href) {
    if (isInternalPath(href)) {
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }

    const external = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
