"use client";

import { Children, useState } from "react";

/**
 * A row of cards where the hovered (or focused) card grows to take more of the
 * row. With nothing hovered, `defaultIndex` holds the larger slot. Cards style
 * their own expanded state from the wrapper's `data-active` attribute.
 */
export default function ExpandingCards({
  children,
  defaultIndex = 0,
  activeGrow,
  className = "",
}: {
  children: React.ReactNode;
  defaultIndex?: number;
  /** Width of the active card relative to the others. */
  activeGrow: number;
  className?: string;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const activeIndex = hoveredIndex ?? defaultIndex;

  return (
    <div
      className={`b-expand ${className}`}
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
