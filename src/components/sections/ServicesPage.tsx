"use client";

import { PageIntro } from "@/components/layout/PageIntro";
import { ContactCta } from "@/components/sections/ContactCta";
import { HorizontalServiceJourney } from "@/components/services/HorizontalServiceJourney";
import { useSiteContent } from "@/hooks/use-site-content";

export function ServicesPage() {
  const { content } = useSiteContent();

  return (
    <>
      <PageIntro
        number="04"
        label="NELER YAPIYORUZ"
        title="Bir etkinliği yalnızca planlamıyor, ona bir ritim ve karakter kazandırıyoruz."
        description="Stratejiden sahaya kadar; lansman, kurumsal etkinlik, sahne ve teknik prodüksiyonu tek bir deneyim mimarisinde buluşturuyoruz."
      />
      <HorizontalServiceJourney
        services={content.services}
        introTitle="Hizmet Yolculuğu"
        introSubtitle="Kaydırarak her hizmet katmanını keşfedin."
      />
      <ContactCta
        title={content.home.contactCtaTitle}
        description={content.home.contactCtaDescription}
      />
    </>
  );
}
