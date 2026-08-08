import type { Metadata } from "next";
import { AboutPage } from "@/components/portal/about-page";

export const metadata: Metadata = {
  title: "À propos du cabinet — expertise comptable, fiscale et sociale",
  description:
    "Découvrez A&S CONSULTING, cabinet de services professionnels à Libreville (Gabon) : rigueur SYSCOHADA, confidentialité absolue et proximité auprès des PME, startups et entrepreneurs.",
  alternates: { canonical: "/a-propos" },
  openGraph: {
    type: "website",
    url: "/a-propos",
    title: "À propos — A&S CONSULTING, cabinet comptable à Libreville",
    description:
      "Rigueur, confidentialité et proximité : les engagements d'A&S CONSULTING auprès des entreprises au Gabon.",
  },
};

export default function AProposPage() {
  return <AboutPage />;
}
