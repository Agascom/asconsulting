"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { SiteSettings } from "@/lib/site-shared";
import { whatsappLink } from "@/lib/site-shared";
import { Icon, Logo } from "@/components/site/icons";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "Le Cabinet" },
  { href: "/services", label: "Services" },
  { href: "/actualites", label: "Actualités" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Header({ settings }: { settings: SiteSettings }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const wa = whatsappLink(settings.whatsapp, "Bonjour A&S Consulting, je souhaite un devis.");

  return (
    <header className="sticky top-0 z-40 shadow-sm">
      <div className="bg-brand-950 text-brand-100">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-xs sm:px-6">
          <div className="flex items-center gap-4">
            <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="flex items-center gap-1.5 hover:text-gold-300">
              <Icon name="phone" className="h-3.5 w-3.5" />
              <span>{settings.phone}</span>
            </a>
            <a href={`mailto:${settings.email}`} className="hidden items-center gap-1.5 hover:text-gold-300 sm:flex">
              <Icon name="mail" className="h-3.5 w-3.5" />
              <span>{settings.email}</span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-1.5 md:flex">
              <Icon name="clock" className="h-3.5 w-3.5" />
              {settings.hours}
            </span>
            {settings.whatsapp && (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded bg-[#25D366] px-2 py-1 font-medium text-white hover:bg-[#1fb355]"
              >
                <Icon name="whatsapp" className="h-3.5 w-3.5" />
                WhatsApp
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <Logo />
            <span className="leading-tight">
              <span className="block text-lg font-bold tracking-tight text-brand-900">
                A&S Consulting
              </span>
              <span className="block text-[11px] font-medium uppercase tracking-wider text-slate-500">
                Cabinet comptable · Libreville
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-brand-50 text-brand-800"
                      : "text-slate-600 hover:bg-slate-50 hover:text-brand-800"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden items-center gap-2 rounded-md bg-brand-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800 sm:inline-flex"
            >
              Demander un devis
              <Icon name="arrowRight" className="h-4 w-4" />
            </Link>
            <button
              type="button"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-slate-700 hover:bg-slate-100 lg:hidden"
            >
              <Icon name={open ? "x" : "menu"} className="h-6 w-6" />
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t border-slate-200 bg-white lg:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-md px-3 py-3 text-sm font-medium",
                    pathname.startsWith(link.href)
                      ? "bg-brand-50 text-brand-800"
                      : "text-slate-700 hover:bg-slate-50"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-brand-900 px-4 py-3 text-sm font-semibold text-white"
              >
                Demander un devis
                <Icon name="arrowRight" className="h-4 w-4" />
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
