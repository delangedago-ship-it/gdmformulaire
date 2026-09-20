import { getRegistration } from "@/lib/kv";
import { notFound } from "next/navigation";
import ProofUploader from "@/app/proof-uploader";
import CopyLink from "@/app/copy-link";

export default async function MerciPage({
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
            Merci, {registration.prenom} !
          </h1>
          <p className="text-white/70 text-sm">
            Votre inscription à La Grande Rencontre est enregistrée.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-3">
              Preuve de paiement
            </h2>
            <ProofUploader id={id} initialProofUrl={registration.proofUrl} />
          </div>

          <div className="border-t border-white/10 pt-5">
            <p className="text-sm text-white/70 mb-2">
              Pas encore prêt ? Gardez ce lien pour ajouter votre preuve de
              paiement plus tard :
            </p>
            <CopyLink id={id} />
          </div>
        </div>
      </div>
    </main>
  );
}
