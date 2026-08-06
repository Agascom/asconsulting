"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Field, inputClass, SubmitButton, ErrorBanner, SuccessBanner } from "@/components/admin/ui";

export type SettingsData = {
  phone: string;
  email: string;
  address: string;
  hours: string;
  whatsapp: string;
};

export function SettingsForm({ initial }: { initial: SettingsData }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const payload = {
      phone: (data.get("phone") as string) ?? "",
      email: (data.get("email") as string) ?? "",
      address: (data.get("address") as string) ?? "",
      hours: (data.get("hours") as string) ?? "",
      whatsapp: (data.get("whatsapp") as string) ?? "",
    };
    setPending(true);
    setError(null);
    setSaved(false);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json?.error ?? "Une erreur est survenue.");
        return;
      }
      setSaved(true);
      router.refresh();
    } catch {
      setError("Une erreur est survenue, veuillez réessayer.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl space-y-6 rounded-xl border border-slate-200 bg-white p-6"
    >
      <ErrorBanner message={error} />
      <SuccessBanner message={saved ? "Paramètres enregistrés avec succès." : null} />

      <Field label="Téléphone" hint="Affiché dans l'en-tête, le pied de page et la page contact.">
        <input name="phone" defaultValue={initial.phone} className={inputClass} placeholder="+241 04 00 00 00" />
      </Field>
      <Field label="E-mail">
        <input name="email" type="email" defaultValue={initial.email} className={inputClass} placeholder="contact@as-consulting.ga" />
      </Field>
      <Field label="Adresse">
        <input name="address" defaultValue={initial.address} className={inputClass} placeholder="Boulevard du bord de mer, Libreville" />
      </Field>
      <Field label="Horaires d'ouverture">
        <input name="hours" defaultValue={initial.hours} className={inputClass} placeholder="Lun – Ven : 8h à 17h" />
      </Field>
      <Field label="WhatsApp" hint="Numéro au format international, sans le + (ex : 241041234567).">
        <input name="whatsapp" defaultValue={initial.whatsapp} className={inputClass} placeholder="241041234567" />
      </Field>

      <div className="border-t border-slate-100 pt-5">
        <SubmitButton pending={pending}>Enregistrer les paramètres</SubmitButton>
      </div>
    </form>
  );
}
