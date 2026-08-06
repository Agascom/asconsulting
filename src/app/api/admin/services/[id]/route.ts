import { db } from "@/lib/db";
import { requireAdmin, UNAUTHORIZED } from "@/lib/admin-guard";
import { serviceSchema } from "@/lib/validators";
import { slugify } from "@/lib/utils";

export async function PATCH(request: Request, ctx: RouteContext<"/api/admin/services/[id]">) {
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
  const parsed = serviceSchema.safeParse({ ...(body as object), slug: raw.slug || slugify(raw.title ?? "") });
  if (!parsed.success) {
    return Response.json(
      { error: parsed.error.issues[0]?.message ?? "Données invalides" },
      { status: 422 }
    );
  }

  const data = parsed.data;
  const conflict = await db.service.findFirst({
    where: { slug: data.slug, id: { not: id } },
  });
  if (conflict) {
    return Response.json(
      { error: "Ce slug est déjà utilisé par un autre service." },
      { status: 409 }
    );
  }

  const service = await db.service.update({
    where: { id },
    data: {
      slug: data.slug,
      title: data.title,
      shortDesc: data.shortDesc,
      description: data.description,
      items: data.items,
      icon: data.icon || "briefcase",
      order: data.order,
      published: data.published,
    },
  });

  return Response.json({ service });
}

export async function DELETE(_req: Request, ctx: RouteContext<"/api/admin/services/[id]">) {
  const session = await requireAdmin();
  if (!session) return UNAUTHORIZED;

  const { id } = await ctx.params;
  await db.service.delete({ where: { id } });
  return Response.json({ ok: true });
}
