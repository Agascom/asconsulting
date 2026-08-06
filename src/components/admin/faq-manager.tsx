"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/site/icons";
import { Field, inputClass, ErrorBanner } from "@/components/admin/ui";
import { DeleteButton } from "@/components/admin/delete-button";

type FaqItem = {
  id: string;
  question: string;
  answer: string;
  order: number;
  published: boolean;
};

export function FaqManager({ initial }: { initial: FaqItem[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState<FaqItem | null>(null);
  const [creating, setCreating] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function reset() {
    setEditing(null);
    setCreating(false);
    setError(null);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const payload = {
      question: data.get("question") as string,
      answer: data.get("answer") as string,
      order: Number(data.get("order")),
      published: data.get("published") === "on",
    };
    setPending(true);
    setError(null);

    try {
      const res = await fetch(
        editing ? `/api/admin/faq/${editing.id}` : "/api/admin/faq",
        {
          method: editing ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const json = await res.json();
      if (!res.ok) {
        setError(json?.error ?? "Une erreur est survenue.");
        return;
      }
      reset();
      router.refresh();
    } catch {
      setError("Une erreur est survenue, veuillez réessayer.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="space-y-4">
      {!creating && !editing && (
        <button
          onClick={() => setCreating(true)}
          className="inline-flex items-center gap-2 rounded-md bg-brand-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-800"
        >
          <Icon name="plus" className="h-4 w-4" />
          Nouvelle question
        </button>
      )}

      {(creating || editing) && (
        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-xl border border-brand-200 bg-white p-6"
        >
          <h2 className="font-semibold text-brand-950">
            {editing ? "Modifier la question" : "Nouvelle question"}
          </h2>
          <ErrorBanner message={error} />
          <Field label="Question" required>
            <input
              name="question"
              required
              defaultValue={editing?.question}
              className={inputClass}
              placeholder="Ex : Quels documents pour créer mon entreprise ?"
            />
          </Field>
          <Field label="Réponse" required>
            <textarea
              name="answer"
              required
              rows={4}
              defaultValue={editing?.answer}
              className={inputClass}
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Ordre">
              <input
                name="order"
                type="number"
                defaultValue={editing?.order ?? 0}
                className={inputClass}
              />
            </Field>
            <Field label="Publié">
              <label className="flex cursor-pointer items-center gap-2 pt-1">
                <input
                  name="published"
                  type="checkbox"
                  defaultChecked={editing ? editing.published : true}
                  className="h-4 w-4 rounded border-slate-300 text-brand-700"
                />
                <span className="text-sm text-slate-700">Visible sur le site</span>
              </label>
            </Field>
          </div>
          <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
            <button
              type="submit"
              disabled={pending}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-brand-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-800 disabled:opacity-60"
            >
              {pending ? "Enregistrement..." : editing ? "Enregistrer" : "Créer"}
            </button>
            <button type="button" onClick={reset} className="text-sm font-medium text-slate-600 hover:text-slate-900">
              Annuler
            </button>
          </div>
        </form>
      )}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        {initial.length === 0 ? (
          <p className="px-5 py-12 text-center text-sm text-slate-500">
            Aucune question pour le moment.
          </p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {initial.map((item) => (
              <li key={item.id} className="flex items-start gap-4 px-5 py-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-slate-800">{item.question}</p>
                    {!item.published && (
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
                        Brouillon
                      </span>
                    )}
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm text-slate-500">{item.answer}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2 pt-1">
                  <button
                    onClick={() => {
                      setEditing(item);
                      setCreating(false);
                      setError(null);
                    }}
                    className="rounded-md border border-slate-200 p-2 text-slate-500 hover:bg-slate-50"
                    aria-label="Modifier"
                  >
                    <Icon name="edit" className="h-4 w-4" />
                  </button>
                  <DeleteButton url={`/api/admin/faq/${item.id}`} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
