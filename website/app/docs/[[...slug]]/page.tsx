import { DocsSidebar } from "@/components/DocsSidebar";
import Link from "next/link";
import { notFound } from "next/navigation";
import { catalog, getDoc } from "@/lib/docs";
import { DocActions } from "@/components/DocActions";
import { DocEnhancements } from "@/components/DocEnhancements";
import "@/styles/docs.css";
import "@/styles/docs-extra.css";

type Props = { params: Promise<{ slug?: string[] }> };
export function generateStaticParams() {
  return catalog.map(([, slug]) => ({ slug: slug ? [slug] : [] }));
}
export async function generateMetadata({ params }: Props) {
  const doc = getDoc((await params).slug?.join("/") || "");
  return {
    title: doc ? `${doc.title} — Documentation` : "Page not found",
    description: doc?.markdown.split("\n\n")[1],
  };
}
export default async function DocsPage({ params }: Props) {
  const slug = (await params).slug?.join("/") || "";
  const doc = getDoc(slug);
  if (!doc) notFound();
  const index = catalog.findIndex((item) => item[1] === slug);
  const toc = (
    <>
      {doc.headings.map((heading) => (
        <Link key={heading.id} href={`#${heading.id}`}>
          {heading.title}
        </Link>
      ))}
    </>
  );
  return (
    <div className="docs-layout">
      <DocsSidebar catalog={catalog} slug={slug} />
      <main className="docs-main" id="main">
        <details className="mobile-toc">
          <summary>On this page</summary>
          <nav>{toc}</nav>
        </details>
        <p className="eyebrow">{doc.group}</p>
        <article className="doc-content" dangerouslySetInnerHTML={{ __html: doc.html }} />
        <DocEnhancements key={slug} />
        <div className="mobile-doc-actions">
          <DocActions markdown={doc.markdown} file={doc.file} />
        </div>
        <nav className="docs-pagination" aria-label="Adjacent documentation">
          {index > 0 && (
            <Link href={`/docs/${catalog[index - 1][1]}`}>
              <small>Previous</small>
              {catalog[index - 1][0]}
            </Link>
          )}
          {index < catalog.length - 1 && (
            <Link href={`/docs/${catalog[index + 1][1]}`}>
              <small>Next</small>
              {catalog[index + 1][0]}
            </Link>
          )}
        </nav>
      </main>
      <aside className="docs-toc" aria-label="Page contents and actions">
        <p>ON THIS PAGE</p>
        <nav aria-label="On this page">{toc}</nav>
        <DocActions markdown={doc.markdown} file={doc.file} />
      </aside>
    </div>
  );
}
