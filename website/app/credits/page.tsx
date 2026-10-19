import Link from "next/link";
export const metadata = { title: "Credits & acknowledgments" };
export default function Credits() {
  return (
    <main id="main" className="wrap simple-page">
      <h1>Built with good tools.</h1>
      <p>prr is a Smeltery project. The website uses Next.js, React, DM Sans, Lucide, Marked, and Mermaid.</p>
      <p>
        Navigation and footer styles are adapted from{" "}
        <Link href="https://github.com/smeltery/skills">Smeltery Skills</Link>. Documentation layout styles are adapted
        from <Link href="https://github.com/smeltery/convrt">convrt</Link>. Both are copyright 2026 Smeltery and
        distributed under the PolyForm Shield license.
      </p>
      <p>
        GitHub, Claude, and OpenAI marks identify their respective integrations and remain the property of their owners.
        Their use does not imply endorsement.
      </p>
      <Link href="https://github.com/smeltery/prr/blob/master/LICENSE">Read the project license</Link>
    </main>
  );
}
