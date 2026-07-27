"use client";

import { PrimaryButton, SecondaryButton } from "@/components/ui/Button";
import { Input, Textarea, Toggle, Select } from "@/components/ui/FormFields";
import { ConfirmDialog, Modal } from "@/components/ui/Modal";
import { EmptyState } from "@/components/ui/Feedback";
import { useToast } from "@/components/ui/Toast";
import { useSiteContent } from "@/hooks/use-site-content";
import { PROJECT_CATEGORIES } from "@/lib/constants";
import { generateId } from "@/lib/utils";
import type { ProjectCategory, ReferenceItem, ServiceItem, ValueItem } from "@/types/content";
import { ArrowDown, ArrowUp, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

export function ValuesEditor() {
  const { content, addValue, updateValue, deleteValue, reorderValues } = useSiteContent();
  const toast = useToast();
  const [editing, setEditing] = useState<ValueItem | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const values = [...content.values].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <PrimaryButton
          type="button"
          onClick={() =>
            setEditing({
              id: "",
              title: "",
              description: "",
              icon: "Sparkles",
              active: true,
              sortOrder: values.length + 1,
            })
          }
        >
          Yeni Değer Ekle
        </PrimaryButton>
      </div>

      {values.length === 0 ? (
        <EmptyState title="Henüz değer yok" />
      ) : (
        <ul className="space-y-3">
          {values.map((item, index) => (
            <li
              key={item.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4"
            >
              <div>
                <p className="font-medium">
                  {item.title}{" "}
                  <span className="text-xs text-[var(--muted)]">
                    ({item.active ? "Aktif" : "Pasif"})
                  </span>
                </p>
                <p className="mt-1 max-w-xl text-sm text-[var(--muted)]">{item.description}</p>
              </div>
              <div className="flex gap-2">
                <IconButton
                  label="Yukarı"
                  onClick={() => index > 0 && reorderValues(index, index - 1)}
                >
                  <ArrowUp className="h-4 w-4" />
                </IconButton>
                <IconButton
                  label="Aşağı"
                  onClick={() =>
                    index < values.length - 1 && reorderValues(index, index + 1)
                  }
                >
                  <ArrowDown className="h-4 w-4" />
                </IconButton>
                <IconButton label="Düzenle" onClick={() => setEditing(item)}>
                  <Pencil className="h-4 w-4" />
                </IconButton>
                <IconButton label="Sil" onClick={() => setDeleteId(item.id)}>
                  <Trash2 className="h-4 w-4 text-[var(--danger)]" />
                </IconButton>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Modal
        open={!!editing}
        onClose={() => setEditing(null)}
        title={editing?.id ? "Değer Düzenle" : "Yeni Değer"}
        className="max-w-xl"
      >
        {editing ? (
          <div className="space-y-4">
            <Input
              label="Başlık"
              value={editing.title}
              onChange={(e) => setEditing({ ...editing, title: e.target.value })}
            />
            <Textarea
              label="Açıklama"
              value={editing.description}
              onChange={(e) => setEditing({ ...editing, description: e.target.value })}
            />
            <Input
              label="İkon Adı (Lucide)"
              value={editing.icon}
              onChange={(e) => setEditing({ ...editing, icon: e.target.value })}
            />
            <Toggle
              label="Aktif"
              checked={editing.active}
              onChange={(active) => setEditing({ ...editing, active })}
            />
            <PrimaryButton
              type="button"
              onClick={() => {
                if (!editing.title.trim()) {
                  toast("Başlık zorunludur.", "error");
                  return;
                }
                if (editing.id) {
                  updateValue(editing.id, editing);
                  toast("Değer güncellendi.", "success");
                } else {
                  addValue({
                    title: editing.title,
                    description: editing.description,
                    icon: editing.icon,
                    active: editing.active,
                  });
                  toast("Değer eklendi.", "success");
                }
                setEditing(null);
              }}
            >
              Kaydet
            </PrimaryButton>
          </div>
        ) : null}
      </Modal>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) {
            deleteValue(deleteId);
            toast("Değer silindi.", "success");
          }
        }}
        title="Değeri Sil"
        description="Bu değeri silmek istediğinize emin misiniz? Bu işlem geri alınamaz."
        confirmLabel="Sil"
        danger
      />
    </div>
  );
}

export function ServicesEditor() {
  const { content, addService, updateService, deleteService, reorderServices } =
    useSiteContent();
  const toast = useToast();
  const [editing, setEditing] = useState<ServiceItem | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const services = [...content.services].sort((a, b) => a.sortOrder - b.sortOrder);

  const emptyService = (): ServiceItem => ({
    id: "",
    title: "",
    shortDescription: "",
    detailedDescription: "",
    imageUrl: "/images/services/kurumsal-etkinlikler.jpg",
    features: [{ id: generateId("f"), text: "" }],
    buttonText: "Teklif Al",
    active: true,
    sortOrder: services.length + 1,
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <PrimaryButton type="button" onClick={() => setEditing(emptyService())}>
          Yeni Hizmet Ekle
        </PrimaryButton>
      </div>

      <ul className="space-y-3">
        {services.map((item, index) => (
          <li
            key={item.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4"
          >
            <div>
              <p className="font-medium">
                {item.title}{" "}
                <span className="text-xs text-[var(--muted)]">
                  ({item.active ? "Aktif" : "Pasif"})
                </span>
              </p>
              <p className="mt-1 text-sm text-[var(--muted)]">{item.shortDescription}</p>
            </div>
            <div className="flex gap-2">
              <IconButton label="Yukarı" onClick={() => index > 0 && reorderServices(index, index - 1)}>
                <ArrowUp className="h-4 w-4" />
              </IconButton>
              <IconButton
                label="Aşağı"
                onClick={() =>
                  index < services.length - 1 && reorderServices(index, index + 1)
                }
              >
                <ArrowDown className="h-4 w-4" />
              </IconButton>
              <IconButton label="Düzenle" onClick={() => setEditing(item)}>
                <Pencil className="h-4 w-4" />
              </IconButton>
              <IconButton label="Sil" onClick={() => setDeleteId(item.id)}>
                <Trash2 className="h-4 w-4 text-[var(--danger)]" />
              </IconButton>
            </div>
          </li>
        ))}
      </ul>

      <Modal
        open={!!editing}
        onClose={() => setEditing(null)}
        title={editing?.id ? "Hizmet Düzenle" : "Yeni Hizmet"}
        className="max-w-2xl"
      >
        {editing ? (
          <div className="max-h-[70vh] space-y-4 overflow-y-auto pr-1">
            <Input
              label="Başlık"
              value={editing.title}
              onChange={(e) => setEditing({ ...editing, title: e.target.value })}
            />
            <Textarea
              label="Kısa Açıklama"
              value={editing.shortDescription}
              onChange={(e) => setEditing({ ...editing, shortDescription: e.target.value })}
            />
            <Textarea
              label="Detaylı Açıklama"
              value={editing.detailedDescription}
              onChange={(e) =>
                setEditing({ ...editing, detailedDescription: e.target.value })
              }
            />
            <Input
              label="Görsel URL"
              value={editing.imageUrl}
              onChange={(e) => setEditing({ ...editing, imageUrl: e.target.value })}
            />
            {editing.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={editing.imageUrl}
                alt="Önizleme"
                className="h-32 w-full rounded-xl object-cover"
              />
            ) : null}
            <Input
              label="Buton Metni"
              value={editing.buttonText}
              onChange={(e) => setEditing({ ...editing, buttonText: e.target.value })}
            />
            <Toggle
              label="Aktif"
              checked={editing.active}
              onChange={(active) => setEditing({ ...editing, active })}
            />
            <div className="space-y-2">
              <p className="admin-label">Özellikler</p>
              {editing.features.map((feature, index) => (
                <div key={feature.id} className="flex gap-2">
                  <input
                    className="admin-input"
                    value={feature.text}
                    onChange={(e) => {
                      const features = [...editing.features];
                      features[index] = { ...feature, text: e.target.value };
                      setEditing({ ...editing, features });
                    }}
                  />
                  <button
                    type="button"
                    className="rounded-xl border border-[var(--border)] px-3 text-sm text-[var(--danger)]"
                    onClick={() =>
                      setEditing({
                        ...editing,
                        features: editing.features.filter((f) => f.id !== feature.id),
                      })
                    }
                  >
                    Sil
                  </button>
                </div>
              ))}
              <SecondaryButton
                type="button"
                onClick={() =>
                  setEditing({
                    ...editing,
                    features: [
                      ...editing.features,
                      { id: generateId("f"), text: "" },
                    ],
                  })
                }
              >
                Özellik Ekle
              </SecondaryButton>
            </div>
            <PrimaryButton
              type="button"
              onClick={() => {
                if (!editing.title.trim()) {
                  toast("Başlık zorunludur.", "error");
                  return;
                }
                const payload = {
                  title: editing.title,
                  shortDescription: editing.shortDescription,
                  detailedDescription: editing.detailedDescription,
                  imageUrl: editing.imageUrl,
                  features: editing.features.filter((f) => f.text.trim()),
                  buttonText: editing.buttonText,
                  active: editing.active,
                };
                if (editing.id) {
                  updateService(editing.id, payload);
                  toast("Hizmet güncellendi.", "success");
                } else {
                  addService(payload);
                  toast("Hizmet eklendi.", "success");
                }
                setEditing(null);
              }}
            >
              Kaydet
            </PrimaryButton>
          </div>
        ) : null}
      </Modal>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) {
            deleteService(deleteId);
            toast("Hizmet silindi.", "success");
          }
        }}
        title="Hizmeti Sil"
        description="Bu hizmeti silmek istediğinize emin misiniz?"
        confirmLabel="Sil"
        danger
      />
    </div>
  );
}

export function ReferencesEditor() {
  const {
    content,
    addReference,
    updateReference,
    deleteReference,
    reorderReferences,
  } = useSiteContent();
  const toast = useToast();
  const [editing, setEditing] = useState<ReferenceItem | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const refs = [...content.references].sort((a, b) => a.sortOrder - b.sortOrder);

  const emptyRef = (): ReferenceItem => ({
    id: "",
    companyName: "",
    projectTitle: "",
    category: "Kurumsal",
    eventDate: new Date().toISOString().slice(0, 10),
    shortDescription: "",
    logoUrl: "/images/logo-aurora.svg",
    coverImageUrl: "/images/project-summit.svg",
    active: true,
    sortOrder: refs.length + 1,
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <PrimaryButton type="button" onClick={() => setEditing(emptyRef())}>
          Yeni Referans Ekle
        </PrimaryButton>
      </div>

      <ul className="space-y-3">
        {refs.map((item, index) => (
          <li
            key={item.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4"
          >
            <div>
              <p className="font-medium">
                {item.projectTitle}{" "}
                <span className="text-xs text-[var(--muted)]">
                  ({item.active ? "Aktif" : "Pasif"})
                </span>
              </p>
              <p className="text-sm text-[var(--muted)]">
                {item.companyName} · {item.category}
              </p>
            </div>
            <div className="flex gap-2">
              <IconButton
                label="Yukarı"
                onClick={() => index > 0 && reorderReferences(index, index - 1)}
              >
                <ArrowUp className="h-4 w-4" />
              </IconButton>
              <IconButton
                label="Aşağı"
                onClick={() =>
                  index < refs.length - 1 && reorderReferences(index, index + 1)
                }
              >
                <ArrowDown className="h-4 w-4" />
              </IconButton>
              <IconButton label="Düzenle" onClick={() => setEditing(item)}>
                <Pencil className="h-4 w-4" />
              </IconButton>
              <IconButton label="Sil" onClick={() => setDeleteId(item.id)}>
                <Trash2 className="h-4 w-4 text-[var(--danger)]" />
              </IconButton>
            </div>
          </li>
        ))}
      </ul>

      <Modal
        open={!!editing}
        onClose={() => setEditing(null)}
        title={editing?.id ? "Referans Düzenle" : "Yeni Referans"}
        className="max-w-2xl"
      >
        {editing ? (
          <div className="max-h-[70vh] space-y-4 overflow-y-auto pr-1">
            <Input
              label="Firma Adı"
              value={editing.companyName}
              onChange={(e) => setEditing({ ...editing, companyName: e.target.value })}
            />
            <Input
              label="Etkinlik / Proje Adı"
              value={editing.projectTitle}
              onChange={(e) => setEditing({ ...editing, projectTitle: e.target.value })}
            />
            <Select
              label="Kategori"
              value={editing.category}
              options={PROJECT_CATEGORIES.map((c) => ({ value: c, label: c }))}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  category: e.target.value as ProjectCategory,
                })
              }
            />
            <Input
              label="Etkinlik Tarihi"
              type="date"
              value={editing.eventDate}
              onChange={(e) => setEditing({ ...editing, eventDate: e.target.value })}
            />
            <Textarea
              label="Kısa Açıklama"
              value={editing.shortDescription}
              onChange={(e) =>
                setEditing({ ...editing, shortDescription: e.target.value })
              }
            />
            <Input
              label="Logo URL"
              value={editing.logoUrl}
              onChange={(e) => setEditing({ ...editing, logoUrl: e.target.value })}
            />
            <Input
              label="Kapak Görseli URL"
              value={editing.coverImageUrl}
              onChange={(e) =>
                setEditing({ ...editing, coverImageUrl: e.target.value })
              }
            />
            {editing.coverImageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={editing.coverImageUrl}
                alt="Kapak önizleme"
                className="h-32 w-full rounded-xl object-cover"
              />
            ) : null}
            <Toggle
              label="Aktif"
              checked={editing.active}
              onChange={(active) => setEditing({ ...editing, active })}
            />
            <PrimaryButton
              type="button"
              onClick={() => {
                if (!editing.projectTitle.trim()) {
                  toast("Proje adı zorunludur.", "error");
                  return;
                }
                const payload = {
                  companyName: editing.companyName,
                  projectTitle: editing.projectTitle,
                  category: editing.category,
                  eventDate: editing.eventDate,
                  shortDescription: editing.shortDescription,
                  logoUrl: editing.logoUrl,
                  coverImageUrl: editing.coverImageUrl,
                  active: editing.active,
                  testimonial: editing.testimonial,
                  testimonialAuthor: editing.testimonialAuthor,
                };
                if (editing.id) {
                  updateReference(editing.id, payload);
                  toast("Referans güncellendi.", "success");
                } else {
                  addReference(payload);
                  toast("Referans eklendi.", "success");
                }
                setEditing(null);
              }}
            >
              Kaydet
            </PrimaryButton>
          </div>
        ) : null}
      </Modal>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) {
            deleteReference(deleteId);
            toast("Referans silindi.", "success");
          }
        }}
        title="Referansı Sil"
        description="Bu referansı silmek istediğinize emin misiniz?"
        confirmLabel="Sil"
        danger
      />
    </div>
  );
}

function IconButton({
  children,
  onClick,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="rounded-lg border border-[var(--border)] p-2 hover:bg-white/5"
    >
      {children}
    </button>
  );
}
