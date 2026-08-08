"use client";

import { useState } from "react";
import { LEGAL_FORMS } from "@/lib/portal-data";
import { Reveal } from "@/components/site/reveal";
import {
  Briefcase,
  CheckCircle2,
  Clock,
  UserCheck,
  Send,
  ShieldCheck,
} from "lucide-react";

interface CompanyCreationModuleProps {
  onOpenAppointment: () => void;
}

export function CompanyCreationModule({ onOpenAppointment }: CompanyCreationModuleProps) {
  const [selectedFormCode, setSelectedFormCode] = useState(LEGAL_FORMS[0].code);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [projectName, setProjectName] = useState("");
  const [managerName, setManagerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const activeForm =
    LEGAL_FORMS.find((f) => f.code === selectedFormCode) || LEGAL_FORMS[0];

  const steps = [
    {
      step: "01",
      title: "Choix de la Forme Juridique",
      desc: "Orientation stratégique entre SUARL, SARL, Entreprise Individuelle ou SAS selon vos objectifs.",
    },
    {
      step: "02",
      title: "Rédaction des Statuts",
      desc: "Confection personnalisée des statuts, procès-verbaux d'assemblée et déclarations de souscription.",
    },
    {
      step: "03",
      title: "Démarches Guichet Unique & Banque",
      desc: "Dépôt du capital social en compte bloqué, attestation bancaire et formalités au guichet unique (GUAN).",
    },
    {
      step: "04",
      title: "Obtention NIF & RCCM",
      desc: "Délivrance de votre Numéro d'Identification Fiscale (NIF) et du Registre du Commerce (RCCM).",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="pt-32 pb-20 px-4 sm:px-8 lg:px-12 bg-slate-950 text-white min-h-screen space-y-16">
      {/* Page Header */}
      <Reveal className="max-w-7xl mx-auto space-y-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-400 text-xs font-extrabold border border-orange-500/30 uppercase tracking-widest">
          <Briefcase className="w-4 h-4 text-orange-500" /> Guichet Création d'Entreprise Clé en
          Main
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Passez de l'Idée à <span className="text-orange-500">l'Immatriculation</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Nous vous guidons à chaque étape du processus de création de votre société au Gabon, du
          montage du dossier jusqu'à l'enregistrement définitif (NIF & RCCM).
        </p>
      </Reveal>

      {/* 4 Steps Timeline */}
      <Reveal delay={120} className="max-w-7xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
        <h2 className="text-xl sm:text-3xl font-black text-white text-center">
          Le Processus de Création en 4 Étapes
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st, idx) => (
            <Reveal key={st.step} delay={200 + idx * 100}>
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 relative space-y-3 h-full transition-all duration-300 hover:-translate-y-1.5 hover:border-orange-500/60">
                <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 font-black text-sm flex items-center justify-center border border-orange-500/30">
                  {st.step}
                </div>
                <h3 className="font-extrabold text-sm text-white">{st.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{st.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Reveal>

      {/* Legal Forms Comparison */}
      <div className="max-w-7xl mx-auto space-y-8">
        <Reveal className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            Quelle Forme Juridique Choisir ?
          </h2>
          <p className="text-xs text-slate-400">
            Découvrez les caractéristiques principales des structures d'entreprise au Gabon.
          </p>
        </Reveal>

        <Reveal delay={120} className="flex border-b border-slate-800 gap-3 justify-center overflow-x-auto pb-2">
          {LEGAL_FORMS.map((form) => (
            <button
              key={form.code}
              onClick={() => setSelectedFormCode(form.code)}
              className={`px-6 py-3 rounded-2xl text-xs font-black transition-all duration-200 whitespace-nowrap ${
                selectedFormCode === form.code
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              {form.code}
            </button>
          ))}
        </Reveal>

        <Reveal delay={160} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-black uppercase text-orange-400">
                Code Structure : {activeForm.code}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">{activeForm.name}</h3>
              <p className="text-xs text-slate-300">
                Recommandé pour : <strong className="text-orange-400">{activeForm.recommendedFor}</strong>
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Capital Minimum :</span>
                <span className="font-bold text-white">{activeForm.minCapital}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Nombre d'Associés :</span>
                <span className="font-bold text-white">{activeForm.associates}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                <span className="text-slate-400 text-[11px]">
                  Délai : <strong className="text-white">{activeForm.estimatedDelay}</strong>
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase text-orange-400">
                Principaux Avantages :
              </h4>
              {activeForm.advantages.map((adv, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>{adv}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Creation Request Form */}
          <div className="lg:col-span-5 bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4">
            <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-orange-500" />
              <span>Demande d'Accompagnement Création</span>
            </h4>

            {formSubmitted ? (
              <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center mx-auto font-bold">
                  ✓
                </div>
                <h5 className="font-extrabold text-xs text-white">Dossier Initial Reçu</h5>
                <p className="text-[11px] text-slate-300">
                  Un juriste d'A&S CONSULTING prendra contact avec vous sous 24h pour finaliser le
                  montage de vos statuts.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="text-[11px] text-slate-400 font-bold block mb-1">
                    Nom de la future société :
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Gabon Transit SARL"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 font-bold block mb-1">
                    Nom & Prénom du Dirigeant :
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Jean-Paul Mba"
                    value={managerName}
                    onChange={(e) => setManagerName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] text-slate-400 font-bold block mb-1">
                      Téléphone :
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+241 77 ..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 font-bold block mb-1">
                      Email :
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="contact@..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 mt-2 shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>Initier Mon Dossier De Création</span>
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>

      {/* Closing CTA */}
      <Reveal className="max-w-7xl mx-auto bg-gradient-to-r from-orange-500/15 to-amber-500/10 border border-orange-500/30 rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Prêt à Lancer Votre <span className="text-orange-500">Société</span> ?
          </h2>
          <p className="text-xs text-slate-300 max-w-xl">
            Confiez-nous votre projet dès aujourd'hui : nos experts immatriculent votre structure en
            3 à 7 jours ouvrés, en toute sécurité juridique.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onOpenAppointment}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs rounded-full shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Prendre RDV avec un Conseiller</span>
          </button>
        </div>
      </Reveal>
    </div>
  );
}
