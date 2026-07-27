import { HomePage } from "@/components/sections/HomePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ana Sayfa",
  description:
    "Ventora Event ile fikirleri unutulmaz deneyimlere dönüştürün. Kurumsal etkinlik, lansman, festival ve prodüksiyon çözümleri.",
  openGraph: {
    title: "Ventora Event | Ana Sayfa",
    description:
      "Ventora Event ile fikirleri unutulmaz deneyimlere dönüştürün. Kurumsal etkinlik, lansman, festival ve prodüksiyon çözümleri.",
  },
};

export default function Page() {
  return <HomePage />;
}
