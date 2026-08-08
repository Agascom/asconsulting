import type { Metadata } from "next";
import { ServicesPage } from "@/components/portal/services-page";

export const metadata: Metadata = {
  title: "Nos expertises — comptabilité, fiscalité, paie & création d'entreprise",
  description:
    "Tenue de comptabilité SYSCOHADA, démarches fiscales & TVA, gestion sociale & paie CNSS, création d'entreprise (NIF, RCCM). Demandez un devis gratuit à A&S CONSULTING à Libreville.",
  alternates: { canonical: "/services" },
  openGraph: {
    type: "website",
    url: "/services",
    title: "Nos expertises — A&S CONSULTING",
    description:
      "Comptabilité, fiscalité, gestion sociale et création d'entreprise : des services sur mesure au Gabon.",
  },
};

export default function ServicesRoute() {
  return <ServicesPage />;
}
