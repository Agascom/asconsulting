import { db } from "@/lib/db";
import { requireAdmin, UNAUTHORIZED } from "@/lib/admin-guard";
import { requestStatusSchema } from "@/lib/validators";

export async function GET(_req: Request, ctx: RouteContext<"/api/admin/requests/[id]">) {
  const session = await requireAdmin();
  if (!session) return UNAUTHORIZED;

  const { id } = await ctx.params;
  const requestItem = await db.contactRequest.findUnique({ where: { id } });
  if (!requestItem) {
    return Response.json({ error: "Demande introuvable" }, { status: 404 });
  }
  return Response.json({ request: requestItem });
}

export async function PATCH(request: Request, ctx: RouteContext<"/api/admin/requests/[id]">) {
  const session = await requireAdmin();
  if (!session) return UNAUTHORIZED;

  const { id } = await ctx.params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Requête invalide" }, { status: 400 });
  }

  const parsed = requestStatusSchema.safeParse((body as { status?: string })?.status);
  if (!parsed.success) {
    return Response.json({ error: "Statut invalide" }, { status: 422 });
  }

  const requestItem = await db.contactRequest.update({
    where: { id },
    data: { status: parsed.data },
  });
  return Response.json({ request: requestItem });
}

export async function DELETE(_req: Request, ctx: RouteContext<"/api/admin/requests/[id]">) {
  const session = await requireAdmin();
  if (!session) return UNAUTHORIZED;

  const { id } = await ctx.params;
  await db.contactRequest.delete({ where: { id } });
  return Response.json({ ok: true });
}
