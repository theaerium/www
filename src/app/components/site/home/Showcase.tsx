"use client";

import Link from "next/link";
import { useState } from "react";

export type ShowcaseItem = {
  title: string;
  body: string;
  href: string;
  /** Product screenshot shown in the frame while this item is open. */
  image: string;
  imageAlt: string;
  /** Blurred photo behind the frame; falls back to the section's backdrop. */
  backdrop?: string;
  /**
   * Crops the screenshot inside the frame, as percentages of the frame's inner box:
   * the image's width and its left/top offsets. Defaults to filling the frame.
   */
  crop?: { width: number; left: number; top: number };
};

function PlusMinus({ open }: { open: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M2 9h14" stroke="currentColor" strokeWidth="2" />
      <path
        d="M9 2v14"
        stroke="currentColor"
        strokeWidth="2"
        style={{ transform: open ? "scaleY(0)" : "scaleY(1)", transformOrigin: "center", transition: "transform 0.25s ease" }}
      />
    </svg>
  );
}

/** Split section: an accordion on one side, a framed screenshot over a blurred photo on the other. */
export default function Showcase({
  id,
  eyebrow,
  title,
  items,
  backdrop,
  mediaSide,
  frame,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  items: ShowcaseItem[];
  backdrop: string;
  mediaSide: "left" | "right";
  /** Screenshot frame proportions, in px; the frame scales with the column. */
  frame: { width: number; height: number };
}) {
  const [openIndex, setOpenIndex] = useState(0);
  const active = items[openIndex];
  const shots = items.filter((item, i) => items.findIndex((other) => other.image === item.image) === i);
  const backdropFor = (item: ShowcaseItem) => item.backdrop ?? backdrop;
  const backdrops = [...new Set(items.map(backdropFor))];

  return (
    <section id={id} className={`b-showcase b-showcase-media-${mediaSide}`}>
      <div className="b-showcase-copy">
        <div className="b-showcase-copy-inner">
          <div className="b-eyebrow">{eyebrow}</div>
          <h2 className="b-h2 b-showcase-title">{title}</h2>
          <div className="b-accordion">
            {items.map((item, i) => {
              const open = i === openIndex;
              const panelId = `${id ?? eyebrow}-panel-${i}`;
              return (
                <div key={item.title} className="b-accordion-item">
                  <button
                    type="button"
                    className="b-accordion-trigger"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(i)}
                  >
                    <span>{item.title}</span>
                    <PlusMinus open={open} />
                  </button>
                  <div id={panelId} className={`b-accordion-panel ${open ? "is-open" : ""}`} role="region">
                    <div className="b-accordion-panel-inner">
                      <p>{item.body}</p>
                      <Link href={item.href} className="b-text-link" tabIndex={open ? 0 : -1}>
                        Learn more
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="b-showcase-media">
        {backdrops.map((src) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            className={`b-showcase-backdrop ${src === backdropFor(active) ? "is-visible" : ""}`}
            src={src}
            alt=""
            aria-hidden="true"
          />
        ))}
        <div className="b-showcase-frame" style={{ ["--frame-aspect" as string]: frame.width / frame.height }}>
          {shots.map((shot) => {
            const visible = shot.image === active.image;
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={shot.image}
                src={shot.image}
                alt={visible ? shot.imageAlt : ""}
                aria-hidden={!visible}
                className={`b-showcase-shot ${visible ? "is-visible" : ""}`}
                style={{
                  width: `${shot.crop?.width ?? 100}%`,
                  left: `${shot.crop?.left ?? 0}%`,
                  top: `${shot.crop?.top ?? 0}%`,
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
