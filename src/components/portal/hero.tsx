"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { PageTab } from "@/lib/portal-data";
import { COMPANY_INFO } from "@/lib/portal-data";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  MapPin,
  Building2,
  Calendar,
} from "lucide-react";

interface HeroProps {
  onNavigate: (tab: PageTab) => void;
  onOpenAppointment: () => void;
}

interface SlideAction {
  label: string;
  tab?: PageTab;
  isAppointment?: boolean;
}

interface Slide {
  image: string;
  badge: string;
  title: string;
  subtitle: string;
  primaryAction: { label: string; tab: PageTab };
  secondaryAction: SlideAction;
}

const heroImage1 = "/images/as-consulting-hero.jpg";
const heroImage2 = "/images/as-consulting-office.jpg";

export function Hero({ onNavigate, onOpenAppointment }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    {
      image: heroImage1,
      badge: "Services Professionnels & Conseil",
      title: "Excellence Comptable, Sérénité Fiscale & Administrative",
      subtitle:
        "A&S CONSULTING vous accompagne dans la tenue de comptes, la gestion sociale, vos déclarations d'impôts et la mise en conformité de votre entreprise.",
      primaryAction: { label: "Découvrir Nos Expertises", tab: "services" as PageTab },
      secondaryAction: { label: "Simuler un Devis", tab: "simulator" as PageTab },
    },
    {
      image: heroImage2,
      badge: "Guichet Unique & Accompagnement",
      title: "Création d'Entreprise de A à Z en 3 à 5 Jours",
      subtitle:
        "Rédaction des statuts, montage du dossier, obtention du RCCM et NIF : nous donnons vie à votre projet d'entreprise avec rigueur et rapidité.",
      primaryAction: { label: "Lancer Votre Entreprise", tab: "creation" as PageTab },
      secondaryAction: { label: "Voir les Formes Juridiques", tab: "creation" as PageTab },
    },
    {
      image: heroImage1,
      badge: "Cabinet Accessible & Proche de Vous",
      title: "Proximité, Réactivité & Service Personnalisé",
      subtitle: `Situé à proximité du carrefour Léon Mba, non loin de la banque UBA de la gare routière. Un accès facile pour toutes vos démarches PME, Startup et Indépendants.`,
      primaryAction: { label: "Localiser le Cabinet", tab: "location" as PageTab },
      secondaryAction: { label: "Prendre Rendez-vous", isAppointment: true },
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative flex min-h-[520px] flex-col justify-between overflow-hidden bg-slate-950 text-white lg:min-h-[580px]">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "z-10 opacity-100" : "pointer-events-none z-0 opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            sizes="100vw"
            priority={index === 0}
            className="scale-105 object-cover object-center brightness-75"
          />
          {/* Gradient Overlay for high text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-emerald-950/40" />
        </div>
      ))}

      {/* Main Content Area */}
      <div className="relative z-20 mx-auto my-auto w-full max-w-7xl px-4 pb-16 pt-12 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-5">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-700/80 bg-emerald-900/80 px-3.5 py-1.5 text-xs font-semibold text-amber-300 backdrop-blur-md">
            <Building2 className="h-4 w-4 text-amber-400" />
            <span>{slides[currentSlide].badge}</span>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-3xl font-bold leading-tight tracking-tight text-white drop-shadow-sm sm:text-4xl lg:text-5xl">
            {slides[currentSlide].title}
          </h1>

          {/* Subtitle */}
          <p className="max-w-xl text-sm font-normal leading-relaxed text-slate-200 sm:text-base">
            {slides[currentSlide].subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate(slides[currentSlide].primaryAction.tab)}
              className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-6 py-3 text-sm font-bold text-slate-950 shadow-lg transition-all hover:-translate-y-0.5 hover:bg-amber-600 hover:shadow-xl active:translate-y-0"
            >
              <span>{slides[currentSlide].primaryAction.label}</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            {slides[currentSlide].secondaryAction.isAppointment ? (
              <button
                onClick={onOpenAppointment}
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20"
              >
                <Calendar className="h-4 w-4 text-amber-300" />
                <span>Prendre Rendez-vous</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  const action = slides[currentSlide].secondaryAction;
                  if (action.tab) onNavigate(action.tab);
                }}
                className="inline-flex items-center gap-2 rounded-lg border border-emerald-600/50 bg-emerald-900/60 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-emerald-800/80"
              >
                <span>{slides[currentSlide].secondaryAction.label}</span>
              </button>
            )}
          </div>

          {/* Location pill */}
          <div className="flex items-center gap-2 pt-2 text-xs font-medium text-amber-300/90">
            <MapPin className="h-4 w-4 shrink-0 text-amber-400" />
            <span>
              {COMPANY_INFO.addressLine1} ({COMPANY_INFO.addressLine2})
            </span>
          </div>
        </div>
      </div>

      {/* Carousel Navigation Arrows & Indicators */}
      <div className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-4 pb-6 sm:px-6 lg:px-8">
        {/* Slide Indicators */}
        <div className="flex items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Aller au slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all ${
                idx === currentSlide ? "w-8 bg-amber-400" : "w-2 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        {/* Carousel Prev/Next Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            aria-label="Slide précédent"
            className="rounded-full border border-white/20 bg-slate-900/60 p-2 text-white transition-colors hover:bg-slate-900"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Slide suivant"
            className="rounded-full border border-white/20 bg-slate-900/60 p-2 text-white transition-colors hover:bg-slate-900"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
