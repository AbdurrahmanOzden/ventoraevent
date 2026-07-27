import { ContactPage } from "@/components/sections/ContactPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Ventora Event ile iletişime geçin. Teklif alın, keşif görüşmesi planlayın veya projenizi konuşun.",
  openGraph: {
    title: "İletişim | Ventora Event",
    description:
      "Ventora Event ile iletişime geçin. Teklif alın, keşif görüşmesi planlayın veya projenizi konuşun.",
  },
};

export default function Page() {
  return <ContactPage />;
}
