import "server-only";

import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/auth";

export async function requireAdmin() {
  const store = await cookies();
  const token = store.get("as_admin_session")?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export const UNAUTHORIZED = Response.json({ error: "Non autorisé" }, { status: 401 });
