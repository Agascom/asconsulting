"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { COMPANY_INFO } from "@/lib/portal-data";
import { Phone, Mail, MapPin, Clock, Send, ArrowUp } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/#a-propos", label: "À propos du Cabinet" },
  { href: "/#services", label: "Nos Expertises" },
  { href: "/#creation", label: "Création d'Entreprise" },
  { href: "/#simulator", label: "Simulateur Devis" },
  { href: "/#location", label: "Localisation & Accès" },
];

const EXPERTISE_LINKS = [
  "Tenue de comptabilité SYSCOHADA",
  "Déclarations d'impôts & Quitus fiscal",
  "Gestion sociale, Paie & CNSS",
  "Immatriculation RCCM & NIF",
  "Assistance aux contrôles fiscaux",
];

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [newsletterError, setNewsletterError] = useState(false);
  const [newsletterPending, setNewsletterPending] = useState(false);
  const [showLegalModal, setShowLegalModal] = useState(false);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterPending(true);
    setNewsletterError(false);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      if (!res.ok) {
        setNewsletterError(true);
        return;
      }
      setNewsletterSubscribed(true);
      setTimeout(() => setNewsletterSubscribed(false), 4000);
      setNewsletterEmail("");
    } catch {
      setNewsletterError(true);
    } finally {
      setNewsletterPending(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-emerald-900 bg-emerald-950 text-white">
      {/* Main Footer Grid */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Col 1: Brand & Description (4 cols) */}
          <div className="space-y-4 lg:col-span-4">
            <Link href="/" className="group flex w-fit cursor-pointer items-center gap-3">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden transition-transform group-hover:scale-105">
                <Image
                  src="/images/logo.png"
                  alt="Logo A&S CONSULTING"
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-serif text-xl font-bold tracking-tight text-white transition-colors group-hover:text-amber-300">
                  A&S CONSULTING
                </span>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
                  Cabinet de Services Professionnels
                </p>
              </div>
            </Link>

            <p className="text-xs leading-relaxed text-slate-300">
              Cabinet spécialisé dans la gestion comptable, les démarches administratives, fiscales
              et sociales, et l'accompagnement à la création d'entreprise pour PME, startups et
              indépendants.
            </p>

            <div className="space-y-1 rounded-xl border border-emerald-800 bg-emerald-900/80 p-3 text-xs text-slate-200">
              <div className="flex items-center gap-1.5 font-bold text-amber-300">
                <MapPin className="h-4 w-4 shrink-0 text-amber-400" />
                <span>Emplacement Cabinet</span>
              </div>
              <p className="text-[11px] text-slate-300">
                {COMPANY_INFO.addressLine1} ({COMPANY_INFO.addressLine2}).
              </p>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="space-y-3 lg:col-span-2">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-amber-300">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-amber-300">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Core Expertise (3 cols) */}
          <div className="space-y-3 lg:col-span-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-amber-300">
              Domaines d'Expertise
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {EXPERTISE_LINKS.map((item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <span className="font-bold text-amber-400">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Newsletter (3 cols) */}
          <div className="space-y-4 lg:col-span-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-amber-300">
              Contact & Inscription
            </h4>

            <div className="space-y-2 text-xs text-slate-300">
              <a
                href={`tel:${COMPANY_INFO.phonePrimary.replace(/\s/g, "")}`}
                className="flex items-center gap-2 transition-colors hover:text-amber-300"
              >
                <Phone className="h-4 w-4 shrink-0 text-amber-400" />
                <span>{COMPANY_INFO.phonePrimary}</span>
              </a>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center gap-2 transition-colors hover:text-amber-300"
              >
                <Mail className="h-4 w-4 shrink-0 text-amber-400" />
                <span>{COMPANY_INFO.email}</span>
              </a>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0 text-amber-400" />
                <span>{COMPANY_INFO.workingHours}</span>
              </div>
            </div>

            {/* Newsletter */}
            <form onSubmit={handleNewsletter} className="space-y-2 pt-2">
              <span className="block text-[11px] font-bold uppercase text-slate-300">
                Lettre d'Information Fiscale
              </span>
              <div className="flex gap-1.5">
                <input
                  type="email"
                  required
                  placeholder="Votre adresse email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full rounded-lg border border-emerald-800 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-400 focus:border-amber-400 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={newsletterPending}
                  className="rounded-lg bg-amber-500 px-3 py-2 text-xs font-bold text-slate-950 transition-colors hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-60"
                  aria-label="S'inscrire à la newsletter"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
              {newsletterSubscribed && (
                <p className="text-[11px] font-bold text-amber-300">
                  Inscription enregistrée avec succès !
                </p>
              )}
              {newsletterError && (
                <p className="text-[11px] font-bold text-red-400">
                  Erreur lors de l'inscription, réessayez.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-emerald-900 bg-emerald-950/80 py-4 text-xs text-slate-400">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} A&S CONSULTING. Tous droits réservés.</p>

          <div className="flex items-center gap-4">
            <button onClick={() => setShowLegalModal(true)} className="transition-colors hover:text-amber-300">
              Mentions Légales & Confidentialité
            </button>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 rounded bg-emerald-900 p-1.5 text-amber-300 transition-colors hover:bg-emerald-800"
            >
              <ArrowUp className="h-3.5 w-3.5" /> Haut de page
            </button>
          </div>
        </div>
      </div>

      {/* Legal Modal */}
      {showLegalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg space-y-4 rounded-2xl border border-slate-200 bg-white p-6 text-slate-900">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-serif text-base font-bold text-slate-900">
                Mentions Légales - A&S CONSULTING
              </h3>
              <button
                onClick={() => setShowLegalModal(false)}
                aria-label="Fermer"
                className="text-slate-400 hover:text-slate-900"
              >
                ✕
              </button>
            </div>

            <div className="max-h-60 space-y-2 overflow-y-auto text-xs text-slate-600">
              <p>
                <strong>Éditeur du site :</strong> Cabinet A&S CONSULTING
              </p>
              <p>
                <strong>Siège social :</strong> {COMPANY_INFO.addressLine1} ({COMPANY_INFO.addressLine2}).
              </p>
              <p>
                <strong>Téléphone :</strong> {COMPANY_INFO.phonePrimary}
              </p>
              <p>
                <strong>Email :</strong> {COMPANY_INFO.email}
              </p>
              <p>
                <strong>Protection des Données :</strong> Les informations recueillies via nos
                formulaires sont strictement destinées au traitement de vos demandes de devis et
                rendez-vous. Elles ne sont jamais cédées à des tiers.
              </p>
            </div>

            <button
              onClick={() => setShowLegalModal(false)}
              className="w-full rounded-xl bg-emerald-950 py-2 text-xs font-bold text-amber-300"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}
