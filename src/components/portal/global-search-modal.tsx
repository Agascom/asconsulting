"use client";

import { useState } from "react";
import type { PageTab } from "@/lib/portal-data";
import { CORE_SERVICES, LEGAL_FORMS, FREQUENT_FAQS } from "@/lib/portal-data";
import { Search, X, ArrowRight } from "lucide-react";

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: PageTab) => void;
}

export function GlobalSearchModal({ isOpen, onClose, onNavigate }: GlobalSearchModalProps) {
  const [query, setQuery] = useState("");

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  const matchingServices = CORE_SERVICES.filter(
    (s) =>
      s.title.toLowerCase().includes(normalizedQuery) ||
      s.shortDesc.toLowerCase().includes(normalizedQuery)
  );

  const matchingForms = LEGAL_FORMS.filter(
    (f) =>
      f.code.toLowerCase().includes(normalizedQuery) ||
      f.fullName.toLowerCase().includes(normalizedQuery)
  );

  const matchingFaqs = FREQUENT_FAQS.filter(
    (faq) =>
      faq.q.toLowerCase().includes(normalizedQuery) ||
      faq.a.toLowerCase().includes(normalizedQuery)
  );

  const handleSelectTab = (tab: PageTab) => {
    onNavigate(tab);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/80 px-4 pt-16 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl animate-scale-up">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-slate-800 bg-slate-900 p-4">
          <Search className="h-5 w-5 shrink-0 text-amber-400" />
          <input
            type="text"
            autoFocus
            placeholder="Rechercher une expertise, un statut (SARL, NIF), la localisation..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            aria-label="Fermer la recherche"
            className="rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search Results */}
        <div className="max-h-[70vh] space-y-6 overflow-y-auto p-6">
          {normalizedQuery === "" ? (
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Recherches Populaires
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Création SARL / SUARL", tab: "creation" as PageTab },
                  { label: "Quitus Fiscal & TVA", tab: "services" as PageTab },
                  { label: "Simulateur de Devis", tab: "simulator" as PageTab },
                  { label: "Localisation Gare Routière", tab: "location" as PageTab },
                  { label: "Bulletins de Paie CNSS", tab: "services" as PageTab },
                ].map((item, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectTab(item.tab)}
                    className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-emerald-900 hover:text-amber-300"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Services matches */}
              {matchingServices.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                    Prestations de Service
                  </h4>
                  <div className="space-y-2">
                    {matchingServices.map((s) => (
                      <div
                        key={s.id}
                        onClick={() => handleSelectTab("services")}
                        className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3 hover:bg-emerald-50"
                      >
                        <div>
                          <div className="text-xs font-bold text-slate-900">{s.title}</div>
                          <div className="line-clamp-1 text-[11px] text-slate-500">{s.shortDesc}</div>
                        </div>
                        <ArrowRight className="h-4 w-4 shrink-0 text-emerald-700" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Legal forms matches */}
              {matchingForms.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800">
                    Statuts Juridiques d'Entreprise
                  </h4>
                  <div className="space-y-2">
                    {matchingForms.map((f) => (
                      <div
                        key={f.code}
                        onClick={() => handleSelectTab("creation")}
                        className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3 hover:bg-emerald-50"
                      >
                        <div>
                          <div className="text-xs font-bold text-slate-900">
                            {f.fullName} ({f.code})
                          </div>
                          <div className="text-[11px] text-slate-500">{f.recommendedFor}</div>
                        </div>
                        <ArrowRight className="h-4 w-4 shrink-0 text-emerald-700" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQ matches */}
              {matchingFaqs.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Réponses & FAQs
                  </h4>
                  <div className="space-y-2">
                    {matchingFaqs.map((faq, i) => (
                      <div
                        key={i}
                        onClick={() => handleSelectTab("resources")}
                        className="cursor-pointer rounded-xl border border-slate-200 bg-slate-50 p-3 hover:bg-emerald-50"
                      >
                        <div className="text-xs font-bold text-slate-900">{faq.q}</div>
                        <div className="mt-1 line-clamp-2 text-[11px] text-slate-500">{faq.a}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {matchingServices.length === 0 &&
                matchingForms.length === 0 &&
                matchingFaqs.length === 0 && (
                  <div className="space-y-2 py-8 text-center text-xs text-slate-500">
                    <p>Aucun résultat direct pour "{query}".</p>
                    <button
                      onClick={() => handleSelectTab("contact")}
                      className="rounded-lg bg-emerald-950 px-4 py-2 text-xs font-bold text-amber-300"
                    >
                      Contactez directement le cabinet
                    </button>
                  </div>
                )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
