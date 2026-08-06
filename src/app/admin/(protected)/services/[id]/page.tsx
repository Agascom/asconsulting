import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { ServiceForm } from "@/components/admin/service-form";

export const metadata = { title: "Modifier le service — A&S Consulting" };

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await db.service.findUnique({ where: { id } });
  if (!service) notFound();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-brand-950">Modifier le service</h1>
        <p className="mt-1 text-sm text-slate-500">{service.title}</p>
      </div>
      <ServiceForm
        initial={{
          id: service.id,
          slug: service.slug,
          title: service.title,
          shortDesc: service.shortDesc,
          description: service.description,
          icon: service.icon,
          order: service.order,
          published: service.published,
          items: service.items.map((text) => ({ text })),
        }}
      />
    </div>
  );
}
