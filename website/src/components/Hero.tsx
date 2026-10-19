import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Terminal } from "lucide-react";

export function Hero() {
  return (
    <section className="hero wrap">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="status-dot" />
          AI code review, right in your terminal
        </p>
        <h1>
          Catch bugs
          <br />
          <em>before you merge.</em>
        </h1>
        <p className="lead">
          Review GitHub PRs and local branches with AI. Find risky changes, verify the findings, and decide what gets
          posted.
        </p>
        <div className="hero-actions">
          <Link className="button" href="/docs/installation">
            Review your first PR
          </Link>
          <Link className="text-link" href="#review-preview">
            See a sample review
          </Link>
        </div>
        <div className="hero-platforms">
          <span>
            <Image src="/brands/apple.svg" width={14} height={14} alt="" /> macOS
          </span>
          <span>
            <Image src="/brands/linux.svg" width={14} height={14} alt="" /> Linux
          </span>
          <span>No automatic posting.</span>
        </div>
        <div className="agent-strip" aria-label="Supported tools">
          <span>YOUR CODE. YOUR AI. ONE WORKFLOW.</span>
          <div className="hero-brands">
            {[
              ["GitHub", "github", "reviews"],
              ["Git", "git", "reviews"],
              ["Claude", "claude", "agents"],
              ["Codex / OpenAI", "chatgpt", "agents"],
            ].map(([name, icon, page]) => (
              <Link href={`/docs/${page}`} key={name}>
                <Image src={`/brands/${icon}.svg`} alt="" width={22} height={22} />
                {name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div id="review-preview" className="review-scene" aria-label="Illustrative review output">
        <div className="scene-label">
          <span className="status-dot" />
          ONE COMMAND. VERIFIED FINDINGS.
        </div>
        <div className="terminal">
          <div className="terminal-top">
            <span className="window-dots">● ● ●</span>
            <span>~/projects/your-next-idea</span>
            <Terminal size={14} />
          </div>
          <div className="terminal-body">
            <p>
              <span className="terminal-prompt">❯</span> prr 128
            </p>
            <p className="terminal-muted">Reading pull request #128…</p>
            <p className="terminal-muted">Gathering codebase context…</p>
            <p>
              <span className="terminal-success">✓</span> Review complete
            </p>
            <div className="terminal-summary">
              <span>1 critical</span>
              <span>2 suggestions</span>
              <span>1 praise</span>
            </div>
          </div>
        </div>
        <div className="review-note">
          <div className="note-header">
            <span className="severity">Critical</span>
            <code>auth/session.go : 42</code>
          </div>
          <h2>Expired sessions can get fresh tokens.</h2>
          <p>
            An expired session can reach the refresh path. Validate <code>ExpiresAt</code> before issuing a new token.
          </p>
          <div className="note-foot">
            <ShieldCheck size={14} /> Verified against the diff <span>Illustrative output</span>
          </div>
        </div>
        <div className="scene-caption">
          <span className="scene-line" /> Find the risk. Understand the fix.
        </div>
      </div>
    </section>
  );
}
