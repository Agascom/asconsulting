"use client";

import type { PageTab } from "@/lib/portal-data";
import { Calculator, FileCheck, Users, Building2, MapPin, ArrowUpRight } from "lucide-react";

interface HighlightsBarProps {
  onNavigate: (tab: PageTab) => void;
}

export function HighlightsBar({ onNavigate }: HighlightsBarProps) {
  const highlights = [
    {
      id: "comptabilite",
      tab: "services" as PageTab,
      icon: Calculator,
      title: "Tenue Comptable",
      desc: "Normes SYSCOHADA, bilan & suivi financier.",
    },
    {
      id: "fiscalite",
      tab: "services" as PageTab,
      icon: FileCheck,
      title: "Fiscalité & Impôts",
      desc: "Déclarations TVA, IS, IRPP & Quitus fiscal.",
    },
    {
      id: "social",
      tab: "services" as PageTab,
      icon: Users,
      title: "Gestion Sociale & Paie",
      desc: "Fiches de paie & cotisations CNSS/CNAMGS.",
    },
    {
      id: "creation",
      tab: "creation" as PageTab,
      icon: Building2,
      title: "Création d'Entreprise",
      desc: "SARL, SUARL, NIF & RCCM en 3-5 jours.",
    },
    {
      id: "location",
      tab: "location" as PageTab,
      icon: MapPin,
      title: "Accès & Proximité",
      desc: "Carrefour Léon Mba, près UBA Gare Routière.",
    },
  ];

  return (
    <div className="relative z-30 mx-auto -mt-8 max-w-7xl px-4 sm:-mt-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-3.5 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl sm:grid-cols-2 lg:grid-cols-5">
        {highlights.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => onNavigate(item.tab)}
              className="group flex cursor-pointer flex-col justify-between rounded-xl border border-slate-100 bg-slate-50 p-4 text-slate-800 transition-all duration-300 hover:border-emerald-800 hover:bg-emerald-900 hover:text-white"
            >
              <div className="mb-2 flex items-start justify-between">
                <div className="rounded-lg bg-emerald-100 p-2.5 text-emerald-900 transition-colors group-hover:bg-amber-400 group-hover:text-slate-950">
                  <Icon className="h-5 w-5" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber-300" />
              </div>

              <div>
                <h3 className="mb-1 font-serif text-sm font-bold tracking-tight group-hover:text-amber-300">
                  {item.title}
                </h3>
                <p className="text-xs leading-snug text-slate-500 group-hover:text-slate-200">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
