import Link from "next/link";

export function Closing() {
  return (
    <section className="closing wrap">
      <p className="eyebrow">Keep your flow. Find your blind spots.</p>
      <h2>
        Ship with a little
        <br />
        <em>more confidence.</em>
      </h2>
      <Link className="button" href="/docs/installation">
        Get started with prr
      </Link>
    </section>
  );
}
