import { db } from "@/lib/db";
import { PostCard } from "@/components/site/cards";
import { PageHeader, CTABand } from "@/components/site/sections";

export const dynamic = "force-dynamic";

export default async function ActualitesPage() {
  const posts = await db.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <PageHeader
        title="Actualités"
        subtitle="Calendrier fiscal, conseils comptables et éclairages pour les entreprises : retrouvez nos dernières publications."
        breadcrumb="Actualités"
      />
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {posts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-center text-slate-500">
              Aucun article publié pour le moment. Revenez bientôt !
            </p>
          )}
        </div>
      </section>
      <CTABand />
    </>
  );
}
