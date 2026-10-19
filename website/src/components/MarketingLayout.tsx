"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, Search } from "lucide-react";
import { MobileMenuContent } from "./MobileMenu";
import { Brand, GitHub } from "./Brand";

import { SearchPanel } from "./SearchPanel";

export function MarketingNav() {
  const mobile = useRef<HTMLDialogElement>(null);
  const search = useRef<HTMLDialogElement>(null);
  const [searchSession, setSearchSession] = useState(0);
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
    setSearchSession((session) => session + 1);
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
        <SearchPanel key={searchSession} close={close} />
      </dialog>
    </>
  );
}
