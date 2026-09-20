import { cookies } from "next/headers";
import { ADMIN_COOKIE, isValidAdminSession } from "@/lib/admin-auth";
import { listRegistrations } from "@/lib/kv";
import AdminLogin from "./admin-login";
import LogoutButton from "./logout-button";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_COOKIE)?.value;

  if (!isValidAdminSession(session)) {
    return <AdminLogin />;
  }

  const registrations = await listRegistrations();
  const withProof = registrations.filter((r) => r.proofUrl).length;

  return (
    <main className="flex-1 px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-[#f5d67a] font-semibold tracking-wide text-sm uppercase mb-1">
              Vases d&apos;Honneur — La Grande Rencontre
            </p>
            <h1 className="text-2xl font-bold">
              Inscriptions ({registrations.length})
            </h1>
            <p className="text-white/60 text-sm mt-1">
              {withProof} preuve(s) de paiement reçue(s) sur{" "}
              {registrations.length}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/api/admin/export"
              className="rounded-lg border border-[#f5d67a] text-[#f5d67a] font-medium px-4 py-2 text-sm hover:bg-[#f5d67a]/10 transition-colors"
            >
              Exporter en CSV
            </a>
            <LogoutButton />
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          {registrations.length === 0 ? (
            <p className="p-6 text-white/60 text-sm">
              Aucune inscription pour le moment.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[#f5d67a] border-b border-white/10">
                    <th className="px-4 py-3 font-medium">Nom</th>
                    <th className="px-4 py-3 font-medium">Prénom</th>
                    <th className="px-4 py-3 font-medium">WhatsApp</th>
                    <th className="px-4 py-3 font-medium">Preuve</th>
                    <th className="px-4 py-3 font-medium">Inscrit le</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.map((r) => (
                    <tr
                      key={r.id}
                      className="border-b border-white/5 last:border-0"
                    >
                      <td className="px-4 py-3">{r.nom}</td>
                      <td className="px-4 py-3">{r.prenom}</td>
                      <td className="px-4 py-3">{r.telephone}</td>
                      <td className="px-4 py-3">
                        {r.proofUrl ? (
                          <a
                            href={r.proofUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#f5d67a] underline"
                          >
                            Voir l&apos;image
                          </a>
                        ) : (
                          <span className="text-white/40">En attente</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-white/60">
                        {new Date(r.createdAt).toLocaleString("fr-FR")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
