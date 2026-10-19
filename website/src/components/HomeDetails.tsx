import Link from "next/link";
import Image from "next/image";
import { CopyButton } from "./CopyButton";

export function ReviewScenarios() {
  const scenarios = [
    [
      "Before the pull request",
      "Catch it while it’s still local.",
      "Compare your branch against main and take another pass before you ask the team for one.",
      "prr --base main",
    ],
    [
      "When the diff gets interesting",
      "Give the tricky parts more attention.",
      "Focus on security, performance, or testing. Let nearby files provide the context a diff alone can miss.",
      "prr 128 --focus security,testing",
    ],
    [
      "Before you hit merge",
      "Check the feedback, too.",
      "Verify each finding against the source. Keep disputed comments with annotations when you want to inspect the reasoning.",
      "prr 128 --verify-action annotate",
    ],
  ];
  return (
    <section id="use-cases" className="section wrap scenarios">
      <div className="section-heading">
        <p className="eyebrow">A useful pause, anywhere in your day</p>
        <h2>
          From your first diff
          <br />
          to the <em>final review.</em>
        </h2>
      </div>
      <div>
        {scenarios.map(([label, title, body, command], i) => (
          <article key={label}>
            <span className="scenario-number">0{i + 1}</span>
            <div>
              <p className="eyebrow">{label}</p>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
            <code>{command}</code>
          </article>
        ))}
      </div>
    </section>
  );
}

export function AgentChoice() {
  return (
    <section className="agent-choice section">
      <div className="wrap split-section">
        <div className="section-heading">
          <p className="eyebrow">Familiar tools. Another perspective.</p>
          <h2>
            Your agents.
            <br />
            <em>On your terms.</em>
          </h2>
          <p>
            Use the CLI sessions you already have, or connect directly with your own API keys. Choose one reviewer, or
            compare perspectives from every configured agent.
          </p>
          <Link href="/docs/agents" className="text-link">
            Find your agent setup
          </Link>
        </div>
        <div className="provider-list">
          {[
            ["claude", "Claude", "Your Claude CLI session or Anthropic API key", "claude-cli"],
            ["chatgpt", "Codex & OpenAI", "Your Codex CLI session or OpenAI API key", "codex-cli"],
          ].map(([icon, title, body, agent]) => (
            <article key={agent}>
              <Image src={`/brands/${icon}.svg`} width={30} height={30} alt="" />
              <div>
                <h3>{title}</h3>
                <p>{body}</p>
                <code>prr 128 --agent {agent}</code>
              </div>
            </article>
          ))}
          <p className="provider-note">
            Provider accounts and usage are separate. <Link href="/docs/agents">See authentication details.</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export function SavedReviews() {
  return (
    <section className="section wrap split-section saved-reviews">
      <div className="review-files">
        <div className="code-heading">
          <span>YOUR REVIEW, ON DISK</span>
          <span>Markdown</span>
        </div>
        <pre>{`pr-128/\n├── summary.md\n├── critical/\n│   └── auth-session-go.md\n├── suggestion/\n│   └── api-handler-go.md\n└── praise/\n    └── cache-store-go.md`}</pre>
        <div className="saved-command">
          <code>prr serve --open</code>
          <CopyButton text="prr serve --open" />
        </div>
      </div>
      <div className="section-heading">
        <p className="eyebrow">The review is just the beginning</p>
        <h2>
          Feedback you can
          <br />
          <em>come back to.</em>
        </h2>
        <p>
          Keep the summary and findings as readable files. Browse them in the embedded review UI, compare two runs, or
          ask a follow-up before deciding what to share.
        </p>
        <ul className="review-followups">
          <li>
            <code>prr ask</code>
            <span>Explore the reasoning behind a finding.</span>
          </li>
          <li>
            <code>prr diff</code>
            <span>See what changed between two reviews.</span>
          </li>
          <li>
            <code>prr post --dry-run</code>
            <span>Preview exactly what you’ll send to GitHub.</span>
          </li>
        </ul>
        <Link href="/docs/output" className="text-link">
          Explore review output
        </Link>
      </div>
    </section>
  );
}

export function HomeQuestions() {
  const questions = [
    [
      "Does prr post comments automatically?",
      "No. A review writes local Markdown files. You decide when to post with prr post, and can preview the payload first with --dry-run.",
    ],
    [
      "Can I review code without a GitHub pull request?",
      "Yes. Use prr --base main to review a local branch. Git is required for local comparisons; GitHub CLI is only required for PR workflows.",
    ],
    [
      "Does my code stay on my machine?",
      "Review files stay local, but the selected AI provider receives the diff and supplied context. prr is not an offline review engine. Choose a provider and account appropriate for your repository.",
    ],
    [
      "Do I need a new API subscription?",
      "CLI integrations use your existing authenticated Claude or Codex CLI. Direct API integrations use your own provider key. Account access and usage charges are controlled by the provider.",
    ],
    [
      "Can I trust every finding?",
      "Verification is enabled by default and checks findings against the source. It helps catch inaccurate comments, but AI feedback still needs your judgment.",
    ],
  ];
  return (
    <section className="section wrap faq-section">
      <div className="section-heading">
        <p className="eyebrow">Before your first review</p>
        <h2>
          A few things
          <br />
          <em>worth knowing.</em>
        </h2>
        <Link href="/docs/troubleshooting" className="text-link">
          More help in the docs
        </Link>
      </div>
      <div>
        {questions.map(([question, answer]) => (
          <details key={question}>
            <summary>
              {question}
              <span aria-hidden="true">+</span>
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
