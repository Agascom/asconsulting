"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function RequestStatusControl({
  id,
  status,
  labels,
}: {
  id: string;
  status: string;
  labels: Record<string, string>;
}) {
  const router = useRouter();
  const [current, setCurrent] = useState(status);

  async function changeStatus(next: string) {
    setCurrent(next);
    const res = await fetch(`/api/admin/requests/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    if (!res.ok) {
      setCurrent(status);
      alert("Impossible de mettre à jour le statut.");
    }
    router.refresh();
  }

  return (
    <select
      value={current}
      onChange={(e) => changeStatus(e.target.value)}
      className="rounded-full border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30"
    >
      {Object.entries(labels).map(([key, label]) => (
        <option key={key} value={key}>
          Statut : {label}
        </option>
      ))}
    </select>
  );
}
