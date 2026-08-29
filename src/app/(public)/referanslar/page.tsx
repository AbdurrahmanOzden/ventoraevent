import { ReferencesPage } from "@/components/sections/ReferencesPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Referanslar",
  description: "Ventora Event’in birlikte çalıştığı markalar.",
  openGraph: {
    title: "Referanslar | Ventora Event",
    description: "Ventora Event’in birlikte çalıştığı markalar.",
  },
};

export default function Page() {
  return <ReferencesPage />;
}
