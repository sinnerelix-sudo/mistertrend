import { prisma } from "@/lib/db";

export interface DeliveryProvider {
  createShipment(orderId: string): Promise<{ shipmentRef: string }>;
  getRates(city: string): Promise<{ amount: number }>;
}

export class ColumbaStubProvider implements DeliveryProvider {
  async createShipment(orderId: string) {
    const shipmentRef = `columba_${orderId}`;
    await prisma.integrationLog.create({
      data: { provider: "COLUMBA", type: "DELIVERY", requestJson: { orderId }, responseJson: { shipmentRef }, success: true }
    });
    return { shipmentRef };
  }
  async getRates() { return { amount: 4.99 }; }
}

export const deliveryProvider = new ColumbaStubProvider();
