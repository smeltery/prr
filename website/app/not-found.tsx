import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="wrap simple-page">
      <p className="eyebrow">404 · Page not found</p>
      <h1>A small detour.</h1>
      <p>That page doesn’t exist. The documentation is a good place to pick things up.</p>
      <Link className="button" href="/docs">
        Browse documentation
      </Link>
    </main>
  );
}
