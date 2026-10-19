"use client";
import { useState } from "react";

const colors = [
  ["Charcoal", "#171c1a", "A quiet canvas for focused work."],
  ["Ivory", "#f3f1e8", "Warm, readable words on dark surfaces."],
  ["Celadon", "#b8d9a2", "A clear signal for your next action."],
  ["Forest", "#2a352f", "Depth and structure without distraction."],
  ["Mist", "#aab7ac", "A softer voice for supporting details."],
];
export function BrandPalette() {
  const [status, setStatus] = useState("");
  async function copy(name: string, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setStatus(`${name} ${value} copied`);
    } catch {
      setStatus(`Copy unavailable. Select ${value} to copy it.`);
    }
  }
  return (
    <>
      <ul className="palette">
        {colors.map(([name, hex, description]) => (
          <li key={name}>
            <button className="swatch" onClick={() => copy(name, hex)} aria-label={`Copy ${name} ${hex}`}>
              <span className="color" style={{ background: hex }} aria-hidden="true" />
              <span className="swatch-label">
                <strong>{name}</strong>
                <span className="hex">{hex}</span>
                <span className="copy" aria-hidden="true">
                  ⧉
                </span>
              </span>
            </button>
            <p className="fine">{description}</p>
          </li>
        ))}
      </ul>
      <p className="palette-status" role="status">
        {status || "Select a swatch to copy its hex value."}
      </p>
    </>
  );
}
