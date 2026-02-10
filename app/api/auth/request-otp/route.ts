import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { getOtpProvider } from "@/lib/otp";
import { rateLimit } from "@/lib/rate-limit";

const bodySchema = z.object({ phone: z.string().min(7).max(20) });

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") ?? "ip";
  const body = bodySchema.parse(await req.json());
  const key = `${body.phone}:${ip}`;
  const check = rateLimit(key, 5, 300000);
  if (!check.ok) return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  const code = String(Math.floor(100000 + Math.random() * 900000));
  const codeHash = await bcrypt.hash(code, 10);
  await prisma.otpCode.create({ data: { phone: body.phone, codeHash, expiresAt: new Date(Date.now() + 5 * 60_000) } });
  await getOtpProvider().send(body.phone, code);
  return NextResponse.json({ ok: true });
}
