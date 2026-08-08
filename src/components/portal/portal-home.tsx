"use client";

import Image from "next/image";
import { usePortalNavigation, usePortalUi } from "@/components/portal/portal-ui";
import { CORE_SERVICES, COMPANY_INFO } from "@/lib/portal-data";
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  MapPin,
  CheckCircle2,
  Building2,
  Briefcase,
  Users,
  Calculator,
  FileText,
  FileCheck,
} from "lucide-react";

const heroImage = "/images/home.jpeg";

function getIcon(iconName: string) {
  switch (iconName) {
    case "Calculator":
      return Calculator;
    case "FileCheck":
      return FileCheck;
    case "Users":
      return Users;
    case "Building2":
      return Building2;
    default:
      return FileText;
  }
}

export function PortalHome() {
  const handleNavigate = usePortalNavigation();
  const { openAppointment } = usePortalUi();

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] w-full flex flex-col justify-between pt-32 pb-12 px-4 sm:px-8 lg:px-12 overflow-hidden bg-slate-950 text-white rounded-b-[40px] sm:rounded-b-[60px] shadow-2xl">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage}
            alt="A&S Consulting Office"
            fill
            sizes="100vw"
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent" />
        </div>

        {/* Hero Headline Content */}
        <div className="relative z-10 max-w-4xl pt-12 sm:pt-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-400 text-xs font-black border border-orange-500/30 uppercase tracking-widest backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-orange-500" /> Cabinet Expert Agréé à Libreville
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] max-w-3xl drop-shadow-xl">
            Gestion Comptable, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
              Fiscale & Sociale
            </span>{" "}
            <br />
            de Votre Entreprise.
          </h1>

          <p className="text-sm sm:text-lg text-slate-200 font-normal max-w-2xl leading-relaxed drop-shadow">
            A&S CONSULTING vous accompagne dans l'optimisation de votre gestion comptable, le
            respect strict de vos obligations légales et la création de votre société au Gabon.
          </p>

          {/* Interactive Badges & Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={openAppointment}
              className="flex items-center gap-3 pl-6 pr-2 py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-full font-black text-xs transition-all duration-300 shadow-xl hover:scale-105 active:scale-95 group"
            >
              <span>Demander Un Rendez-Vous</span>
              <div className="w-8 h-8 rounded-full bg-slate-950 text-white flex items-center justify-center transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>

            <button
              onClick={() => handleNavigate("creation")}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full font-extrabold text-xs transition-all hover:scale-105"
            >
              Créer Mon Entreprise
            </button>
          </div>
        </div>

        {/* Hero Bottom Label & Navigation */}
        <div className="relative z-10 flex items-center justify-between border-t border-white/20 pt-6 mt-12">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-5 bg-orange-500 rounded-full inline-block" />
            <span className="font-black text-xl text-white tracking-wide">Domaines d'Expertise</span>
          </div>

          <button
            onClick={() => handleNavigate("services")}
            className="px-4 py-2 rounded-full bg-black/40 hover:bg-orange-500 text-white border border-white/20 text-xs font-bold transition-colors flex items-center gap-1"
          >
            Voir Tous Les Services <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Services Cards Row Overlay */}
      <section className="relative z-20 -mt-10 sm:-mt-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CORE_SERVICES.map((srv) => {
            const Icon = getIcon(srv.iconName);
            return (
              <div
                key={srv.id}
                onClick={() => handleNavigate("services")}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-3 hover:border-orange-500 transition-all duration-300 shadow-2xl group cursor-pointer flex flex-col justify-between"
              >
                <div className="relative h-56 w-full overflow-hidden rounded-t-[90px] rounded-b-2xl">
                  <Image
                    src={srv.image}
                    alt={srv.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                  <div className="absolute bottom-3 left-3 right-10 text-white">
                    <h3 className="font-extrabold text-base tracking-tight text-white group-hover:text-orange-400 transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-[11px] text-slate-300 font-medium line-clamp-1">
                      {srv.subtitle}
                    </p>
                  </div>

                  <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-slate-950/80 border border-white/20 text-white flex items-center justify-center group-hover:bg-orange-500 group-hover:border-orange-500 transition-colors shadow-lg">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-3 pt-3 flex items-center justify-between text-xs text-slate-400 font-semibold">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <Icon className="w-4 h-4 text-orange-500" />
                    <span>Expertise A&S</span>
                  </span>
                  <span className="text-orange-400 text-[11px] font-bold group-hover:underline">
                    En savoir +
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Presentation & Location Section */}
      <section className="py-20 px-4 sm:px-8 lg:px-12 bg-slate-900 text-white border-y border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 text-orange-400 text-xs font-black border border-orange-500/20">
              <Building2 className="w-4 h-4 text-orange-500" /> Présentation A&S CONSULTING
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Un Accompagnement Rigoureux pour Optimiser{" "}
              <span className="text-orange-500">Votre Gestion</span>.
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              A&S CONSULTING est un cabinet de services professionnels spécialisé dans la gestion
              comptable, les démarches administratives, fiscales et sociales. Nous accompagnons les
              entreprises et les entrepreneurs dans l'optimisation de leur gestion et le respect des
              obligations légales.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {CORE_SERVICES.map((item) => (
                <div key={item.id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2 text-orange-400 font-extrabold text-xs">
                    <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                    <span>{item.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{item.shortDesc}</p>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={() => handleNavigate("about")}
                className="px-6 py-3 bg-white text-slate-950 hover:bg-orange-500 hover:text-white font-black text-xs rounded-full transition-all shadow-xl hover:scale-105"
              >
                Découvrir Notre Cabinet
              </button>
            </div>
          </div>

          {/* Location Banner Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 to-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6 relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-orange-400">
                Localisation Privilégiée
              </span>
              <h3 className="text-2xl font-black text-white">
                Facilement Accessible à Libreville
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {COMPANY_INFO.addressLine1}, non loin de la banque UBA de la gare routière. Un accès
                facile pour le dépôt de vos pièces comptables et vos consultations.
              </p>
            </div>

            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2 text-xs">
              <div className="font-extrabold text-orange-400 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span>Adresse du Cabinet :</span>
              </div>
              <p className="text-slate-200 font-medium">
                {COMPANY_INFO.addressLine1} ({COMPANY_INFO.addressLine2}), Libreville, Gabon.
              </p>
            </div>

            <button
              onClick={() => handleNavigate("location")}
              className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs rounded-full transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Voir la Carte & Les Accès</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-20 px-4 sm:px-8 lg:px-12 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Une Solution Sur Mesure pour <span className="text-orange-500">Chaque Structure</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Avec A&S CONSULTING, bénéficiez d'un service personnalisé et adapté à vos besoins, que
              vous soyez une PME, une startup ou un entrepreneur individuel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "PME & Sociétés",
                desc: "Gestion comptable globale, déclarations fiscales mensuelles et préparation des conseils d'administration.",
                icon: Building2,
              },
              {
                title: "Startups & Jeunes Pousses",
                desc: "Choix de la forme juridique adaptée, montage des statuts et assistance pour levées de fonds.",
                icon: Briefcase,
              },
              {
                title: "Entrepreneurs Individuels",
                desc: "Création rapide d'établissement, tenue de caisse simplifiée et sérénité fiscale au quotidien.",
                icon: Users,
              },
            ].map((aud, idx) => {
              const AudIcon = aud.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-900 p-8 rounded-3xl border border-slate-800 space-y-4 hover:border-orange-500 transition-colors shadow-xl"
                >
                  <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-400 border border-orange-500/20 flex items-center justify-center">
                    <AudIcon className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-xl text-white">{aud.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">{aud.desc}</p>
                  <button
                    onClick={openAppointment}
                    className="text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1"
                  >
                    Demander une consultation <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
