"use client";
import Link from "next/link";
import { useRef } from "react";
import { Menu, X } from "lucide-react";

export function DocsSidebar({ catalog, slug }: { catalog: string[][]; slug: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  function close() {
    dialog.current?.close();
  }
  const navigation = (
    <nav aria-label="Documentation pages">
      {catalog.map(([title, route, group], index) => (
        <div key={route}>
          {(index === 0 || catalog[index - 1][2] !== group) && <p>{group}</p>}
          <Link href={`/docs/${route}`} onClick={close} aria-current={slug === route ? "page" : undefined}>
            {title}
          </Link>
        </div>
      ))}
    </nav>
  );
  return (
    <>
      <aside className="docs-sidebar desktop-sidebar" aria-label="Documentation sidebar">
        {navigation}
        <Link className="docs-home" href="/">
          Back to prr
        </Link>
      </aside>
      <div className="docs-mobile-navigation">
        <button
          onClick={() => {
            dialog.current?.showModal();
          }}
          aria-haspopup="dialog"
          aria-controls="docs-menu"
        >
          <Menu size={17} /> Documentation
        </button>
      </div>
      <dialog
        ref={dialog}
        id="docs-menu"
        className="docs-mobile-panel docs-sidebar"
        aria-label="Documentation navigation"
        onClose={close}
        onCancel={close}
      >
        <div className="docs-panel-heading">
          <strong>Documentation</strong>
          <button aria-label="Close documentation navigation" onClick={close}>
            <X size={18} />
          </button>
        </div>
        {navigation}
      </dialog>
    </>
  );
}
