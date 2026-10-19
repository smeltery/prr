import Link from "next/link";
import { Brand } from "./Brand";

export function MarketingFooter() {
  const groups = [
    [
      "The workflow",
      ["Review changes", "/docs/reviews"],
      ["Choose an agent", "/docs/agents"],
      ["Explore findings", "/docs/output"],
    ],
    [
      "Resources",
      ["Brand & assets", "/brand"],
      ["For agents", "/llms.txt"],
      ["Getting started", "/docs/installation"],
      ["How prr works", "/docs"],
      ["Contributing", "/docs/development"],
    ],
    [
      "In the open",
      ["About Smeltery", "https://github.com/smeltery"],
      ["GitHub repository", "https://github.com/smeltery/prr"],
      ["Feedback & issues", "https://github.com/smeltery/prr/issues"],
      ["Credits & acknowledgments", "/credits"],
    ],
  ];
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <Brand />
            <p>
              A second look.
              <br />A better change.
            </p>
            <span>Thoughtful code review, right in your terminal.</span>
          </div>
          {groups.map(([title, ...links]) => (
            <nav key={String(title)} aria-label={`Footer ${title}`}>
              <h2>{title}</h2>
              {links.map(([label, href]) => (
                <Link key={href} href={href}>
                  {label}
                </Link>
              ))}
            </nav>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© 2026 Smeltery</span>
          <Link href="https://github.com/smeltery/prr/blob/master/LICENSE">PolyForm Shield license</Link>
          <span className="footer-note">Built for the way you work.</span>
          <Link href="#top">Back to top ↑</Link>
        </div>
      </div>
    </footer>
  );
}
