"use client";

import { useEffect, useRef } from "react";

/**
 * Scales its child down (never up) to fit the available box, so fixed-size
 * product mocks stay intact as their card grows and shrinks.
 */
export default function FitToBox({ children, padding = 24 }: { children: React.ReactNode; padding?: number }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const content = contentRef.current;
    if (!box || !content) return;
    const fit = () => {
      const scale = Math.min(
        1,
        (box.clientWidth - padding * 2) / content.offsetWidth,
        (box.clientHeight - padding) / content.offsetHeight,
      );
      content.style.transform = `scale(${Math.max(scale, 0.4)})`;
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(box);
    observer.observe(content);
    return () => observer.disconnect();
  }, [padding]);

  return (
    <div ref={boxRef} className="b-fit-box">
      <div ref={contentRef} className="b-fit-content">
        {children}
      </div>
    </div>
  );
}
