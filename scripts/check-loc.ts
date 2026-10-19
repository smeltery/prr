import { readFileSync } from "node:fs";

const budgets = [
  { name: "Go source and tests", glob: "{cmd,internal}/**/*.go", total: 12150 },
  { name: "Website", glob: "website/{app,src}/**/*.{ts,tsx,css}", total: 2500 },
  { name: "Validation scripts", glob: "scripts/*.{ts,sh}", total: 250 },
];
for (const budget of budgets) {
  let total = 0;
  for (const file of new Bun.Glob(budget.glob).scanSync(".")) {
    const lines = readFileSync(file, "utf8").trimEnd().split("\n").length;
    total += lines;
    if (file.startsWith("website/") && /\.tsx?$/.test(file) && lines > 220) {
      throw new Error(`${file}: ${lines} lines exceeds the 220-line file budget`);
    }
  }
  console.log(`${budget.name}: ${total}/${budget.total} lines`);
  if (total > budget.total) throw new Error(`${budget.name} exceeds its LOC budget`);
}
