import { db } from "@/lib/db";
import { SettingsForm } from "@/components/admin/settings-form";

export const metadata = { title: "Paramètres — A&S Consulting" };

export default async function SettingsPage() {
  const rows = await db.siteSetting.findMany();
  const settings = Object.fromEntries(rows.map((r) => [r.key, r.value]));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-brand-950">Paramètres du site</h1>
        <p className="mt-1 text-sm text-slate-500">
          Coordonnées affichées dans l'en-tête, le pied de page et la page contact.
        </p>
      </div>
      <SettingsForm
        initial={{
          phone: settings.phone ?? "",
          email: settings.email ?? "",
          address: settings.address ?? "",
          hours: settings.hours ?? "",
          whatsapp: settings.whatsapp ?? "",
        }}
      />
    </div>
  );
}
