"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { COMPANY_INFO } from "@/lib/portal-data";
import { MapPin, Phone, Mail, Clock, ShieldCheck, ArrowRight, Send } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À Propos du Cabinet" },
  { href: "/services", label: "Nos Services & Expertises" },
  { href: "/creation-entreprise", label: "Guichet Création d'Entreprise" },
  { href: "/espace-client", label: "Portail Numérique Client" },
  { href: "/contact", label: "Localisation & Contact" },
];

const EXPERTISE_LINKS = [
  "Tenue de comptabilité SYSCOHADA",
  "Déclarations d'impôts & TVA",
  "Obttention du Quitus Fiscal",
  "Bulletins de Paie & Cotisations CNSS",
  "Montage des statuts & Immatriculation RCCM",
  "Conseil en gestion financière",
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
    <footer className="bg-slate-950 text-white border-t border-slate-800 pt-16 pb-12 px-4 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
        {/* Brand Col */}
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2.5 cursor-pointer group">
            <div className="relative w-12 h-12 shrink-0 overflow-hidden rounded-full bg-white/10 border border-white/20 transition-transform group-hover:scale-105">
              <Image
                src="/images/logo.png"
                alt="Logo A&S CONSULTING"
                fill
                sizes="48px"
                className="object-contain"
              />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white font-sans">
              A&S <span className="text-orange-500">CONSULTING</span>
            </span>
          </Link>

          <p className="text-xs text-slate-400 leading-relaxed">
            Cabinet de services professionnels spécialisé dans la gestion comptable, les démarches
            administratives, fiscales et sociales. Nous accompagnons les entreprises et les
            entrepreneurs dans l'optimisation de leur gestion et le respect des obligations légales.
          </p>

          <div className="pt-2 text-xs text-orange-400 font-bold flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-orange-500" />
            <span>Cabinet de Services Professionnels Agréé</span>
          </div>
        </div>

        {/* Navigation Quick Links */}
        <div className="space-y-3 text-xs">
          <h4 className="font-black text-white text-sm uppercase tracking-wider text-orange-400">
            Pages Du Site
          </h4>
          <ul className="space-y-2 text-slate-300 font-semibold">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-orange-400">
                  • {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Expertises */}
        <div className="space-y-3 text-xs">
          <h4 className="font-black text-white text-sm uppercase tracking-wider text-orange-400">
            Domaines d'Expertise
          </h4>
          <ul className="space-y-2 text-slate-400">
            {EXPERTISE_LINKS.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>

        {/* Address & Newsletter */}
        <div className="space-y-3 text-xs">
          <h4 className="font-black text-white text-sm uppercase tracking-wider text-orange-400">
            Cabinet à Libreville
          </h4>
          <div className="space-y-2 text-slate-300">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
              <span>
                {COMPANY_INFO.addressLine1}, {COMPANY_INFO.addressLine2}, Gabon.
              </span>
            </div>
            <a
              href={`tel:${COMPANY_INFO.phonePrimary.replace(/\s/g, "")}`}
              className="flex items-center gap-2 transition-colors hover:text-orange-400"
            >
              <Phone className="w-4 h-4 text-orange-500 shrink-0" />
              <span>{COMPANY_INFO.phonePrimary}</span>
            </a>
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="flex items-center gap-2 transition-colors hover:text-orange-400"
            >
              <Mail className="w-4 h-4 text-orange-500 shrink-0" />
              <span>{COMPANY_INFO.email}</span>
            </a>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-500 shrink-0" />
              <span>{COMPANY_INFO.workingHours}</span>
            </div>
          </div>

          {/* Newsletter */}
          <form onSubmit={handleNewsletter} className="space-y-2 pt-2">
            <span className="block text-[11px] font-bold uppercase text-slate-400">
              Lettre d'Information Fiscale
            </span>
            <div className="flex gap-1.5">
              <input
                type="email"
                required
                placeholder="Votre adresse email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full rounded-full border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-orange-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={newsletterPending}
                className="rounded-full bg-orange-500 px-3.5 py-2 text-xs font-bold text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
                aria-label="S'inscrire à la newsletter"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
            {newsletterSubscribed && (
              <p className="text-[11px] font-bold text-orange-400">
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

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© {new Date().getFullYear()} A&S CONSULTING - Tous droits réservés.</p>

        <div className="flex items-center gap-4">
          <button onClick={() => setShowLegalModal(true)} className="transition-colors hover:text-orange-400">
            Mentions Légales & Confidentialité
          </button>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 rounded bg-slate-900 p-1.5 text-orange-400 transition-colors hover:bg-slate-800"
          >
            <ArrowRight className="h-3.5 w-3.5 rotate-90" /> Haut de page
          </button>
        </div>
      </div>

      {/* Legal Modal */}
      {showLegalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg space-y-4 rounded-2xl border border-slate-700 bg-slate-900 p-6 text-white shadow-2xl animate-scale-up">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-extrabold text-base text-white">
                Mentions Légales - A&S CONSULTING
              </h3>
              <button
                onClick={() => setShowLegalModal(false)}
                aria-label="Fermer"
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="max-h-60 space-y-2 overflow-y-auto text-xs text-slate-300">
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
              className="w-full rounded-full bg-orange-500 py-2 text-xs font-bold text-white transition-colors hover:bg-orange-600"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}
