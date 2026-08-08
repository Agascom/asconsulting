"use client";

import Image from "next/image";
import { usePortalNavigation, usePortalUi } from "@/components/portal/portal-ui";
import { ShieldCheck, Target, Award, CheckCircle2, ArrowRight } from "lucide-react";

const officeImg = "/images/home1.jpeg";

export function AboutPage() {
  const handleNavigate = usePortalNavigation();
  const { openAppointment } = usePortalUi();

  return (
    <div className="pt-32 pb-20 px-4 sm:px-8 lg:px-12 bg-slate-950 text-white min-h-screen space-y-16">
      {/* Top Banner Header */}
      <div className="max-w-7xl mx-auto space-y-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-400 text-xs font-extrabold border border-orange-500/30 uppercase tracking-widest">
          <ShieldCheck className="w-4 h-4 text-orange-500" /> À Propos De Notre Cabinet
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
          A&S <span className="text-orange-500">CONSULTING</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          Votre partenaire privilégié à Libreville pour la gestion comptable, la sérénité fiscale et
          le développement juridique de vos activités.
        </p>
      </div>

      {/* Main Narrative Card */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl group">
          <Image
            src={officeImg}
            alt="A&S Consulting Office"
            width={960}
            height={640}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 p-4 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-orange-500 text-white rounded-xl font-bold">A&S</div>
              <div>
                <h4 className="font-extrabold text-xs text-white">Cabinet d'Expertise Professionnel</h4>
                <p className="text-[11px] text-slate-400">PME • Startups • Entrepreneurs Individuels</p>
              </div>
            </div>
            <span className="text-[11px] font-black uppercase text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
              Libreville
            </span>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-6">
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Notre Mission : Vous Décharger des{" "}
            <span className="text-orange-500">Procédures Complexes</span>.
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            A&S CONSULTING est un cabinet de services professionnels spécialisé dans la gestion
            comptable, les démarches administratives, fiscales et sociales. Nous accompagnons les
            entreprises et les entrepreneurs dans l'optimisation de leur gestion et le respect des
            obligations légales.
          </p>

          <div className="space-y-3 pt-2">
            {[
              "Tenue de comptabilité conforme aux normes SYSCOHADA en vigueur",
              "Gestion fiscale rigoureuse, quitus fiscal et télédéclarations de TVA",
              "Prise en charge des salaires, fiches de paie et cotisations CNSS",
              "Création d'entreprise clé en main : statuts, immatriculation NIF & RCCM",
            ].map((p, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span>{p}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 flex flex-wrap gap-4">
            <button
              onClick={openAppointment}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs rounded-full shadow-lg transition-all hover:scale-105"
            >
              Prendre Rendez-vous au Cabinet
            </button>
            <button
              onClick={() => handleNavigate("location")}
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-full border border-slate-800 transition-colors"
            >
              Voir la Localisation
            </button>
          </div>
        </div>
      </div>

      {/* 3 Pillars Values */}
      <div className="max-w-7xl mx-auto pt-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <h2 className="text-2xl sm:text-4xl font-black text-white">Nos Engagements & Valeurs</h2>
          <p className="text-xs text-slate-400">
            Une éthique professionnelle stricte au service de la sécurité juridique de votre
            entreprise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Rigueur & Conformité",
              desc: "Chaque pièce comptable et déclaration fiscale fait l'objet d'un contrôle rigoureux conforme aux textes légaux.",
              icon: ShieldCheck,
            },
            {
              title: "Confidentialité Absolue",
              desc: "Garantie de secret professionnel sur l'ensemble de vos états financiers, données salariales et projets stratégiques.",
              icon: Target,
            },
            {
              title: "Proximité & Réactivité",
              desc: "Un cabinet physique situé au Carrefour Léon Mba, disponible pour répondre rapidement à toutes vos questions.",
              icon: Award,
            },
          ].map((val, idx) => {
            const ValIcon = val.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900 p-8 rounded-3xl border border-slate-800 space-y-4 hover:border-orange-500 transition-colors shadow-xl"
              >
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-400 border border-orange-500/20 flex items-center justify-center">
                  <ValIcon className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-lg text-white">{val.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{val.desc}</p>
                <button
                  onClick={openAppointment}
                  className="text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1"
                >
                  Consulter un expert <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
