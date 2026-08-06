"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Logo, Icon } from "@/components/site/icons";

type NavItem = {
  href: string;
  label: string;
  icon: "dashboard" | "briefcase" | "file" | "chat" | "inbox" | "settings";
};

const NAV: NavItem[] = [
  { href: "/admin", label: "Tableau de bord", icon: "dashboard" },
  { href: "/admin/demandes", label: "Demandes", icon: "inbox" },
  { href: "/admin/services", label: "Services", icon: "briefcase" },
  { href: "/admin/actualites", label: "Actualités", icon: "file" },
  { href: "/admin/faq", label: "FAQ", icon: "chat" },
  { href: "/admin/parametres", label: "Paramètres", icon: "settings" },
];

export function AdminShell({
  user,
  newRequests,
  children,
}: {
  user: { name: string; email: string };
  newRequests: number;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  function isActive(item: NavItem) {
    if (item.href === "/admin") return pathname === "/admin";
    return pathname.startsWith(item.href);
  }

  async function logout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 px-5 py-5">
        <Logo className="h-10 w-10" />
        <div>
          <p className="text-sm font-bold text-white">A&amp;S Consulting</p>
          <p className="text-xs text-brand-300">Espace admin</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-2">
        {NAV.map((item) => {
          const active = isActive(item);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-brand-800 text-white"
                  : "text-brand-200 hover:bg-brand-800/60 hover:text-white"
              }`}
            >
              <Icon name={item.icon} className="h-5 w-5" strokeWidth={1.7} />
              {item.label}
              {item.icon === "inbox" && newRequests > 0 && (
                <span className="ml-auto inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gold-400 px-1.5 text-xs font-bold text-brand-950">
                  {newRequests}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-brand-800 p-4">
        <div className="mb-3 flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-brand-700 text-sm font-bold text-white">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">{user.name}</p>
            <p className="truncate text-xs text-brand-300">{user.email}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-1.5 rounded-md border border-brand-700 px-3 py-2 text-xs font-medium text-brand-200 hover:bg-brand-800"
          >
            <Icon name="eye" className="h-4 w-4" />
            Voir le site
          </a>
          <button
            onClick={logout}
            className="inline-flex items-center justify-center gap-1.5 rounded-md border border-brand-700 px-3 py-2 text-xs font-medium text-brand-200 hover:bg-brand-800 hover:text-red-300"
          >
            <Icon name="logout" className="h-4 w-4" />
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 bg-brand-950 lg:block">
        {sidebar}
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur lg:hidden">
          <div className="flex items-center gap-3">
            <Logo className="h-8 w-8" />
            <span className="font-bold text-brand-950">Admin</span>
          </div>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-md p-2 text-slate-600 hover:bg-slate-100"
            aria-label="Menu"
          >
            <Icon name={mobileOpen ? "x" : "menu"} className="h-5 w-5" />
          </button>
        </header>

        {mobileOpen && (
          <div className="fixed inset-0 z-20 lg:hidden">
            <div
              className="absolute inset-0 bg-brand-950/70"
              onClick={() => setMobileOpen(false)}
            />
            <div className="absolute inset-y-0 left-0 w-64 bg-brand-950">{sidebar}</div>
          </div>
        )}

        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
