import { PageHeader } from "@/components/site/sections";
import { SITE } from "@/lib/site-shared";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Mentions légales",
  robots: { index: false, follow: false },
};

export default function MentionsLegalesPage() {
  return (
    <>
      <PageHeader
        title="Mentions légales"
        subtitle="Informations relatives à l'édition et à l'hébergement du site."
        breadcrumb="Mentions légales"
      />
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl space-y-8 px-4 text-sm leading-relaxed text-slate-700 sm:px-6">
          <div>
            <h2 className="text-lg font-semibold text-brand-900">Éditeur du site</h2>
            <p className="mt-3">
              Le présent site est édité par {SITE.legalName}, cabinet de gestion
              comptable, fiscale, sociale et administrative, dont le siège est
              situé à {SITE.defaultAddress}.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-brand-900">Directeur de la publication</h2>
            <p className="mt-3">Le directeur de la publication est le représentant légal de {SITE.legalName}.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-brand-900">Hébergement</h2>
            <p className="mt-3">
              Le site est hébergé sur une base de données Neon (Neon, Inc.) et
              déployé sur une plateforme d'hébergement mutualisé. Les
              coordonnées exactes de l'hébergeur sont disponibles sur simple
              demande auprès du cabinet.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-brand-900">Propriété intellectuelle</h2>
            <p className="mt-3">
              L'ensemble des contenus du présent site (textes, structure,
              logo, éléments graphiques) est la propriété exclusive de
              {SITE.legalName}, sauf mention contraire. Toute reproduction,
              même partielle, sans autorisation écrite préalable est
              interdite.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-brand-900">Contact</h2>
            <p className="mt-3">
              Pour toute question relative au site, vous pouvez nous contacter
              à l'adresse {SITE.defaultEmail} ou au {SITE.defaultPhone}.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
