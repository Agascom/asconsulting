import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { AdminShell } from "@/components/admin/admin-shell";

export const metadata = { title: "Administration — A&S Consulting" };

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const newRequests = await db.contactRequest.count({
    where: { status: "nouveau" },
  });

  return (
    <AdminShell
      user={{ name: session.name, email: session.email }}
      newRequests={newRequests}
    >
      {children}
    </AdminShell>
  );
}
