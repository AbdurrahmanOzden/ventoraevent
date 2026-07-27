"use client";

import { PrimaryButton } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/FormFields";
import { ConfirmDialog, Modal } from "@/components/ui/Modal";
import { EmptyState } from "@/components/ui/Feedback";
import { useToast } from "@/components/ui/Toast";
import { useSiteContent } from "@/hooks/use-site-content";
import { formatDateTime } from "@/lib/utils";
import { useMessagesStore } from "@/store/messages";
import type { ContactMessage } from "@/types/content";
import { useMemo, useState } from "react";

export function ContactInfoEditor() {
  const { content, updateContactInfo } = useSiteContent();
  const toast = useToast();
  const [form, setForm] = useState(content.contactInfo);

  return (
    <div className="grid max-w-3xl gap-4">
      <Input
        label="Cep Telefonu"
        value={form.mobilePhone}
        onChange={(e) => setForm({ ...form, mobilePhone: e.target.value })}
      />
      <Input
        label="Sabit Telefon"
        value={form.landlinePhone}
        onChange={(e) => setForm({ ...form, landlinePhone: e.target.value })}
      />
      <Input
        label="E-posta"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <Textarea
        label="Adres"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />
      <Input
        label="Çalışma Saatleri"
        value={form.workingHours}
        onChange={(e) => setForm({ ...form, workingHours: e.target.value })}
      />
      <Input
        label="WhatsApp Bağlantısı"
        value={form.whatsappUrl}
        onChange={(e) => setForm({ ...form, whatsappUrl: e.target.value })}
      />
      <Input
        label="Instagram"
        value={form.instagram}
        onChange={(e) => setForm({ ...form, instagram: e.target.value })}
      />
      <Input
        label="LinkedIn"
        value={form.linkedin}
        onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
      />
      <Input
        label="YouTube"
        value={form.youtube}
        onChange={(e) => setForm({ ...form, youtube: e.target.value })}
      />
      <Input
        label="Harita Bağlantısı"
        value={form.mapUrl}
        onChange={(e) => setForm({ ...form, mapUrl: e.target.value })}
      />
      <PrimaryButton
        type="button"
        onClick={() => {
          updateContactInfo(form);
          toast("İletişim bilgileri kaydedildi.", "success");
        }}
      >
        Kaydet
      </PrimaryButton>
    </div>
  );
}

export function SettingsEditor() {
  const { content, updateSiteSettings } = useSiteContent();
  const toast = useToast();
  const [form, setForm] = useState(content.settings);

  return (
    <div className="grid max-w-3xl gap-4 md:grid-cols-2">
      <Input
        label="Site Adı"
        value={form.siteName}
        onChange={(e) => setForm({ ...form, siteName: e.target.value })}
      />
      <Input
        label="Logo Metni"
        value={form.logoText}
        onChange={(e) => setForm({ ...form, logoText: e.target.value })}
      />
      <Textarea
        label="Slogan"
        className="md:col-span-2"
        value={form.tagline}
        onChange={(e) => setForm({ ...form, tagline: e.target.value })}
      />
      <Textarea
        label="Footer Açıklaması"
        className="md:col-span-2"
        value={form.footerDescription}
        onChange={(e) => setForm({ ...form, footerDescription: e.target.value })}
      />
      <Input
        label="Birincil Vurgu Rengi"
        type="color"
        value={form.primaryAccent}
        onChange={(e) => setForm({ ...form, primaryAccent: e.target.value })}
      />
      <Input
        label="İkincil Vurgu Rengi"
        type="color"
        value={form.secondaryAccent}
        onChange={(e) => setForm({ ...form, secondaryAccent: e.target.value })}
      />
      <Input
        label="SEO Başlığı"
        value={form.seoTitle}
        onChange={(e) => setForm({ ...form, seoTitle: e.target.value })}
      />
      <Input
        label="Telif Metni"
        value={form.copyrightText}
        onChange={(e) => setForm({ ...form, copyrightText: e.target.value })}
      />
      <Textarea
        label="SEO Açıklaması"
        className="md:col-span-2"
        value={form.seoDescription}
        onChange={(e) => setForm({ ...form, seoDescription: e.target.value })}
      />
      <Input
        label="Instagram"
        value={form.instagram}
        onChange={(e) => setForm({ ...form, instagram: e.target.value })}
      />
      <Input
        label="LinkedIn"
        value={form.linkedin}
        onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
      />
      <Input
        label="YouTube"
        className="md:col-span-2"
        value={form.youtube}
        onChange={(e) => setForm({ ...form, youtube: e.target.value })}
      />
      <div className="md:col-span-2">
        <PrimaryButton
          type="button"
          onClick={() => {
            updateSiteSettings(form);
            toast("Site ayarları kaydedildi.", "success");
          }}
        >
          Kaydet
        </PrimaryButton>
      </div>
    </div>
  );
}

