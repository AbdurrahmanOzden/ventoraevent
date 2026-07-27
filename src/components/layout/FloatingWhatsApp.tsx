"use client";

import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { useSiteContent } from "@/hooks/use-site-content";

export function FloatingWhatsApp() {
  const { content } = useSiteContent();
  const href =
    content.contactInfo.whatsappUrl || "https://wa.me/905321715043";

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp ile iletişime geçin"
      className="fixed right-5 bottom-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_28px_rgba(37,211,102,0.45)] transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] md:right-7 md:bottom-7"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
