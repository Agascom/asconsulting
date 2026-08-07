"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { COMPANY_INFO } from "@/lib/portal-data";
import { usePortalUi } from "@/components/portal/portal-ui";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Search,
  Calendar,
  Menu,
  X,
  UserCheck,
  ChevronRight,
  ShieldCheck,
  Building2,
} from "lucide-react";

const NAV_ITEMS = [
  { id: "home", label: "Accueil", href: "/" },
  { id: "about", label: "À propos", href: "/#a-propos" },
  { id: "services", label: "Nos Expertises", href: "/#services" },
  { id: "creation", label: "Création d'Entreprise", href: "/#creation" },
  { id: "simulator", label: "Simulateur Devis", href: "/#simulator" },
  { id: "location", label: "Localisation", href: "/#location" },
  { id: "resources", label: "Guides & Fiscalité", href: "/#resources" },
  { id: "client-space", label: "Espace Client", href: "/#espace-client" },
  { id: "contact", label: "Contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openAppointment, openSearch } = usePortalUi();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/contact") return pathname === "/contact";
    if (href.startsWith("/#")) return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white shadow-md">
      {/* Top Utility Bar */}
      <div className="border-b border-emerald-800 bg-emerald-950 py-2 px-4 text-xs text-slate-200">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-4 text-slate-300">
            <a
              href={`tel:${COMPANY_INFO.phonePrimary.replace(/\s/g, "")}`}
              className="flex items-center gap-1.5 transition-colors hover:text-emerald-300"
            >
              <Phone className="h-3.5 w-3.5 text-amber-400" />
              <span>{COMPANY_INFO.phonePrimary}</span>
            </a>
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="hidden items-center gap-1.5 transition-colors hover:text-emerald-300 sm:flex"
            >
              <Mail className="h-3.5 w-3.5 text-amber-400" />
              <span>{COMPANY_INFO.email}</span>
            </a>
            <div className="flex items-center gap-1.5 text-emerald-200">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-amber-400" />
              <span className="max-w-[280px] truncate sm:max-w-none">
                {COMPANY_INFO.addressLine1} ({COMPANY_INFO.addressLine2})
              </span>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <div className="hidden items-center gap-1.5 border-r border-emerald-800 pr-3 text-slate-300 lg:flex">
              <Clock className="h-3.5 w-3.5 text-amber-400" />
              <span>{COMPANY_INFO.workingHours}</span>
            </div>

            <Link
              href="/#espace-client"
              className="inline-flex items-center gap-1.5 rounded border border-emerald-700 bg-emerald-800 px-2.5 py-1 text-xs font-medium text-amber-300 transition-colors hover:bg-emerald-700"
            >
              <UserCheck className="h-3.5 w-3.5" />
              <span>Espace Client</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="group flex cursor-pointer items-center gap-3">
          <div className="relative h-11 w-11 shrink-0 overflow-hidden transition-transform group-hover:scale-105">
            <Image
              src="/images/logo.png"
              alt="Logo A&S CONSULTING"
              fill
              sizes="44px"
              className="object-contain"
              priority
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-emerald-800">
                A&S CONSULTING
              </span>
              <ShieldCheck className="inline h-4 w-4 text-emerald-600" />
            </div>
            <p className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
              Comptabilité • Fiscalité • Création
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-1.5 xl:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`whitespace-nowrap rounded-md px-3 py-2 text-xs font-semibold transition-all ${
                isActive(item.href)
                  ? "bg-emerald-900 text-amber-300 shadow-sm"
                  : "text-slate-700 hover:bg-emerald-50 hover:text-emerald-900"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Global Search Button */}
          <button
            onClick={openSearch}
            title="Rechercher une expertise ou un guide"
            aria-label="Rechercher"
            className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-emerald-900"
          >
            <Search className="h-5 w-5" />
          </button>

          {/* Primary CTA: Appointment */}
          <button
            onClick={openAppointment}
            className="hidden items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-xs font-bold text-slate-950 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-amber-600 hover:shadow active:translate-y-0 sm:inline-flex"
          >
            <Calendar className="h-4 w-4" />
            <span>Prendre RDV</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
            className="rounded-lg p-2 text-slate-700 transition-colors hover:bg-slate-100 xl:hidden"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="space-y-2 border-t border-slate-800 bg-slate-900 px-4 py-4 text-white shadow-2xl xl:hidden animate-fade-in">
          <div className="mb-3 space-y-1 rounded-lg border border-emerald-800 bg-emerald-950/80 p-3 text-xs text-slate-300">
            <p className="flex items-center gap-1.5 font-semibold text-amber-300">
              <Building2 className="h-4 w-4" /> Cabinet A&S CONSULTING
            </p>
            <p className="text-[11px] text-slate-300">
              {COMPANY_INFO.addressLine1} ({COMPANY_INFO.addressLine2})
            </p>
          </div>

          <div className="grid grid-cols-1 gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex w-full items-center justify-between rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-amber-500 font-bold text-slate-950"
                    : "text-slate-200 hover:bg-slate-800"
                }`}
              >
                <span>{item.label}</span>
                <ChevronRight className="h-4 w-4 opacity-70" />
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-2 border-t border-slate-800 pt-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openAppointment();
              }}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 py-2.5 text-sm font-bold text-slate-950 shadow hover:bg-amber-600"
            >
              <Calendar className="h-4 w-4" />
              <span>Prendre un Rendez-vous</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
