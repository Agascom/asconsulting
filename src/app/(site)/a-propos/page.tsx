import Link from "next/link";
import { Icon, Logo } from "@/components/site/icons";
import { PageHeader, CTABand } from "@/components/site/sections";

export const dynamic = "force-dynamic";

const VALUES = [
  {
    icon: "shield" as const,
    title: "Confiance",
    description:
      "La confidentialité des informations de nos clients est notre priorité absolue. Nous traitons chaque dossier avec le secret professionnel le plus strict.",
  },
  {
    icon: "check" as const,
    title: "Rigueur",
    description:
      "Des travaux conformes aux normes OHADA et aux réglementations en vigueur, réalisés dans le respect des échéances.",
  },
  {
    icon: "users" as const,
    title: "Proximité",
    description:
      "Un interlocuteur dédié, disponible pour répondre à vos questions et vous conseiller tout au long de l'année.",
  },
  {
    icon: "sparkles" as const,
    title: "Excellence",
    description:
      "Une veille réglementaire constante et une formation continue de nos équipes pour vous offrir un conseil à jour.",
  },
];

const ENGAGEMENTS = [
  {
    title: "Comptabilité & conformité",
    items: [
      "Tenue de comptabilité aux normes OHADA",
      "États financiers annuels conformes",
      "Gestion des échéances fiscales et sociales",
    ],
  },
  {
    title: "Conseil & pilotage",
    items: [
      "Analyse de vos chiffres et tableaux de bord",
      "Optimisation fiscale légale",
      "Accompagnement de vos décisions",
    ],
  },
  {
    title: "Proximité & réactivité",
    items: [
      "Cabinet situé au carrefour Léon Mba, Libreville",
      "Prise de rendez-vous simple et rapide",
      "Contact direct par téléphone ou WhatsApp",
    ],
  },
];

export default function AProposPage() {
  return (
    <>
      <PageHeader
        title="Le cabinet A&S Consulting"
        subtitle="Un cabinet de gestion comptable, fiscale, sociale et administrative à Libreville, au service des entreprises gabonaises."
        breadcrumb="Le Cabinet"
      />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="relative">
              <div className="rounded-3xl bg-gradient-to-br from-brand-900 to-brand-950 p-8 text-white">
                <Logo className="h-14 w-14" />
                <p className="mt-6 text-lg font-semibold">A&amp;S Consulting</p>
                <p className="mt-2 text-sm leading-relaxed text-brand-200">
                  Cabinet de gestion comptable, fiscale, sociale et
                  administrative — Libreville, Gabon.
                </p>
                <ul className="mt-6 space-y-3 text-sm">
                  <li className="flex items-center gap-3">
                    <Icon name="mapPin" className="h-4 w-4 text-gold-400" />
                    Carrefour Léon Mba, face UBA gare routière
                  </li>
                  <li className="flex items-center gap-3">
                    <Icon name="scale" className="h-4 w-4 text-gold-400" />
                    Conformité aux normes OHADA
                  </li>
                  <li className="flex items-center gap-3">
                    <Icon name="users" className="h-4 w-4 text-gold-400" />
                    Entreprises · Indépendants · Associations
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-gold-600">
                Qui sommes-nous
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-brand-900 sm:text-3xl">
                Une équipe dédiée à la santé financière de votre entreprise
              </h2>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-slate-600">
                <p>
                  Fondé à Libreville, A&S Consulting accompagne les entreprises
                  de tous les secteurs — commerce, industrie, professions
                  libérales, BTP, services — ainsi que les associations et les
                  porteurs de projets. Notre mission : sécuriser votre gestion
                  comptable, fiscale et sociale pour que vous puissiez vous
                  concentrer sur votre activité.
                </p>
                <p>
                  Nous combinons une connaissance approfondie de
                  l'environnement OHADA et de la fiscalité gabonaise avec une
                  approche pragmatique et humaine. Chaque client bénéficie d'un
                  interlocuteur dédié et d'une organisation claire, quel que
                  soit le niveau de complexité de son dossier.
                </p>
                <p>
                  De la création d'entreprise à l'accompagnement au quotidien,
                  nous construisons une relation durable fondée sur la
                  confiance, la réactivité et la confidentialité.
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-brand-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-800"
                >
                  Prendre rendez-vous
                  <Icon name="arrowRight" className="h-4 w-4" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 px-6 py-3 font-semibold text-brand-900 transition-colors hover:bg-slate-50"
                >
                  Nos services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-bold tracking-tight text-brand-900 sm:text-3xl">
            Nos valeurs
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 text-center"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-900 text-gold-400">
                  <Icon name={value.icon} className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-semibold text-brand-900">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-bold tracking-tight text-brand-900 sm:text-3xl">
            Nos engagements
          </h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {ENGAGEMENTS.map((block) => (
              <div
                key={block.title}
                className="rounded-2xl border border-slate-200 p-6"
              >
                <h3 className="text-lg font-semibold text-brand-900">{block.title}</h3>
                <ul className="mt-4 space-y-3">
                  {block.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-slate-600">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-700">
                        <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.5} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Faisons connaissance"
        description="Rendez-vous pour un premier échange gratuit et sans engagement sur votre situation comptable, fiscale ou sociale."
      />
    </>
  );
}
