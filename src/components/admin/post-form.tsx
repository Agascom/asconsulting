"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Field, inputClass, SubmitButton, ErrorBanner } from "@/components/admin/ui";

export type PostFormData = {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  published: boolean;
};

export function PostForm({ initial }: { initial?: PostFormData }) {
  const router = useRouter();
  const isEdit = Boolean(initial?.id);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setPending(true);
    setError(null);

    const payload = {
      slug: data.get("slug") as string,
      title: data.get("title") as string,
      excerpt: data.get("excerpt") as string,
      content: data.get("content") as string,
      published: data.get("published") === "on",
    };

    try {
      const res = await fetch(
        isEdit ? `/api/admin/posts/${initial!.id}` : "/api/admin/posts",
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
      router.push("/admin/actualites");
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
            placeholder="Ex : Déclarations fiscales 2026 au Gabon"
          />
        </Field>
        <Field label="Slug" hint="Laissez vide pour le générer automatiquement.">
          <input
            name="slug"
            defaultValue={initial?.slug}
            className={inputClass}
            placeholder="declarations-fiscales-2026"
          />
        </Field>
      </div>

      <Field label="Extrait" required hint="Résumé affiché sur la liste des actualités.">
        <textarea
          name="excerpt"
          required
          rows={2}
          defaultValue={initial?.excerpt}
          className={inputClass}
        />
      </Field>

      <Field label="Contenu" required hint="Saisissez le texte de l'article. Paragraphes séparés par une ligne vide.">
        <textarea
          name="content"
          required
          rows={14}
          defaultValue={initial?.content}
          className={`${inputClass} font-mono text-sm leading-relaxed`}
        />
      </Field>

      <Field label="Publié">
        <label className="flex cursor-pointer items-center gap-2">
          <input
            name="published"
            type="checkbox"
            defaultChecked={initial ? initial.published : true}
            className="h-4 w-4 rounded border-slate-300 text-brand-700"
          />
          <span className="text-sm text-slate-700">Visible sur le site</span>
        </label>
      </Field>

      <div className="flex items-center gap-3 border-t border-slate-100 pt-5">
        <SubmitButton pending={pending}>
          {isEdit ? "Enregistrer les modifications" : "Publier l'article"}
        </SubmitButton>
        <Link href="/admin/actualites" className="text-sm font-medium text-slate-600 hover:text-slate-900">
          Annuler
        </Link>
      </div>
    </form>
  );
}
