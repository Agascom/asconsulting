import { db } from "@/lib/db";
import { requireAdmin, UNAUTHORIZED } from "@/lib/admin-guard";

export async function GET() {
  const session = await requireAdmin();
  if (!session) return UNAUTHORIZED;

  const [requests, newRequests, services, posts, faqs] = await Promise.all([
    db.contactRequest.count(),
    db.contactRequest.count({ where: { status: "nouveau" } }),
    db.service.count(),
    db.post.count(),
    db.faqItem.count(),
  ]);

  const recent = await db.contactRequest.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return Response.json({
    stats: { requests, newRequests, services, posts, faqs },
    recent,
  });
}
