import { AboutPage } from "@/components/sections/AboutPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Biz Kimiz",
  description:
    "Ventora Event; strateji, kreatif ve prodüksiyonu tek çatı altında birleştiren etkinlik ve organizasyon stüdyosudur.",
  openGraph: {
    title: "Biz Kimiz | Ventora Event",
    description:
      "Ventora Event; strateji, kreatif ve prodüksiyonu tek çatı altında birleştiren etkinlik ve organizasyon stüdyosudur.",
  },
};

export default function Page() {
  return <AboutPage />;
}
