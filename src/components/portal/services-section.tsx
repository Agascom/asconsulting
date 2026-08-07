"use client";

import { useState } from "react";
import type { PageTab, ServiceDetail } from "@/lib/portal-data";
import { CORE_SERVICES } from "@/lib/portal-data";
import {
  Calculator,
  FileCheck,
  Users,
  Building2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Layers,
  FileText,
} from "lucide-react";

interface ServicesSectionProps {
  onNavigate: (tab: PageTab) => void;
  onOpenAppointment: () => void;
}

const ICONS: Record<string, typeof Calculator> = {
  Calculator,
  FileCheck,
  Users,
  Building2,
};

function ServiceIcon({ iconName, className }: { iconName: string; className?: string }) {
  const Icon = ICONS[iconName] || Layers;
  return <Icon className={className} />;
}

export function ServicesSection({ onNavigate, onOpenAppointment }: ServicesSectionProps) {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(CORE_SERVICES[0].id);

  const activeService: ServiceDetail =
    CORE_SERVICES.find((s) => s.id === selectedServiceId) || CORE_SERVICES[0];

  return (
    <section id="services" className="border-b border-slate-200 bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-3xl space-y-3 text-center">
          <span className="inline-block rounded-full border border-emerald-200 bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-800">
            Domaines d'Expertise & Prestations
          </span>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Des Services Professionnels Sur Mesure pour Votre Entreprise
          </h2>
          <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
            De la tenue de vos comptes aux obligations fiscales et sociales, jusqu'à la création de
            votre société, bénéficiez de l'accompagnement personnalisé de nos experts.
          </p>
        </div>

        {/* 4 Core Pillars Selector Cards */}
        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CORE_SERVICES.map((srv) => {
            const isSelected = srv.id === selectedServiceId;

            return (
              <button
                key={srv.id}
                onClick={() => setSelectedServiceId(srv.id)}
                className={`relative flex flex-col justify-between rounded-2xl border p-5 text-left transition-all duration-300 ${
                  isSelected
                    ? "scale-[1.02] border-emerald-800 bg-emerald-950 text-white shadow-xl"
                    : "border-slate-200 bg-slate-50 text-slate-800 hover:border-emerald-300 hover:bg-emerald-50"
                }`}
              >
                {srv.tag && (
                  <span
                    className={`mb-3 self-start rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                      isSelected ? "bg-amber-400 text-slate-950" : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {srv.tag}
                  </span>
                )}

                <div className="space-y-3">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                      isSelected
                        ? "border border-emerald-700 bg-emerald-900 text-amber-300"
                        : "bg-emerald-100 text-emerald-900"
                    }`}
                  >
                    <ServiceIcon iconName={srv.iconName} className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className={`font-serif text-base font-bold ${isSelected ? "text-white" : "text-slate-900"}`}>
                      {srv.title}
                    </h3>
                    <p className={`mt-1 line-clamp-2 text-xs ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                      {srv.shortDesc}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-200/20 pt-3 text-xs font-semibold">
                  <span>Voir le détail</span>
                  <ArrowRight className={`h-4 w-4 ${isSelected ? "text-amber-400" : "text-emerald-700"}`} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Service Display Card */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-6 text-white shadow-2xl sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
            {/* Main Info */}
            <div className="space-y-6 lg:col-span-7">
              <div className="flex items-center gap-3">
                <div className="rounded-xl border border-emerald-700 bg-emerald-900 p-3 text-amber-300">
                  <ServiceIcon iconName={activeService.iconName} className="h-7 w-7" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                    Pilier d'Expertise
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white sm:text-3xl">
                    {activeService.title}
                  </h3>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
                {activeService.fullDesc}
              </p>

              {/* Benefits list */}
              <div className="space-y-3">
                <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
                  <ShieldCheck className="h-4 w-4" /> Avantages Majeurs pour Votre Entreprise
                </h4>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {activeService.benefits.map((b, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 rounded-lg border border-slate-700/80 bg-slate-800/80 p-2.5 text-xs text-slate-200"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deliverables list */}
              <div className="space-y-3 pt-2">
                <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-300">
                  <FileText className="h-4 w-4" /> Livrables & Documents Fournis
                </h4>
                <ul className="grid grid-cols-1 gap-2 text-xs text-slate-300 sm:grid-cols-2">
                  {activeService.deliverables.map((d, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar Box for Action */}
            <div className="space-y-5 rounded-2xl border border-emerald-800 bg-emerald-950 p-6 lg:col-span-5">
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                  Accompagnement Dédié
                </span>
                <h4 className="font-serif text-lg font-bold text-white">
                  Besoin de cette prestation ?
                </h4>
                <p className="text-xs leading-relaxed text-slate-300">
                  Nous établissons une proposition financière claire, adaptée à la taille de votre
                  structure (PME, Startup, Indépendant).
                </p>
              </div>

              {/* Target audience badges */}
              <div className="space-y-2">
                <span className="text-[11px] font-semibold text-slate-300">
                  Structures Concernées :
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeService.targetAudience.map((target, idx) => (
                    <span
                      key={idx}
                      className="rounded border border-slate-700 bg-slate-800 px-2.5 py-1 text-[11px] font-medium text-amber-300"
                    >
                      {target}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-2.5 pt-3">
                <button
                  onClick={() => onNavigate("simulator")}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 py-3 text-xs font-bold text-slate-950 shadow transition-colors hover:bg-amber-600"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Calculer un Devis Estimatif</span>
                </button>

                <button
                  onClick={onOpenAppointment}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-600 bg-emerald-800 py-3 text-xs font-semibold text-white transition-colors hover:bg-emerald-700"
                >
                  <span>Prendre RDV à notre Cabinet</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
