"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { COMPANY_INFO } from "@/lib/portal-data";
import { usePortalUi } from "@/components/portal/portal-ui";
import {
  Phone,
  MapPin,
  Search,
  Calendar,
  Menu,
  X,
  UserCheck,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

const NAV_ITEMS = [
  { id: "home", label: "Accueil", href: "/" },
  { id: "about", label: "À Propos", href: "/a-propos" },
  { id: "services", label: "Nos Expertises", href: "/services" },
  { id: "creation", label: "Création d'Entreprise", href: "/creation-entreprise" },
  { id: "client-space", label: "Portail Client", href: "/espace-client" },
  { id: "location", label: "Localisation & Contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openAppointment, openSearch } = usePortalUi();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/contact") return pathname === "/contact";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-3 px-3 sm:px-6 max-w-7xl mx-auto">
      {/* Top micro bar for fast contact & location */}
      <div className="hidden lg:flex items-center justify-between px-6 py-1 bg-slate-950/90 backdrop-blur-md rounded-t-2xl border-t border-x border-white/10 text-[11px] text-slate-300">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-orange-400 font-bold">
            <MapPin className="w-3.5 h-3.5 text-orange-500" />
            <span>
              {COMPANY_INFO.addressLine1} ({COMPANY_INFO.addressLine2})
            </span>
          </span>
          <span className="text-slate-500">|</span>
          <a
            href={`tel:${COMPANY_INFO.phonePrimary.replace(/\s/g, "")}`}
            className="flex items-center gap-1 text-slate-300 transition-colors hover:text-orange-300"
          >
            <Phone className="w-3.5 h-3.5 text-orange-500" />
            <span>{COMPANY_INFO.phonePrimary}</span>
          </a>
        </div>

        <div className="flex items-center gap-3 font-semibold text-orange-300">
          <ShieldCheck className="w-3.5 h-3.5 text-orange-500 inline" />
          <span>Cabinet Agréé • Expertises Comptables & Fiscale</span>
        </div>
      </div>

      {/* Main Glass Navigation Bar */}
      <nav className="bg-slate-900/90 backdrop-blur-xl border border-white/15 rounded-full px-5 py-2.5 flex items-center justify-between text-white shadow-2xl">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 cursor-pointer group">
          <div className="relative w-10 h-10 shrink-0 overflow-hidden rounded-full bg-white/10 border border-white/20">
            <Image
              src="/images/logo.png"
              alt="Logo A&S CONSULTING"
              fill
              sizes="40px"
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white leading-none font-sans">
              A&S <span className="text-orange-500">CONSULTING</span>
            </span>
            <span className="text-[9px] text-slate-400 font-semibold tracking-wider uppercase mt-0.5">
              Comptabilité • Fiscalité • Juridique
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-1 text-xs font-bold text-slate-300">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`transition-all py-1 px-2.5 rounded-full ${
                  active
                    ? "bg-orange-500 text-white font-black shadow-md shadow-orange-500/30"
                    : "hover:text-orange-400 hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Global Search */}
          <button
            onClick={openSearch}
            title="Rechercher une expertise"
            aria-label="Rechercher"
            className="p-2 rounded-full text-slate-300 border border-white/15 bg-white/5 transition-colors hover:bg-orange-500 hover:text-white"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Primary CTA: RDV */}
          <button
            onClick={openAppointment}
            className="flex items-center gap-2 pl-4 pr-1.5 py-1.5 bg-orange-500/10 hover:bg-orange-500 text-white border border-orange-500/40 rounded-full font-extrabold text-xs transition-all hover:scale-105 active:scale-95 group"
          >
            <Calendar className="w-3.5 h-3.5 text-orange-400 group-hover:text-white" />
            <span>Prendre RDV</span>
            <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center group-hover:bg-slate-950 transition-colors">
              <ArrowRight className="w-3 h-3" />
            </div>
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
          className="lg:hidden p-2 rounded-full bg-white/10 text-white border border-white/20 focus:outline-none"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 bg-slate-950/95 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 text-white space-y-3 shadow-2xl animate-fade-in">
          <div className="flex flex-col gap-2 font-extrabold text-xs">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-left py-2.5 px-4 rounded-2xl transition-colors flex items-center justify-between ${
                  isActive(item.href)
                    ? "bg-orange-500 text-white font-black"
                    : "text-slate-300 hover:bg-white/5 hover:text-orange-400"
                }`}
              >
                <span>{item.label}</span>
                {isActive(item.href) && <ArrowRight className="w-4 h-4" />}
              </Link>
            ))}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openAppointment();
              }}
              className="w-full mt-3 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black rounded-2xl flex items-center justify-center gap-2 shadow-lg"
            >
              <UserCheck className="w-4 h-4" />
              <span>Demander un Rendez-vous</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
