"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterForm() {
  const router = useRouter();
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom, prenom, telephone }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Une erreur est survenue.");
        setLoading(false);
        return;
      }

      router.push(`/merci/${data.id}`);
    } catch {
      setError("Une erreur est survenue. Réessayez.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="nom" className="text-sm font-medium text-[#f5d67a]">
          Nom
        </label>
        <input
          id="nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
          className="rounded-lg bg-white/5 border border-white/15 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-[#f5d67a] focus:ring-1 focus:ring-[#f5d67a]"
          placeholder="Votre nom"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="prenom"
          className="text-sm font-medium text-[#f5d67a]"
        >
          Prénom
        </label>
        <input
          id="prenom"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          required
          className="rounded-lg bg-white/5 border border-white/15 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-[#f5d67a] focus:ring-1 focus:ring-[#f5d67a]"
          placeholder="Votre prénom"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="telephone"
          className="text-sm font-medium text-[#f5d67a]"
        >
          Téléphone WhatsApp
        </label>
        <input
          id="telephone"
          type="tel"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          required
          className="rounded-lg bg-white/5 border border-white/15 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-[#f5d67a] focus:ring-1 focus:ring-[#f5d67a]"
          placeholder="+225 07 00 00 00 00"
        />
      </div>

      {error && (
        <p className="text-sm text-red-300 bg-red-900/30 border border-red-500/40 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <p className="text-sm text-white/60">
        La preuve de paiement est facultative ici : vous pourrez l&apos;ajouter
        juste après, sur la page de confirmation, ou plus tard grâce au lien
        unique qui vous sera fourni.
      </p>

      <button
        type="submit"
        disabled={loading}
        className="mt-2 rounded-lg bg-[#f5d67a] text-[#0b1f33] font-semibold px-4 py-3 hover:bg-[#e9c458] transition-colors disabled:opacity-60"
      >
        {loading ? "Envoi en cours..." : "S'inscrire"}
      </button>
    </form>
  );
}
