import { ReviewScenarios, AgentChoice, SavedReviews, HomeQuestions } from "@/components/HomeDetails";
import { Closing } from "@/components/Closing";
import Link from "next/link";
import { GitPullRequest, ShieldCheck, FolderGit2, MessagesSquare, FileText, Terminal } from "lucide-react";
import { Hero } from "@/components/Hero";
import { CopyButton } from "@/components/CopyButton";

export default function Page() {
  return (
    <main id="main">
      <Hero />
      <section id="features" className="section wrap">
        <div className="section-heading">
          <p className="eyebrow">Thoughtful by design</p>
          <h2>
            A review that fits
            <br />
            the way you build.
          </h2>
          <p>
            No new dashboard to adopt. No bot to invite.
            <br />
            Just useful feedback, where your work happens.
          </p>
        </div>
        <div className="feature-grid">
          {[
            [
              GitPullRequest,
              "Any change. Any stage.",
              "Review a GitHub PR by number or URL, or compare local branches before you open one.",
            ],
            [
              ShieldCheck,
              "A second pass on the first.",
              "Verification checks findings against the diff and source, dropping inaccurate comments by default.",
            ],
            [
              FolderGit2,
              "Context beyond the diff.",
              "Nearby files help your agent understand the patterns and conventions already in your codebase.",
            ],
            [
              MessagesSquare,
              "Your choice of perspective.",
              "Use Claude or Codex, connect an API provider, or ask every configured agent for a review.",
            ],
            [
              FileText,
              "Findings you can work with.",
              "Readable Markdown, organized by severity and file. Browse locally, compare runs, and ask follow-up questions.",
            ],
            [
              Terminal,
              "You decide what gets posted.",
              "Reviews stay in local files until you explicitly post them. Keep the final judgment in your hands.",
            ],
          ].map(([Icon, title, body]) => {
            const Symbol = Icon as typeof Terminal;
            return (
              <article key={String(title)}>
                <Symbol size={24} strokeWidth={1.5} />
                <h3>{String(title)}</h3>
                <p>{String(body)}</p>
              </article>
            );
          })}
        </div>
      </section>
      <ReviewScenarios />
      <section id="how-it-works" className="workflow-section">
        <div className="wrap">
          <div className="section-heading">
            <p className="eyebrow">From diff to decision</p>
            <h2>
              One command.
              <br />
              <em>A clearer next step.</em>
            </h2>
          </div>
          <div className="steps">
            {[
              [
                "01",
                "Point at a change",
                "A PR number, a GitHub URL, or a local branch. prr gathers the diff and surrounding context.",
                "prr 128",
              ],
              [
                "02",
                "Get another perspective",
                "Your chosen agent reviews the code. Verification checks the findings before they reach you.",
                "prr 128 --agent codex-cli",
              ],
              [
                "03",
                "Make the call",
                "Read the findings, ask a follow-up, and post when you’re ready. The review is yours.",
                "prr serve --open",
              ],
            ].map(([number, title, body, code]) => (
              <article key={number}>
                <span className="step-number">{number}</span>
                <h3>{title}</h3>
                <p>{body}</p>
                <code>{code}</code>
              </article>
            ))}
          </div>
        </div>
      </section>
      <AgentChoice />
      <SavedReviews />
      <section id="quick-start" className="section wrap quick-start">
        <div>
          <p className="eyebrow">Less setup. More perspective.</p>
          <h2>
            Your next review
            <br />
            starts here.
          </h2>
          <p className="lead">Install prr, authenticate your agent, and give your next change a second look.</p>
          <Link className="text-link" href="/docs/installation">
            Read the installation guide
          </Link>
        </div>
        <div className="install-code">
          <div className="code-heading">
            <span>TERMINAL</span>
            <CopyButton text={"go install github.com/smeltery/prr@latest\nprr agents\nprr"} />
          </div>
          <pre>
            <code>
              <span># Install with Go</span>
              {"\n"}go install github.com/smeltery/prr@latest{"\n\n"}
              <span># Check your agents, then review</span>
              {"\n"}prr agents{"\n"}prr
            </code>
          </pre>
          <p>Requires Go, GitHub CLI for PRs, and a configured agent.</p>
        </div>
      </section>
      <HomeQuestions />
      <Closing />
    </main>
  );
}
