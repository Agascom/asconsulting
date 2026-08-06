import { PostForm } from "@/components/admin/post-form";

export const metadata = { title: "Nouvel article — A&S Consulting" };

export default function NewPostPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-brand-950">Nouvel article</h1>
        <p className="mt-1 text-sm text-slate-500">Rédigez un article pour la section actualités.</p>
      </div>
      <PostForm />
    </div>
  );
}
