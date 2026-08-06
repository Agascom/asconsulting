import Link from "next/link";
import { db } from "@/lib/db";
import { Icon, Logo } from "@/components/site/icons";
import { ServiceCard, PostCard } from "@/components/site/cards";
import { CTABand, SectionHeading } from "@/components/site/sections";

export const dynamic = "force-dynamic";

const STATS = [
  { value: "100%", label: "Conformité avec les normes OHADA" },
  { value: "4", label: "Domaines d'expertise" },
  { value: "24h", label: "Délai de réponse garanti" },
  { value: "01", label: "Diagnostic gratuit dès le premier rendez-vous" },
];

const FEATURES = [
  {
    icon: "shield" as const,
    title: "Confidentialité totale",
    description:
      "Vos données comptables et financières sont traitées avec la plus stricte confidentialité.",
  },
  {
    icon: "users" as const,
    title: "Accompagnement humain",
    description:
      "Un interlocuteur dédié, disponible et à l'écoute de vos enjeux, sans intermédiaire.",
  },
  {
    icon: "sparkles" as const,
    title: "Exactitude et rigueur",
    description:
      "Des travaux réalisés dans les délais, avec une vérification systématique de chaque dossier.",
  },
  {
    icon: "chart" as const,
    title: "Conseils pour piloter",
    description:
      "Au-delà de la conformité, nous vous aidons à lire vos chiffres et à décider en connaissance de cause.",
  },
];

export default async function HomePage() {
  const [services, posts] = await Promise.all([
    db.service.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    }),
    db.post.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
  ]);

  return (
    <>
      <section className="relative overflow-hidden bg-brand-950">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-brand-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-gold-500/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:py-28">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold-300">
              <Icon name="scale" className="h-4 w-4" />
              Cabinet comptable · Libreville, Gabon
            </p>
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Votre partenaire{" "}
              <span className="text-gold-400">comptable, fiscal et social</span>{" "}
              de confiance
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-200">
              A&S Consulting accompagne les entreprises et les porteurs de
              projets au Gabon : tenue de comptabilité, fiscalité, gestion
              sociale et création d'entreprise. Un cabinet proche de vous, qui
              parle votre langage.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-gold-500 px-6 py-3.5 font-semibold text-brand-950 transition-colors hover:bg-gold-400"
              >
                Demander un devis gratuit
                <Icon name="arrowRight" className="h-4 w-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/25 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
              >
                Découvrir nos services
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-brand-200">
              <span className="flex items-center gap-2">
                <Icon name="check" className="h-4 w-4 text-gold-400" />
                PME &amp; grandes entreprises
              </span>
              <span className="flex items-center gap-2">
                <Icon name="check" className="h-4 w-4 text-gold-400" />
                Startups &amp; indépendants
              </span>
              <span className="flex items-center gap-2">
                <Icon name="check" className="h-4 w-4 text-gold-400" />
                Associations
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <Logo className="h-12 w-12" />
                <div>
                  <p className="font-bold text-white">A&amp;S Consulting</p>
                  <p className="text-sm text-brand-200">Cabinet de gestion comptable</p>
                </div>
              </div>
              <ul className="mt-6 space-y-4">
                {[
                  "Comptabilité fiable, aux normes OHADA",
                  "Échéances fiscales et sociales sécurisées",
                  "Paie et gestion sociale de A à Z",
                  "Accompagnement à la création d'entreprise",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-brand-100">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-500 text-brand-950">
                      <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-xl bg-brand-900/70 p-4 text-sm text-brand-100">
                <p className="font-semibold text-white">Premier diagnostic gratuit</p>
                <p className="mt-1">
                  Échangeons sur votre situation et vos besoins lors d'un
                  rendez-vous sans engagement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center lg:text-left">
              <p className="text-3xl font-bold text-brand-900">{stat.value}</p>
              <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Nos expertises"
            title="Des services comptables pensés pour votre entreprise"
            description="Quatre domaines d'expertise complémentaires, pour couvrir l'ensemble des besoins comptables, fiscaux, sociaux et administratifs de votre entreprise."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeading
                align="left"
                eyebrow="Le cabinet"
                title="Un cabinet à taille humaine, au cœur de Libreville"
                description="Situé au carrefour Léon Mba, face à UBA gare routière, A&S Consulting met son expertise au service des entreprises gabonaises : commerces, industries, professions libérales, BTP et services."
              />
              <ul className="mt-8 space-y-4">
                {[
                  "Une équipe d'experts comptables et fiscaux",
                  "Une connaissance approfondie de l'environnement OHADA",
                  "Des honoraires forfaitaires, sans surprise",
                  "Un suivi personnalisé tout au long de l'année",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-700">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-700">
                      <Icon name="check" className="h-4 w-4" strokeWidth={2.5} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/a-propos"
                className="mt-8 inline-flex items-center gap-2 font-semibold text-brand-800 hover:text-brand-600"
              >
                Découvrir le cabinet
                <Icon name="arrowRight" className="h-4 w-4" />
              </Link>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "calculator" as const, label: "Comptabilité" },
                  { icon: "file" as const, label: "Fiscalité" },
                  { icon: "users" as const, label: "Social & paie" },
                  { icon: "rocket" as const, label: "Création d'entreprise" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-6 text-center"
                  >
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-900 text-gold-400">
                      <Icon name={item.icon} className="h-6 w-6" />
                    </div>
                    <p className="mt-3 text-sm font-semibold text-brand-900">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Pourquoi nous choisir"
            title="L'exigence d'un cabinet, la proximité d'un partenaire"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-slate-200 bg-white p-6"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-100 text-gold-700">
                  <Icon name={feature.icon} className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold text-brand-900">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/pourquoi-nous"
              className="inline-flex items-center gap-2 font-semibold text-brand-800 hover:text-brand-600"
            >
              En savoir plus sur nos engagements
              <Icon name="arrowRight" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {posts.length > 0 && (
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <SectionHeading
                align="left"
                eyebrow="Actualités"
                title="Conseils et actualités comptables"
              />
              <Link
                href="/actualites"
                className="inline-flex shrink-0 items-center gap-2 font-semibold text-brand-800 hover:text-brand-600"
              >
                Toutes les actualités
                <Icon name="arrowRight" className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABand />
    </>
  );
}
