import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/site/icons";
import { PageHeader, CTABand } from "@/components/site/sections";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const DIFFERENCIATEURS = [
  {
    icon: "shield" as const,
    title: "Confidentialité garantie",
    description:
      "Le secret professionnel est au cœur de notre métier. Vos données comptables et financières ne sont jamais communiquées à des tiers.",
  },
  {
    icon: "check" as const,
    title: "Conformité OHADA & fiscalité gabonaise",
    description:
      "Une expertise à jour des normes comptables et fiscales en vigueur au Gabon et dans la zone CEMAC.",
  },
  {
    icon: "clock" as const,
    title: "Réactivité",
    description:
      "Un délai de réponse de 24h maximum et un interlocuteur dédié pour chaque dossier, sans intermédiaire.",
  },
  {
    icon: "chart" as const,
    title: "Une vision, pas seulement des chiffres",
    description:
      "Nous transformons vos données en tableaux de bord et en recommandations concrètes pour piloter votre activité.",
  },
  {
    icon: "users" as const,
    title: "Accompagnement à taille humaine",
    description:
      "Des startups aux entreprises établies, nous adaptons nos honoraires et notre organisation à votre réalité.",
  },
  {
    icon: "sparkles" as const,
    title: "Honoraires forfaitaires",
    description:
      "Un devis clair dès le départ, un forfait mensuel transparent, sans coût caché.",
  },
];

const AVEC_SANS = [
  {
    label: "Avec un cabinet comptable",
    items: [
      "États financiers fiables et conformes",
      "Échéances fiscales et sociales maîtrisées",
      "Paie sécurisée et conforme au droit du travail",
      "Conseil pour optimiser votre fiscalité",
      "Tableaux de bord pour piloter",
      "Du temps libéré pour votre cœur de métier",
    ],
    highlight: true,
  },
  {
    label: "Sans accompagnement",
    items: [
      "Risque d'erreurs et de redressements",
      "Pénalités de retard évitables",
      "Charge administrative lourde",
      "Optimisations fiscales manquées",
      "Aucune vision claire de vos résultats",
      "Temps consacré à des tâches non productives",
    ],
    highlight: false,
  },
];

export default function PourquoiNousPage() {
  return (
    <>
      <PageHeader
        title="Pourquoi nous choisir"
        subtitle="Au-delà des obligations comptables, un cabinet partenaire qui vous aide à piloter votre entreprise avec sérénité."
        breadcrumb="Pourquoi nous choisir"
      />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {DIFFERENCIATEURS.map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-200 p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-900 text-gold-400">
                  <Icon name={item.icon} className="h-5 w-5" />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-brand-900">{item.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-gold-600">
              La différence A&amp;S
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-brand-900 sm:text-3xl">
              Externaliser sa comptabilité : la comparaison
            </h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
            {AVEC_SANS.map((col) => (
              <div
                key={col.label}
                className={`rounded-2xl border p-7 ${
                  col.highlight
                    ? "border-brand-900 bg-brand-950 text-white"
                    : "border-slate-200 bg-white"
                }`}
              >
                <h3
                  className={`text-lg font-semibold ${
                    col.highlight ? "text-gold-400" : "text-brand-900"
                  }`}
                >
                  {col.label}
                </h3>
                <ul className="mt-5 space-y-3">
                  {col.items.map((item) => (
                    <li
                      key={item}
                      className={`flex items-start gap-3 text-sm ${
                        col.highlight ? "text-brand-100" : "text-slate-600"
                      }`}
                    >
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                          col.highlight
                            ? "bg-gold-500 text-brand-950"
                            : "bg-red-100 text-red-500"
                        }`}
                      >
                        <Icon
                          name={col.highlight ? "check" : "x"}
                          className="h-3.5 w-3.5"
                          strokeWidth={2.5}
                        />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-brand-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-800"
            >
              Testez la différence dès aujourd'hui
              <Icon name="arrowRight" className="h-4 w-4" />
            </Link>
          </p>
        </div>
      </section>

      <CTABand />
    </>
  );
}
