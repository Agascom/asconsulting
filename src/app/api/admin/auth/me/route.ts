import { requireAdmin, UNAUTHORIZED } from "@/lib/admin-guard";

export async function GET() {
  const session = await requireAdmin();
  if (!session) return UNAUTHORIZED;
  return Response.json({ user: session });
}
