import Link from "next/link";
import type { SiteSettings } from "@/lib/site-shared";
import { whatsappLink } from "@/lib/site-shared";
import { Icon, Logo } from "@/components/site/icons";

const SERVICE_LINKS = [
  { href: "/services/tenue-de-comptabilite", label: "Tenue de comptabilité" },
  { href: "/services/demarches-administratives-et-fiscales", label: "Démarches administratives et fiscales" },
  { href: "/services/gestion-sociale", label: "Gestion sociale" },
  { href: "/services/creation-d-entreprise", label: "Création d'entreprise" },
];

export function Footer({ settings }: { settings: SiteSettings }) {
  const wa = whatsappLink(settings.whatsapp);

  return (
    <footer className="bg-brand-950 text-brand-100">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <Logo />
              <span className="text-lg font-bold text-white">A&S Consulting</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-brand-200">
              Cabinet de gestion comptable, fiscale, sociale et administrative.
              Nous accompagnons les entreprises et les porteurs de projets à
              Libreville et dans toute la sous-région.
            </p>
            <a
              href="https://www.facebook.com/profile.php?id=100087006793876"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Page Facebook"
              className="mt-5 inline-flex h-10 w-10 items-center justify-center rounded-md bg-white/10 text-white transition-colors hover:bg-gold-500 hover:text-brand-950"
            >
              <Icon name="facebook" className="h-5 w-5" />
            </a>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { href: "/", label: "Accueil" },
                { href: "/a-propos", label: "Le Cabinet" },
                { href: "/services", label: "Nos services" },
                { href: "/pourquoi-nous", label: "Pourquoi nous choisir" },
                { href: "/actualites", label: "Actualités" },
                { href: "/faq", label: "FAQ" },
                { href: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-brand-200 transition-colors hover:text-gold-300">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Nos services
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {SERVICE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-brand-200 transition-colors hover:text-gold-300">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-brand-200">
              <li className="flex items-start gap-3">
                <Icon name="mapPin" className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                {settings.address}
              </li>
              <li className="flex items-center gap-3">
                <Icon name="phone" className="h-4 w-4 shrink-0 text-gold-400" />
                <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="hover:text-gold-300">
                  {settings.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Icon name="mail" className="h-4 w-4 shrink-0 text-gold-400" />
                <a href={`mailto:${settings.email}`} className="hover:text-gold-300">
                  {settings.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="clock" className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                {settings.hours}
              </li>
              {settings.whatsapp && (
                <li>
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md bg-[#25D366] px-3 py-2 font-medium text-white hover:bg-[#1fb355]"
                  >
                    <Icon name="whatsapp" className="h-4 w-4" />
                    Discuter sur WhatsApp
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-brand-300 sm:flex-row sm:px-6">
          <p>
            © {new Date().getFullYear()} A&S CONSULTING — Tous droits réservés.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/mentions-legales" className="hover:text-gold-300">
              Mentions légales
            </Link>
            <Link href="/confidentialite" className="hover:text-gold-300">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
