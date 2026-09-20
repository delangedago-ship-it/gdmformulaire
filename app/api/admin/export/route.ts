import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, isValidAdminSession } from "@/lib/admin-auth";
import { listRegistrations } from "@/lib/kv";

function csvEscape(value: string) {
  return `"${value.replace(/"/g, '""')}"`;
}

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get(ADMIN_COOKIE)?.value;
  if (!isValidAdminSession(cookie)) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const registrations = await listRegistrations();
  const header = [
    "Nom",
    "Prénom",
    "Téléphone WhatsApp",
    "Preuve de paiement",
    "Date d'inscription",
  ];
  const rows = registrations.map((r) =>
    [r.nom, r.prenom, r.telephone, r.proofUrl ?? "", r.createdAt]
      .map((v) => csvEscape(String(v)))
      .join(",")
  );
  const csv = [header.join(","), ...rows].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="inscriptions-grande-rencontre.csv"`,
    },
  });
}
