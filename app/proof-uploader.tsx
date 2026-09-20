"use client";

import { useState } from "react";

export default function ProofUploader({
  id,
  initialProofUrl,
}: {
  id: string;
  initialProofUrl: string | null;
}) {
  const [proofUrl, setProofUrl] = useState(initialProofUrl);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file) {
      setError("Choisissez une image d'abord.");
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("proof", file);

      const res = await fetch(`/api/register/${id}/proof`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Une erreur est survenue.");
        setLoading(false);
        return;
      }

      setProofUrl(data.registration.proofUrl);
      setFile(null);
    } catch {
      setError("Une erreur est survenue. Réessayez.");
    } finally {
      setLoading(false);
    }
  }

  if (proofUrl) {
    return (
      <div className="rounded-lg border border-green-500/40 bg-green-900/20 px-4 py-3 text-sm text-green-200">
        ✓ Preuve de paiement reçue. Merci !
      </div>
    );
  }

  return (
    <form onSubmit={handleUpload} className="flex flex-col gap-3">
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-[#f5d67a]">
          Preuve de paiement (image)
        </span>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="text-sm text-white/80 file:mr-3 file:rounded-lg file:border-0 file:bg-[#f5d67a] file:px-3 file:py-2 file:text-[#0b1f33] file:font-medium"
        />
      </label>

      {error && (
        <p className="text-sm text-red-300 bg-red-900/30 border border-red-500/40 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-[#f5d67a] text-[#0b1f33] font-semibold px-4 py-2.5 hover:bg-[#e9c458] transition-colors disabled:opacity-60"
      >
        {loading ? "Envoi en cours..." : "Envoyer la preuve"}
      </button>
    </form>
  );
}
