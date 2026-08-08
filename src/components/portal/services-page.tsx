"use client";

import { useState } from "react";
import Image from "next/image";
import { usePortalUi } from "@/components/portal/portal-ui";
import { QuoteSimulator } from "@/components/portal/quote-simulator";
import { Reveal } from "@/components/site/reveal";
import { CORE_SERVICES } from "@/lib/portal-data";
import {
  Calculator,
  FileCheck,
  Users,
  Building2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

function getIcon(iconName: string) {
  switch (iconName) {
    case "Calculator":
      return Calculator;
    case "FileCheck":
      return FileCheck;
    case "Users":
      return Users;
    case "Building2":
      return Building2;
    default:
      return Calculator;
  }
}

export function ServicesPage() {
  const { openAppointment } = usePortalUi();
  const [selectedServiceId, setSelectedServiceId] = useState<string>(CORE_SERVICES[0].id);

  const activeService =
    CORE_SERVICES.find((s) => s.id === selectedServiceId) || CORE_SERVICES[0];

  return (
    <div className="pt-32 pb-20 px-4 sm:px-8 lg:px-12 bg-slate-950 text-white min-h-screen space-y-16">
      {/* Header */}
      <Reveal className="max-w-7xl mx-auto space-y-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-400 text-xs font-extrabold border border-orange-500/30 uppercase tracking-widest">
          <Sparkles className="w-4 h-4 text-orange-500" /> Nos Domaines d'Expertise
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Services Comptables, Fiscaux & <span className="text-orange-500">Sociaux</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Un accompagnement professionnel sur mesure adapté à la taille de votre entreprise pour
          sécuriser votre croissance.
        </p>
      </Reveal>

      {/* Services Grid with Selection Tabs */}
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Navigation Tabs for Services */}
        <Reveal delay={120} className="flex border-b border-slate-800 gap-2 sm:gap-4 overflow-x-auto pb-3">
          {CORE_SERVICES.map((srv) => {
            const Icon = getIcon(srv.iconName);
            const isSelected = selectedServiceId === srv.id;
            return (
              <button
                key={srv.id}
                onClick={() => setSelectedServiceId(srv.id)}
                className={`px-5 py-3 rounded-2xl flex items-center gap-2.5 text-xs font-extrabold transition-all duration-200 whitespace-nowrap shrink-0 ${
                  isSelected
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                    : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{srv.title}</span>
              </button>
            );
          })}
        </Reveal>

        {/* Selected Service Detailed View */}
        <Reveal delay={180} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-black uppercase text-orange-400 tracking-wider">
                {activeService.subtitle}
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white">{activeService.title}</h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeService.fullDesc}
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-black uppercase text-orange-400">
                Inclus Dans Ce Service :
              </h4>
              {activeService.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={openAppointment}
                className="group px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black text-xs rounded-full shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <span>Demander Un Devis pour ce Service</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 relative rounded-3xl overflow-hidden border border-slate-800 shadow-xl h-[320px]">
            <Image
              src={activeService.image}
              alt={activeService.title}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 p-4 bg-slate-950/90 backdrop-blur-md rounded-2xl border border-slate-800 text-xs text-white">
              <span className="font-extrabold text-orange-400 block mb-0.5">
                Cabinet A&S CONSULTING
              </span>
              <p className="text-[11px] text-slate-400">
                Respect strict des normes comptables et fiscales légales en vigueur.
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Interactive Quote Simulator / Devis Gratuit */}
      <QuoteSimulator onOpenAppointment={openAppointment} />
    </div>
  );
}
