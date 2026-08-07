"use client";

import { COMPANY_INFO } from "@/lib/portal-data";
import {
  MapPin,
  Navigation,
  Phone,
  Clock,
  Car,
  Bus,
  Building2,
  ExternalLink,
  Compass,
  CheckCircle2,
} from "lucide-react";

interface LocationSectionProps {
  onOpenAppointment: () => void;
}

export function LocationSection({ onOpenAppointment }: LocationSectionProps) {
  const mapSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    COMPANY_INFO.googleMapsQuery
  )}`;

  return (
    <section id="location" className="border-b border-slate-800 bg-slate-900 py-16 text-white">
      <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl space-y-3 text-center">
          <span className="inline-block rounded-full border border-amber-400/30 bg-amber-500/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-300">
            Cabinet Facilement Accessible
          </span>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Localisation & Accès à Notre Cabinet
          </h2>
          <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
            A&S CONSULTING vous accueille dans un emplacement stratégique au cœur des axes
            principaux.
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          {/* Left Info & Directions Card */}
          <div className="flex flex-col justify-between space-y-6 rounded-3xl border border-emerald-800 bg-emerald-950 p-6 sm:p-8 lg:col-span-5">
            <div className="space-y-4">
              <div className="w-fit rounded-2xl bg-amber-400 p-3 text-slate-950">
                <MapPin className="h-6 w-6" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Adresse exacte
                </span>
                <h3 className="mt-1 font-serif text-2xl font-bold text-white">A&S CONSULTING</h3>
                <p className="mt-2 text-sm font-medium text-slate-200">📍 {COMPANY_INFO.addressLine1}</p>
                <p className="mt-1 text-xs font-semibold text-amber-300">🏛️ {COMPANY_INFO.addressLine2}</p>
              </div>

              {/* Landmarks */}
              <div className="space-y-2 border-t border-emerald-800 pt-2">
                <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase text-emerald-300">
                  <Compass className="h-4 w-4" /> Repères de Proximité
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-400" />
                    <span>
                      À 2 minutes à pied de la <strong>Banque UBA (Gare Routière)</strong>
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-400" />
                    <span>
                      Face aux grands axes du <strong>Carrefour Léon Mba</strong>
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-400" />
                    <span>Parking réservé et facile pour vos dépôts de pièces</span>
                  </li>
                </ul>
              </div>

              {/* How to come */}
              <div className="space-y-2 border-t border-emerald-800 pt-2">
                <h4 className="text-xs font-bold uppercase text-emerald-300">Venir à notre Rencontre</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-xl border border-emerald-700/80 bg-emerald-900/80 p-2.5">
                    <div className="flex items-center gap-1 font-bold text-amber-300">
                      <Bus className="h-3.5 w-3.5" /> Taxi / Bus
                    </div>
                    <div className="mt-0.5 text-[11px] text-slate-300">
                      Arrêt Gare Routière / Carrefour Léon Mba
                    </div>
                  </div>
                  <div className="rounded-xl border border-emerald-700/80 bg-emerald-900/80 p-2.5">
                    <div className="flex items-center gap-1 font-bold text-amber-300">
                      <Car className="h-3.5 w-3.5" /> Véhicule
                    </div>
                    <div className="mt-0.5 text-[11px] text-slate-300">
                      Accès direct par le Boulevard central
                    </div>
                  </div>
                </div>
              </div>

              {/* Working hours */}
              <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 p-3 text-xs text-slate-300">
                <Clock className="h-5 w-5 shrink-0 text-amber-400" />
                <div>
                  <div className="font-bold text-white">Heures d'Ouverture</div>
                  <div className="text-[11px] text-slate-300">{COMPANY_INFO.workingHours}</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 border-t border-emerald-800 pt-4">
              <a
                href={mapSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 py-3 text-xs font-bold text-slate-950 shadow transition-colors hover:bg-amber-600"
              >
                <Navigation className="h-4 w-4" />
                <span>Ouvrir dans Google Maps</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>

              <button
                onClick={onOpenAppointment}
                className="w-full rounded-xl border border-emerald-700 bg-emerald-900 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-emerald-800"
              >
                Prendre Rendez-vous au Cabinet
              </button>
            </div>
          </div>

          {/* Right Simulated Interactive Map Canvas */}
          <div className="relative flex min-h-[400px] flex-col justify-between overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-2xl lg:col-span-7">
            {/* Top Map Header */}
            <div className="relative z-10 flex items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-900/90 p-3.5 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 animate-ping rounded-full bg-emerald-500" />
                <span className="text-xs font-bold text-white">Plan de Situation Interactif</span>
              </div>
              <span className="font-mono text-[11px] font-bold text-amber-400">
                Carrefour Léon Mba • Gare Routière
              </span>
            </div>

            {/* Map Canvas Background Illustration */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/60 p-6">
              {/* Simulated Map Roads & Nodes */}
              <div className="relative h-full w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 opacity-80">
                {/* Horizontal Road */}
                <div className="absolute left-0 right-0 top-1/2 flex h-10 items-center justify-around border-y-2 border-dashed border-slate-600 bg-slate-800">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">
                    Avenue du Carrefour Léon Mba
                  </span>
                </div>
                {/* Vertical Road */}
                <div className="absolute bottom-0 left-1/3 top-0 flex w-10 items-center justify-center border-x-2 border-dashed border-slate-600 bg-slate-800">
                  <span className="whitespace-nowrap font-mono text-[10px] text-slate-400 rotate-90">
                    Axe Gare Routière
                  </span>
                </div>

                {/* Pin 1: A&S CONSULTING */}
                <div className="absolute left-[45%] top-[38%] z-20 flex -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center group">
                  <div className="flex animate-bounce items-center gap-1 rounded-lg border border-white bg-amber-400 px-3 py-1 text-[11px] font-extrabold text-slate-950 shadow-2xl">
                    <Building2 className="h-3.5 w-3.5" /> A&S CONSULTING
                  </div>
                  <div className="-mt-2 h-4 w-4 rotate-45 border border-white bg-amber-400" />
                </div>

                {/* Pin 2: Banque UBA */}
                <div className="absolute left-[25%] top-[65%] flex items-center gap-1.5 rounded-md border border-blue-700 bg-blue-900/90 px-2.5 py-1 text-[10px] font-bold text-blue-200">
                  <span>🏛️ Banque UBA</span>
                </div>

                {/* Pin 3: Carrefour Léon Mba */}
                <div className="absolute left-[70%] top-[25%] flex items-center gap-1.5 rounded-md border border-emerald-700 bg-emerald-900/90 px-2.5 py-1 text-[10px] font-bold text-amber-300">
                  <span>🚦 Carrefour Léon Mba</span>
                </div>

                {/* Pin 4: Gare Routière */}
                <div className="absolute left-[65%] top-[75%] flex items-center gap-1.5 rounded-md border border-slate-700 bg-slate-800 px-2.5 py-1 text-[10px] font-medium text-slate-300">
                  <span>🚌 Terminus Gare Routière</span>
                </div>
              </div>
            </div>

            {/* Bottom Map Floating Overlay */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-emerald-800 bg-emerald-950/90 p-4 text-xs backdrop-blur-md">
              <div>
                <div className="font-bold text-amber-300">Vous avez du mal à trouver ?</div>
                <p className="text-[11px] text-slate-300">
                  Appelez notre secrétariat au <strong>{COMPANY_INFO.phonePrimary}</strong> pour être
                  guidé en direct.
                </p>
              </div>
              <a
                href={`tel:${COMPANY_INFO.phonePrimary.replace(/\s/g, "")}`}
                className="flex items-center gap-1.5 rounded-lg bg-amber-400 px-3.5 py-2 text-xs font-bold text-slate-950 transition-colors hover:bg-amber-300"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>Appeler la Réception</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
