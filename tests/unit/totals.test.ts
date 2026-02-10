import { describe, expect, it } from "vitest";
import { CouponType, DiscountType } from "@prisma/client";
import { calculateTotals } from "@/lib/totals";

describe("calculateTotals", () => {
  it("applies product and coupon discounts then shipping threshold", () => {
    const out = calculateTotals([{ price: 100, qty: 1, discountType: DiscountType.PERCENT, discountValue: 10 }], 5, 80, { type: CouponType.PERCENT, value: 10 });
    expect(out.total).toBe(81);
  });
  it("adds shipping when below threshold", () => {
    const out = calculateTotals([{ price: 50, qty: 1, discountType: DiscountType.NONE, discountValue: 0 }], 5, 100);
    expect(out.total).toBe(55);
  });
});
