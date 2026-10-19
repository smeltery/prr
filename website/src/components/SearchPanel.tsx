"use client";
import Link from "next/link";
import "@/styles/search.css";
import { useRef, useState, useId, type KeyboardEvent } from "react";
import { Search as SearchIcon, X, BookOpen, Code2 } from "lucide-react";
import { pages } from "@/lib/navigation";

const entries = [
  {
    title: "Brand & assets",
    description: "prr logos, colors, typography, and social artwork.",
    url: "/brand",
    kind: "Guide",
  },
  ...pages.map(([title, slug, description]) => ({
    title,
    description,
    url: `/docs/${slug}`,
    kind: ["commands", "configuration"].includes(slug) ? "Reference" : "Guide",
  })),
];
export function SearchPanel({ close }: { close: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const id = useId();
  const [query, setQuery] = useState("");
  const [scope, setScope] = useState("Everything");
  const search = query.toLowerCase().trim();
  const results =
    !search && scope === "Everything"
      ? [entries[0], entries[2], entries[3], entries[7], entries[4], entries[6]]
      : entries.filter(
          (entry) =>
            (scope === "Everything" || scope === entry.kind) &&
            `${entry.title} ${entry.description} ${entry.url}`.toLowerCase().includes(search),
        );
  function navigateResults(event: KeyboardEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement;
    if (target !== input.current && !target.closest(".search-result")) return;
    const links = [...(root.current?.querySelectorAll<HTMLAnchorElement>(".search-result") || [])];
    if (!links.length) return;
    const current = links.indexOf(target as HTMLAnchorElement);
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const next =
        event.key === "ArrowDown"
          ? (current + 1) % links.length
          : current < 0
            ? links.length - 1
            : (current + links.length - 1) % links.length;
      links[next].focus();
      links[next].scrollIntoView({ block: "nearest" });
    } else if (event.key === "Enter" && target === input.current) {
      event.preventDefault();
      links[0].click();
    }
  }
  return (
    <div className="search-panel" ref={root} onKeyDown={navigateResults}>
      <div className="overlay-heading">
        <div>
          <p className="eyebrow">The prr library</p>
          <h2 id="search-title">Find your next step.</h2>
        </div>
        <button className="close-overlay" onClick={() => close()} aria-label="Close search">
          <X />
        </button>
      </div>
      <div className="panel-search">
        <SearchIcon size={20} />
        <label className="sr-only" htmlFor={`${id}-input`}>
          Search documentation
        </label>
        <input
          id={`${id}-input`}
          ref={input}
          aria-controls={`${id}-results`}
          autoComplete="off"
          spellCheck={false}
          autoFocus
          type="search"
          placeholder="Search docs, commands, or guides…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        {query && (
          <button
            className="clear-search"
            aria-label="Clear search"
            onClick={() => {
              setQuery("");
              input.current?.focus();
            }}
          >
            <X size={16} />
          </button>
        )}
      </div>
      <div className="search-scopes" role="group" aria-label="Search within">
        {["Everything", "Guide", "Reference"].map((kind) => (
          <button key={kind} aria-pressed={scope === kind} onClick={() => setScope(kind)}>
            {kind === "Guide" ? "Guides" : kind}
          </button>
        ))}
      </div>
      <div className="search-results-scroll">
        <p className="search-section-title" role="status">
          {!search && scope === "Everything"
            ? "Good places to start"
            : `${results.length} ${results.length === 1 ? "result" : "results"}`}
        </p>
        <nav id={`${id}-results`} aria-label="Search results">
          {results.map(({ title, description, kind, url }) => (
            <Link key={url} className="search-result" href={url} onClick={() => close()}>
              <span className="result-icon">
                {kind === "Reference" ? (
                  <Code2 size={20} aria-hidden="true" />
                ) : (
                  <BookOpen size={20} aria-hidden="true" />
                )}
              </span>
              <span className="result-copy">
                <strong>{title}</strong>
                <small>{description}</small>
              </span>
              <span className="result-kind">{kind}</span>
            </Link>
          ))}
        </nav>
        {!results.length && (
          <div className="empty-state">
            <h3>No matches.</h3>
            <p>Try “agents”, “review”, or “install”.</p>
            <button
              onClick={() => {
                setQuery("");
                setScope("Everything");
                input.current?.focus();
              }}
            >
              Reset search
            </button>
          </div>
        )}
      </div>
      <footer className="search-footer">
        <span>Docs and guides, one search away.</span>
        <div aria-label="Keyboard shortcuts">
          {[
            ["↑ ↓", "Move"],
            ["↵", "Open"],
            ["esc", "Close"],
          ].map(([key, action]) => (
            <span key={action}>
              <kbd>{key}</kbd> {action}
            </span>
          ))}
        </div>
      </footer>
    </div>
  );
}
