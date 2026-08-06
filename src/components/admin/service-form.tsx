"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Icon } from "@/components/site/icons";
import { Field, inputClass, SubmitButton, ErrorBanner } from "@/components/admin/ui";

type ServiceItem = { id: string; text: string };

export type ServiceFormData = {
  id?: string;
  slug: string;
  title: string;
  shortDesc: string;
  description: string;
  icon: string;
  order: number;
  published: boolean;
  items: { text: string }[];
};

const ICON_CHOICES = ["briefcase", "calculator", "scale", "users", "rocket", "shield"];

export function ServiceForm({ initial }: { initial?: ServiceFormData }) {
  const router = useRouter();
  const isEdit = Boolean(initial?.id);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<ServiceItem[]>(
    initial?.items?.map((it, i) => ({ id: `i${i}`, text: it.text })) ?? [
      { id: "i0", text: "" },
    ]
  );

  function updateItem(id: string, text: string) {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, text } : it)));
  }

  function addItem() {
    setItems((prev) => [...prev, { id: `i${Date.now()}`, text: "" }]);
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setPending(true);
    setError(null);

    const payload = {
      slug: data.get("slug") as string,
      title: data.get("title") as string,
      shortDesc: data.get("shortDesc") as string,
      description: data.get("description") as string,
      icon: data.get("icon") as string,
      order: Number(data.get("order")),
      published: data.get("published") === "on",
      items: items.map((it) => ({ text: it.text })).filter((it) => it.text.trim()),
    };

    try {
      const res = await fetch(
        isEdit ? `/api/admin/services/${initial!.id}` : "/api/admin/services",
        {
          method: isEdit ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const json = await res.json();
      if (!res.ok) {
        setError(json?.error ?? "Une erreur est survenue.");
        return;
      }
      router.push("/admin/services");
      router.refresh();
    } catch {
      setError("Une erreur est survenue, veuillez réessayer.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-slate-200 bg-white p-6">
      <ErrorBanner message={error} />

      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Titre" required>
          <input
            name="title"
            required
            defaultValue={initial?.title}
            className={inputClass}
            placeholder="Ex : Tenue de comptabilité"
          />
        </Field>
        <Field label="Slug" hint="Utilisé dans l'URL. Laissez vide pour le générer automatiquement.">
          <input
            name="slug"
            defaultValue={initial?.slug}
            className={inputClass}
            placeholder="tenue-de-comptabilite"
          />
        </Field>
      </div>

      <Field label="Résumé" required hint="Courte phrase affichée sur les cartes.">
        <textarea
          name="shortDesc"
          required
          rows={2}
          defaultValue={initial?.shortDesc}
          className={inputClass}
          placeholder="Accompagnement complet de vos obligations comptables..."
        />
      </Field>

      <Field label="Description détaillée" required hint="Texte de la page service.">
        <textarea
          name="description"
          required
          rows={5}
          defaultValue={initial?.description}
          className={inputClass}
        />
      </Field>

      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Icône">
          <div className="flex flex-wrap gap-2">
            {ICON_CHOICES.map((icon) => (
              <label
                key={icon}
                className="flex cursor-pointer items-center gap-2 rounded-md border border-slate-300 px-3 py-2 text-sm has-[:checked]:border-brand-600 has-[:checked]:bg-brand-50"
              >
                <input
                  type="radio"
                  name="icon"
                  value={icon}
                  defaultChecked={initial?.icon === icon || (!initial && icon === "briefcase")}
                  className="sr-only"
                />
                <Icon name={icon as never} className="h-4 w-4 text-brand-700" strokeWidth={1.7} />
                {icon}
              </label>
            ))}
          </div>
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Ordre d'affichage">
            <input
              name="order"
              type="number"
              defaultValue={initial?.order ?? 0}
              className={inputClass}
            />
          </Field>
          <Field label="Publié">
            <label className="flex cursor-pointer items-center gap-2 pt-1">
              <input
                name="published"
                type="checkbox"
                defaultChecked={initial ? initial.published : true}
                className="h-4 w-4 rounded border-slate-300 text-brand-700"
              />
              <span className="text-sm text-slate-700">Visible sur le site</span>
            </label>
          </Field>
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700">Points clés / prestations</span>
          <button
            type="button"
            onClick={addItem}
            className="inline-flex items-center gap-1.5 rounded-md border border-brand-200 px-3 py-1.5 text-xs font-medium text-brand-700 hover:bg-brand-50"
          >
            <Icon name="plus" className="h-3.5 w-3.5" />
            Ajouter
          </button>
        </div>
        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={item.id} className="flex items-center gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-semibold text-brand-800">
                {index + 1}
              </span>
              <input
                value={item.text}
                onChange={(e) => updateItem(item.id, e.target.value)}
                className={inputClass}
                placeholder="Ex : Production des états financiers"
              />
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="shrink-0 rounded-md p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                aria-label="Supprimer"
              >
                <Icon name="trash" className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 border-t border-slate-100 pt-5">
        <SubmitButton pending={pending}>
          {isEdit ? "Enregistrer les modifications" : "Créer le service"}
        </SubmitButton>
        <Link
          href="/admin/services"
          className="text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          Annuler
        </Link>
      </div>
    </form>
  );
}
