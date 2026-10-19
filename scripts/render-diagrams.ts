import { chromium } from "@playwright/test";
import { createHash } from "node:crypto";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, basename } from "node:path";

const temporary = mkdtempSync(join(tmpdir(), "prr-diagrams-"));
const bundle = await Bun.build({
  entrypoints: [require.resolve("mermaid")],
  outdir: temporary,
  target: "browser",
  minify: true,
});
if (!bundle.success) throw new Error(`Mermaid bundle failed: ${bundle.logs}`);
const server = Bun.serve({
  port: 0,
  fetch(request) {
    return new URL(request.url).pathname === "/mermaid.js"
      ? new Response(Bun.file(bundle.outputs[0].path), { headers: { "Content-Type": "text/javascript" } })
      : new Response(
          '<html><body><script type="module">import mermaid from "/mermaid.js"; window.mermaid = mermaid;</script></body></html>',
          { headers: { "Content-Type": "text/html" } },
        );
  },
});
const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  await page.goto(`http://localhost:${server.port}`);
  await page.waitForFunction(() => Boolean((window as any).mermaid));
  mkdirSync("website/public/diagrams", { recursive: true });
  for (const file of new Bun.Glob("docs/*.md").scanSync(".")) {
    const diagrams = [...readFileSync(file, "utf8").matchAll(/```mermaid\n([\s\S]*?)```/g)];
    for (const [index, [, source]] of diagrams.entries()) {
      const name = `${basename(file, ".md").toLowerCase()}-${index}`;
      const svg = await page.evaluate(
        async ({ source, name }) => {
          const mermaid = (window as any).mermaid;
          mermaid.initialize({
            startOnLoad: false,
            securityLevel: "strict",
            theme: "dark",
            themeVariables: {
              primaryColor: "#2a352f",
              primaryTextColor: "#f3f1e8",
              primaryBorderColor: "#b8d9a2",
              lineColor: "#d0e8bf",
              fontFamily: "Arial, sans-serif",
            },
          });
          return (await mermaid.render(name, source)).svg;
        },
        { source, name },
      );
      const hash = createHash("sha256").update(source).digest("hex");
      writeFileSync(`website/public/diagrams/${name}.svg`, `<!-- source-sha256: ${hash} -->\n${svg}\n`);
      console.log(`Rendered ${name}`);
    }
  }
} finally {
  await browser.close();
  server.stop();
  rmSync(temporary, { recursive: true });
}
