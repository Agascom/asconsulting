"use client";

import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Icon } from "@/components/site/icons";

type Status = { type: "idle" | "success" | "error"; message?: string };

export function ContactForm({ services }: { services: { title: string }[] }) {
  const searchParams = useSearchParams();
  const preselected = searchParams.get("service") ?? "";
  const honeypotRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if (honeypotRef.current?.value) {
      setStatus({ type: "success", message: "Merci ! Votre demande a bien été envoyée." });
      form.reset();
      return;
    }

    setPending(true);
    setStatus({ type: "idle" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          company: data.get("company"),
          phone: data.get("phone"),
          email: data.get("email"),
          service: data.get("service"),
          message: data.get("message"),
          consent: data.get("consent") === "on",
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setStatus({
          type: "error",
          message: json?.error ?? "Une erreur est survenue, veuillez réessayer.",
        });
      } else {
        setStatus({
          type: "success",
          message:
            "Votre demande a bien été envoyée. Notre équipe vous recontactera sous 24h ouvrées.",
        });
        form.reset();
      }
    } catch {
      setStatus({
        type: "error",
        message: "Une erreur est survenue, veuillez réessayer.",
      });
    } finally {
      setPending(false);
    }
  }

  const inputClass =
    "w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30";

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="mb-1.5 block text-sm font-medium text-slate-700">
            Prénom *
          </label>
          <input id="firstName" name="firstName" required maxLength={100} className={inputClass} placeholder="Votre prénom" />
        </div>
        <div>
          <label htmlFor="lastName" className="mb-1.5 block text-sm font-medium text-slate-700">
            Nom *
          </label>
          <input id="lastName" name="lastName" required maxLength={100} className={inputClass} placeholder="Votre nom" />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-slate-700">
            Entreprise
          </label>
          <input id="company" name="company" maxLength={150} className={inputClass} placeholder="Nom de votre entreprise (facultatif)" />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-slate-700">
            Téléphone
          </label>
          <input id="phone" name="phone" maxLength={30} className={inputClass} placeholder="+241 ..." />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
            Adresse e-mail *
          </label>
          <input id="email" name="email" type="email" required maxLength={200} className={inputClass} placeholder="vous@exemple.com" />
        </div>
        <div>
          <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-slate-700">
            Service concerné
          </label>
          <select id="service" name="service" defaultValue={preselected} className={inputClass}>
            <option value="">Sélectionnez un service</option>
            {services.map((s) => (
              <option key={s.title} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="Autre demande">Autre demande</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-slate-700">
          Votre message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={4000}
          rows={5}
          className={inputClass}
          placeholder="Décrivez votre besoin en quelques mots..."
        />
      </div>

      <div aria-hidden="true" className="absolute -left-[9999px] top-auto">
        <label htmlFor="website">Ne pas remplir</label>
        <input id="website" name="website" ref={honeypotRef} tabIndex={-1} autoComplete="off" />
      </div>

      <label className="flex items-start gap-3 text-sm text-slate-600">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-brand-900"
        />
        <span>
          J'accepte que les informations saisies soient utilisées pour être
          recontacté par A&amp;S Consulting. Voir notre{" "}
          <a href="/confidentialite" className="text-brand-700 underline hover:text-brand-500">
            politique de confidentialité
          </a>
          .
        </span>
      </label>

      {status.type === "success" && (
        <div className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800">
          <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={2.5} />
          {status.message}
        </div>
      )}
      {status.type === "error" && (
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <Icon name="x" className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={2.5} />
          {status.message}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-900 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {pending ? "Envoi en cours..." : "Envoyer ma demande"}
        {!pending && <Icon name="arrowRight" className="h-4 w-4" />}
      </button>
    </form>
  );
}
