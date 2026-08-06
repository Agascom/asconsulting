import { db } from "@/lib/db";
import { getSettings } from "@/lib/site";
import { whatsappLink } from "@/lib/site-shared";
import { ContactForm } from "@/components/site/contact-form";
import { PageHeader } from "@/components/site/sections";
import { Icon } from "@/components/site/icons";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const [services, settings] = await Promise.all([
    db.service.findMany({ where: { published: true }, orderBy: { order: "asc" } }),
    getSettings(),
  ]);
  const wa = whatsappLink(settings.whatsapp);

  return (
    <>
      <PageHeader
        title="Contactez-nous"
        subtitle="Une question, un projet de création, un besoin comptable ? Notre équipe vous répond sous 24h ouvrées."
        breadcrumb="Contact"
      />

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_0.85fr]">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-brand-900">Envoyez-nous un message</h2>
            <p className="mt-1 text-sm text-slate-500">
              Les champs marqués d'une astérisque (*) sont obligatoires.
            </p>
            <div className="mt-6">
              <ContactForm services={services} />
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 p-6">
              <h3 className="font-semibold text-brand-900">Coordonnées</h3>
              <ul className="mt-4 space-y-4 text-sm text-slate-700">
                <li className="flex items-start gap-3">
                  <Icon name="mapPin" className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" />
                  <div>
                    <p className="font-medium text-brand-900">Adresse</p>
                    {settings.address}
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="phone" className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" />
                  <div>
                    <p className="font-medium text-brand-900">Téléphone</p>
                    <a
                      href={`tel:${settings.phone.replace(/\s/g, "")}`}
                      className="hover:text-brand-700"
                    >
                      {settings.phone}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="mail" className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" />
                  <div>
                    <p className="font-medium text-brand-900">E-mail</p>
                    <a href={`mailto:${settings.email}`} className="hover:text-brand-700">
                      {settings.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="clock" className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" />
                  <div>
                    <p className="font-medium text-brand-900">Horaires</p>
                    {settings.hours}
                  </div>
                </li>
              </ul>
              {settings.whatsapp && (
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#25D366] px-5 py-3 font-semibold text-white transition-colors hover:bg-[#1fb355]"
                >
                  <Icon name="whatsapp" className="h-5 w-5" />
                  Écrire sur WhatsApp
                </a>
              )}
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <iframe
                title="Localisation A&S Consulting"
                src="https://www.google.com/maps?q=Libreville,+Gabon&output=embed"
                className="h-72 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
