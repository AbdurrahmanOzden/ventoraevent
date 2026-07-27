"use client";

import { ConfirmDialog } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth";
import { useSiteContentStore } from "@/store/site-content";
import type { AdminSection } from "@/types/content";
import {
  Building2,
  FileText,
  Home,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  Sparkles,
  Briefcase,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

const MENU: { id: AdminSection; label: string; icon: typeof Home }[] = [
  { id: "overview", label: "Genel Bakış", icon: LayoutDashboard },
  { id: "home", label: "Ana Sayfa", icon: Home },
  { id: "about", label: "Biz Kimiz", icon: Building2 },
  { id: "values", label: "Değerlerimiz", icon: Sparkles },
  { id: "services", label: "Hizmetler", icon: Briefcase },
  { id: "references", label: "Referanslar", icon: FileText },
  { id: "contact-info", label: "İletişim Bilgileri", icon: MessageSquare },
  { id: "messages", label: "Gelen Mesajlar", icon: Inbox },
  { id: "settings", label: "Site Ayarları", icon: Settings },
];

interface AdminShellProps {
  section: AdminSection;
  onSectionChange: (section: AdminSection) => void;
  children: ReactNode;
}

export function AdminShell({ section, onSectionChange, children }: AdminShellProps) {
  const router = useRouter();
  const { isAuthenticated, hydrated, hydrate, logout } = useAuthStore();
  const resetContent = useSiteContentStore((s) => s.resetContent);
  const toast = useToast();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (hydrated && !isAuthenticated) {
      router.replace("/admin/login");
    }
  }, [hydrated, isAuthenticated, router]);

  if (!hydrated || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--background)] text-[var(--muted)]">
        Yükleniyor...
      </div>
    );
  }

  const Nav = (
    <nav className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-5">
        <div className={cn(collapsed && "hidden md:hidden", !collapsed && "block")}>
          <p className="font-display text-lg font-bold">Ventora Admin</p>
          <p className="text-xs text-[var(--muted)]">Yerel geliştirme</p>
        </div>
        <button
          type="button"
          className="hidden rounded-lg p-2 hover:bg-white/5 md:inline-flex"
          onClick={() => setCollapsed((v) => !v)}
          aria-label={collapsed ? "Kenar çubuğunu genişlet" : "Kenar çubuğunu daralt"}
        >
          <Menu className="h-4 w-4" />
        </button>
        <button
          type="button"
          className="rounded-lg p-2 hover:bg-white/5 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-label="Menüyü kapat"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <ul className="flex-1 space-y-1 overflow-y-auto p-3">
        {MENU.map((item) => {
          const Icon = item.icon;
          const active = section === item.id;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => {
                  onSectionChange(item.id);
                  setMobileOpen(false);
                }}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition",
                  active
                    ? "bg-[var(--primary)]/20 text-white"
                    : "text-[var(--muted)] hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {!collapsed || mobileOpen ? <span>{item.label}</span> : null}
              </button>
            </li>
          );
        })}
      </ul>

      <div className="space-y-2 border-t border-[var(--border)] p-3">
        <button
          type="button"
          onClick={() => setResetOpen(true)}
          className="w-full rounded-xl border border-[var(--border)] px-3 py-2 text-left text-xs text-[var(--muted)] hover:text-white"
        >
          Varsayılan İçeriklere Dön
        </button>
        <Link
          href="/"
          className="block rounded-xl px-3 py-2 text-sm text-[var(--muted)] hover:bg-white/5 hover:text-white"
        >
          Siteye Dön
        </Link>
        <button
          type="button"
          onClick={() => {
            logout();
            router.replace("/admin/login");
          }}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[var(--danger)] hover:bg-[var(--danger)]/10"
        >
          <LogOut className="h-4 w-4" />
          Çıkış Yap
        </button>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="flex min-h-screen">
        <aside
          className={cn(
            "sticky top-0 hidden h-screen border-r border-[var(--border)] bg-[var(--surface)] md:block",
            collapsed ? "w-20" : "w-64"
          )}
        >
          {Nav}
        </aside>

        {mobileOpen ? (
          <div className="fixed inset-0 z-50 md:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-black/60"
              aria-label="Menüyü kapat"
              onClick={() => setMobileOpen(false)}
            />
            <div className="absolute inset-y-0 left-0 w-72 bg-[var(--surface)]">{Nav}</div>
          </div>
        ) : null}

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[var(--border)] bg-[var(--background)]/90 px-4 py-4 backdrop-blur md:px-8">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="rounded-lg border border-[var(--border)] p-2 md:hidden"
                onClick={() => setMobileOpen(true)}
                aria-label="Menüyü aç"
              >
                <Menu className="h-5 w-5" />
              </button>
              <h1 className="font-display text-xl font-semibold">
                {MENU.find((m) => m.id === section)?.label}
              </h1>
            </div>
            <p className="text-xs text-[var(--warning)]">Yalnızca yerel demo girişi</p>
          </header>
          <div className="flex-1 px-4 py-6 md:px-8">{children}</div>
        </div>
      </div>

      <ConfirmDialog
        open={resetOpen}
        onClose={() => setResetOpen(false)}
        onConfirm={() => {
          resetContent();
          toast("Site içerikleri varsayılan ayarlara döndürüldü.", "success");
        }}
        title="Varsayılan İçeriklere Dön"
        description="Bu işlem tüm yerel içerik değişikliklerini silecektir. Devam etmek istediğinize emin misiniz?"
        confirmLabel="Evet, Sıfırla"
        danger
      />
    </div>
  );
}
