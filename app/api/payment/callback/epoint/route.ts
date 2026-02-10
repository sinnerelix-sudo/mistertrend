import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { paymentProvider } from "@/lib/payment";
import { deliveryProvider } from "@/lib/delivery";

export async function POST(req: Request) {
  const body = await req.json();
  const result = await paymentProvider.verifyCallback(body);
  await prisma.order.update({ where: { id: result.orderId }, data: { paymentStatus: result.paid ? "PAID" : "FAILED", paymentRef: result.providerRef, status: result.paid ? "PROCESSING" : "PENDING_PAYMENT" } });
  if (result.paid) {
    const ship = await deliveryProvider.createShipment(result.orderId);
    await prisma.order.update({ where: { id: result.orderId }, data: { deliveryStatus: "SENT", deliveryRef: ship.shipmentRef } });
  }
  return NextResponse.json({ ok: true });
}
