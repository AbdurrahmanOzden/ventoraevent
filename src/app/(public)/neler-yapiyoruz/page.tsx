import { ServicesPage } from "@/components/sections/ServicesPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Neler Yapıyoruz",
  description:
    "Kurumsal etkinlikler, lansmanlar, festival ve konser yönetimi, özel davetler, teknik prodüksiyon ve kreatif konsept.",
  openGraph: {
    title: "Neler Yapıyoruz | Ventora Event",
    description:
      "Kurumsal etkinlikler, lansmanlar, festival ve konser yönetimi, özel davetler, teknik prodüksiyon ve kreatif konsept.",
  },
};

export default function Page() {
  return <ServicesPage />;
}
