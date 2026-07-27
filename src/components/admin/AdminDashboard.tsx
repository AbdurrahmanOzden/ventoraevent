"use client";

import { AdminShell } from "@/components/admin/AdminShell";
import { AdminOverview } from "@/components/admin/AdminOverview";
import { AboutEditor, HomeEditor } from "@/components/admin/ContentEditors";
import {
  ReferencesEditor,
  ServicesEditor,
  ValuesEditor,
} from "@/components/admin/CrudEditors";
import {
  ContactInfoEditor,
  MessagesEditor,
  SettingsEditor,
} from "@/components/admin/SettingsEditors";
import { useSiteContent } from "@/hooks/use-site-content";
import type { AdminSection } from "@/types/content";
import { useState } from "react";

export function AdminDashboard() {
  const [section, setSection] = useState<AdminSection>("overview");
  const { content } = useSiteContent();
  const editorKey = content.lastUpdated;

  return (
    <AdminShell section={section} onSectionChange={setSection}>
      {section === "overview" ? <AdminOverview onNavigate={setSection} /> : null}
      {section === "home" ? <HomeEditor key={`home-${editorKey}`} /> : null}
      {section === "about" ? <AboutEditor key={`about-${editorKey}`} /> : null}
      {section === "values" ? <ValuesEditor key={`values-${editorKey}`} /> : null}
      {section === "services" ? <ServicesEditor key={`services-${editorKey}`} /> : null}
      {section === "references" ? (
        <ReferencesEditor key={`references-${editorKey}`} />
      ) : null}
      {section === "contact-info" ? (
        <ContactInfoEditor key={`contact-${editorKey}`} />
      ) : null}
      {section === "messages" ? <MessagesEditor /> : null}
      {section === "settings" ? (
        <SettingsEditor key={`settings-${editorKey}`} />
      ) : null}
    </AdminShell>
  );
}
