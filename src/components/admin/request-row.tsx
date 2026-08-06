"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/site/icons";
import { DeleteButton } from "@/components/admin/delete-button";

type Row = {
  id: string;
  firstName: string;
  lastName: string;
  company: string | null;
  email: string;
  status: string;
  createdAt: string;
};

const STATUS_STYLES: Record<string, string> = {
  nouveau: "bg-gold-100 text-gold-800",
  en_cours: "bg-brand-100 text-brand-800",
  traite: "bg-green-100 text-green-700",
  archive: "bg-slate-100 text-slate-600",
};

export function RequestRow({
  request,
  statusLabels,
}: {
  request: Row;
  statusLabels: Record<string, string>;
}) {
  const router = useRouter();
  const [status, setStatus] = useState(request.status);

  async function changeStatus(next: string) {
    setStatus(next);
    const res = await fetch(`/api/admin/requests/${request.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    if (!res.ok) {
      setStatus(request.status);
      alert("Impossible de mettre à jour le statut.");
    }
    router.refresh();
  }

  return (
    <li className="flex items-center gap-4 px-5 py-4">
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold text-slate-800">
          {request.firstName} {request.lastName}
          {request.company ? ` — ${request.company}` : ""}
        </p>
        <p className="truncate text-xs text-slate-500">
          {request.email} · {request.createdAt}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <select
          value={status}
          onChange={(e) => changeStatus(e.target.value)}
          className={`rounded-full border-0 px-2.5 py-1 text-xs font-semibold outline-none ${STATUS_STYLES[status] ?? "bg-slate-100 text-slate-600"}`}
        >
          {Object.entries(statusLabels).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
        <Link
          href={`/admin/demandes/${request.id}`}
          className="rounded-md border border-slate-200 p-2 text-slate-500 hover:bg-slate-50"
          aria-label="Voir le détail"
        >
          <Icon name="eye" className="h-4 w-4" />
        </Link>
        <DeleteButton url={`/api/admin/requests/${request.id}`} />
      </div>
    </li>
  );
}
