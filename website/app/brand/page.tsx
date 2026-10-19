import Link from "next/link";
import Image from "next/image";
import { BrandPalette } from "@/components/BrandPalette";
import "@/styles/brand.css";
export const metadata = {
  title: "Brand & assets",
  description: "The prr identity: a review mark, colors, typography and downloadable assets.",
};

export default function BrandPage() {
  return (
    <main id="main" className="brand-page wrap">
      <header className="intro">
        <p className="eyebrow">prr / Brand &amp; assets</p>
        <h1>
          A second look.
          <br />
          <em>A little character.</em>
        </h1>
        <p className="lede">
          The pieces that make prr feel like prr. For your next README, project mention, or introduction to a more
          thoughtful code review.
        </p>
        <Link className="button" href="#downloads">
          Get the assets
        </Link>
      </header>
      <section aria-labelledby="mark-title">
        <p className="eyebrow">01 / The mark</p>
        <h2 id="mark-title">
          One small mark. <em>A clearer signal.</em>
        </h2>
        <p className="lede">
          Three commit nodes form a P-shaped branch graph. A Git-inspired mark for prr and the changes you review before
          they merge. Keep its original colors and proportions, with room around it.
        </p>
        <div className="marks">
          <figure className="mark-preview">
            <Image src="/logo.svg" alt="prr P-shaped Git branch and commit mark" width={150} height={150} />
            <figcaption>Original mark</figcaption>
          </figure>
          <figure className="signature-preview">
            <div className="signature">
              <Image src="/logo.svg" alt="" width={56} height={56} />
              <span>
                prr<span className="signature-sub"> / smeltery</span>
              </span>
            </div>
            <figcaption>The project signature</figcaption>
          </figure>
        </div>
      </section>
      <section aria-labelledby="social-title">
        <p className="eyebrow">02 / The first impression</p>
        <h2 id="social-title">
          A fresh perspective. <em>Worth sharing.</em>
        </h2>
        <p className="lede">
          Our social preview brings the review workflow into one image. Use the original PNG for link previews and
          project introductions.
        </p>
        <figure className="social">
          <Image
            src="/og.png"
            alt="prr: Catch bugs before you merge. A terminal review and a verified finding on charcoal."
            width={1200}
            height={630}
          />
        </figure>
      </section>
      <section aria-labelledby="color-title">
        <p className="eyebrow">03 / Color</p>
        <h2 id="color-title">
          Quiet colors. <em>Clear intent.</em>
        </h2>
        <p className="lede">
          Charcoal, warm ivory, and a touch of celadon. Use ivory on dark surfaces and charcoal on the accent. Reserve
          color for guidance, useful emphasis, and review status.
        </p>
        <BrandPalette />
      </section>
      <section aria-labelledby="type-title">
        <p className="eyebrow">04 / Typography</p>
        <h2 id="type-title">
          A useful voice. <em>A human touch.</em>
        </h2>
        <div className="type-list">
          <article>
            <p className="eyebrow">DM Sans / Interface</p>
            <p className="sample">A second look. A better change.</p>
            <p className="fine">Our everyday voice for headings, navigation, and comfortable reading.</p>
          </article>
          <article>
            <p className="eyebrow">Georgia / Emphasis</p>
            <p className="sample">
              <em>Good code deserves a second look.</em>
            </p>
            <p className="fine">A softer accent for a few well-chosen words.</p>
          </article>
          <article>
            <p className="eyebrow">System monospace / Code</p>
            <p className="sample mono">prr --base main</p>
            <p className="fine">Commands and technical details, set in your platform’s familiar monospace.</p>
          </article>
        </div>
      </section>
      <section id="downloads" aria-labelledby="downloads-title">
        <p className="eyebrow">05 / The toolkit</p>
        <h2 id="downloads-title">
          Ready for <em>your next mention.</em>
        </h2>
        <p className="lede">
          Download the original files, individually. Use them to identify prr and link back to the project.
        </p>
        <ul className="downloads">
          {[
            ["Vector mark", "SVG · original colors · scalable", "/logo.svg"],
            ["Social preview", "PNG · 1200 × 630", "/og.png"],
            ["Browser icon", "PNG · 32 × 32", "/favicon.png"],
          ].map(([title, detail, href]) => (
            <li key={title}>
              <div>
                <h3>{title}</h3>
                <p className="fine">{detail}</p>
              </div>
              <a className="download-link" href={href} download aria-label={`Download ${title}`}>
                Download
              </a>
            </li>
          ))}
        </ul>
        <aside className="guidance">
          <h3>A little care goes a long way.</h3>
          <p>
            Use “prr” in lowercase and keep the mark intact. Leave clear space around it, avoid stretching or
            recoloring, and choose a simple background. These assets identify the project; they don’t imply endorsement.
          </p>
        </aside>
      </section>
    </main>
  );
}
