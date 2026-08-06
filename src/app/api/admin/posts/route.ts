import { db } from "@/lib/db";
import { requireAdmin, UNAUTHORIZED } from "@/lib/admin-guard";
import { postSchema } from "@/lib/validators";
import { slugify } from "@/lib/utils";

export async function GET() {
  const session = await requireAdmin();
  if (!session) return UNAUTHORIZED;

  const posts = await db.post.findMany({ orderBy: { createdAt: "desc" } });
  return Response.json({ posts });
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
  const parsed = postSchema.safeParse({ ...(body as object), slug: raw.slug || slugify(raw.title ?? "") });
  if (!parsed.success) {
    return Response.json(
      { error: parsed.error.issues[0]?.message ?? "Données invalides" },
      { status: 422 }
    );
  }

  const data = parsed.data;
  const existing = await db.post.findUnique({ where: { slug: data.slug } });
  if (existing) {
    return Response.json(
      { error: "Ce slug est déjà utilisé, choisissez-en un autre." },
      { status: 409 }
    );
  }

  const post = await db.post.create({ data });
  return Response.json({ post }, { status: 201 });
}
