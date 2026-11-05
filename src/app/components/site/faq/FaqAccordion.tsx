"use client";

import { useId, useState } from "react";
import { PlusMinus } from "../sections";

export type FaqEntry = { question: string; answer: string };

/** Each question opens and closes on its own, so readers can compare answers side by side. */
export default function FaqAccordion({ entries }: { entries: FaqEntry[] }) {
  const [openQuestions, setOpenQuestions] = useState<Set<string>>(new Set());
  const idPrefix = useId();

  const toggle = (question: string) =>
    setOpenQuestions((current) => {
      const next = new Set(current);
      if (next.has(question)) next.delete(question);
      else next.add(question);
      return next;
    });

  return (
    <div className="b-accordion b-faq-accordion">
      {entries.map((entry, i) => {
        const open = openQuestions.has(entry.question);
        const panelId = `${idPrefix}-panel-${i}`;
        return (
          <div key={entry.question} className="b-accordion-item">
            <button
              type="button"
              className="b-accordion-trigger"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => toggle(entry.question)}
            >
              <span>{entry.question}</span>
              <PlusMinus open={open} />
            </button>
            <div id={panelId} className={`b-accordion-panel ${open ? "is-open" : ""}`} role="region">
              <div className="b-accordion-panel-inner">
                <p>{entry.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
