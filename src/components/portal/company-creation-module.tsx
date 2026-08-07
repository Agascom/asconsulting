"use client";

import { useState } from "react";
import { LEGAL_FORMS } from "@/lib/portal-data";
import {
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  FolderCheck,
} from "lucide-react";

interface CompanyCreationModuleProps {
  onOpenAppointment: () => void;
}

export function CompanyCreationModule({ onOpenAppointment }: CompanyCreationModuleProps) {
  const [selectedForm, setSelectedForm] = useState(LEGAL_FORMS[0]);
  const [checkedDocs, setCheckedDocs] = useState<{ [key: string]: boolean }>({
    identity: true,
    photo: true,
    lease: false,
    statutes: false,
    capital: false,
    map: false,
  });

  const toggleDoc = (key: string) => {
    setCheckedDocs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const steps = [
    {
      num: "01",
      title: "Consultation & Choix du Statut",
      desc: "Analyse de votre projet pour sélectionner la meilleure forme juridique (SUARL, SARL, EI, SAS) et fiscale.",
    },
    {
      num: "02",
      title: "Rédaction des Actes & Statuts",
      desc: "Établissement sur mesure des statuts, du procès-verbal constitutif et de la déclaration de souscription.",
    },
    {
      num: "03",
      title: "Dépôt au Guichet Unique (GUAN)",
      desc: "Prise en charge intégrale auprès des administrations pour l'obtention du RCCM et du Numéro NIF.",
    },
    {
      num: "04",
      title: "Remise du Dossier & Démarrage",
      desc: "Livraison de votre dossier officiel, aide à l'ouverture de compte bancaire professionnel et affiliations.",
    },
  ];

  const docs = [
    { id: "identity", label: "Copie de la pièce d'identité du gérant (CNI ou Passeport)" },
    { id: "photo", label: "2 photos d'identité récentes fond blanc" },
    { id: "lease", label: "Contrat de bail commercial ou attestation de domiciliation" },
    { id: "statutes", label: "Projet d'activité / Objet social de l'entreprise" },
    { id: "capital", label: "Attestation de dépôt du capital social (si applicable)" },
    { id: "map", label: "Plan de localisation du siège social" },
  ];

  return (
    <section id="creation" className="border-b border-slate-200 bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl space-y-3 text-center">
          <span className="inline-block rounded-full border border-amber-200 bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-800">
            Création d'Entreprise Simplifiée
          </span>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Lancez Votre Société avec un Accompagnement Intégral
          </h2>
          <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
            De la rédaction des statuts jusqu'à l'enregistrement officiel au Registre du Commerce
            (RCCM) et l'attribution du NIF, A&S CONSULTING vous décharge de toutes les procédures
            complexes.
          </p>
        </div>

        {/* Legal Form Selector Tabs */}
        <div className="space-y-6">
          <h3 className="text-center font-serif text-xl font-bold text-slate-900">
            Comparez et Choisissez la Forme Juridique Adaptée
          </h3>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {LEGAL_FORMS.map((form) => {
              const isSelected = form.code === selectedForm.code;
              return (
                <button
                  key={form.code}
                  onClick={() => setSelectedForm(form)}
                  className={`rounded-xl border p-4 text-center font-serif text-sm font-bold transition-all ${
                    isSelected
                      ? "border-emerald-700 bg-emerald-900 text-amber-300 shadow-md"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-emerald-50"
                  }`}
                >
                  <div className="text-base">{form.code}</div>
                  <div className="mt-0.5 truncate font-sans text-xs font-normal opacity-90">
                    {form.name}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Legal Form Detailed Card */}
          <div className="grid grid-cols-1 gap-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-md sm:p-8 lg:grid-cols-12">
            <div className="space-y-5 lg:col-span-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Forme Sélectionnée
                </span>
                <h4 className="font-serif text-2xl font-bold text-slate-900">
                  {selectedForm.fullName} ({selectedForm.code})
                </h4>
                <p className="mt-1 text-xs text-slate-500">{selectedForm.recommendedFor}</p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <div className="text-[11px] font-semibold uppercase text-slate-500">Capital Requis</div>
                  <div className="mt-0.5 text-xs font-bold text-slate-900">{selectedForm.minCapital}</div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <div className="text-[11px] font-semibold uppercase text-slate-500">Nombre d'Associés</div>
                  <div className="mt-0.5 text-xs font-bold text-slate-900">{selectedForm.associates}</div>
                </div>
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3">
                  <div className="flex items-center gap-1 text-[11px] font-semibold uppercase text-emerald-800">
                    <Clock className="h-3.5 w-3.5" /> Délai Estimé
                  </div>
                  <div className="mt-0.5 text-xs font-bold text-emerald-950">{selectedForm.estimatedDelay}</div>
                </div>
              </div>

              <div className="space-y-2">
                <h5 className="text-xs font-bold uppercase text-slate-900">
                  Avantages Majeurs du Statut
                </h5>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {selectedForm.advantages.map((adv, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                      <span>{adv}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between space-y-4 rounded-xl border border-slate-800 bg-slate-900 p-6 text-white lg:col-span-4">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 rounded bg-amber-400 px-2.5 py-1 text-[11px] font-bold text-slate-950">
                  <Sparkles className="h-3.5 w-3.5" /> Dossier Clé en Main
                </div>
                <h5 className="font-serif text-lg font-bold text-white">
                  Prêt à immatriculer votre {selectedForm.code} ?
                </h5>
                <p className="text-xs leading-relaxed text-slate-300">
                  Confiez la rédaction de vos statuts et l'enregistrement au Guichet Unique à nos
                  spécialistes.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={onOpenAppointment}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 py-3 text-xs font-bold text-slate-950 shadow transition-colors hover:bg-amber-600"
                >
                  <span>Créer ma {selectedForm.code}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Roadmap Steps */}
        <div className="space-y-6">
          <div className="space-y-1 text-center">
            <h3 className="font-serif text-2xl font-bold text-slate-900">
              Le Processus d'Accompagnement en 4 Étapes Simple
            </h3>
            <p className="text-xs text-slate-500">
              Un calendrier transparent pour le lancement de votre activité
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((st, idx) => (
              <div key={idx} className="relative space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-950 font-serif text-lg font-bold text-amber-400 shadow">
                  {st.num}
                </div>
                <h4 className="font-serif text-sm font-bold text-slate-900">{st.title}</h4>
                <p className="text-xs leading-relaxed text-slate-600">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Required Documents Checklist for Entrepreneur */}
        <div className="space-y-4 rounded-2xl border border-emerald-800 bg-emerald-950 p-6 text-white sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-emerald-800 pb-4">
            <div>
              <h4 className="flex items-center gap-2 font-serif text-xl font-bold text-amber-300">
                <FolderCheck className="h-5 w-5" /> Liste des Pièces Généralement Requis
              </h4>
              <p className="mt-0.5 text-xs text-slate-300">
                Cochez les éléments dont vous disposez déjà pour préparer votre premier rendez-vous
                avec A&S CONSULTING
              </p>
            </div>
            <span className="rounded-full border border-emerald-700 bg-emerald-900 px-3 py-1 text-xs font-semibold text-amber-300">
              Checklist Créateur
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2 lg:grid-cols-3">
            {docs.map((item) => (
              <label
                key={item.id}
                onClick={() => toggleDoc(item.id)}
                className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 text-xs transition-colors ${
                  checkedDocs[item.id]
                    ? "border-amber-400 bg-emerald-900/90 font-medium text-amber-200"
                    : "border-emerald-800 bg-slate-900/80 text-slate-300 hover:bg-slate-900"
                }`}
              >
                <input
                  type="checkbox"
                  checked={!!checkedDocs[item.id]}
                  onChange={() => {}}
                  className="mt-0.5 accent-amber-400"
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <span className="text-xs text-slate-300">
              Il vous manque certaines pièces ? A&S CONSULTING vous aide à les constituer.
            </span>
            <button
              onClick={onOpenAppointment}
              className="rounded-lg bg-amber-500 px-5 py-2.5 text-xs font-bold text-slate-950 shadow transition-colors hover:bg-amber-600"
            >
              Prendre RDV avec un Conseiller
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
