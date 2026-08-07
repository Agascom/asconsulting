"use client";

import { Suspense, useEffect, useState } from "react";
import { LocationSection } from "@/components/portal/location-section";
import { ContactForm } from "@/components/site/contact-form";
import { usePortalUi } from "@/components/portal/portal-ui";

export function LocationContact() {
  const { openAppointment } = usePortalUi();
  const [services, setServices] = useState<{ title: string }[]>([]);

  useEffect(() => {
    fetch("/api/public/services")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: { title: string }[]) => setServices(data))
      .catch(() => setServices([]));
  }, []);

  return (
    <>
      <LocationSection onOpenAppointment={openAppointment} />

      <section id="formulaire" className="border-b border-slate-200 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl space-y-3 text-center">
            <span className="inline-block rounded-full border border-emerald-200 bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-800">
              Formulaire de Contact
            </span>
            <h2 className="font-serif text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Envoyez-nous votre demande
            </h2>
            <p className="text-sm leading-relaxed text-slate-600">
              Une question, un projet de création ou un besoin comptable ? Notre équipe vous répond
              sous 24h ouvrées.
            </p>
          </div>

          <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-8">
            <Suspense
              fallback={
                <p className="py-8 text-center text-xs text-slate-500">
                  Chargement du formulaire...
                </p>
              }
            >
              <ContactForm services={services} />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
