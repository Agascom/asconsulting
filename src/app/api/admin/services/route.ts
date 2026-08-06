import { db } from "@/lib/db";
import { requireAdmin, UNAUTHORIZED } from "@/lib/admin-guard";
import { serviceSchema } from "@/lib/validators";
import { slugify } from "@/lib/utils";

export async function GET() {
  const session = await requireAdmin();
  if (!session) return UNAUTHORIZED;

  const services = await db.service.findMany({ orderBy: { order: "asc" } });
  return Response.json({ services });
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

  const raw = body as { slug?: string; title?: string };
  const parsed = serviceSchema.safeParse({ ...(body as object), slug: raw.slug || slugify(raw.title ?? "") });
  if (!parsed.success) {
    return Response.json(
      { error: parsed.error.issues[0]?.message ?? "Données invalides" },
      { status: 422 }
    );
  }

  const data = parsed.data;
  const existing = await db.service.findUnique({ where: { slug: data.slug } });
  if (existing) {
    return Response.json(
      { error: "Ce slug est déjà utilisé, choisissez-en un autre." },
      { status: 409 }
    );
  }

  const service = await db.service.create({
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

  return Response.json({ service }, { status: 201 });
}
