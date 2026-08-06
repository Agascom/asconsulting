import { db } from "@/lib/db";
import { requireAdmin, UNAUTHORIZED } from "@/lib/admin-guard";
import { faqSchema } from "@/lib/validators";

export async function GET() {
  const session = await requireAdmin();
  if (!session) return UNAUTHORIZED;

  const items = await db.faqItem.findMany({ orderBy: { order: "asc" } });
  return Response.json({ items });
}

export async function POST(request: Request) {
  const session = await requireAdmin();
  if (!session) return UNAUTHORIZED;

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

  const item = await db.faqItem.create({ data: parsed.data });
  return Response.json({ item }, { status: 201 });
}
