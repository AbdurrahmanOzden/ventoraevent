import { ReferencesPage } from "@/components/sections/ReferencesPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Referanslar",
  description:
    "Ventora Event’in markalar ve kurumlarla hayata geçirdiği seçili etkinlik ve prodüksiyon projeleri.",
  openGraph: {
    title: "Referanslar | Ventora Event",
    description:
      "Ventora Event’in markalar ve kurumlarla hayata geçirdiği seçili etkinlik ve prodüksiyon projeleri.",
  },
};

export default function Page() {
  return <ReferencesPage />;
}
