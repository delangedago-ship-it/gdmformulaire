import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { saveRegistration } from "@/lib/kv";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const nom = typeof body.nom === "string" ? body.nom.trim() : "";
  const prenom = typeof body.prenom === "string" ? body.prenom.trim() : "";
  const telephone =
    typeof body.telephone === "string" ? body.telephone.trim() : "";

  if (!nom || !prenom || !telephone) {
    return NextResponse.json(
      { error: "Nom, prénom et téléphone WhatsApp sont obligatoires." },
      { status: 400 }
    );
  }

  const id = nanoid(10);
  const now = new Date().toISOString();

  await saveRegistration({
    id,
    nom,
    prenom,
    telephone,
    proofUrl: null,
    createdAt: now,
    updatedAt: now,
  });

  return NextResponse.json({ id });
}
