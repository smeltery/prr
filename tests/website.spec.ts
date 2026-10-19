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
    for (const route of ["/", "/brand", "/docs", "/docs/commands"]) {
      await page.goto(route);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), route).toBe(true);
    }
    if (width <= 780) {
      await page.getByRole("button", { name: "Menu", exact: true }).click();
      await expect(page.getByRole("dialog", { name: "What’s next?" })).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(page.getByRole("dialog", { name: "What’s next?" })).not.toBeVisible();
      await expect(page.getByRole("button", { name: "Menu", exact: true })).toBeFocused();
      expect(await page.evaluate(() => getComputedStyle(document.documentElement).overflow)).not.toBe("hidden");
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
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).overflow)).not.toBe("hidden");
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

test("mobile search restores scrolling and closes on the current page", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/docs/installation");
  await page.getByRole("button", { name: "Menu", exact: true }).click();
  await page.getByRole("button", { name: "Search docs & guides" }).click();
  await expect(page.getByRole("searchbox")).toBeFocused();
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).overflow)).toBe("hidden");
  await page.getByRole("searchbox").fill("installation");
  await page.locator(".search-result").click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).overflow)).not.toBe("hidden");
  await page.getByRole("button", { name: "Documentation", exact: true }).click();
  await expect(page.getByRole("dialog", { name: "Documentation navigation" })).toBeVisible();
  await page.getByRole("dialog").getByRole("link", { name: "Agents", exact: true }).click();
  await expect(page).toHaveURL(/\/docs\/agents$/);
});

test("homepage questions and brand assets work", async ({ page, context, request }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  for (const selector of [".scenarios", ".agent-choice", ".saved-reviews", ".faq-section"]) {
    await expect(page.locator(selector)).toBeVisible();
  }
  const question = page.locator("summary").filter({ hasText: "Does prr post comments automatically?" });
  await question.click();
  await expect(page.locator("details[open]")).toContainText("preview the payload");
  await question.click();
  await expect(page.locator("details[open]")).toHaveCount(0);
  await page.goto("/brand");
  await page.getByRole("button", { name: "Copy Celadon #b8d9a2" }).click();
  await expect(page.getByRole("status")).toContainText("Celadon #b8d9a2 copied");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe("#b8d9a2");
  for (const path of ["/logo.svg", "/og.png", "/favicon.png"]) {
    const asset = await request.get(path);
    expect(asset.ok()).toBe(true);
    expect(asset.headers()["content-type"]).toMatch(/^image\//);
  }
});

test("documentation actions match the provider menu on desktop and mobile", async ({ page }) => {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/docs/installation");
    const actions = page.locator(width > 1100 ? ".docs-toc .doc-actions" : ".mobile-doc-actions .doc-actions");
    await actions.locator("summary").click();
    await expect(actions.locator(".chat-providers a")).toHaveCount(6);
    for (const link of await actions.locator(".chat-providers a").all()) {
      const url = new URL((await link.getAttribute("href"))!);
      expect([...url.searchParams.values()][0]).toContain("# Installation");
      expect(await link.getAttribute("target")).toBe("_blank");
      expect(
        await link.locator("img").evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0),
      ).toBe(true);
    }
    await actions.locator("summary").click();
    await expect(actions.locator(".chat-providers")).not.toBeVisible();
    await page.evaluate(() =>
      Object.defineProperty(navigator.clipboard, "writeText", {
        configurable: true,
        value: () => Promise.reject(new Error("Denied")),
      }),
    );
    await actions.getByRole("button", { name: "Copy as Markdown" }).click();
    await expect(actions.getByRole("textbox", { name: "Page Markdown" })).toHaveValue(/# Installation/);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await actions.getByRole("button", { name: "Scroll to top" }).click();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  }
});
