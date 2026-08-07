"use client";

import { Hero } from "@/components/portal/hero";
import { HighlightsBar } from "@/components/portal/highlights-bar";
import { AboutSection } from "@/components/portal/about-section";
import { ServicesSection } from "@/components/portal/services-section";
import { CompanyCreationModule } from "@/components/portal/company-creation-module";
import { QuoteSimulator } from "@/components/portal/quote-simulator";
import { LocationSection } from "@/components/portal/location-section";
import { ResourcesSection } from "@/components/portal/resources-section";
import { ClientSpaceDemo } from "@/components/portal/client-space-demo";
import { usePortalNavigation, usePortalUi } from "@/components/portal/portal-ui";

export function PortalHome() {
  const handleNavigate = usePortalNavigation();
  const { openAppointment } = usePortalUi();

  return (
    <>
      <Hero onNavigate={handleNavigate} onOpenAppointment={openAppointment} />
      <HighlightsBar onNavigate={handleNavigate} />
      <AboutSection onNavigate={handleNavigate} onOpenAppointment={openAppointment} />
      <ServicesSection onNavigate={handleNavigate} onOpenAppointment={openAppointment} />
      <CompanyCreationModule onOpenAppointment={openAppointment} />
      <QuoteSimulator onOpenAppointment={openAppointment} />
      <LocationSection onOpenAppointment={openAppointment} />
      <ResourcesSection />
      <ClientSpaceDemo />
    </>
  );
}
