"use client";

import { useState } from "react";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export default function FAQItem({
  question,
  answer,
  isOpen = false,
  onToggle,
}: FAQItemProps) {
  const [isExpanded, setIsExpanded] = useState(isOpen);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    onToggle?.();
  };

  return (
    <div>
      <button
        onClick={handleToggle}
        className="w-full py-6 text-left flex items-center justify-between transition-colors duration-200"
      >
        <span className="text-xl sm:text-2xl lg:text-3xl font-normal text-black pr-4">
          {question}
        </span>
        <div className="flex-shrink-0">
          <svg
            className={`w-5 h-5 text-black transition-transform duration-200 ${
              isExpanded ? "rotate-45" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </div>
      </button>

      {isExpanded && (
        <div className="pb-6 pr-12">
          <p className="text-gray-600 leading-relaxed text-lg sm:text-xl lg:text-2xl">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}
