import Link from "next/link";
import { db } from "@/lib/db";
import { FaqList } from "@/components/site/faq-list";
import { PageHeader } from "@/components/site/sections";
import { Icon } from "@/components/site/icons";

export const dynamic = "force-dynamic";

export default async function FaqPage() {
  const faqs = await db.faqItem.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });

  return (
    <>
      <PageHeader
        title="Questions fréquentes"
        subtitle="Les réponses aux questions que l'on nous pose le plus souvent sur la comptabilité, la fiscalité et la création d'entreprise."
        breadcrumb="FAQ"
      />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {faqs.length > 0 ? (
            <FaqList items={faqs} />
          ) : (
            <p className="text-center text-slate-500">Aucune question pour le moment.</p>
          )}

          <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
            <h2 className="text-lg font-semibold text-brand-900">
              Vous ne trouvez pas votre réponse ?
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Notre équipe est disponible pour répondre à toutes vos questions,
              sans engagement.
            </p>
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center gap-2 rounded-md bg-brand-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-800"
            >
              Nous contacter
              <Icon name="arrowRight" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
