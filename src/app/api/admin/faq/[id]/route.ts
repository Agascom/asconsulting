import { db } from "@/lib/db";
import { requireAdmin, UNAUTHORIZED } from "@/lib/admin-guard";
import { faqSchema } from "@/lib/validators";

export async function PATCH(request: Request, ctx: RouteContext<"/api/admin/faq/[id]">) {
  const session = await requireAdmin();
  if (!session) return UNAUTHORIZED;

  const { id } = await ctx.params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Requête invalide" }, { status: 400 });
  }

  const parsed = faqSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: parsed.error.issues[0]?.message ?? "Données invalides" },
      { status: 422 }
    );
  }

  const item = await db.faqItem.update({ where: { id }, data: parsed.data });
  return Response.json({ item });
}

export async function DELETE(_req: Request, ctx: RouteContext<"/api/admin/faq/[id]">) {
  const session = await requireAdmin();
  if (!session) return UNAUTHORIZED;

  const { id } = await ctx.params;
  await db.faqItem.delete({ where: { id } });
  return Response.json({ ok: true });
}
