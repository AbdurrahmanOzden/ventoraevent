"use client";

import { PageHero } from "@/components/layout/PageHero";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/FormFields";
import { useToast } from "@/components/ui/Toast";
import { useSiteContent } from "@/hooks/use-site-content";
import { EVENT_TYPES } from "@/lib/constants";
import { useMessagesStore } from "@/store/messages";
import { zodResolver } from "@hookform/resolvers/zod";
import { InstagramIcon, LinkedinIcon, YoutubeIcon } from "@/components/ui/SocialIcons";
import { Mail, MapPin, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const contactSchema = z.object({
  fullName: z.string().min(1, "Ad soyad alanı zorunludur."),
  companyName: z.string().min(1, "Firma adı alanı zorunludur."),
  email: z.string().email("Geçerli bir e-posta adresi giriniz."),
  phone: z.string().min(1, "Telefon alanı zorunludur."),
  eventType: z.string().min(1, "Etkinlik türü seçiniz."),
  eventDate: z.string().min(1, "Tahmini etkinlik tarihi seçiniz."),
  message: z.string().min(1, "Lütfen mesajınızı yazınız."),
  kvkkAccepted: z.boolean().refine((value) => value === true, {
    message: "Devam etmek için onay vermelisiniz.",
  }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactPage() {
  const { content } = useSiteContent();
  const { contactInfo } = content;
  const addMessage = useMessagesStore((s) => s.addMessage);
  const toast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      companyName: "",
      email: "",
      phone: "",
      eventType: EVENT_TYPES[0],
      eventDate: "",
      message: "",
      kvkkAccepted: false,
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    addMessage({
      fullName: data.fullName,
      companyName: data.companyName,
      email: data.email,
      phone: data.phone,
      eventType: data.eventType,
      eventDate: data.eventDate,
      message: data.message,
      kvkkAccepted: data.kvkkAccepted,
    });
    toast(
      "Mesajınız başarıyla alındı. En kısa sürede sizinle iletişime geçeceğiz.",
      "success"
    );
    reset({
      fullName: "",
      companyName: "",
      email: "",
      phone: "",
      eventType: EVENT_TYPES[0],
      eventDate: "",
      message: "",
      kvkkAccepted: false,
    });
  };

  return (
    <>
      <PageHero
        title="İletişim"
        subtitle="Projenizi konuşmak, keşif görüşmesi planlamak veya teklif almak için bize ulaşın."
      />

      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-24 lg:grid-cols-[0.9fr_1.1fr] md:px-8">
        <div className="space-y-6">
          <InfoRow icon={<MapPin className="h-5 w-5" />} label="Adres" value={contactInfo.address} />
          <InfoRow
            icon={<Phone className="h-5 w-5" />}
            label="Cep Telefonu"
            value={contactInfo.mobilePhone}
            href="tel:+905321715043"
          />
          <InfoRow
            icon={<Phone className="h-5 w-5" />}
            label="Sabit Telefon"
            value={contactInfo.landlinePhone}
            href="tel:+902128792991"
          />
          <InfoRow
            icon={<Mail className="h-5 w-5" />}
            label="E-posta"
            value={contactInfo.email}
            href={`mailto:${contactInfo.email}`}
          />
          <InfoRow
            icon={<Phone className="h-5 w-5" />}
            label="Çalışma Saatleri"
            value={contactInfo.workingHours}
          />

          <div className="flex flex-wrap gap-3 pt-1">
            <PrimaryButton href="tel:+905321715043" size="sm">
              Ara
            </PrimaryButton>
            <SecondaryButton href={contactInfo.whatsappUrl} size="sm">
              WhatsApp
            </SecondaryButton>
            <SecondaryButton href={`mailto:${contactInfo.email}`} size="sm">
              E-posta Gönder
            </SecondaryButton>
          </div>

          <div className="flex gap-3 pt-2">
            <Social href={contactInfo.instagram} label="Instagram">
              <InstagramIcon className="h-4 w-4" />
            </Social>
            <Social href={contactInfo.linkedin} label="LinkedIn">
              <LinkedinIcon className="h-4 w-4" />
            </Social>
            <Social href={contactInfo.youtube} label="YouTube">
              <YoutubeIcon className="h-4 w-4" />
            </Social>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
            <div className="flex aspect-[16/10] items-center justify-center bg-gradient-to-br from-[var(--primary)]/20 to-[var(--secondary)]/20">
              <a
                href={contactInfo.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[var(--border)] bg-black/30 px-5 py-2 text-sm backdrop-blur hover:bg-black/50"
              >
                Haritada Görüntüle
              </a>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-3xl border border-[var(--border)] bg-[var(--surface)]/80 p-6 md:p-8"
          noValidate
        >
          <h2 className="font-display mb-6 text-2xl font-semibold">Mesaj Gönderin</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Ad Soyad" error={errors.fullName?.message} {...register("fullName")} />
            <Input
              label="Firma Adı"
              error={errors.companyName?.message}
              {...register("companyName")}
            />
            <Input
              label="E-posta"
              type="email"
              error={errors.email?.message}
              {...register("email")}
            />
            <Input label="Telefon" error={errors.phone?.message} {...register("phone")} />
            <Select
              label="Etkinlik Türü"
              error={errors.eventType?.message}
              options={EVENT_TYPES.map((t) => ({ value: t, label: t }))}
              {...register("eventType")}
            />
            <Input
              label="Tahmini Etkinlik Tarihi"
              type="date"
              error={errors.eventDate?.message}
              {...register("eventDate")}
            />
          </div>
          <div className="mt-4">
            <Textarea label="Mesaj" error={errors.message?.message} {...register("message")} />
          </div>
          <label className="mt-4 flex items-start gap-3 text-sm text-[var(--muted)]">
            <input type="checkbox" className="mt-1" {...register("kvkkAccepted")} />
            <span>
              KVKK ve gizlilik politikasını okudum, kişisel verilerimin iletişim amacıyla
              işlenmesini onaylıyorum.
            </span>
          </label>
          {errors.kvkkAccepted ? (
            <p className="mt-2 text-sm text-[var(--danger)]">{errors.kvkkAccepted.message}</p>
          ) : null}
          <div className="mt-6">
            <PrimaryButton type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
              Mesajı Gönder
            </PrimaryButton>
          </div>
        </form>
      </section>
    </>
  );
}

function InfoRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
      <div className="text-[var(--primary)]">{icon}</div>
      <div>
        <p className="text-xs tracking-wide text-[var(--muted)] uppercase">{label}</p>
        {href ? (
          <a href={href} className="mt-1 block text-white hover:underline">
            {value}
          </a>
        ) : (
          <p className="mt-1 text-white">{value}</p>
        )}
      </div>
    </div>
  );
}

function Social({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted)] hover:text-white"
    >
      {children}
    </a>
  );
}
