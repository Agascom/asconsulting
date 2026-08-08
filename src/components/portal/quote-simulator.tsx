"use client";

import { useState, useMemo } from "react";
import { Sparkles, Send, Building2, Users, Receipt, Check } from "lucide-react";

interface QuoteSimulatorProps {
  onOpenAppointment: () => void;
}

type StructureType = "independant" | "tpe" | "pme" | "creation";
type TurnoverRange = "low" | "medium" | "high";

const STRUCTURE_LABELS: Record<StructureType, string> = {
  independant: "Indépendant",
  tpe: "TPE / Startup",
  pme: "PME en expansion",
  creation: "Nouvelle Création",
};

const TURNOVER_LABELS: Record<TurnoverRange, string> = {
  low: "< 5 Millions FCFA / mois",
  medium: "5 à 20 Millions FCFA / mois",
  high: "> 20 Millions FCFA / mois",
};

export function QuoteSimulator({ onOpenAppointment }: QuoteSimulatorProps) {
  const [structureType, setStructureType] = useState<StructureType>("tpe");
  const [turnoverRange, setTurnoverRange] = useState<TurnoverRange>("medium");
  const [employeeCount, setEmployeeCount] = useState<number>(3);

  const [includeAccounting, setIncludeAccounting] = useState<boolean>(true);
  const [includeFiscal, setIncludeFiscal] = useState<boolean>(true);
  const [includePayroll, setIncludePayroll] = useState<boolean>(true);
  const [includeCreation, setIncludeCreation] = useState<boolean>(false);

  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const calculation = useMemo(() => {
    let baseAccounting = 0;
    let baseFiscal = 0;
    let basePayroll = 0;
    let creationFee = 0;

    if (structureType === "independant") {
      baseAccounting = 50000;
      baseFiscal = 30000;
    } else if (structureType === "tpe") {
      baseAccounting = 100000;
      baseFiscal = 50000;
    } else if (structureType === "pme") {
      baseAccounting = 200000;
      baseFiscal = 90000;
    } else if (structureType === "creation") {
      baseAccounting = 75000;
      baseFiscal = 40000;
    }

    if (turnoverRange === "medium") {
      baseAccounting *= 1.25;
      baseFiscal *= 1.2;
    } else if (turnoverRange === "high") {
      baseAccounting *= 1.6;
      baseFiscal *= 1.5;
    }

    if (employeeCount > 0) {
      basePayroll = 15000 + employeeCount * 12000;
    }

    if (includeCreation) {
      creationFee = 250000;
    }

    const totalMonthly =
      (includeAccounting ? baseAccounting : 0) +
      (includeFiscal ? baseFiscal : 0) +
      (includePayroll ? basePayroll : 0);

    return {
      monthlyAccounting: Math.round(baseAccounting),
      monthlyFiscal: Math.round(baseFiscal),
      monthlyPayroll: Math.round(basePayroll),
      creationOneTime: creationFee,
      totalMonthly: Math.round(totalMonthly),
      totalEstimatedInitial: Math.round(totalMonthly + (includeCreation ? creationFee : 0)),
    };
  }, [structureType, turnoverRange, employeeCount, includeAccounting, includeFiscal, includePayroll, includeCreation]);

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone || !clientEmail) return;

    const nameParts = clientName.trim().split(/\s+/);
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ") || nameParts[0];

    const selectedModules = [
      includeAccounting ? "Tenue de Comptabilité & Bilan" : null,
      includeFiscal ? "Démarches & Déclarations Fiscales" : null,
      includePayroll ? "Gestion Sociale & Bulletins de Paie" : null,
      includeCreation ? "Pack Création d'Entreprise" : null,
    ].filter((m): m is string => Boolean(m));

    const message = [
      `Demande de devis via simulateur en ligne.`,
      `Type de structure : ${STRUCTURE_LABELS[structureType]}.`,
      `CA mensuel estimé : ${TURNOVER_LABELS[turnoverRange]}.`,
      `Employés à gérer : ${employeeCount}.`,
      `Prestations souhaitées : ${selectedModules.join(", ") || "—"}.`,
      `Forfait mensuel estimé : ${formatFcfa(calculation.totalMonthly)}/mois.`,
      includeCreation
        ? `Frais de création uniques : ${formatFcfa(calculation.creationOneTime)}.`
        : null,
      `Estimation totale : ${formatFcfa(calculation.totalEstimatedInitial)}.`,
    ]
      .filter((line): line is string => Boolean(line))
      .join("\n");

    setPending(true);
    setErrorMsg(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          company: clientName,
          phone: clientPhone,
          email: clientEmail,
          service: `Devis - ${STRUCTURE_LABELS[structureType]}`,
          message,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setErrorMsg(json?.error ?? "Une erreur est survenue, veuillez réessayer.");
        setPending(false);
        return;
      }
      setSubmittedRef(
        `AS-DEV-${String(json.id ?? "CONFIRMED").replace(/[^a-zA-Z0-9]/g, "").toUpperCase().slice(0, 6)}`
      );
    } catch {
      setErrorMsg("Impossible d'envoyer votre demande de devis. Réessayez dans un instant.");
    } finally {
      setPending(false);
    }
  };

  const formatFcfa = (val: number) => {
    return new Intl.NumberFormat("fr-FR").format(val) + " FCFA";
  };

  return (
    <section id="simulator" className="mx-auto w-full max-w-7xl space-y-10 px-4 sm:px-8 lg:px-12">
      {/* Header */}
      <div className="mx-auto max-w-3xl space-y-3 text-center">
        <span className="inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-orange-400">
          Simulateur En Ligne
        </span>
        <h2 className="text-2xl font-black tracking-tight text-white sm:text-4xl">
          Estimez Votre Offre Sur Mesure
        </h2>
        <p className="text-xs leading-relaxed text-slate-300 sm:text-sm">
          Sélectionnez les paramètres de votre entreprise pour recevoir une proposition tarifaire
          ajustée.
        </p>
      </div>

      {/* Simulator Workspace */}
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        {/* Left Controls Form */}
        <div className="space-y-6 rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl sm:p-8 lg:col-span-7">
          {/* Step 1: Structure type */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
              <Building2 className="h-4 w-4 text-orange-500" /> 1. Type de Structure ou Projet
            </label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {[
                { id: "independant", label: "Indépendant" },
                { id: "tpe", label: "TPE / Startup" },
                { id: "pme", label: "PME en expansion" },
                { id: "creation", label: "Nouvelle Création" },
              ].map((st) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setStructureType(st.id as StructureType)}
                  className={`rounded-xl border px-3 py-2.5 text-xs font-bold transition-all ${
                    structureType === st.id
                      ? "border-orange-500 bg-orange-500 text-white shadow-md shadow-orange-500/30"
                      : "border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-600"
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Turnover estimation */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
              <Receipt className="h-4 w-4 text-orange-500" /> 2. Chiffre d'Affaires Mensuel Estimé
            </label>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {[
                { id: "low", label: "< 5 Millions FCFA / mois" },
                { id: "medium", label: "5 à 20 Millions FCFA / mois" },
                { id: "high", label: "> 20 Millions FCFA / mois" },
              ].map((tr) => (
                <button
                  key={tr.id}
                  type="button"
                  onClick={() => setTurnoverRange(tr.id as TurnoverRange)}
                  className={`rounded-xl border px-3 py-2.5 text-xs font-medium transition-all ${
                    turnoverRange === tr.id
                      ? "border-orange-500 bg-orange-500/20 text-orange-300"
                      : "border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-600"
                  }`}
                >
                  {tr.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Employee Count */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
                <Users className="h-4 w-4 text-orange-500" /> 3. Nombre d'Employés à Gérer
              </label>
              <span className="rounded-full border border-orange-500/40 bg-orange-500/10 px-2.5 py-0.5 text-xs font-bold text-orange-400">
                {employeeCount} Salarié(s)
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={30}
              value={employeeCount}
              onChange={(e) => setEmployeeCount(parseInt(e.target.value) || 0)}
              className="w-full cursor-pointer accent-orange-500"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>0 (Aucun salarié)</span>
              <span>15 salariés</span>
              <span>30+ salariés</span>
            </div>
          </div>

          {/* Step 4: Included Modules */}
          <div className="space-y-3 pt-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
              4. Prestations à Inclure dans le Forfait
            </label>

            <div className="space-y-2">
              <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-3 hover:border-orange-500">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={includeAccounting}
                    onChange={(e) => setIncludeAccounting(e.target.checked)}
                    className="h-4 w-4 accent-orange-500"
                  />
                  <div>
                    <div className="text-xs font-bold text-white">
                      Tenue de Comptabilité & Bilan
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Saisie, grand livre, balance et états financiers OHADA
                    </div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-orange-400">
                  ~{formatFcfa(calculation.monthlyAccounting)} /mois
                </span>
              </label>

              <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-3 hover:border-orange-500">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={includeFiscal}
                    onChange={(e) => setIncludeFiscal(e.target.checked)}
                    className="h-4 w-4 accent-orange-500"
                  />
                  <div>
                    <div className="text-xs font-bold text-white">
                      Démarches & Déclarations Fiscales
                    </div>
                    <div className="text-[11px] text-slate-400">
                      TVA, CSS, IRPP, IS et suivi du Quitus Fiscal
                    </div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-orange-400">
                  ~{formatFcfa(calculation.monthlyFiscal)} /mois
                </span>
              </label>

              <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-3 hover:border-orange-500">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={includePayroll}
                    onChange={(e) => setIncludePayroll(e.target.checked)}
                    className="h-4 w-4 accent-orange-500"
                  />
                  <div>
                    <div className="text-xs font-bold text-white">
                      Gestion Sociale & Bulletins de Paie
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Bulletins de salaire & télé-déclarations CNSS / CNAMGS
                    </div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-orange-400">
                  ~{formatFcfa(calculation.monthlyPayroll)} /mois
                </span>
              </label>

              <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-3 hover:border-orange-500">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={includeCreation}
                    onChange={(e) => setIncludeCreation(e.target.checked)}
                    className="h-4 w-4 accent-orange-500"
                  />
                  <div>
                    <div className="text-xs font-bold text-amber-400">
                      Pack Création d'Entreprise Clé en main
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Statuts, RCCM, NIF, Publication (Frais uniques)
                    </div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-amber-400">
                  + {formatFcfa(calculation.creationOneTime)} (1 fois)
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Summary Card & Quote Transmission Form */}
        <div className="space-y-6 rounded-3xl border border-orange-500/40 bg-slate-950 p-6 text-white shadow-xl sm:p-8 lg:col-span-5">
          <div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-orange-400">
                <Sparkles className="h-4 w-4" /> Estimation Tarifaire
              </span>
              <span className="rounded-full border border-orange-500/40 bg-orange-500/10 px-2 py-0.5 text-[11px] text-orange-400">
                Devis Gratuit
              </span>
            </div>
            <h3 className="mt-1 text-2xl font-bold text-white">Récapitulatif Financier</h3>
          </div>

          <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <div className="flex items-center justify-between text-xs text-slate-200">
              <span>Forfait Mensuel Recommandé :</span>
              <span className="text-sm font-bold text-amber-400">
                {formatFcfa(calculation.totalMonthly)} / mois
              </span>
            </div>

            {includeCreation && (
              <div className="flex items-center justify-between border-t border-slate-800 pt-2 text-xs text-slate-200">
                <span>Création d'Entreprise (Unique) :</span>
                <span className="font-bold text-amber-400">
                  {formatFcfa(calculation.creationOneTime)}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between border-t border-slate-800 pt-3">
              <span className="text-xs font-bold uppercase text-white">Estimation Totale :</span>
              <span className="text-xl font-bold text-amber-400">
                {formatFcfa(calculation.totalEstimatedInitial)}
              </span>
            </div>
          </div>

          <div className="space-y-1 text-[11px] text-slate-300">
            <p className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 shrink-0 text-amber-400" />
              <span>Tarif indicatif sans engagement contractuel</span>
            </p>
            <p className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 shrink-0 text-amber-400" />
              <span>Adaptation personnalisée selon le volume de pièces réel</span>
            </p>
          </div>

          {/* Transmission Form */}
          {submittedRef ? (
            <div className="space-y-3 rounded-2xl border border-amber-400/40 bg-amber-500/20 p-5 text-center animate-fade-in">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-amber-400 font-bold text-slate-950">
                ✓
              </div>
              <div>
                <h4 className="text-sm font-bold text-amber-300">Demande de Devis Transmise !</h4>
                <p className="mt-1 text-xs text-slate-200">
                  Référence dossier :{" "}
                  <strong className="text-amber-300">{submittedRef}</strong>
                </p>
                <p className="mt-2 text-[11px] text-slate-300">
                  Un conseiller A&S CONSULTING vous recontactera sous 24h au {clientPhone} pour
                  finaliser votre proposition.
                </p>
              </div>
              <button
                onClick={onOpenAppointment}
                className="mt-2 w-full rounded-full bg-amber-400 py-2 text-xs font-bold text-slate-950 shadow hover:bg-amber-300"
              >
                Prendre Rendez-vous au Cabinet
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitQuote} className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase text-amber-300">
                Recevoir cette offre détaillée par Téléphone ou Email
              </h4>

              <input
                type="text"
                required
                placeholder="Votre Nom complet ou Entreprise"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full rounded-full border border-slate-700 bg-slate-950 px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:border-orange-500 focus:outline-none"
              />

              <input
                type="tel"
                required
                placeholder="Numéro de Téléphone / WhatsApp"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="w-full rounded-full border border-slate-700 bg-slate-950 px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:border-orange-500 focus:outline-none"
              />

              <input
                type="email"
                required
                placeholder="Adresse Email *"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className="w-full rounded-full border border-slate-700 bg-slate-950 px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:border-orange-500 focus:outline-none"
              />

              {errorMsg && (
                <p className="rounded-full border border-red-400/40 bg-red-500/20 px-4 py-2 text-[11px] font-semibold text-red-300">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={pending}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 py-3 text-xs font-black text-white shadow-lg transition-colors hover:from-orange-600 hover:to-amber-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send className="h-4 w-4" />
                <span>{pending ? "Envoi en cours..." : "Envoyer ma demande de devis"}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

