"use client";

import { NAV_ITEMS } from "@/lib/constants";
import { useSiteContent } from "@/hooks/use-site-content";
import { InstagramIcon, LinkedinIcon, YoutubeIcon } from "@/components/ui/SocialIcons";
import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const { content } = useSiteContent();
  const { settings, contactInfo, services } = content;
  const year = new Date().getFullYear();
  const activeServices = services
    .filter((s) => s.active)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .slice(0, 5);

  return (
    <footer className="border-t border-[var(--line)] bg-[var(--background-soft)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-2 md:px-8 lg:grid-cols-4">
        <div>
          <p className="font-display text-2xl font-semibold">{settings.logoText}</p>
          <p className="mt-1 text-xs tracking-wide text-[var(--muted)]">{settings.siteName}</p>
          <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
            {settings.footerDescription}
          </p>
          <div className="mt-6 flex gap-3">
            <SocialLink href={contactInfo.instagram || settings.instagram} label="Instagram">
              <InstagramIcon className="h-4 w-4" />
            </SocialLink>
            <SocialLink href={contactInfo.linkedin || settings.linkedin} label="LinkedIn">
              <LinkedinIcon className="h-4 w-4" />
            </SocialLink>
            <SocialLink href={contactInfo.youtube || settings.youtube} label="YouTube">
              <YoutubeIcon className="h-4 w-4" />
            </SocialLink>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-xs tracking-[0.18em] text-white uppercase">Hızlı Bağlantılar</h3>
          <ul className="space-y-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-[var(--muted)] hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs tracking-[0.18em] text-white uppercase">Hizmetler</h3>
          <ul className="space-y-2">
            {activeServices.map((service) => (
              <li key={service.id}>
                <Link href="/neler-yapiyoruz" className="text-sm text-[var(--muted)] hover:text-white">
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs tracking-[0.18em] text-white uppercase">İletişim</h3>
          <ul className="space-y-3 text-sm text-[var(--muted)]">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
              <span>{contactInfo.address}</span>
            </li>
            <li className="flex gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
              <a href="tel:+905321715043" className="hover:text-white">
                {contactInfo.mobilePhone}
              </a>
            </li>
            <li className="flex gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
              <a href="tel:+902128792991" className="hover:text-white">
                {contactInfo.landlinePhone}
              </a>
            </li>
            <li className="flex gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
              <a href={`mailto:${contactInfo.email}`} className="hover:text-white">
                {contactInfo.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--line)] px-5 py-6 text-center text-sm text-[var(--muted)] md:px-8">
        © {year} {settings.copyrightText}
      </div>
    </footer>
  );
}

function SocialLink({
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
      className="inline-flex h-10 w-10 items-center justify-center border border-[var(--line)] text-[var(--muted)] hover:border-white/40 hover:text-white"
    >
      {children}
    </a>
  );
}
