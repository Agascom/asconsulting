import Link from "next/link";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { RequestRow } from "@/components/admin/request-row";
import { Icon } from "@/components/site/icons";

export const metadata = { title: "Demandes — A&S Consulting" };

const STATUS_LABELS: Record<string, string> = {
  nouveau: "Nouveau",
  en_cours: "En cours",
  traite: "Traité",
  archive: "Archivé",
};

export default async function RequestsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  const { status, q } = await searchParams;
  const statusFilter = status && status !== "tous" ? status : null;
  const query = q?.trim();

  const requests = await db.contactRequest.findMany({
    where: {
      ...(statusFilter ? { status: statusFilter } : {}),
      ...(query
        ? {
            OR: [
              { firstName: { contains: query, mode: "insensitive" } },
              { lastName: { contains: query, mode: "insensitive" } },
              { email: { contains: query, mode: "insensitive" } },
              { company: { contains: query, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  const tabs = [
    { key: "tous", label: "Toutes" },
    { key: "nouveau", label: "Nouvelles" },
    { key: "en_cours", label: "En cours" },
    { key: "traite", label: "Traitées" },
    { key: "archive", label: "Archivées" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-brand-950">Demandes de contact</h1>
        <p className="mt-1 text-sm text-slate-500">
          {requests.length} demande{requests.length > 1 ? "s" : ""}
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1 rounded-lg bg-white p-1 ring-1 ring-slate-200">
          {tabs.map((tab) => (
            <Link
              key={tab.key}
              href={`/admin/demandes?status=${tab.key}`}
              className={`rounded-md px-3 py-1.5 text-sm font-medium ${
                (status ?? "tous") === tab.key
                  ? "bg-brand-900 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>

        <form method="get" className="flex items-center gap-2">
          <div className="relative">
            <Icon name="search" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              name="q"
              defaultValue={query}
              placeholder="Rechercher..."
              className="w-full rounded-md border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 sm:w-64"
            />
          </div>
          <button
            type="submit"
            className="rounded-md bg-brand-900 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-800"
          >
            OK
          </button>
        </form>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        {requests.length === 0 ? (
          <p className="px-5 py-12 text-center text-sm text-slate-500">
            Aucune demande ne correspond à ces critères.
          </p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {requests.map((r) => (
              <RequestRow
                key={r.id}
                request={{
                  id: r.id,
                  firstName: r.firstName,
                  lastName: r.lastName,
                  company: r.company,
                  email: r.email,
                  status: r.status,
                  createdAt: formatDate(r.createdAt),
                }}
                statusLabels={STATUS_LABELS}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
