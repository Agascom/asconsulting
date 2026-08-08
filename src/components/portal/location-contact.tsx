"use client";

import { useState } from "react";
import { COMPANY_INFO } from "@/lib/portal-data";
import { usePortalUi } from "@/components/portal/portal-ui";
import { WhatsAppIcon } from "@/components/site/whatsapp-button";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Navigation,
  Building2,
  Calendar,
  CheckCircle2,
  UserCheck,
} from "lucide-react";

export function LocationContact() {
  const { openAppointment } = usePortalUi();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("Rendez-vous au cabinet");
  const [message, setMessage] = useState("");

  const mapSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    COMPANY_INFO.googleMapsQuery
  )}`;

  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsapp.replace(
    /[^\d]/g,
    ""
  )}?text=${encodeURIComponent(
    "Bonjour A&S CONSULTING, je souhaite prendre rendez-vous / des informations."
  )}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    setErrorMsg(null);
    try {
      const [firstName, ...rest] = fullName.trim().split(/\s+/);
      const lastName = rest.join(" ") || "Consultation";
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName || "Visiteur",
          lastName,
          company: "",
          phone,
          email,
          service: subject,
          message,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setErrorMsg(json?.error ?? "Une erreur est survenue, veuillez réessayer.");
        setPending(false);
        return;
      }
      setFormSubmitted(true);
    } catch {
      setErrorMsg("Impossible d'envoyer votre demande. Réessayez dans un instant.");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="pt-32 pb-20 px-4 sm:px-8 lg:px-12 bg-slate-950 text-white min-h-screen space-y-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto space-y-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-400 text-xs font-extrabold border border-orange-500/30 uppercase tracking-widest">
          <MapPin className="w-4 h-4 text-orange-500" /> Localisation & Rendez-Vous Cabinet
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Retrouvez-Nous À <span className="text-orange-500">Libreville</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {COMPANY_INFO.tagline}
        </p>
      </div>

      {/* Main Location Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Address & Access Instructions */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-extrabold shadow-lg">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-white">Adresse Physique</h3>
                <span className="text-xs text-orange-400 font-semibold">Libreville, Gabon</span>
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs">
              <span className="text-slate-400 uppercase text-[10px] font-black block">
                Repères d'Accès :
              </span>
              <p className="font-bold text-white leading-relaxed text-sm">
                {COMPANY_INFO.addressLine1}, {COMPANY_INFO.addressLine2}
              </p>
              <div className="pt-2 text-slate-300 flex items-center gap-2">
                <Navigation className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Non loin de la banque UBA de la gare routière.</span>
              </div>
            </div>

            <div className="space-y-4 pt-2 border-t border-slate-800 text-xs">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-slate-950 rounded-xl text-orange-400 border border-slate-800">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">
                    Téléphone :
                  </span>
                  <a href="tel:+241077579908" className="font-bold text-white hover:text-orange-300">
                    {COMPANY_INFO.phonePrimary}
                  </a>
                  <span className="text-slate-400"> / </span>
                  <span className="font-bold text-white">{COMPANY_INFO.phoneSecondary}</span>
                </div>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-xs font-extrabold text-white shadow-lg transition-all hover:scale-[1.02]"
              >
                <WhatsAppIcon className="h-5 w-5" />
                <span>Discuter sur WhatsApp</span>
              </a>

              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-slate-950 rounded-xl text-orange-400 border border-slate-800">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Adresse E-mail :</span>
                  <a href={`mailto:${COMPANY_INFO.email}`} className="font-bold text-white hover:text-orange-300">
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-slate-950 rounded-xl text-orange-400 border border-slate-800">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Horaires d'Ouverture :</span>
                  <span className="font-bold text-white">{COMPANY_INFO.workingHours}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Directions Helper */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3 text-xs">
            <h4 className="font-extrabold text-white text-sm flex items-center gap-2">
              <Building2 className="w-4 h-4 text-orange-500" />
              <span>Comment Se Rendre Au Cabinet ?</span>
            </h4>
            <p className="text-slate-300 leading-relaxed">
              Depuis la Gare Routière, prenez la direction du Carrefour Léon Mba. Notre cabinet est
              immédiatement repérable à proximité de la Banque UBA. Parking disponible sur place.
            </p>
            <button
              onClick={openAppointment}
              className="mt-1 w-full py-3 bg-orange-500/10 hover:bg-orange-500 text-orange-300 hover:text-white border border-orange-500/40 rounded-xl font-extrabold transition-all flex items-center justify-center gap-2"
            >
              <UserCheck className="w-4 h-4" />
              <span>Prendre RDV Express avec un Expert</span>
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-[#25D366] hover:bg-[#1eb85a] text-white rounded-xl font-extrabold transition-all flex items-center justify-center gap-2"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Contacter le Cabinet sur WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Right Column: Interactive Map Simulation + Contact Form */}
        <div className="lg:col-span-7 space-y-6">
          {/* Visual Map Representation */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative h-64 sm:h-72">
            <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center p-6 text-center space-y-3">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center animate-ping absolute inset-0" />
                <div className="w-16 h-16 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-xl relative z-10 font-extrabold text-xl">
                  A&S
                </div>
              </div>
              <div className="space-y-1 z-10">
                <h4 className="font-black text-white text-base">A&S CONSULTING - Cabinet Libreville</h4>
                <p className="text-xs text-orange-400 font-semibold">
                  Carrefour Léon Mba • Gare Routière UBA
                </p>
              </div>
              <a
                href={mapSearchUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 text-xs font-bold rounded-full transition-colors z-10 inline-flex items-center gap-2"
              >
                <Navigation className="w-3.5 h-3.5 text-orange-500" />
                <span>Ouvrir dans Google Maps</span>
              </a>
            </div>
          </div>

          {/* Appointment Form */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <h3 className="font-extrabold text-lg text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-500" />
              <span>Prendre un Rendez-vous au Cabinet ou en Ligne</span>
            </h3>

            {formSubmitted ? (
              <div className="p-8 bg-slate-950 rounded-2xl border border-slate-800 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center mx-auto font-black text-xl">
                  ✓
                </div>
                <h4 className="font-extrabold text-base text-white">
                  Demande de Rendez-vous Enregistrée
                </h4>
                <p className="text-xs text-slate-300">
                  Notre secrétariat vous contactera par téléphone pour confirmer le créneau horaire
                  souhaité à notre cabinet du Carrefour Léon Mba.
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setFullName("");
                    setEmail("");
                    setPhone("");
                    setSubject("Rendez-vous au cabinet");
                    setMessage("");
                  }}
                  className="px-6 py-2 bg-slate-800 text-white font-bold text-xs rounded-full hover:bg-slate-700"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Nom Complet :</label>
                    <input
                      type="text"
                      required
                      placeholder="Votre nom"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Téléphone :</label>
                    <input
                      type="tel"
                      required
                      placeholder="+241 ..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Email :</label>
                    <input
                      type="email"
                      required
                      placeholder="votre@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 font-bold block mb-1">
                      Motif de Consultation :
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500"
                    >
                      <option value="Tenue de comptabilité">Tenue de comptabilité</option>
                      <option value="Démarches fiscales & quitus">Démarches fiscales & quitus</option>
                      <option value="Gestion sociale & paie">Gestion sociale & paie</option>
                      <option value="Création d'entreprise">Création d'entreprise</option>
                      <option value="Rendez-vous général">Rendez-vous général</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 font-bold block mb-1">
                    Votre Message / Détails :
                  </label>
                  <textarea
                    rows={4}
                    required
                    minLength={10}
                    placeholder="Précisez la situation de votre entreprise ou vos disponibilités..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                {errorMsg && (
                  <div className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={pending}
                  className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs rounded-full shadow-lg transition-all flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {pending ? "Envoi en cours..." : "Confirmer Ma Demande De Rendez-vous"}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
