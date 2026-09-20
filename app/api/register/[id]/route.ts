import { NextRequest, NextResponse } from "next/server";
import { getRegistration } from "@/lib/kv";

export async function GET(
  _req: NextRequest,
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

  return NextResponse.json({ registration });
}
