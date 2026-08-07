"use client";

import { ServicesSection } from "@/components/portal/services-section";
import { usePortalNavigation, usePortalUi } from "@/components/portal/portal-ui";

export default function ServicesPage() {
  const handleNavigate = usePortalNavigation();
  const { openAppointment } = usePortalUi();

  return (
    <ServicesSection onNavigate={handleNavigate} onOpenAppointment={openAppointment} />
  );
}
