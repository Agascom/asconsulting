import Link from "next/link";
import { Icon } from "@/components/site/icons";

export default function NotFound() {
  return (
    <section className="bg-brand-950">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-28 text-center sm:px-6">
        <p className="text-6xl font-bold text-gold-400">404</p>
        <h1 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
          Cette page est introuvable
        </h1>
        <p className="mt-3 text-brand-200">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-md bg-gold-500 px-6 py-3 font-semibold text-brand-950 transition-colors hover:bg-gold-400"
        >
          <Icon name="arrowRight" className="h-4 w-4" />
          Retour à l'accueil
        </Link>
      </div>
    </section>
  );
}
