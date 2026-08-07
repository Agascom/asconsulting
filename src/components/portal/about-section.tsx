"use client";

import Image from "next/image";
import type { PageTab } from "@/lib/portal-data";
import { COMPANY_INFO } from "@/lib/portal-data";
import { MapPin, CheckCircle, ArrowRight, Clock } from "lucide-react";

interface AboutSectionProps {
  onNavigate: (tab: PageTab) => void;
  onOpenAppointment: () => void;
}

const officeImg = "/images/nous.jpeg";

export function AboutSection({ onNavigate, onOpenAppointment }: AboutSectionProps) {
  const corePillars = [
    { title: "Comptabilité & OHADA", desc: "Saisie, arrêt des comptes, bilan & états financiers." },
    { title: "Fiscalité & Quitus", desc: "Déclarations d'impôts, TVA, IS, IRPP sans retard." },
    { title: "Gestion Sociale & Paie", desc: "Bulletins de paie, cotisations CNSS & CNAMGS." },
    { title: "Création de Société", desc: "Du montage du dossier à l'enregistrement RCCM & NIF." },
  ];

  return (
    <section id="a-propos" className="border-b border-slate-200 bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Left Column: Image Card & Quick Badges */}
          <div className="relative lg:col-span-5">
            <div className="group relative overflow-hidden rounded-2xl border-4 border-white bg-slate-900 shadow-2xl">
              <Image
                src={officeImg}
                alt="Cabinet A&S CONSULTING"
                width={640}
                height={840}
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="h-[420px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

              {/* Floating Badge on Image */}
              <div className="absolute bottom-6 left-6 right-6 space-y-1 rounded-xl border border-emerald-500/40 bg-slate-900/90 p-4 text-white shadow-lg backdrop-blur-md">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span>Emplacement Stratégique & Accessible</span>
                </div>
                <p className="text-xs text-slate-200">
                  {COMPANY_INFO.addressLine1} ({COMPANY_INFO.addressLine2})
                </p>
              </div>
            </div>

            {/* Decorative Offset Element */}
            <div className="absolute -left-5 -top-5 -z-10 hidden h-24 w-24 rounded-2xl bg-amber-400/20 blur-xl sm:block" />
            <div className="absolute -bottom-5 -right-5 -z-10 hidden h-32 w-32 rounded-2xl bg-emerald-600/20 blur-xl sm:block" />
          </div>

          {/* Right Column: Content */}
          <div className="space-y-6 lg:col-span-7">
            <div className="space-y-2">
              <span className="inline-block rounded-full border border-emerald-200 bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-800">
                Bienvenue chez A&S CONSULTING
              </span>
              <h2 className="font-serif text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                Votre Partenaire de Confiance pour la Gestion Comptable & Fiscale
              </h2>
            </div>

            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              <strong className="text-slate-900">A&S CONSULTING</strong> est un cabinet de services
              professionnels spécialisé dans la gestion comptable, les démarches administratives,
              fiscales et sociales. Nous accompagnons les entreprises et les entrepreneurs dans
              l'optimisation de leur gestion et le respect rigoureux des obligations légales.
            </p>

            {/* Core Values Grid */}
            <div className="grid grid-cols-1 gap-3.5 pt-2 sm:grid-cols-2">
              {corePillars.map((pillar, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{pillar.title}</h4>
                    <p className="mt-0.5 text-[11px] text-slate-500">{pillar.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stat Counters Banner */}
            <div className="grid grid-cols-2 gap-4 rounded-2xl border border-emerald-800 bg-emerald-950 p-5 text-white shadow-inner sm:grid-cols-4">
              {COMPANY_INFO.stats.map((stat, idx) => (
                <div key={idx} className="space-y-1 text-center sm:text-left">
                  <div className="font-serif text-xl font-bold text-amber-400 sm:text-2xl">
                    {stat.value}
                  </div>
                  <div className="text-xs font-semibold leading-tight text-slate-200">{stat.label}</div>
                  <div className="text-[10px] text-emerald-300/80">{stat.subtext}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate("services")}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-900 px-5 py-2.5 text-xs font-bold text-amber-300 shadow transition-colors hover:bg-emerald-800 sm:text-sm"
              >
                <span>Explorer Tous Nos Services</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={onOpenAppointment}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-slate-800 sm:text-sm"
              >
                <Clock className="h-4 w-4 text-amber-400" />
                <span>Consulter un Expert</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
