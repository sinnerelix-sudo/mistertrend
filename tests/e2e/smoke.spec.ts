import { test, expect } from "@playwright/test";

test("home opens", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("MISTER TREND")).toBeVisible();
});
