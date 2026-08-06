"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/site/icons";

export function DeleteButton({
  url,
  label = "Supprimer",
  message = "Supprimer définitivement cet élément ?",
  redirectTo,
}: {
  url: string;
  label?: string;
  message?: string;
  redirectTo?: string;
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleDelete() {
    if (!confirm(message)) return;
    setPending(true);
    const res = await fetch(url, { method: "DELETE" });
    if (res.ok) {
      if (redirectTo) {
        router.push(redirectTo);
      }
      router.refresh();
    } else {
      alert("Une erreur est survenue lors de la suppression.");
    }
    setPending(false);
  }

  return (
    <button
      onClick={handleDelete}
      disabled={pending}
      className="inline-flex items-center gap-1.5 rounded-md border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-60"
    >
      <Icon name="trash" className="h-3.5 w-3.5" />
      {pending ? "..." : label}
    </button>
  );
}
