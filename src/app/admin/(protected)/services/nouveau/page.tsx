import { ServiceForm } from "@/components/admin/service-form";

export const metadata = { title: "Nouveau service — A&S Consulting" };

export default function NewServicePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-brand-950">Nouveau service</h1>
        <p className="mt-1 text-sm text-slate-500">Créez un service affiché sur le site.</p>
      </div>
      <ServiceForm />
    </div>
  );
}
