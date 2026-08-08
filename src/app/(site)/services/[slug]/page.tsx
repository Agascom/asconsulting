import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { PageHeader, CTABand } from "@/components/site/sections";
import { Icon } from "@/components/site/icons";
import type { IconName } from "@/components/site/icons";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function ServiceDetailPage(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const service = await db.service.findUnique({ where: { slug } });
  if (!service || !service.published) notFound();

  const others = await db.service.findMany({
    where: { published: true, id: { not: service.id } },
    orderBy: { order: "asc" },
    take: 3,
  });

  return (
    <>
      <PageHeader
        title={service.title}
        subtitle={service.shortDesc}
        breadcrumb={service.title}
      />

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-900 text-gold-400">
              <Icon name={(service.icon as IconName) ?? "briefcase"} className="h-7 w-7" />
            </div>
            <h2 className="mt-6 text-2xl font-bold tracking-tight text-brand-900 sm:text-3xl">
              {service.title}
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-slate-600">
              {service.description.split(/\n\n+/).map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-brand-900">
                Prestations incluses
              </h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {service.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-700">
                      <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl bg-brand-950 p-6 text-white">
              <h3 className="text-lg font-semibold">Besoin d'un devis ?</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-200">
                Décrivez-nous votre besoin, nous revenons vers vous sous 24h
                avec une proposition claire et forfaitaire.
              </p>
              <Link
                href={`/contact?service=${encodeURIComponent(service.title)}`}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-gold-500 px-5 py-3 font-semibold text-brand-950 transition-colors hover:bg-gold-400"
              >
                Demander un devis pour ce service
                <Icon name="arrowRight" className="h-4 w-4" />
              </Link>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6">
              <h3 className="font-semibold text-brand-900">Qui est concerné ?</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                PME, grandes entreprises, commerçants, professions libérales,
                indépendants, associations et porteurs de projets.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6">
              <h3 className="font-semibold text-brand-900">Mode d'intervention</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <Icon name="check" className="h-4 w-4 text-gold-600" />
                  Mission ponctuelle
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="check" className="h-4 w-4 text-gold-600" />
                  Accompagnement annuel
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="check" className="h-4 w-4 text-gold-600" />
                  Suivi personnalisé dédié
                </li>
              </ul>
            </div>

            {others.length > 0 && (
              <div className="rounded-2xl border border-slate-200 p-6">
                <h3 className="font-semibold text-brand-900">Autres services</h3>
                <ul className="mt-3 space-y-2">
                  {others.map((other) => (
                    <li key={other.id}>
                      <Link
                        href={`/services/${other.slug}`}
                        className="text-sm font-medium text-brand-700 hover:text-brand-500"
                      >
                        {other.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
