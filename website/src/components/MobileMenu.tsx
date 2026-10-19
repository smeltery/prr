import Link from "next/link";
import { BookOpen, Search, X, GitPullRequest, Settings, Terminal, ShieldCheck } from "lucide-react";
import { Brand, GitHub } from "./Brand";

export function MobileMenuContent({ close, openSearch }: { close: () => void; openSearch: () => void }) {
  return (
    <>
      <div className="mobile-panel-heading">
        <Brand />
        <button className="close-overlay" onClick={close} aria-label="Close navigation" autoFocus>
          <X size={18} />
        </button>
      </div>
      <div className="mobile-panel-body">
        <p className="eyebrow">A little perspective goes a long way</p>
        <h2 id="mobile-title">What’s next?</h2>
        <button className="mobile-search-trigger" onClick={openSearch}>
          <Search size={18} />
          <span>Search docs &amp; guides</span>
          <kbd aria-hidden="true">⌘ K</kbd>
        </button>
        <nav className="mobile-primary" aria-label="Mobile navigation">
          <Link className="mobile-feature-card" href="/#features" onClick={close}>
            <span className="nav-card-icon">
              <GitPullRequest size={20} />
            </span>
            <span>
              <strong>Explore prr</strong>
              <small>A second look at your next change.</small>
            </span>
          </Link>
          <div className="mobile-resource-grid">
            <Link href="/docs/installation">
              <BookOpen size={20} />
              <strong>Getting started</strong>
              <small>From install to your first review.</small>
            </Link>
            <Link href="/docs">
              <ShieldCheck size={20} />
              <strong>Documentation</strong>
              <small>A thoughtful review, step by step.</small>
            </Link>
          </div>
        </nav>
        <section className="mobile-tasks" aria-labelledby="mobile-tasks-title">
          <div className="mobile-section-label">
            <h3 id="mobile-tasks-title">Browse by task</h3>
            <span>Start with an outcome</span>
          </div>
          <nav aria-label="Review tasks">
            {[
              [GitPullRequest, "Review changes", "reviews"],
              [Settings, "Configure agents", "agents"],
              [BookOpen, "Explore findings", "output"],
              [Terminal, "Build with Flox", "development"],
            ].map(([Icon, title, slug]) => {
              const Symbol = Icon as typeof Terminal;
              return (
                <Link key={String(slug)} href={`/docs/${slug}`}>
                  <span className="nav-card-icon">
                    <Symbol size={18} />
                  </span>
                  <span>{String(title)}</span>
                </Link>
              );
            })}
          </nav>
        </section>
        <aside className="mobile-starter">
          <p className="eyebrow">Not sure where to begin?</p>
          <h3>Your next PR is a good start.</h3>
          <p>Install prr, choose your agent, and get a fresh perspective on your code.</p>
          <Link href="/docs/installation">Run your first review</Link>
        </aside>
      </div>
      <div className="mobile-panel-footer">
        <Link className="icon-link" href="https://github.com/smeltery/prr">
          <GitHub /> GitHub
        </Link>
        <Link href="https://github.com/smeltery/prr/issues">Feedback &amp; issues</Link>
        <span className="mobile-footer-note">Made to fit your day.</span>
      </div>
    </>
  );
}
