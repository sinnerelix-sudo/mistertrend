import { CouponType, DiscountType } from "@prisma/client";

export type CalcItem = { price: number; qty: number; discountType: DiscountType; discountValue: number };
export type CouponInput = { type: CouponType; value: number; minOrderAmount?: number | null };

export function discountedUnitPrice(item: CalcItem) {
  if (item.discountType === DiscountType.FIXED) return Math.max(0, item.price - item.discountValue);
  if (item.discountType === DiscountType.PERCENT) return Math.max(0, item.price * (1 - item.discountValue / 100));
  return item.price;
}

export function calculateTotals(items: CalcItem[], shippingFee: number, freeShippingThreshold: number, coupon?: CouponInput) {
  const subtotal = items.reduce((s, i) => s + discountedUnitPrice(i) * i.qty, 0);
  const couponEligible = coupon && (!coupon.minOrderAmount || subtotal >= coupon.minOrderAmount);
  const couponDiscount = !couponEligible ? 0 : coupon.type === CouponType.FIXED ? coupon.value : subtotal * (coupon.value / 100);
  const discountTotal = couponDiscount;
  const postDiscount = Math.max(0, subtotal - couponDiscount);
  const shipping = postDiscount >= freeShippingThreshold ? 0 : shippingFee;
  return { subtotal, discountTotal, shippingFee: shipping, total: postDiscount + shipping };
}
