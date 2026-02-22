"use client";

import { useState } from "react";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen?: boolean;
  onToggle?: () => void;
  isLast?: boolean;
}

export default function FAQItem({
  question,
  answer,
  isOpen = false,
  onToggle,
  isLast = false,
}: FAQItemProps) {
  const [isExpanded, setIsExpanded] = useState(isOpen);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    onToggle?.();
  };

  return (
    <div
      style={{
        borderBottom: isLast ? "none" : "2px solid #F0DDD4",
      }}
    >
      <button
        onClick={handleToggle}
        className="w-full py-5 px-6 text-left flex items-center justify-between"
        style={{
          background: isExpanded ? "#FAEEE8" : "transparent",
          transition: "background 0.1s ease",
        }}
      >
        <span
          className="text-lg sm:text-xl lg:text-2xl pr-4"
          style={{
            fontFamily: "var(--font-display)",
            color: "#390007",
          }}
        >
          {question}
        </span>
        <div
          className="flex-shrink-0 w-6 h-6 flex items-center justify-center"
          style={{
            border: "1px solid #D4B0A0",
            background: isExpanded ? "#FD870B" : "#FAEEE8",
            color: isExpanded ? "#fff" : "#390007",
            fontFamily: "var(--font-mono)",
            fontSize: "14px",
            fontWeight: 700,
          }}
        >
          {isExpanded ? "−" : "+"}
        </div>
      </button>

      {isExpanded && (
        <div
          className="pb-6 px-6 pr-16"
          style={{ background: "#FAEEE8" }}
        >
          <p
            className="leading-relaxed text-base sm:text-lg"
            style={{ color: "#6B3030" }}
          >
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}
