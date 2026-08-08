"use client";

import { useState } from "react";
import { CLIENT_DOCUMENTS, TAX_CALENDAR } from "@/lib/portal-data";
import {
  Upload,
  Download,
  Calendar,
  FileText,
  CheckCircle2,
  Clock,
  Lock,
} from "lucide-react";

export function ClientSpaceDemo() {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileName = e.target.files[0].name;
      setUploadedFiles((prev) => [fileName, ...prev]);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 4000);
    }
  };

  const handleDownload = (title: string) => {
    alert(`Téléchargement de ${title}`);
  };

  return (
    <div className="pt-32 pb-20 px-4 sm:px-8 lg:px-12 bg-slate-950 text-white min-h-screen space-y-12">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto space-y-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-400 text-xs font-extrabold border border-orange-500/30 uppercase tracking-widest">
          <Lock className="w-4 h-4 text-orange-500" /> Espace Sécurisé Client A&S CONSULTING
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Portail Numérique & <span className="text-orange-500">Transmission de Pièces</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Déposez vos factures, téléchargez vos documents fiscaux certifiés (Quitus Fiscal, Bilan)
          et suivez votre calendrier d'échéances.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* File Upload Box */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-lg text-white flex items-center gap-2">
              <Upload className="w-5 h-5 text-orange-500" />
              <span>Transmettre des Pièces Comptables</span>
            </h3>
            <span className="text-[10px] bg-slate-950 px-2.5 py-1 rounded-full text-slate-400 font-mono">
              Fichiers Sécurisés
            </span>
          </div>

          {/* Drag and Drop Zone */}
          <div className="border-2 border-dashed border-slate-800 hover:border-orange-500 rounded-2xl p-8 text-center bg-slate-950/50 transition-colors space-y-3 relative">
            <input
              type="file"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="w-12 h-12 rounded-full bg-orange-500/10 text-orange-400 flex items-center justify-center mx-auto border border-orange-500/20">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">
                Cliquez ou glissez-déposez vos factures & relevés ici
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                Formats acceptés : PDF, PNG, JPG, XLSX (Max 15 MB)
              </p>
            </div>
          </div>

          {uploadSuccess && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-bold flex items-center gap-2 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Fichier téléversé avec succès ! Nos comptables s'en occupent.</span>
            </div>
          )}

          {/* Uploaded History */}
          <div className="space-y-2">
            <h4 className="text-xs font-black uppercase text-slate-400">
              Transmissions Récentes :
            </h4>
            <div className="space-y-2">
              {uploadedFiles.length === 0 ? (
                <p className="text-xs text-slate-500 italic">
                  Aucune nouvelle pièce transmise aujourd'hui.
                </p>
              ) : (
                uploadedFiles.map((f, i) => (
                  <div
                    key={i}
                    className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-200 flex items-center justify-between gap-3"
                  >
                    <span className="truncate font-mono">{f}</span>
                    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded shrink-0">
                      Reçu
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Certified Downloads */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-lg text-white flex items-center gap-2">
              <Download className="w-5 h-5 text-orange-500" />
              <span>Documents Certifiés Disponibles</span>
            </h3>
            <span className="text-[10px] bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded font-bold">
              Téléchargement Libre
            </span>
          </div>

          <div className="space-y-3">
            {CLIENT_DOCUMENTS.map((doc) => (
              <div
                key={doc.id}
                className="p-4 bg-slate-950 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors flex items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-orange-500 shrink-0" />
                    <span className="font-extrabold text-xs text-white truncate max-w-[200px] sm:max-w-xs">
                      {doc.title}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-[10px] text-slate-400">
                    <span>
                      Catégorie : <strong className="text-slate-200">{doc.category}</strong>
                    </span>
                    <span>•</span>
                    <span>Date : {doc.date}</span>
                    <span>•</span>
                    <span>{doc.size}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleDownload(doc.title)}
                  className="p-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition-all shadow-md shrink-0"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tax Calendar Task Grid */}
      <div className="max-w-7xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-lg text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-500" />
              <span>Calendrier Fiscal & Échéances Télédéclarations Libreville</span>
            </h3>
            <p className="text-xs text-slate-400">
              Suivi en temps réel des télédéclarations de votre entreprise.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TAX_CALENDAR.map((task) => {
            const isDone = task.status === "Effectué";
            const isInProgress = task.status === "En cours";
            return (
              <div key={task.id} className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-orange-400 font-bold">{task.category}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isDone
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                        : isInProgress
                          ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                          : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {task.status}
                  </span>
                </div>

                <h4 className="font-extrabold text-xs text-white leading-snug">{task.task}</h4>

                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 pt-1 border-t border-slate-900">
                  <Clock className="w-3.5 h-3.5 text-orange-500" />
                  <span>
                    Date limite : <strong className="text-slate-200">{task.deadline}</strong>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
