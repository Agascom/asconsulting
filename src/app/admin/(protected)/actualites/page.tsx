import Link from "next/link";
import { db } from "@/lib/db";
import { Icon } from "@/components/site/icons";
import { formatDate } from "@/lib/utils";
import { DeleteButton } from "@/components/admin/delete-button";

export const metadata = { title: "Actualités — A&S Consulting" };

export default async function PostsPage() {
  const posts = await db.post.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-950">Actualités</h1>
          <p className="mt-1 text-sm text-slate-500">{posts.length} article{posts.length > 1 ? "s" : ""}</p>
        </div>
        <Link
          href="/admin/actualites/nouveau"
          className="inline-flex items-center gap-2 rounded-md bg-brand-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-800"
        >
          <Icon name="plus" className="h-4 w-4" />
          Nouvel article
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        {posts.length === 0 ? (
          <p className="px-5 py-12 text-center text-sm text-slate-500">
            Aucun article. Cliquez sur « Nouvel article » pour commencer.
          </p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {posts.map((p) => (
              <li key={p.id} className="flex items-center gap-4 px-5 py-4">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-slate-800">{p.title}</p>
                  <p className="truncate text-xs text-slate-500">
                    /actualites/{p.slug} · publié le {formatDate(p.createdAt)}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                    p.published ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {p.published ? "Publié" : "Brouillon"}
                </span>
                <div className="flex shrink-0 items-center gap-2">
                  <a
                    href={`/actualites/${p.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-md border border-slate-200 p-2 text-slate-500 hover:bg-slate-50"
                    aria-label="Voir l'article"
                  >
                    <Icon name="eye" className="h-4 w-4" />
                  </a>
                  <Link
                    href={`/admin/actualites/${p.id}`}
                    className="rounded-md border border-slate-200 p-2 text-slate-500 hover:bg-slate-50"
                    aria-label="Modifier"
                  >
                    <Icon name="edit" className="h-4 w-4" />
                  </Link>
                  <DeleteButton url={`/api/admin/posts/${p.id}`} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
