import type { Metadata } from "next";
import { ClientSpaceDemo } from "@/components/portal/client-space-demo";

export const metadata: Metadata = {
  title: "Espace client — transmission de pièces & documents certifiés",
  description:
    "Portail client sécurisé A&S CONSULTING : transmettez vos pièces comptables, téléchargez vos documents certifiés (quitus fiscal, bilan) et suivez votre calendrier fiscal en ligne.",
  alternates: { canonical: "/espace-client" },
  openGraph: {
    type: "website",
    url: "/espace-client",
    title: "Espace client — A&S CONSULTING",
    description:
      "Transmission de pièces comptables, documents certifiés et calendrier fiscal en ligne.",
  },
};

export default function EspaceClientPage() {
  return <ClientSpaceDemo />;
}
