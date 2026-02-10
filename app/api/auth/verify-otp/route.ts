import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/session";

const bodySchema = z.object({ phone: z.string(), code: z.string().length(6) });

export async function POST(req: Request) {
  const body = bodySchema.parse(await req.json());
  const otp = await prisma.otpCode.findFirst({ where: { phone: body.phone }, orderBy: { createdAt: "desc" } });
  if (!otp || otp.expiresAt < new Date() || otp.attempts >= 5) return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
  const ok = await bcrypt.compare(body.code, otp.codeHash);
  if (!ok) {
    await prisma.otpCode.update({ where: { id: otp.id }, data: { attempts: { increment: 1 } } });
    return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
  }
  const user = await prisma.user.upsert({ where: { phone: body.phone }, update: {}, create: { phone: body.phone } });
  const session = await getSession();
  session.userId = user.id;
  session.role = user.role;
  await session.save();
  return NextResponse.json({ ok: true, user: { id: user.id, phone: user.phone, role: user.role } });
}
