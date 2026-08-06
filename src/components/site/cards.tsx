import Link from "next/link";
import { Icon } from "@/components/site/icons";
import { formatDate } from "@/lib/utils";
import type { IconName } from "@/components/site/icons";

export function ServiceCard({
  service,
}: {
  service: {
    slug: string;
    title: string;
    shortDesc: string;
    icon?: string;
  };
}) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-900 text-gold-400 transition-colors group-hover:bg-gold-500 group-hover:text-brand-950">
        <Icon name={(service.icon as IconName) ?? "briefcase"} className="h-6 w-6" />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-brand-900">{service.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
        {service.shortDesc}
      </p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
        En savoir plus
        <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

export function PostCard({
  post,
}: {
  post: {
    slug: string;
    title: string;
    excerpt: string;
    createdAt: Date | string;
  };
}) {
  return (
    <Link
      href={`/actualites/${post.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg"
    >
      <p className="text-xs font-medium uppercase tracking-wider text-gold-600">
        {formatDate(post.createdAt)}
      </p>
      <h3 className="mt-2 text-lg font-semibold leading-snug text-brand-900 group-hover:text-brand-700">
        {post.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
        {post.excerpt}
      </p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
        Lire l'article
        <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
