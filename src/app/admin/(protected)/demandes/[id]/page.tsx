import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { RequestStatusControl } from "@/components/admin/request-status";
import { Icon } from "@/components/site/icons";

export const metadata = { title: "Demande — A&S Consulting" };

const STATUS_LABELS: Record<string, string> = {
  nouveau: "Nouveau",
  en_cours: "En cours",
  traite: "Traité",
  archive: "Archivé",
};

export default async function RequestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const r = await db.contactRequest.findUnique({ where: { id } });
  if (!r) notFound();

  const rows = [
    { label: "Nom complet", value: `${r.firstName} ${r.lastName}` },
    { label: "E-mail", value: r.email },
    ...(r.company ? [{ label: "Entreprise", value: r.company }] : []),
    ...(r.phone ? [{ label: "Téléphone", value: r.phone }] : []),
    ...(r.service ? [{ label: "Service concerné", value: r.service }] : []),
  ];

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <Link
            href="/admin/demandes"
            className="inline-flex items-center gap-1 text-sm font-medium text-brand-700 hover:text-brand-900"
          >
            <Icon name="arrowRight" className="h-4 w-4 rotate-180" />
            Retour aux demandes
          </Link>
          <h1 className="mt-2 text-2xl font-bold text-brand-950">
            {r.firstName} {r.lastName}
          </h1>
          <p className="mt-1 text-sm text-slate-500">Reçue le {formatDate(r.createdAt)}</p>
        </div>
        <RequestStatusControl id={r.id} status={r.status} labels={STATUS_LABELS} />
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="divide-y divide-slate-100">
          {rows.map((row) => (
            <div key={row.label} className="grid grid-cols-3 gap-4 px-5 py-3.5">
              <dt className="text-sm font-medium text-slate-500">{row.label}</dt>
              <dd className="col-span-2 break-words text-sm font-semibold text-slate-800">
                {row.value}
              </dd>
            </div>
          ))}
        </div>
        <div className="border-t border-slate-100 px-5 py-4">
          <p className="text-sm font-medium text-slate-500">Message</p>
          <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-slate-800">
            {r.message}
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <a
          href={`mailto:${r.email}?subject=Suite%20de%20votre%20demande%20A%26S%20Consulting`}
          className="inline-flex items-center gap-2 rounded-md bg-brand-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-800"
        >
          <Icon name="mail" className="h-4 w-4" />
          Répondre par e-mail
        </a>
      </div>
    </div>
  );
}
