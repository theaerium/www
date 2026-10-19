"use client";

import { Children, useEffect, useRef, useState } from "react";

/**
 * A row of cards where the hovered (or focused) card grows to take more of the
 * row. With nothing hovered, `defaultIndex` holds the larger slot. Cards style
 * their own expanded state from the wrapper's `data-active` attribute.
 * With `hashIds`, a URL hash matching a card's id opens that card and scrolls the row into view.
 */
export default function ExpandingCards({
  children,
  defaultIndex = 0,
  activeGrow,
  className = "",
  hashIds,
}: {
  children: React.ReactNode;
  defaultIndex?: number;
  /** Width of the active card relative to the others. */
  activeGrow: number;
  className?: string;
  hashIds?: string[];
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [pinnedIndex, setPinnedIndex] = useState(defaultIndex);
  const activeIndex = hoveredIndex ?? pinnedIndex;
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hashIds) return;
    const openFromHash = () => {
      const index = hashIds.findIndex((id) => `#${id}` === window.location.hash);
      if (index < 0) return;
      setPinnedIndex(index);
      // Align the row's bottom with the viewport so the opened card, copy included, is in view.
      rowRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [hashIds]);

  return (
    <div
      ref={rowRef}
      className={`b-expand ${className}`}
      data-reveal="stagger"
      onMouseLeave={() => setHoveredIndex(null)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setHoveredIndex(null);
      }}
    >
      {Children.toArray(children).map((child, i) => (
        <div
          key={i}
          className="b-expand-item"
          data-active={i === activeIndex}
          style={{ flexGrow: i === activeIndex ? activeGrow : 1 }}
          onMouseEnter={() => setHoveredIndex(i)}
          onFocus={() => setHoveredIndex(i)}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
