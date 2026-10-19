"use client";
import { useEffect } from "react";

export function DocEnhancements() {
  useEffect(() => {
    const cleanups: (() => void)[] = [];
    document.querySelectorAll<HTMLElement>(".doc-content .code-block").forEach((block) => {
      const text = block.querySelector("code")?.textContent || "";
      const button = document.createElement("button");
      button.textContent = "Copy";
      button.className = "copy-code";
      button.setAttribute("aria-label", "Copy code");
      const copy = async () => {
        try {
          await navigator.clipboard.writeText(text);
          button.textContent = "Copied";
        } catch {
          button.textContent = "Select text to copy";
        }
      };
      button.addEventListener("click", copy);
      block.querySelector(".code-toolbar")?.append(button);
      cleanups.push(() => button.remove());
    });
    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);
  return null;
}
