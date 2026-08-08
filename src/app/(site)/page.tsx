import type { Metadata } from "next";
import { PortalHome } from "@/components/portal/portal-home";

export const metadata: Metadata = {
  title: "Cabinet comptable, fiscal & création d'entreprise à Libreville (Gabon)",
  description:
    "A&S CONSULTING, cabinet comptable à Libreville : tenue de comptabilité SYSCOHADA, déclarations TVA & quitus fiscal, paie CNSS, création d'entreprise au Gabon (statuts, NIF, RCCM). Contact : +241 07 75 79 908.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: "A&S CONSULTING — Cabinet comptable à Libreville, Gabon",
    description:
      "Comptabilité SYSCOHADA, fiscalité, paie CNSS et création d'entreprise au Gabon. Contact : +241 07 75 79 908.",
  },
};

export default function HomePage() {
  return <PortalHome />;
}
