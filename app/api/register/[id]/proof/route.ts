import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { getRegistration, updateRegistrationProof } from "@/lib/kv";

const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic"];

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const registration = await getRegistration(id);

  if (!registration) {
    return NextResponse.json(
      { error: "Inscription introuvable." },
      { status: 404 }
    );
  }

  const formData = await req.formData();
  const file = formData.get("proof");

  if (!(file instanceof File)) {
    return NextResponse.json(
      { error: "Aucune image reçue." },
      { status: 400 }
    );
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "L'image dépasse 5 Mo." },
      { status: 400 }
    );
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: "Format d'image non supporté." },
      { status: 400 }
    );
  }

  const extension = file.type.split("/")[1] ?? "jpg";
  const blob = await put(`preuves/${id}-${Date.now()}.${extension}`, file, {
    access: "public",
    addRandomSuffix: true,
  });

  const updated = await updateRegistrationProof(id, blob.url);

  return NextResponse.json({ ok: true, registration: updated });
}
