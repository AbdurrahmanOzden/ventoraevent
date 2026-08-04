import type { Metadata } from "next";
import { Archivo, Manrope } from "next/font/google";
import { Providers } from "@/components/providers/Providers";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

const siteDescription =
  "Kurumsal etkinliklerden marka lansmanlarına, festival ve özel davetlerden teknik prodüksiyona kadar uçtan uca etkinlik çözümleri.";

export const metadata: Metadata = {
  title: {
    default: "Ventora Event | Etkinlik ve Organizasyon",
    template: "%s | Ventora Event",
  },
  description: siteDescription,
  openGraph: {
    title: "Ventora Event | Etkinlik ve Organizasyon",
    description: siteDescription,
    locale: "tr_TR",
    type: "website",
    siteName: "ventoraevent",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Ventora Event",
  alternateName: "ventoraevent",
  url: "https://ventoraevent.com",
  email: "info@ventoraevent.com",
  telephone: ["+905321715043", "+902128792991"],
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "BOSB mh. 3. cd. Birlik Sanayi Sitesi, Birlik 1 İş Merkezi No:5 Daire:61",
    addressLocality: "Beylikdüzü",
    addressRegion: "İstanbul",
    addressCountry: "TR",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+905321715043",
      contactType: "customer service",
      areaServed: "TR",
      availableLanguage: ["Turkish"],
    },
    {
      "@type": "ContactPoint",
      telephone: "+902128792991",
      contactType: "customer service",
      areaServed: "TR",
      availableLanguage: ["Turkish"],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${archivo.variable} ${manrope.variable} h-full antialiased`}>
      <body className="min-h-full bg-[var(--background)] text-[var(--foreground)]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
