import Link from "next/link";
import { Icon } from "@/components/site/icons";
import { Reveal } from "@/components/site/reveal";

export function PageHeader({
  title,
  subtitle,
  breadcrumb,
}: {
  title: string;
  subtitle?: string;
  breadcrumb?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-brand-950">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl animate-float" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <Reveal from="up">
          <p className="flex items-center gap-1.5 text-sm text-gold-400">
            <Link href="/" className="hover:text-gold-300">
              Accueil
            </Link>
            {breadcrumb && (
              <>
                <Icon name="chevronRight" className="h-4 w-4 text-brand-300" />
                <span className="text-brand-200">{breadcrumb}</span>
              </>
            )}
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-brand-200 sm:text-lg">
              {subtitle}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  return (
    <Reveal as="div" className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-wider text-gold-600">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-brand-900 sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base leading-relaxed text-slate-600">{description}</p>
      )}
    </Reveal>
  );
}

export function CTABand({
  title = "Parlons de votre projet",
  description = "Prenez rendez-vous pour un premier diagnostic gratuit de votre situation comptable, fiscale ou sociale.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="bg-gradient-to-r from-brand-900 via-brand-800 to-brand-900">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-14 text-center sm:px-6 md:flex-row md:justify-between md:text-left">
        <Reveal className="max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {title}
          </h2>
          <p className="mt-2 text-brand-200">{description}</p>
        </Reveal>
        <Reveal delay={120} className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 rounded-md bg-gold-500 px-6 py-3 font-semibold text-brand-950 transition-all hover:bg-gold-400 hover:shadow-xl active:scale-95"
          >
            Demander un devis
            <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-white/25 px-6 py-3 font-semibold text-white transition-all hover:bg-white/10 active:scale-95"
          >
            Découvrir nos services
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
