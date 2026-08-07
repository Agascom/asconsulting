import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const posts = await db.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    select: { slug: true, title: true, excerpt: true, createdAt: true },
  });
  return Response.json(posts);
}
