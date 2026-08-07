"use client";

import { useState } from "react";
import {
  UserCheck,
  UploadCloud,
  Download,
  ShieldCheck,
  CheckCircle2,
  Clock,
  FileText,
} from "lucide-react";

type ActiveTab = "upload" | "documents" | "status";

interface UploadedFile {
  name: string;
  date: string;
  size: string;
}

export function ClientSpaceDemo() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("documents");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    { name: "Factures_Ventes_Juillet_2026.pdf", date: "02/08/2026", size: "1.4 MB" },
    { name: "Releves_Bancaires_UBA_Q2.pdf", date: "28/07/2026", size: "2.1 MB" },
    { name: "Fiches_Paie_Juillet_Signees.pdf", date: "25/07/2026", size: "850 KB" },
  ]);

  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const handleSimulatedUpload = (fileName: string) => {
    setIsUploading(true);
    setTimeout(() => {
      setUploadedFiles((prev) => [
        { name: fileName, date: new Date().toLocaleDateString("fr-FR"), size: "1.1 MB" },
        ...prev,
      ]);
      setIsUploading(false);
    }, 1200);
  };

  const handleDownload = (title: string) => {
    setDownloadNotice(`Téléchargement simulé : ${title}`);
    setTimeout(() => setDownloadNotice(null), 4000);
  };

  return (
    <section id="espace-client" className="border-b border-slate-800 bg-slate-900 py-16 text-white">
      <div className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl space-y-3 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-700/80 bg-emerald-900/80 px-3.5 py-1 text-xs font-semibold text-amber-300">
            <UserCheck className="h-4 w-4" /> Portail Sécurisé Client Demo
          </div>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Espace Numérique A&S CONSULTING
          </h2>
          <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
            Transmettez vos pièces comptables, téléchargez vos attestations fiscales et suivez
            l'avancement de vos dossiers 24h/24.
          </p>
        </div>

        {/* Portal Dashboard Card */}
        <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl">
          {/* Top Bar of Client Portal */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-emerald-800 bg-emerald-950 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400 font-serif text-lg font-bold text-slate-950">
                AS
              </div>
              <div>
                <h3 className="flex items-center gap-1.5 font-serif text-sm font-bold text-white">
                  Etablissements Ondo & Fils SARL
                  <ShieldCheck className="inline h-4 w-4 text-amber-400" />
                </h3>
                <p className="text-[11px] text-emerald-200">
                  NIF : 794832-B • RCCM : 2024-B-1029 • Client Privilégié A&S
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1.5 rounded-full border border-emerald-700 bg-emerald-900 px-3 py-1 font-bold text-amber-300">
                <CheckCircle2 className="h-3.5 w-3.5 text-amber-400" /> Dossier Fiscale à jour (Aout
                2026)
              </span>
            </div>
          </div>

          {/* Sub Navigation */}
          <div className="flex gap-4 border-b border-slate-800 bg-slate-900 px-6 pt-3 text-xs font-semibold">
            {[
              { id: "documents" as ActiveTab, label: "Documents & Quitus Fiscaux", icon: FileText },
              { id: "upload" as ActiveTab, label: "Transmettre mes Factures / Pièces", icon: UploadCloud },
              { id: "status" as ActiveTab, label: "Suivi de Conformité & Calendrier", icon: Clock },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 border-b-2 pb-3 transition-colors ${
                    isActive
                      ? "border-amber-400 font-bold text-amber-300"
                      : "border-transparent text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8">
            {/* Tab 1: Documents */}
            {activeTab === "documents" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-base font-bold text-amber-300">
                    Vos Attestations & États Financiers Téléchargeables
                  </h4>
                  <span className="text-xs text-slate-400">3 documents officiels certifiés</span>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {[
                    { title: "Quitus Fiscal Aout 2026", type: "Attestation Officielle", size: "420 KB", date: "01/08/2026" },
                    { title: "Liasse Fiscale & Bilan 2025", type: "États Financiers SYSCOHADA", size: "3.8 MB", date: "30/04/2026" },
                    { title: "Déclaration CNSS Q2 2026", type: "Bordereau de Cotisation", size: "890 KB", date: "15/07/2026" },
                  ].map((doc, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col justify-between space-y-3 rounded-2xl border border-slate-800 bg-slate-900 p-4"
                    >
                      <div className="space-y-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-950 text-amber-300">
                          <FileText className="h-4 w-4" />
                        </div>
                        <h5 className="text-xs font-bold text-white">{doc.title}</h5>
                        <p className="text-[11px] text-slate-400">{doc.type}</p>
                      </div>

                      <div className="flex items-center justify-between border-t border-slate-800 pt-2 text-[11px]">
                        <span className="text-slate-500">{doc.date}</span>
                        <button
                          onClick={() => handleDownload(doc.title)}
                          className="flex items-center gap-1 rounded bg-amber-500 px-2.5 py-1 font-bold text-slate-950 transition-colors hover:bg-amber-600"
                        >
                          <Download className="h-3.5 w-3.5" /> PDF
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {downloadNotice && (
                  <p className="rounded-xl border border-amber-400/40 bg-amber-500/20 p-3 text-center text-xs font-bold text-amber-300 animate-fade-in">
                    {downloadNotice}
                  </p>
                )}
              </div>
            )}

            {/* Tab 2: Upload */}
            {activeTab === "upload" && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h4 className="font-serif text-base font-bold text-amber-300">
                    Transmission Rapide de vos Pièces Comptables
                  </h4>
                  <p className="text-xs text-slate-400">
                    Déposez vos relevés de compte, factures d'achat/vente ou bulletins de paie pour
                    saisie par A&S CONSULTING.
                  </p>
                </div>

                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragActive(true);
                  }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragActive(false);
                    handleSimulatedUpload("Factures_Deposees_Client.pdf");
                  }}
                  onClick={() =>
                    handleSimulatedUpload(`Nouveau_Document_Depot_${Math.floor(Math.random() * 100)}.pdf`)
                  }
                  className={`cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-colors ${
                    dragActive
                      ? "border-amber-400 bg-amber-400/10"
                      : "border-emerald-800 bg-slate-900 hover:bg-slate-900/80"
                  }`}
                >
                  <UploadCloud className="mx-auto mb-3 h-10 w-10 animate-pulse text-amber-400" />
                  <p className="text-xs font-bold text-white">
                    Glissez-déposez vos fichiers ici ou{" "}
                    <span className="underline text-amber-300">cliquez pour parcourir</span>
                  </p>
                  <p className="mt-1 text-[11px] text-slate-400">
                    Formats acceptés: PDF, JPG, PNG, Excel (Taille max 25 MB)
                  </p>
                  {isUploading && (
                    <p className="mt-3 text-xs font-bold text-amber-300">
                      Envoi du document en cours...
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <h5 className="text-xs font-bold uppercase text-slate-300">
                    Documents Récemment Transmis
                  </h5>
                  <div className="space-y-2">
                    {uploadedFiles.map((f, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 p-3 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                          <span className="font-medium text-white">{f.name}</span>
                        </div>
                        <div className="flex items-center gap-3 text-[11px] text-slate-400">
                          <span>{f.size}</span>
                          <span>{f.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Status */}
            {activeTab === "status" && (
              <div className="space-y-6">
                <h4 className="font-serif text-base font-bold text-amber-300">
                  Calendrier de Suivi & Tâches Fiscaux en Cours
                </h4>

                <div className="space-y-3">
                  {[
                    { task: "Déclaration TVA Mensuelle Juillet 2026", status: "Déclarée & Validée", date: "15/08/2026", isDone: true },
                    { task: "Établissement des Bulletins de Paie Aout 2026", status: "En cours de préparation", date: "25/08/2026", isDone: false },
                    { task: "Acompte d'Impôt sur les Sociétés (IS)", status: "Planifié", date: "15/09/2026", isDone: false },
                  ].map((t, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 p-4 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        {t.isDone ? (
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-900 text-emerald-300">
                            ✓
                          </div>
                        ) : (
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500/20 font-bold text-amber-400">
                            !
                          </div>
                        )}
                        <div>
                          <div className="font-bold text-white">{t.task}</div>
                          <div className="text-[11px] text-slate-400">Échéance : {t.date}</div>
                        </div>
                      </div>

                      <span
                        className={`rounded px-2.5 py-1 text-[11px] font-bold ${
                          t.isDone ? "bg-emerald-900 text-emerald-300" : "bg-amber-400 text-slate-950"
                        }`}
                      >
                        {t.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
