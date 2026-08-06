import Link from "next/link";
import { db } from "@/lib/db";
import { Icon } from "@/components/site/icons";
import { DeleteButton } from "@/components/admin/delete-button";

export const metadata = { title: "Services — A&S Consulting" };

export default async function ServicesPage() {
  const services = await db.service.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-950">Services</h1>
          <p className="mt-1 text-sm text-slate-500">
            {services.length} service{services.length > 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/admin/services/nouveau"
          className="inline-flex items-center gap-2 rounded-md bg-brand-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-800"
        >
          <Icon name="plus" className="h-4 w-4" />
          Nouveau service
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        {services.length === 0 ? (
          <p className="px-5 py-12 text-center text-sm text-slate-500">
            Aucun service. Cliquez sur « Nouveau service » pour commencer.
          </p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {services.map((s) => (
              <li key={s.id} className="flex items-center gap-4 px-5 py-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700">
                  <Icon name={s.icon as never} className="h-5 w-5" strokeWidth={1.7} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-slate-800">{s.title}</p>
                  <p className="truncate text-xs text-slate-500">
                    /services/{s.slug} · ordre {s.order}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                    s.published ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {s.published ? "Publié" : "Brouillon"}
                </span>
                <div className="flex shrink-0 items-center gap-2">
                  <a
                    href={`/services/${s.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-md border border-slate-200 p-2 text-slate-500 hover:bg-slate-50"
                    aria-label="Voir la page"
                  >
                    <Icon name="eye" className="h-4 w-4" />
                  </a>
                  <Link
                    href={`/admin/services/${s.id}`}
                    className="rounded-md border border-slate-200 p-2 text-slate-500 hover:bg-slate-50"
                    aria-label="Modifier"
                  >
                    <Icon name="edit" className="h-4 w-4" />
                  </Link>
                  <DeleteButton url={`/api/admin/services/${s.id}`} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
