import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { appendRSVP, getTotalConfirmed } from "@/lib/sheets";
import { isRateLimited } from "@/lib/rate-limit";

const payloadSchema = z.object({
  name: z.string().trim().min(2).max(40),
  guests: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
  website: z.string().optional()
});

function getIp(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return "unknown";
}

export async function POST(req: NextRequest) {
  try {
    const ip = getIp(req);
    if (isRateLimited(ip)) {
      return NextResponse.json({ ok: false, error: "请求过于频繁，请稍后再试" }, { status: 429 });
    }

    const body = await req.json();
    const parsed = payloadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "参数不正确，请检查后重试" }, { status: 400 });
    }

    if (parsed.data.website && parsed.data.website.length > 0) {
      return NextResponse.json({ ok: false, error: "提交失败" }, { status: 400 });
    }

    await appendRSVP({
      timestamp: new Date().toISOString(),
      name: parsed.data.name,
      guests: parsed.data.guests,
      source: "web"
    });

    const totalConfirmed = await getTotalConfirmed();
    return NextResponse.json({ ok: true, totalConfirmed });
  } catch {
    return NextResponse.json({ ok: false, error: "服务暂时不可用，请稍后再试" }, { status: 500 });
  }
}
