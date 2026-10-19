"use client";
import { useState } from "react";
import Image from "next/image";

const paths = {
  copy: "M9 8h11v13H9zM5 16H3V3h12v2",
  up: "m5 10 7-7 7 7M12 3v18",
  chat: "M4 4h16v13H9l-5 4z",
  arrow: "M14 3h7v7m0-7L10 14M10 4H3v17h17v-7",
};
function Icon({ name }: { name: keyof typeof paths }) {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}
const providers = [
  ["ChatGPT", "chatgpt", "https://chatgpt.com/?prompt="],
  ["Claude", "claude", "https://claude.ai/new?q="],
  ["v0", "v0", "https://v0.app/?q="],
  ["T3 Chat", "t3-chat", "https://t3.chat/new?q="],
  ["Scira", "scira", "https://scira.ai/?q="],
  ["Cursor", "cursor", "https://cursor.com/link/prompt?text="],
];
export function DocActions({ markdown, file }: { markdown: string; file: string }) {
  const [status, setStatus] = useState("Copy as Markdown");
  const [fallback, setFallback] = useState(false);
  const prompt = encodeURIComponent(`Help me use prr based on this documentation:\n\n${markdown}`);
  async function copy() {
    try {
      await navigator.clipboard.writeText(markdown);
      setStatus("Markdown copied");
      setFallback(false);
    } catch {
      setFallback(true);
      setStatus("Select Markdown below");
    }
  }
  return (
    <div className="doc-actions">
      <a href={`https://github.com/smeltery/prr/edit/master/docs/${file}`} target="_blank" rel="noreferrer">
        <Image src="/brands/github.svg" width={19} height={19} alt="" />
        Edit on GitHub
      </a>
      <button
        type="button"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
          })
        }
      >
        <Icon name="up" />
        Scroll to top
      </button>
      <button type="button" onClick={copy} aria-live="polite">
        <Icon name="copy" />
        {status}
      </button>
      {fallback && (
        <textarea readOnly aria-label="Page Markdown" value={markdown} onFocus={(event) => event.target.select()} />
      )}
      <details>
        <summary>
          <Icon name="chat" />
          Open in chat
          <span className="action-chevron" aria-hidden="true">
            ⌄
          </span>
        </summary>
        <div className="chat-providers">
          {providers.map(([name, icon, url]) => (
            <a key={name} href={url + prompt} target="_blank" rel="noreferrer">
              <Image src={`/brands/${icon}.svg`} width={19} height={19} alt="" />
              <span>{name}</span>
              <Icon name="arrow" />
            </a>
          ))}
        </div>
        <p className="chat-note">Opens with this page’s documentation in the prompt.</p>
      </details>
    </div>
  );
}
