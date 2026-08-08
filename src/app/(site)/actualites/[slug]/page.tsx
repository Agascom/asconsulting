import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { CTABand } from "@/components/site/sections";
import { Icon } from "@/components/site/icons";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function ArticlePage(props: PageProps<"/actualites/[slug]">) {
  const { slug } = await props.params;
  const post = await db.post.findUnique({ where: { slug } });
  if (!post || !post.published) notFound();

  return (
    <>
      <section className="bg-brand-950">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <Link
            href="/actualites"
            className="inline-flex items-center gap-1.5 text-sm text-gold-400 hover:text-gold-300"
          >
            <Icon name="chevronRight" className="h-4 w-4 rotate-180" />
            Retour aux actualités
          </Link>
          <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-gold-400">
            {formatDate(post.createdAt)}
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-brand-200">{post.excerpt}</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <article className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="space-y-5 whitespace-pre-line text-base leading-relaxed text-slate-700">
            {post.content}
          </div>
          <div className="mt-12 border-t border-slate-200 pt-8">
            <h2 className="font-semibold text-brand-900">Vous souhaitez être accompagné ?</h2>
            <p className="mt-2 text-sm text-slate-600">
              Notre équipe est à votre disposition pour discuter de votre situation.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-2 rounded-md bg-brand-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
            >
              Nous contacter
              <Icon name="arrowRight" className="h-4 w-4" />
            </Link>
          </div>
        </article>
      </section>

      <CTABand />
    </>
  );
}
