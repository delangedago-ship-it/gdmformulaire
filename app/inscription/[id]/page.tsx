import { getRegistration } from "@/lib/kv";
import { notFound } from "next/navigation";
import ProofUploader from "@/app/proof-uploader";

export default async function InscriptionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const registration = await getRegistration(id);

  if (!registration) {
    notFound();
  }

  return (
    <main className="flex-1 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <p className="text-[#f5d67a] font-semibold tracking-wide text-sm uppercase mb-2">
            Vases d&apos;Honneur
          </p>
          <h1 className="text-2xl font-bold mb-2">
            {registration.prenom} {registration.nom}
          </h1>
          <p className="text-white/70 text-sm">
            La Grande Rencontre — ajoutez votre preuve de paiement.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl">
          <ProofUploader id={id} initialProofUrl={registration.proofUrl} />
        </div>
      </div>
    </main>
  );
}
