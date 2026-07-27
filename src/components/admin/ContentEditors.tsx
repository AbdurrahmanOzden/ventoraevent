"use client";

import { Input, Textarea } from "@/components/ui/FormFields";
import { PrimaryButton } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { useSiteContent } from "@/hooks/use-site-content";
import { generateId } from "@/lib/utils";
import { useState } from "react";

export function HomeEditor() {
  const { content, updateHomePage } = useSiteContent();
  const toast = useToast();
  const [form, setForm] = useState(content.home);

  const save = () => {
    updateHomePage(form);
    toast("Ana sayfa içeriği kaydedildi.", "success");
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Textarea
          label="Hero Başlık"
          value={form.heroHeadline}
          onChange={(e) => setForm({ ...form, heroHeadline: e.target.value })}
        />
        <Textarea
          label="Hero Açıklama"
          value={form.heroDescription}
          onChange={(e) => setForm({ ...form, heroDescription: e.target.value })}
        />
        <Input
          label="Birincil Buton Metni"
          value={form.primaryButtonText}
          onChange={(e) => setForm({ ...form, primaryButtonText: e.target.value })}
        />
        <Input
          label="Birincil Buton URL"
          value={form.primaryButtonUrl}
          onChange={(e) => setForm({ ...form, primaryButtonUrl: e.target.value })}
        />
        <Input
          label="İkincil Buton Metni"
          value={form.secondaryButtonText}
          onChange={(e) => setForm({ ...form, secondaryButtonText: e.target.value })}
        />
        <Input
          label="İkincil Buton URL"
          value={form.secondaryButtonUrl}
          onChange={(e) => setForm({ ...form, secondaryButtonUrl: e.target.value })}
        />
        <Textarea
          label="Biz Kimiz Önizleme Başlığı"
          value={form.aboutPreviewTitle}
          onChange={(e) => setForm({ ...form, aboutPreviewTitle: e.target.value })}
        />
        <Textarea
          label="Biz Kimiz Önizleme Açıklaması"
          value={form.aboutPreviewDescription}
          onChange={(e) => setForm({ ...form, aboutPreviewDescription: e.target.value })}
        />
        <Input
          label="Hizmetler Bölüm Başlığı"
          value={form.servicesSectionTitle}
          onChange={(e) => setForm({ ...form, servicesSectionTitle: e.target.value })}
        />
        <Input
          label="Projeler Bölüm Başlığı"
          value={form.projectsSectionTitle}
          onChange={(e) => setForm({ ...form, projectsSectionTitle: e.target.value })}
        />
        <Input
          label="Değerler Bölüm Başlığı"
          value={form.valuesSectionTitle}
          onChange={(e) => setForm({ ...form, valuesSectionTitle: e.target.value })}
        />
        <Input
          label="İletişim CTA Başlığı"
          value={form.contactCtaTitle}
          onChange={(e) => setForm({ ...form, contactCtaTitle: e.target.value })}
        />
        <Textarea
          label="İletişim CTA Açıklaması"
          className="md:col-span-2"
          value={form.contactCtaDescription}
          onChange={(e) => setForm({ ...form, contactCtaDescription: e.target.value })}
        />
      </div>

      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
        <h3 className="mb-4 font-display text-lg font-semibold">Marquee Metinleri</h3>
        <div className="space-y-3">
          {form.marqueeTexts.map((item, index) => (
            <div key={item.id} className="flex gap-2">
              <Input
                label={`Metin ${index + 1}`}
                value={item.text}
                onChange={(e) => {
                  const marqueeTexts = [...form.marqueeTexts];
                  marqueeTexts[index] = { ...item, text: e.target.value };
                  setForm({ ...form, marqueeTexts });
                }}
              />
              <button
                type="button"
                className="mt-7 rounded-xl border border-[var(--border)] px-3 text-sm text-[var(--danger)]"
                onClick={() =>
                  setForm({
                    ...form,
                    marqueeTexts: form.marqueeTexts.filter((m) => m.id !== item.id),
                  })
                }
              >
                Sil
              </button>
            </div>
          ))}
          <button
            type="button"
            className="rounded-full border border-[var(--border)] px-4 py-2 text-sm"
            onClick={() =>
              setForm({
                ...form,
                marqueeTexts: [
                  ...form.marqueeTexts,
                  { id: generateId("mq"), text: "YENİ METİN" },
                ],
              })
            }
          >
            Marquee Metni Ekle
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
        <h3 className="mb-4 font-display text-lg font-semibold">İstatistikler</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {form.statistics.map((stat, index) => (
            <div key={stat.id} className="grid grid-cols-3 gap-2">
              <Input
                label="Değer"
                type="number"
                value={stat.value}
                onChange={(e) => {
                  const statistics = [...form.statistics];
                  statistics[index] = { ...stat, value: Number(e.target.value) };
                  setForm({ ...form, statistics });
                }}
              />
              <Input
                label="Sonek"
                value={stat.suffix}
                onChange={(e) => {
                  const statistics = [...form.statistics];
                  statistics[index] = { ...stat, suffix: e.target.value };
                  setForm({ ...form, statistics });
                }}
              />
              <Input
                label="Etiket"
                value={stat.label}
                onChange={(e) => {
                  const statistics = [...form.statistics];
                  statistics[index] = { ...stat, label: e.target.value };
                  setForm({ ...form, statistics });
                }}
              />
            </div>
          ))}
        </div>
      </section>

      <PrimaryButton type="button" onClick={save}>
        Kaydet
      </PrimaryButton>
    </div>
  );
}

