"use client";

import { CompanyCreationModule } from "@/components/portal/company-creation-module";
import { usePortalUi } from "@/components/portal/portal-ui";

export function CreationEntrepriseSection() {
  const { openAppointment } = usePortalUi();

  return <CompanyCreationModule onOpenAppointment={openAppointment} />;
}
