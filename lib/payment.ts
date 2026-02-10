import { prisma } from "@/lib/db";

export interface PaymentProvider {
  createPaymentSession(orderId: string): Promise<{ redirectUrl: string; providerRef: string }>;
  verifyCallback(payload: unknown): Promise<{ orderId: string; paid: boolean; providerRef?: string }>;
}

export class EpointStubProvider implements PaymentProvider {
  async createPaymentSession(orderId: string) {
    const providerRef = `epoint_stub_${orderId}`;
    return { redirectUrl: `/payment/mock?orderId=${orderId}&providerRef=${providerRef}`, providerRef };
  }

  async verifyCallback(payload: any) {
    // TODO: map real epoint callback fields/signature verification here.
    await prisma.integrationLog.create({
      data: { provider: "EPOINT", type: "PAYMENT", requestJson: payload, responseJson: { ok: true }, success: !!payload.paid }
    });
    return { orderId: String(payload.orderId), paid: !!payload.paid, providerRef: String(payload.providerRef ?? "") };
  }
}

export const paymentProvider = new EpointStubProvider();
