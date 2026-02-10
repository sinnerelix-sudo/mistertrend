"use client";

export default function MockPayment({ searchParams }: { searchParams: { orderId: string; providerRef: string } }) {
  async function pay(paid: boolean) {
    await fetch("/api/payment/callback/epoint", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ orderId: searchParams.orderId, providerRef: searchParams.providerRef, paid }) });
    window.location.href = `/orders/${searchParams.orderId}`;
  }
  return <div><h1>Mock Epoint Checkout</h1><button className="btn" onClick={() => pay(true)}>Simulate Success</button> <button className="btn" onClick={() => pay(false)}>Simulate Failure</button></div>;
}
