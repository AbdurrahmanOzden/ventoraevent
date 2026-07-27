import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const variants = {
  primary:
    "bg-[var(--primary)] text-white shadow-[0_0_28px_var(--glow-primary)] hover:brightness-110",
  secondary:
    "border border-[var(--border)] bg-white/5 text-white hover:bg-white/10 hover:border-white/25",
  ghost: "text-[var(--muted)] hover:text-white hover:bg-white/5",
  danger:
    "bg-[var(--danger)]/15 text-[var(--danger)] border border-[var(--danger)]/30 hover:bg-[var(--danger)]/25",
};

const sizes = {
  sm: "px-3.5 py-2 text-sm",
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
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:opacity-50 disabled:pointer-events-none",
    variants[variant],
    sizes[size],
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