export function MessagesEditor() {
  const messages = useMessagesStore((s) => s.messages);
  const markRead = useMessagesStore((s) => s.markRead);
  const deleteMessage = useMessagesStore((s) => s.deleteMessage);
  const toast = useToast();
  const [filter, setFilter] = useState<"all" | "read" | "unread">("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<ContactMessage | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return messages.filter((msg) => {
      if (filter === "read" && !msg.read) return false;
      if (filter === "unread" && msg.read) return false;
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return (
        msg.fullName.toLowerCase().includes(q) ||
        msg.companyName.toLowerCase().includes(q) ||
        msg.email.toLowerCase().includes(q) ||
        msg.message.toLowerCase().includes(q)
      );
    });
  }, [messages, filter, query]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <input
          className="admin-input max-w-sm"
          placeholder="Mesajlarda ara..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Mesajlarda ara"
        />
        {(
          [
            ["all", "Tümü"],
            ["unread", "Okunmamış"],
            ["read", "Okunmuş"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setFilter(id)}
            className={`rounded-full border px-4 py-2 text-sm ${
              filter === id
                ? "border-[var(--primary)] bg-[var(--primary)]/20"
                : "border-[var(--border)]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="Mesaj bulunamadı"
          description="İletişim formundan gelen mesajlar burada listelenir."
        />
      ) : (
        <ul className="space-y-3">
          {filtered.map((msg) => (
            <li
              key={msg.id}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium">
                    {msg.fullName}{" "}
                    <span className="text-xs text-[var(--muted)]">
                      · {msg.read ? "Okundu" : "Okunmadı"}
                    </span>
                  </p>
                  <p className="text-sm text-[var(--muted)]">
                    {msg.companyName} · {msg.email}
                  </p>
                  <p className="mt-2 line-clamp-2 text-sm">{msg.message}</p>
                  <p className="mt-2 text-xs text-[var(--muted)]">
                    {formatDateTime(msg.submittedAt)}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="rounded-full border border-[var(--border)] px-3 py-1.5 text-xs"
                    onClick={() => setSelected(msg)}
                  >
                    Detay
                  </button>
                  <button
                    type="button"
                    className="rounded-full border border-[var(--border)] px-3 py-1.5 text-xs"
                    onClick={() => {
                      markRead(msg.id, !msg.read);
                      toast(
                        msg.read ? "Mesaj okunmadı olarak işaretlendi." : "Mesaj okundu olarak işaretlendi.",
                        "success"
                      );
                    }}
                  >
                    {msg.read ? "Okunmadı Yap" : "Okundu Yap"}
                  </button>
                  <button
                    type="button"
                    className="rounded-full border border-[var(--danger)]/40 px-3 py-1.5 text-xs text-[var(--danger)]"
                    onClick={() => setDeleteId(msg.id)}
                  >
                    Sil
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title="Mesaj Detayı"
        className="max-w-xl"
      >
        {selected ? (
          <div className="space-y-3 text-sm">
            <Detail label="Ad Soyad" value={selected.fullName} />
            <Detail label="Firma Adı" value={selected.companyName} />
            <Detail label="E-posta" value={selected.email} />
            <Detail label="Telefon" value={selected.phone} />
            <Detail label="Etkinlik Türü" value={selected.eventType} />
            <Detail label="Etkinlik Tarihi" value={selected.eventDate} />
            <Detail label="Gönderim Tarihi" value={formatDateTime(selected.submittedAt)} />
            <Detail label="Mesaj" value={selected.message} />
          </div>
        ) : null}
      </Modal>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) {
            deleteMessage(deleteId);
            toast("Mesaj silindi.", "success");
          }
        }}
        title="Mesajı Sil"
        description="Bu mesajı silmek istediğinize emin misiniz?"
        confirmLabel="Sil"
        danger
      />
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-[var(--muted)]">{label}</p>
      <p className="mt-1 whitespace-pre-wrap">{value}</p>
    </div>
  );
}
