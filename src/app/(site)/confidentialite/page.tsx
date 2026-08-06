import { PageHeader } from "@/components/site/sections";
import { SITE } from "@/lib/site-shared";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Politique de confidentialité",
};

export default function ConfidentialitePage() {
  return (
    <>
      <PageHeader
        title="Politique de confidentialité"
        subtitle="Comment nous collectons, utilisons et protégeons vos données personnelles."
        breadcrumb="Politique de confidentialité"
      />
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl space-y-8 px-4 text-sm leading-relaxed text-slate-700 sm:px-6">
          <div>
            <h2 className="text-lg font-semibold text-brand-900">Données collectées</h2>
            <p className="mt-3">
              Lorsque vous utilisez le formulaire de contact ou de demande de
              devis, nous collectons les informations que vous nous
              communiquez volontairement : nom, prénom, entreprise, téléphone,
              adresse e-mail et contenu de votre message.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-brand-900">Utilisation des données</h2>
            <p className="mt-3">
              Ces données sont utilisées exclusivement pour traiter votre
              demande, vous répondre et assurer le suivi de notre relation. Elles
              ne sont jamais cédées, louées ou vendues à des tiers.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-brand-900">Durée de conservation</h2>
            <p className="mt-3">
              Les demandes de contact sont conservées pendant une durée maximale
              de 3 ans à compter du dernier échange. Vous pouvez demander la
              suppression de vos données à tout moment.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-brand-900">Sécurité</h2>
            <p className="mt-3">
              Vos données sont stockées sur une base de données sécurisée,
              accessible uniquement par les membres autorisés du cabinet. Le
              site est protégé par un certificat SSL et des mesures de sécurité
              techniques et organisationnelles.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-brand-900">Vos droits</h2>
            <p className="mt-3">
              Conformément à la loi gabonaise n°001/2011 relative à la
              protection des données à caractère personnel, vous disposez d'un
              droit d'accès, de rectification et de suppression de vos données.
              Pour exercer ces droits, contactez-nous à l'adresse{" "}
              {SITE.defaultEmail}.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
