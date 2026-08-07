"use client";

import { QuoteSimulator } from "@/components/portal/quote-simulator";
import { usePortalUi } from "@/components/portal/portal-ui";

export default function SimulateurDevisPage() {
  const { openAppointment } = usePortalUi();

  return <QuoteSimulator onOpenAppointment={openAppointment} />;
}
