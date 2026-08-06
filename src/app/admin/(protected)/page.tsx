import Link from "next/link";
import { db } from "@/lib/db";
import { Icon } from "@/components/site/icons";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Tableau de bord — A&S Consulting" };

const STATUS_LABELS: Record<string, string> = {
  nouveau: "Nouveau",
  en_cours: "En cours",
  traite: "Traité",
  archive: "Archivé",
};

export default async function DashboardPage() {
  const [requests, newRequests, enCours, services, posts, faqs, recent] =
    await Promise.all([
      db.contactRequest.count(),
      db.contactRequest.count({ where: { status: "nouveau" } }),
      db.contactRequest.count({ where: { status: "en_cours" } }),
      db.service.count(),
      db.post.count(),
      db.faqItem.count(),
      db.contactRequest.findMany({
        orderBy: { createdAt: "desc" },
        take: 6,
      }),
    ]);

  const cards: {
    label: string;
    value: number;
    icon: "inbox" | "sparkles" | "clock" | "briefcase" | "file" | "chat";
    href: string;
    accent?: boolean;
  }[] = [
    { label: "Demandes reçues", value: requests, icon: "inbox", href: "/admin/demandes" },
    { label: "Nouvelles", value: newRequests, icon: "sparkles", href: "/admin/demandes", accent: true },
    { label: "En cours", value: enCours, icon: "clock", href: "/admin/demandes" },
    { label: "Services", value: services, icon: "briefcase", href: "/admin/services" },
    { label: "Actualités", value: posts, icon: "file", href: "/admin/actualites" },
    { label: "FAQ", value: faqs, icon: "chat", href: "/admin/faq" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-brand-950">Tableau de bord</h1>
        <p className="mt-1 text-sm text-slate-500">
          Vue d'ensemble de l'activité de votre site.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className={`group rounded-xl border p-4 transition-shadow hover:shadow-md ${
              card.accent
                ? "border-gold-200 bg-gradient-to-br from-gold-50 to-white"
                : "border-slate-200 bg-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <Icon
                name={card.icon}
                className={`h-6 w-6 ${card.accent ? "text-gold-600" : "text-brand-700"}`}
                strokeWidth={1.7}
              />
            </div>
            <p className="mt-3 text-3xl font-bold text-brand-950">{card.value}</p>
            <p className="mt-1 text-xs font-medium text-slate-500">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 className="font-semibold text-brand-950">Dernières demandes</h2>
          <Link
            href="/admin/demandes"
            className="text-sm font-medium text-brand-700 hover:text-brand-900"
          >
            Tout voir
          </Link>
        </div>
        {recent.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-slate-500">
            Aucune demande reçue pour le moment.
          </p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {recent.map((r) => (
              <li key={r.id}>
                <Link
                  href={`/admin/demandes/${r.id}`}
                  className="flex items-center justify-between gap-4 px-5 py-3.5 hover:bg-slate-50"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      {r.firstName} {r.lastName}
                      {r.company ? ` — ${r.company}` : ""}
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      {r.email} · {formatDate(r.createdAt)}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                      r.status === "nouveau"
                        ? "bg-gold-100 text-gold-800"
                        : r.status === "en_cours"
                          ? "bg-brand-100 text-brand-800"
                          : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {STATUS_LABELS[r.status] ?? r.status}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
