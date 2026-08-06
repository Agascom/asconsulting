import { db } from "@/lib/db";
import { requireAdmin, UNAUTHORIZED } from "@/lib/admin-guard";

export async function GET(request: Request) {
  const session = await requireAdmin();
  if (!session) return UNAUTHORIZED;

  const url = new URL(request.url);
  const status = url.searchParams.get("status");
  const q = url.searchParams.get("q")?.trim();

  const requests = await db.contactRequest.findMany({
    where: {
      ...(status && status !== "tous" ? { status } : {}),
      ...(q
        ? {
            OR: [
              { firstName: { contains: q, mode: "insensitive" } },
              { lastName: { contains: q, mode: "insensitive" } },
              { email: { contains: q, mode: "insensitive" } },
              { company: { contains: q, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  return Response.json({ requests });
}
