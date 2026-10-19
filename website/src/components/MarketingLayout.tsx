"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { BookOpen, Menu, Search, X } from "lucide-react";
import { MobileMenuContent } from "./MobileMenu";
import { Brand, GitHub } from "./Brand";

import { pages } from "@/lib/navigation";

export function MarketingNav() {
  const mobile = useRef<HTMLDialogElement>(null);
  const search = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  function unlock() {
    setMenuOpen(false);
  }
  function close() {
    mobile.current?.close();
    search.current?.close();
    unlock();
  }
  function openSearch() {
    document.querySelectorAll<HTMLDialogElement>("dialog[open]").forEach((dialog) => dialog.close());
    setMenuOpen(false);
    search.current?.showModal();
  }
  useEffect(() => {
    function shortcut(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        openSearch();
      }
    }
    document.addEventListener("keydown", shortcut);
    return () => {
      document.removeEventListener("keydown", shortcut);
    };
  }, []);
  useEffect(() => {
    mobile.current?.close();
    search.current?.close();
    setMenuOpen(false);
  }, [pathname]);
  const results = pages.filter((page) => page.join(" ").toLowerCase().includes(query.toLowerCase()));
  return (
    <>
      <header className="site-header">
        <div className="wrap header-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Main navigation">
            <Link href="/#features">Explore prr</Link>
            <Link href="/docs/installation" aria-current={pathname === "/docs/installation" ? "page" : undefined}>
              Getting started
            </Link>
            <Link href="/docs" aria-current={pathname === "/docs" ? "page" : undefined}>
              Documentation
            </Link>
          </nav>
          <button
            className="header-search-trigger"
            onClick={openSearch}
            aria-haspopup="dialog"
            aria-controls="site-search"
            aria-label="Search ⌘ K documentation"
          >
            <Search size={18} />
            <span>Search</span>
            <kbd aria-hidden="true">⌘ K</kbd>
          </button>
          <Link className="github-link" href="https://github.com/smeltery/prr">
            <GitHub />
            <span>GitHub</span>
          </Link>
          <button
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-haspopup="dialog"
            onClick={() => {
              mobile.current?.showModal();
              setMenuOpen(true);
            }}
          >
            Menu <Menu size={18} />
          </button>
        </div>
      </header>
      <dialog
        ref={mobile}
        id="mobile-menu"
        className="mobile-dialog"
        aria-labelledby="mobile-title"
        onClose={unlock}
        onCancel={unlock}
      >
        <MobileMenuContent close={close} openSearch={openSearch} />
      </dialog>
      <dialog
        ref={search}
        id="site-search"
        className="search-dialog"
        aria-labelledby="search-title"
        onClose={unlock}
        onCancel={unlock}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="overlay-heading">
          <div>
            <p className="eyebrow">prr documentation</p>
            <h2 id="search-title">Find your next step.</h2>
          </div>
          <button className="close-overlay" onClick={close} aria-label="Close search">
            <X size={18} />
          </button>
        </div>
        <label className="panel-search">
          <Search size={18} />
          <span className="sr-only">Search documentation</span>
          <input
            autoFocus
            type="search"
            placeholder="Reviews, agents, configuration…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <div className="search-results-scroll">
          <p className="search-section-title" role="status">
            {results.length} results
          </p>
          {results.map(([title, slug, description]) => (
            <Link className="search-result" key={slug} href={`/docs/${slug}`} onClick={close}>
              <BookOpen size={20} />
              <span>
                <strong>{title}</strong>
                <small>{description}</small>
              </span>
            </Link>
          ))}
          {!results.length && <p className="empty-search">No matches. Try “agents” or “review”.</p>}
        </div>
      </dialog>
    </>
  );
}
