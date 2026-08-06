import { db } from "@/lib/db";
import { requireAdmin, UNAUTHORIZED } from "@/lib/admin-guard";
import { settingsSchema } from "@/lib/validators";
import { updateSettings } from "@/lib/site";

export async function GET() {
  const session = await requireAdmin();
  if (!session) return UNAUTHORIZED;

  const rows = await db.siteSetting.findMany();
  const settings = Object.fromEntries(rows.map((r) => [r.key, r.value]));
  return Response.json({ settings });
}

export async function PUT(request: Request) {
  const session = await requireAdmin();
  if (!session) return UNAUTHORIZED;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Requête invalide" }, { status: 400 });
  }

  const parsed = settingsSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: parsed.error.issues[0]?.message ?? "Données invalides" },
      { status: 422 }
    );
  }

  await updateSettings(parsed.data);
  return Response.json({ ok: true });
}
