import { describe, expect, it } from "vitest";
import { rateLimit } from "@/lib/rate-limit";

describe("otp rate-limit", () => {
  it("blocks after limit", () => {
    let ok = true;
    for (let i = 0; i < 6; i++) ok = rateLimit("t", 5, 10000).ok;
    expect(ok).toBe(false);
  });
});
