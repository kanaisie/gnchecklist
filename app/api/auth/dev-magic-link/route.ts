import { NextResponse } from "next/server";
import { getLastMagicLinkForDev } from "@/lib/auth";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  if (!email?.trim()) {
    return NextResponse.json({ url: null }, { status: 400 });
  }
  const url = getLastMagicLinkForDev(email.trim());
  return NextResponse.json({ url });
}
