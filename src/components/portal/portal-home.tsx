"use client";

import { Hero } from "@/components/portal/hero";
import { HighlightsBar } from "@/components/portal/highlights-bar";
import { AboutSection } from "@/components/portal/about-section";
import { usePortalNavigation, usePortalUi } from "@/components/portal/portal-ui";

export function PortalHome() {
  const handleNavigate = usePortalNavigation();
  const { openAppointment } = usePortalUi();

  return (
    <>
      <Hero onNavigate={handleNavigate} onOpenAppointment={openAppointment} />
      <HighlightsBar onNavigate={handleNavigate} />
      <AboutSection onNavigate={handleNavigate} onOpenAppointment={openAppointment} />
    </>
  );
}
