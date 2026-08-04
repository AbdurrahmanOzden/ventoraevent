import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { GlobalBackground } from "@/components/effects/GlobalBackground";
import type { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <GlobalBackground />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        <main className="min-h-screen flex-1">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </>
  );
}
