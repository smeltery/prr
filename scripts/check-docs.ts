import { existsSync, readFileSync } from "node:fs";
import { basename, dirname, resolve } from "node:path";
import { Window } from "happy-dom";

const window = new Window();
Object.assign(globalThis, { window, document: window.document });
const { default: mermaid } = await import("mermaid");

import { createHash } from "node:crypto";

const files = ["README.md", "THIRD_PARTY_LICENSES.md", ...Array.from(new Bun.Glob("docs/**/*.md").scanSync("."))];
let diagrams = 0;
for (const file of files) {
  const content = readFileSync(file, "utf8");
  let diagramIndex = 0;
  for (const [, diagram] of content.matchAll(/```mermaid\n([\s\S]*?)```/g)) {
    await mermaid.parse(diagram);
    const hash = createHash("sha256").update(diagram).digest("hex");
    const asset = `website/public/diagrams/${basename(file, ".md").toLowerCase()}-${diagramIndex++}.svg`;
    if (!existsSync(asset) || !readFileSync(asset, "utf8").includes(`source-sha256: ${hash}`)) {
      throw new Error(`${file}: stale diagram; run bun run diagrams`);
    }
    diagrams++;
  }
  for (const [, target] of content.matchAll(/\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
    if (/^(https?:|mailto:|#)/.test(target)) continue;
    const [relative, fragment] = target.split("#");
    const destination = resolve(dirname(file), relative);
    if (!existsSync(destination)) throw new Error(`${file}: missing link ${target}`);
    if (fragment && destination.endsWith(".md")) {
      const anchors = [...readFileSync(destination, "utf8").matchAll(/^#{1,6} (.+)$/gm)].map(([, title]) =>
        title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-"),
      );
      if (!anchors.includes(fragment)) throw new Error(`${file}: missing heading ${target}`);
    }
  }
}
console.log(`Validated ${files.length} Markdown files and ${diagrams} Mermaid diagrams.`);
