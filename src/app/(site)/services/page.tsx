import { db } from "@/lib/db";
import { ServiceCard } from "@/components/site/cards";
import { PageHeader, CTABand } from "@/components/site/sections";
import { Icon } from "@/components/site/icons";

export const dynamic = "force-dynamic";

const PROCESS = [
  {
    title: "1. Premier contact",
    description: "Vous nous expliquez votre besoin par téléphone, WhatsApp ou le formulaire de contact.",
  },
  {
    title: "2. Diagnostic gratuit",
    description: "Nous analysons votre situation et vous proposons une solution adaptée, avec un forfait clair.",
  },
  {
    title: "3. Mise en place",
    description: "Nous organisons votre comptabilité, votre fiscalité et votre paie de façon structurée.",
  },
  {
    title: "4. Suivi au quotidien",
    description: "Un interlocuteur dédié vous accompagne toute l'année, avec des échéances sécurisées.",
  },
];

export default async function ServicesPage() {
  const services = await db.service.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });

  return (
    <>
      <PageHeader
        title="Nos services"
        subtitle="Une offre complète en comptabilité, fiscalité, gestion sociale et création d'entreprise, adaptée à chaque profil d'entreprise."
        breadcrumb="Services"
      />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-gold-600">
              Comment ça marche
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-brand-900 sm:text-3xl">
              Un accompagnement simple et structuré
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((step) => (
              <div key={step.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                <p className="text-sm font-semibold text-gold-600">{step.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-10 flex items-center justify-center gap-2 text-sm text-slate-500">
            <Icon name="clock" className="h-4 w-4 text-gold-600" />
            Premier diagnostic gratuit — honoraire forfaitaire sans surprise.
          </p>
        </div>
      </section>

      <CTABand />
    </>
  );
}
