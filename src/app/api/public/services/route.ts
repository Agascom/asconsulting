import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const services = await db.service.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
    select: { slug: true, title: true, shortDesc: true },
  });
  return Response.json(services);
}
