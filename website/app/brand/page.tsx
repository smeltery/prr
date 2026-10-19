import Link from "next/link";
import Image from "next/image";
export const metadata = { title: "Brand & assets" };
export default function BrandPage() {
  return (
    <main id="main" className="wrap simple-page">
      <p className="eyebrow">The prr identity</p>
      <h1>
        A mark for a<br />
        second look.
      </h1>
      <p>
        The prr mark pairs a Git branch with a review check. Use it to identify the project without implying an
        endorsement.
      </p>
      <Image src="/logo.svg" alt="prr branch and check mark" width={120} height={120} />
      <p>
        <Link href="/logo.svg" download>
          Download the SVG logo
        </Link>{" "}
        ·{" "}
        <Link href="/og.png" download>
          Download the social image
        </Link>
      </p>
      <p>Dark slate #1a1d29 · Cream #fefdfb · Amber #f59e0b</p>
    </main>
  );
}
