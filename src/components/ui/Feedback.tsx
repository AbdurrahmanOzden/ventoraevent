import { Inbox } from "lucide-react";
import type { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface)]/50 px-6 py-16 text-center">
      <Inbox className="mb-4 h-10 w-10 text-[var(--muted)]" aria-hidden />
      <h3 className="font-display text-lg font-semibold">{title}</h3>
      {description ? <p className="mt-2 max-w-md text-sm text-[var(--muted)]">{description}</p> : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}

interface AdminCardProps {
  title: string;
  value: string | number;
  hint?: string;
  icon?: ReactNode;
}

export function AdminCard({ title, value, hint, icon }: AdminCardProps) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-[var(--muted)]">{title}</p>
        {icon}
      </div>
      <p className="font-display text-3xl font-bold">{value}</p>
      {hint ? <p className="mt-2 text-xs text-[var(--muted)]">{hint}</p> : null}
    </div>
  );
}

interface LoadingScreenProps {
  companyName: string;
  visible: boolean;
}

export function LoadingScreen({ companyName, visible }: LoadingScreenProps) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-[var(--background)]">
      <p className="font-display text-3xl font-bold tracking-tight md:text-4xl">{companyName}</p>
      <div className="mt-8 h-[2px] w-48 overflow-hidden rounded-full bg-white/10">
        <div className="loading-bar h-full w-full origin-left bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]" />
      </div>
    </div>
  );
}
