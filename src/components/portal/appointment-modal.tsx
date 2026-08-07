"use client";

import { useState } from "react";
import { COMPANY_INFO, CORE_SERVICES } from "@/lib/portal-data";
import { X, Calendar, Send } from "lucide-react";

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AppointmentModal({ isOpen, onClose }: AppointmentModalProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [serviceCategory, setServiceCategory] = useState(CORE_SERVICES[0].title);
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("09:00");
  const [notes, setNotes] = useState("");

  const [confirmedRef, setConfirmedRef] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !phone) return;
    setPending(true);
    setErrorMsg(null);
    try {
      const message = `RDV souhaité le ${preferredDate || "dès que possible"} à ${preferredTime}. Domaine : ${serviceCategory}. ${
        notes ? `\nDétail : ${notes}` : ""
      }`;
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          company: companyName,
          phone,
          email,
          service: `RDV - ${serviceCategory}`,
          message,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setErrorMsg(json?.error ?? "Une erreur est survenue, veuillez réessayer.");
        setPending(false);
        return;
      }
      const ref = `AS-RDV-${Math.floor(100000 + Math.random() * 900000)}`;
      setConfirmedRef(ref);
    } catch {
      setErrorMsg("Impossible d'envoyer votre demande. Réessayez dans un instant.");
    } finally {
      setPending(false);
    }
  };

  const resetAndClose = () => {
    setConfirmedRef(null);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setCompanyName("");
    setNotes("");
    setErrorMsg(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl animate-scale-up">
        {/* Header */}
        <div className="relative bg-emerald-950 p-6 text-white">
          <button
            onClick={resetAndClose}
            aria-label="Fermer"
            className="absolute right-5 top-5 rounded-full bg-emerald-900 p-1.5 text-slate-300 transition-colors hover:bg-emerald-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
            <Calendar className="h-4 w-4" /> Prise de Rendez-vous
          </div>
          <h3 className="font-serif text-xl font-bold text-white">
            Consulter un Expert A&S CONSULTING
          </h3>
          <p className="mt-1 text-xs text-slate-300">
            Cabinet situé à proximité du carrefour Léon Mba (près UBA Gare Routière).
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {confirmedRef ? (
            <div className="space-y-4 py-4 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl font-bold text-emerald-800">
                ✓
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-slate-900">
                  Rendez-vous Confirmé !
                </h4>
                <p className="mt-1 text-xs text-slate-600">
                  Code de confirmation :{" "}
                  <strong className="font-mono text-sm text-emerald-900">{confirmedRef}</strong>
                </p>
              </div>

              <div className="space-y-1 rounded-xl border border-slate-200 bg-slate-50 p-3 text-left text-xs text-slate-700">
                <p>
                  <strong>Nom :</strong> {firstName} {lastName}
                </p>
                <p>
                  <strong>Service :</strong> {serviceCategory}
                </p>
                <p>
                  <strong>Date demandée :</strong> {preferredDate || "Dès que possible"} à{" "}
                  {preferredTime}
                </p>
                <p className="pt-1 text-[11px] font-medium text-emerald-800">
                  📍 Nous vous accueillerons au cabinet : {COMPANY_INFO.addressLine1} (
                  {COMPANY_INFO.addressLine2}).
                </p>
              </div>

              <button
                onClick={resetAndClose}
                className="w-full rounded-xl bg-emerald-950 py-2.5 text-xs font-bold text-amber-300 shadow transition-colors hover:bg-emerald-900"
              >
                Fermer
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-[11px] font-bold uppercase text-slate-700">
                    Prénom *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Marc"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-emerald-800 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-[11px] font-bold uppercase text-slate-700">
                    Nom *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ondo"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-emerald-800 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-[11px] font-bold uppercase text-slate-700">
                    Adresse E-mail *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="marc.ondo@exemple.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-emerald-800 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-[11px] font-bold uppercase text-slate-700">
                    Téléphone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+241 07 00 00 00"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-emerald-800 focus:outline-none"
                  />
                </div>
              </div>

              {errorMsg && (
                <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">
                  {errorMsg}
                </p>
              )}

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-[11px] font-bold uppercase text-slate-700">
                    Nom de l'Entreprise (si existante)
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Ondo Services SARL"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-emerald-800 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-[11px] font-bold uppercase text-slate-700">
                    Domaine d'Expertise Souhaité
                  </label>
                  <select
                    value={serviceCategory}
                    onChange={(e) => setServiceCategory(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs focus:border-emerald-800 focus:outline-none"
                  >
                    {CORE_SERVICES.map((srv) => (
                      <option key={srv.id} value={srv.title}>
                        {srv.title}
                      </option>
                    ))}
                    <option value="Autre demande">Autre demande spécifique</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-[11px] font-bold uppercase text-slate-700">
                    Date Souhaitée
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-emerald-800 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-[11px] font-bold uppercase text-slate-700">
                    Heure Souhaitée
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs focus:border-emerald-800 focus:outline-none"
                  >
                    <option value="08:30">08h30</option>
                    <option value="10:00">10h00</option>
                    <option value="11:30">11h30</option>
                    <option value="14:30">14h30</option>
                    <option value="16:00">16h00</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-[11px] font-bold uppercase text-slate-700">
                  Message / Détail de votre besoin
                </label>
                <textarea
                  rows={3}
                  placeholder="Expliquez brièvement votre situation (ex: création SARL, déclaration TVA urgente, gestion de paie 5 salariés...)"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full resize-none rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-emerald-800 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={pending}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 py-3 text-xs font-bold text-slate-950 shadow-md transition-colors hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send className="h-4 w-4" />
                <span>{pending ? "Envoi en cours..." : "Valider le Rendez-vous"}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
