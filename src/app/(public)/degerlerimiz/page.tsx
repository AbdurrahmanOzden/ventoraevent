import { ValuesPage } from "@/components/sections/ValuesPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Değerlerimiz",
  description:
    "Yaratıcılık, güven, yenilikçilik, sürdürülebilirlik, kusursuz uygulama ve insan odaklılık — Ventora Event değerleri.",
  openGraph: {
    title: "Değerlerimiz | Ventora Event",
    description:
      "Yaratıcılık, güven, yenilikçilik, sürdürülebilirlik, kusursuz uygulama ve insan odaklılık — Ventora Event değerleri.",
  },
};

export default function Page() {
  return <ValuesPage />;
}
