"use client";
import { useState } from "react";

export function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [status, setStatus] = useState(label);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("Copied");
    } catch {
      setStatus("Copy unavailable — select text");
    }
    setTimeout(() => setStatus(label), 2500);
  }
  return (
    <button onClick={copy} aria-live="polite">
      {status}
    </button>
  );
}
