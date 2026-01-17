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
    <div className="border-b border-gray-300 last:border-b-0">
      <button
        onClick={handleToggle}
        className="w-full py-6 px-4 sm:px-6 lg:px-8 text-left flex items-center justify-between transition-colors duration-200"
      >
        <span className="text-2xl sm:text-3xl lg:text-4xl font-medium text-gray-700 pr-4">
          {question}
        </span>
        <div className="flex-shrink-0">
          <svg
            className={`w-6 h-6 text-gray-500 transition-transform duration-200 ${
              isExpanded ? "rotate-45" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </div>
      </button>

      {isExpanded && (
        <div className="pb-6 px-4 sm:px-6 lg:px-8 pr-12">
          <p className="text-gray-600 leading-relaxed text-lg sm:text-xl lg:text-2xl">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}
