import { db } from "@/lib/db";
import { requireAdmin, UNAUTHORIZED } from "@/lib/admin-guard";
import { postSchema } from "@/lib/validators";
import { slugify } from "@/lib/utils";

export async function PATCH(request: Request, ctx: RouteContext<"/api/admin/posts/[id]">) {
  const session = await requireAdmin();
  if (!session) return UNAUTHORIZED;

  const { id } = await ctx.params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Requête invalide" }, { status: 400 });
  }

  const raw = body as { slug?: string; title?: string };
  const parsed = postSchema.safeParse({ ...(body as object), slug: raw.slug || slugify(raw.title ?? "") });
  if (!parsed.success) {
    return Response.json(
      { error: parsed.error.issues[0]?.message ?? "Données invalides" },
      { status: 422 }
    );
  }

  const data = parsed.data;
  const conflict = await db.post.findFirst({ where: { slug: data.slug, id: { not: id } } });
  if (conflict) {
    return Response.json(
      { error: "Ce slug est déjà utilisé par un autre article." },
      { status: 409 }
    );
  }

  const post = await db.post.update({ where: { id }, data });
  return Response.json({ post });
}

export async function DELETE(_req: Request, ctx: RouteContext<"/api/admin/posts/[id]">) {
  const session = await requireAdmin();
  if (!session) return UNAUTHORIZED;

  const { id } = await ctx.params;
  await db.post.delete({ where: { id } });
  return Response.json({ ok: true });
}
