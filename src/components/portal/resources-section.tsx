"use client";

import { useState } from "react";
import { FISCAL_RESOURCES, FREQUENT_FAQS, TESTIMONIALS } from "@/lib/portal-data";
import { Download, ChevronDown, ChevronUp, Star, HelpCircle, FileCheck } from "lucide-react";

export function ResourcesSection() {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [downloadedDoc, setDownloadedDoc] = useState<string | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  const handleDownload = (docName?: string) => {
    if (!docName) return;
    setDownloadedDoc(docName);
    setTimeout(() => setDownloadedDoc(null), 4000);
  };

  return (
    <section id="resources" className="border-b border-slate-200 bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl space-y-16 px-4 sm:px-6 lg:px-8">
        {/* Section 1: Fiscal Guides & Articles */}
        <div className="space-y-8">
          <div className="mx-auto max-w-3xl space-y-2 text-center">
            <span className="inline-block rounded-full border border-emerald-200 bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-800">
              Ressources & Publications
            </span>
            <h2 className="font-serif text-3xl font-bold text-slate-900">
              Guides Fiscaux, Comptables & Calendrier de Gestion
            </h2>
            <p className="text-sm text-slate-600">
              Consultez nos fiches synthétiques pour rester parfaitement informé des obligations
              réglementaires.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {FISCAL_RESOURCES.map((res) => (
              <div
                key={res.id}
                className="flex flex-col justify-between space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="rounded bg-amber-100 px-2.5 py-0.5 font-bold text-amber-900">
                      {res.category}
                    </span>
                    <span className="font-medium text-slate-400">{res.date}</span>
                  </div>

                  <h3 className="font-serif text-base font-bold leading-snug text-slate-900">
                    {res.title}
                  </h3>

                  <p className="text-xs leading-relaxed text-slate-600">{res.summary}</p>

                  {res.content && (
                    <div className="space-y-1.5 border-t border-slate-100 pt-2">
                      {res.content.map((point, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-600">
                          <span className="font-bold text-emerald-700">•</span>
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="border-t border-slate-100 pt-3">
                  <button
                    onClick={() => handleDownload(res.downloadName)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-950 px-3 py-2.5 text-xs font-bold text-amber-300 transition-colors hover:bg-emerald-900"
                  >
                    <Download className="h-4 w-4" />
                    <span>Télécharger la Fiche (PDF)</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {downloadedDoc && (
            <div className="mx-auto flex max-w-md items-center justify-center gap-2 rounded-xl border border-emerald-300 bg-emerald-100 p-4 text-center text-xs font-semibold text-emerald-900 animate-fade-in">
              <FileCheck className="h-4 w-4 text-emerald-700" />
              <span>
                Téléchargement simulé pour : <strong>{downloadedDoc}</strong>
              </span>
            </div>
          )}
        </div>

        {/* Section 2: Testimonials */}
        <div className="space-y-8 rounded-3xl border border-emerald-800 bg-emerald-950 p-8 text-white sm:p-10">
          <div className="mx-auto max-w-2xl space-y-2 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Témoignages Clients
            </span>
            <h3 className="font-serif text-2xl font-bold text-white sm:text-3xl">
              Ce que Disent nos PME & Entrepreneurs Partenaires
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="flex flex-col justify-between space-y-4 rounded-2xl border border-emerald-800/80 bg-slate-900 p-6 shadow-lg"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-xs italic leading-relaxed text-slate-300">"{t.comment}"</p>
                </div>

                <div className="flex items-center justify-between border-t border-slate-800 pt-3">
                  <div>
                    <h4 className="font-serif text-xs font-bold text-amber-300">{t.name}</h4>
                    <p className="text-[11px] text-slate-400">
                      {t.role} • {t.company}
                    </p>
                  </div>
                  <span className="rounded border border-emerald-700 bg-emerald-900 px-2 py-0.5 text-[10px] text-emerald-200">
                    {t.companyType}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Frequently Asked Questions */}
        <div className="mx-auto max-w-4xl space-y-6">
          <div className="space-y-2 text-center">
            <span className="inline-block rounded-full border border-emerald-200 bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-800">
              Foire Aux Questions
            </span>
            <h3 className="font-serif text-2xl font-bold text-slate-900 sm:text-3xl">
              Questions Fréquentes sur Nos Services
            </h3>
          </div>

          <div className="space-y-3">
            {FREQUENT_FAQS.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left font-serif text-sm font-bold text-slate-900 transition-colors hover:text-emerald-900"
                  >
                    <span className="flex items-center gap-2">
                      <HelpCircle className="h-4 w-4 shrink-0 text-emerald-700" />
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="h-5 w-5 shrink-0 text-emerald-700" />
                    ) : (
                      <ChevronDown className="h-5 w-5 shrink-0 text-slate-400" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="border-t border-slate-100 px-5 pb-5 pt-3 text-xs leading-relaxed text-slate-600">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
