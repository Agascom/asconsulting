import { db } from "@/lib/db";
import { FaqManager } from "@/components/admin/faq-manager";

export const metadata = { title: "FAQ — A&S Consulting" };

export default async function FaqPage() {
  const items = await db.faqItem.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-brand-950">Foire aux questions</h1>
        <p className="mt-1 text-sm text-slate-500">
          {items.length} question{items.length > 1 ? "s" : ""} affichée{items.length > 1 ? "s" : ""} sur le site.
        </p>
      </div>
      <FaqManager initial={items.map((i) => ({ ...i }))} />
    </div>
  );
}