export function AboutEditor() {
  const { content, updateAboutPage } = useSiteContent();
  const toast = useToast();
  const [form, setForm] = useState(content.about);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Textarea
          label="Sayfa Başlığı"
          value={form.pageTitle}
          onChange={(e) => setForm({ ...form, pageTitle: e.target.value })}
        />
        <Textarea
          label="Sayfa Alt Başlığı"
          value={form.pageSubtitle}
          onChange={(e) => setForm({ ...form, pageSubtitle: e.target.value })}
        />
        <Textarea
          label="Şirket Hikâyesi"
          className="md:col-span-2"
          value={form.companyStory}
          onChange={(e) => setForm({ ...form, companyStory: e.target.value })}
        />
        <Textarea
          label="Vizyon"
          value={form.vision}
          onChange={(e) => setForm({ ...form, vision: e.target.value })}
        />
        <Textarea
          label="Misyon"
          value={form.mission}
          onChange={(e) => setForm({ ...form, mission: e.target.value })}
        />
        <Textarea
          label="Yaklaşım"
          className="md:col-span-2"
          value={form.companyApproach}
          onChange={(e) => setForm({ ...form, companyApproach: e.target.value })}
        />
        <Input
          label="Çalışma Kültürü Başlığı"
          value={form.workCultureTitle}
          onChange={(e) => setForm({ ...form, workCultureTitle: e.target.value })}
        />
        <Textarea
          label="Çalışma Kültürü Açıklaması"
          value={form.workCultureDescription}
          onChange={(e) => setForm({ ...form, workCultureDescription: e.target.value })}
        />
        <Textarea
          label="Ekip Felsefesi"
          className="md:col-span-2"
          value={form.teamPhilosophy}
          onChange={(e) => setForm({ ...form, teamPhilosophy: e.target.value })}
        />
        <Input
          label="CTA Başlığı"
          value={form.ctaTitle}
          onChange={(e) => setForm({ ...form, ctaTitle: e.target.value })}
        />
        <Textarea
          label="CTA Açıklaması"
          value={form.ctaDescription}
          onChange={(e) => setForm({ ...form, ctaDescription: e.target.value })}
        />
      </div>

      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
        <h3 className="mb-4 font-display text-lg font-semibold">İstatistikler</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {form.statistics.map((stat, index) => (
            <div key={stat.id} className="grid grid-cols-3 gap-2">
              <Input
                label="Değer"
                type="number"
                value={stat.value}
                onChange={(e) => {
                  const statistics = [...form.statistics];
                  statistics[index] = { ...stat, value: Number(e.target.value) };
                  setForm({ ...form, statistics });
                }}
              />
              <Input
                label="Sonek"
                value={stat.suffix}
                onChange={(e) => {
                  const statistics = [...form.statistics];
                  statistics[index] = { ...stat, suffix: e.target.value };
                  setForm({ ...form, statistics });
                }}
              />
              <Input
                label="Etiket"
                value={stat.label}
                onChange={(e) => {
                  const statistics = [...form.statistics];
                  statistics[index] = { ...stat, label: e.target.value };
                  setForm({ ...form, statistics });
                }}
              />
            </div>
          ))}
        </div>
      </section>

      <PrimaryButton
        type="button"
        onClick={() => {
          updateAboutPage(form);
          toast("Biz Kimiz içeriği kaydedildi.", "success");
        }}
      >
        Kaydet
      </PrimaryButton>
    </div>
  );
}
