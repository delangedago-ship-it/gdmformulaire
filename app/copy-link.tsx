"use client";

import { useState } from "react";

export default function CopyLink({ id }: { id: string }) {
  const [copied, setCopied] = useState(false);
  const path = `/inscription/${id}`;
  const url =
    typeof window !== "undefined" ? `${window.location.origin}${path}` : path;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable, no-op
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="rounded-lg bg-white/5 border border-white/15 px-3 py-2.5 text-sm text-white/80 break-all">
        {url}
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className="rounded-lg border border-[#f5d67a] text-[#f5d67a] font-medium px-4 py-2 text-sm hover:bg-[#f5d67a]/10 transition-colors"
      >
        {copied ? "Lien copié !" : "Copier le lien"}
      </button>
    </div>
  );
}
