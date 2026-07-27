"use client";

import { AdminCard, EmptyState } from "@/components/ui/Feedback";
import { useMessagesStore } from "@/store/messages";
import { useSiteContent } from "@/hooks/use-site-content";
import { formatDateTime } from "@/lib/utils";
import {
  Briefcase,
  FileText,
  Inbox,
  Sparkles,
  CheckCircle2,
  Clock,
} from "lucide-react";
import type { AdminSection } from "@/types/content";

interface OverviewProps {
  onNavigate: (section: AdminSection) => void;
}

export function AdminOverview({ onNavigate }: OverviewProps) {
  const { content } = useSiteContent();
  const messages = useMessagesStore((s) => s.messages);

  const activeServices = content.services.filter((s) => s.active).length;
  const activeRefs = content.references.filter((r) => r.active).length;
  const activeValues = content.values.filter((v) => v.active).length;
  const activeContent =
    activeServices + activeRefs + activeValues + (content.home ? 1 : 0);
  const inactiveContent =
    content.services.length +
    content.references.length +
    content.values.length -
    (activeServices + activeRefs + activeValues);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <AdminCard
          title="Toplam Hizmet"
          value={content.services.length}
          hint={`${activeServices} aktif`}
          icon={<Briefcase className="h-4 w-4 text-[var(--primary)]" />}
        />
        <AdminCard
          title="Toplam Referans"
          value={content.references.length}
          hint={`${activeRefs} aktif`}
          icon={<FileText className="h-4 w-4 text-[var(--primary)]" />}
        />
        <AdminCard
          title="Gelen Mesaj"
          value={messages.length}
          hint={`${messages.filter((m) => !m.read).length} okunmamış`}
          icon={<Inbox className="h-4 w-4 text-[var(--primary)]" />}
        />
        <AdminCard
          title="Aktif İçerik"
          value={activeContent}
          hint={`${inactiveContent} pasif öğe`}
          icon={<CheckCircle2 className="h-4 w-4 text-[var(--success)]" />}
        />
        <AdminCard
          title="Toplam Değer"
          value={content.values.length}
          hint={`${activeValues} aktif`}
          icon={<Sparkles className="h-4 w-4 text-[var(--secondary)]" />}
        />
        <AdminCard
          title="Son Güncelleme"
          value={formatDateTime(content.lastUpdated).split(" ").slice(0, 3).join(" ")}
          hint={formatDateTime(content.lastUpdated)}
          icon={<Clock className="h-4 w-4 text-[var(--muted)]" />}
        />
      </div>

      <div className="flex flex-wrap gap-3">
        {(
          [
            ["home", "Ana Sayfa Düzenle"],
            ["services", "Hizmet Ekle"],
            ["references", "Referans Ekle"],
            ["messages", "Mesajları Gör"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => onNavigate(id)}
            className="rounded-full border border-[var(--border)] px-4 py-2 text-sm hover:bg-white/5"
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <h2 className="mb-4 font-display text-lg font-semibold">Son Mesajlar</h2>
          {messages.length === 0 ? (
            <EmptyState title="Henüz mesaj yok" description="İletişim formundan gelen mesajlar burada listelenir." />
          ) : (
            <ul className="space-y-3">
              {messages.slice(0, 5).map((msg) => (
                <li
                  key={msg.id}
                  className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-medium">{msg.fullName}</p>
                    <span className="text-xs text-[var(--muted)]">
                      {msg.read ? "Okundu" : "Okunmadı"}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-sm text-[var(--muted)]">{msg.message}</p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <h2 className="mb-4 font-display text-lg font-semibold">Son Referanslar</h2>
          <ul className="space-y-3">
            {[...content.references]
              .sort((a, b) => b.sortOrder - a.sortOrder)
              .slice(0, 5)
              .map((ref) => (
                <li
                  key={ref.id}
                  className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-3"
                >
                  <p className="font-medium">{ref.projectTitle}</p>
                  <p className="text-sm text-[var(--muted)]">
                    {ref.companyName} · {ref.category}
                  </p>
                </li>
              ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
