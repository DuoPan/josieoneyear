import { NextResponse } from "next/server";
import { getTotalConfirmed } from "@/lib/sheets";

export async function GET() {
  try {
    const totalConfirmed = await getTotalConfirmed();
    return NextResponse.json({ ok: true, totalConfirmed });
  } catch {
    return NextResponse.json({ ok: true, totalConfirmed: 0 });
  }
}
