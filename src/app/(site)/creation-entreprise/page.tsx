import type { Metadata } from "next";
import { CreationEntrepriseSection } from "@/components/portal/creation-entreprise-section";

export const metadata: Metadata = {
  title: "Création d'entreprise au Gabon — statuts, NIF & RCCM",
  description:
    "Accompagnement clé en main pour créer votre société au Gabon : choix du statut (SUARL, SARL, EI, SAS), rédaction des statuts, démarches au guichet unique, obtention du NIF et RCCM en 3 à 7 jours.",
  alternates: { canonical: "/creation-entreprise" },
  openGraph: {
    type: "website",
    url: "/creation-entreprise",
    title: "Création d'entreprise au Gabon — A&S CONSULTING",
    description:
      "Statuts, immatriculation au guichet unique, NIF et RCCM : A&S CONSULTING vous accompagne de l'idée à l'immatriculation.",
  },
};

export default function CreationEntreprisePage() {
  return <CreationEntrepriseSection />;
}
