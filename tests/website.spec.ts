import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = [
  "/",
  "/docs",
  "/docs/installation",
  "/docs/reviews",
  "/docs/agents",
  "/docs/configuration",
  "/docs/output",
  "/docs/commands",
  "/docs/development",
  "/docs/troubleshooting",
  "/brand",
  "/credits",
];
for (const route of routes) {
  test(`${route} renders accessible content and valid internal links`, async ({ page, request }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("main")).toBeVisible();
    expect(
      (await new AxeBuilder({ page }).analyze()).violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })),
      })),
    ).toEqual([]);
    const targets = await page
      .locator('a[href^="/"]')
      .evaluateAll((links) => [...new Set(links.map((link) => link.getAttribute("href")!.split("#")[0]))]);
    for (const target of targets) expect((await request.get(target)).ok(), target).toBe(true);
    expect(errors).toEqual([]);
  });
}

for (const width of [320, 390, 768, 1440]) {
  test(`reflow and navigation at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/", "/docs", "/docs/commands"]) {
      await page.goto(route);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), route).toBe(true);
    }
    if (width <= 780) {
      await page.getByRole("button", { name: "Menu", exact: true }).click();
      await expect(page.getByRole("dialog", { name: "What’s next?" })).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(page.getByRole("dialog", { name: "What’s next?" })).not.toBeVisible();
      await expect(page.getByRole("button", { name: "Menu", exact: true })).toBeFocused();
      expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe("");
    }
  });
}

test("search supports empty results, keyboard navigation and route changes", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Search ⌘ K documentation" }).click();
  const input = page.getByRole("searchbox");
  await expect(input).toBeFocused();
  await input.fill("not-a-real-page");
  await expect(page.getByText("No matches.")).toBeVisible();
  await input.fill("configuration");
  await expect(page.locator(".search-result")).toHaveCount(1);
  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/docs\/configuration$/);
  await expect(page.getByRole("dialog")).not.toBeVisible();
  expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe("");
});

test("diagrams, copy, metadata and not found states", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/docs");
  const diagram = page.locator(".mermaid-diagram img");
  await diagram.scrollIntoViewIfNeeded();
  await expect(diagram).toBeVisible();
  expect(await diagram.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
  await page.getByRole("button", { name: "Copy as Markdown" }).click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain("# Overview");
  await page.goto("/docs/installation");
  await page.getByRole("button", { name: "Copy code", exact: true }).first().click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
    "go install github.com/smeltery/prr@latest",
  );
  await expect(page.locator('meta[property="og:image"]')).not.toHaveAttribute("content", /localhost/);
  expect((await page.goto("/not-a-real-page"))?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "A small detour." })).toBeVisible();
});
