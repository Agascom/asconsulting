import type { Metadata } from "next";
import { LocationContact } from "@/components/portal/location-contact";

export const metadata: Metadata = {
  title: "Contact & localisation — cabinet à Libreville (Carrefour Léon Mba)",
  description:
    "Contactez A&S CONSULTING à Libreville : Carrefour Léon Mba, près de la banque UBA de la gare routière. Tél. +241 07 75 79 908. Prenez rendez-vous au cabinet ou en ligne.",
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    url: "/contact",
    title: "Contact & localisation — A&S CONSULTING Libreville",
    description:
      "Retrouvez-nous au Carrefour Léon Mba à Libreville, près de la banque UBA de la gare routière.",
  },
};

export default function ContactPage() {
  return <LocationContact />;
}
