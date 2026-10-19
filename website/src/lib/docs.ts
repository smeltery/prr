import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

export const catalog = [
  ["Overview", "", "Start here"],
  ["Installation", "installation", "Start here"],
  ["Reviewing changes", "reviews", "Guides"],
  ["Agents", "agents", "Guides"],
  ["Configuration", "configuration", "Guides"],
  ["Review output", "output", "Guides"],
  ["Command reference", "commands", "Reference"],
  ["Development", "development", "Project"],
  ["Troubleshooting", "troubleshooting", "Project"],
];
export const headingId = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

export function getDoc(slug: string) {
  const entry = catalog.find((item) => item[1] === slug);
  if (!entry) return null;
  const file = `${slug || "README"}.md`;
  const markdown = fs.readFileSync(path.join(process.cwd(), "..", "docs", file), "utf8");
  const headings = [...markdown.matchAll(/^## (.+)$/gm)].map((match) => ({ title: match[1], id: headingId(match[1]) }));
  const renderer = new marked.Renderer();
  let diagramIndex = 0;
  const defaultCode = renderer.code.bind(renderer);
  renderer.code = (token) => {
    if (token.lang !== "mermaid") return defaultCode(token);
    const name = `${file.replace(/\.md$/, "").toLowerCase()}-${diagramIndex++}`;
    const svg = fs.readFileSync(path.join(process.cwd(), "public", "diagrams", `${name}.svg`), "utf8");
    const dimensions = svg.match(/viewBox="[^"]*? ([\d.]+) ([\d.]+)"/);
    if (!dimensions) throw new Error(`Missing viewBox in ${name}.svg`);
    return `<figure class="mermaid-diagram"><img src="/diagrams/${name}.svg" width="${dimensions[1]}" height="${dimensions[2]}" alt="${entry[0]} workflow diagram" loading="lazy" /></figure>`;
  };
  renderer.heading = ({ text, depth }) => `<h${depth} id="${headingId(text)}">${text}</h${depth}>`;
  renderer.link = function ({ href, tokens }) {
    const target = href.startsWith("../")
      ? `https://github.com/smeltery/prr/blob/master/${href.slice(3)}`
      : href.replace(/^README\.md$/, "/docs").replace(/^([\w-]+)\.md$/, "/docs/$1");
    return `<a href="${target}">${this.parser.parseInline(tokens)}</a>`;
  };
  return {
    title: entry[0],
    group: entry[2],
    file,
    markdown,
    headings,
    html: marked.parse(markdown, { renderer, async: false }),
  };
}
