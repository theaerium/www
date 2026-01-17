"use client";

import { useRef, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import theme from "@/app/config/theme";

interface CareerMeta {
  location?: string;
  employmentType?: string;
  locationType?: string;
  department?: string;
  compensation?: string;
}

interface CareerItemProps {
  title: string;
  content: string;
  meta?: CareerMeta;
  isOpen?: boolean;
  onToggle?: () => void;
}

// Process content to convert plain email addresses to mailto links with subject
function processEmailsInContent(content: string, jobTitle: string): string {
  // Match email addresses that aren't already in markdown links
  const emailRegex =
    /(?<!\[)([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(?!\])/g;
  const subject = encodeURIComponent(`Interested in ${jobTitle}`);
  return content.replace(
    emailRegex,
    (email) => `[${email}](mailto:${email}?subject=${subject})`,
  );
}

export default function CareerItem({
  title,
  content,
  meta,
  isOpen = false,
  onToggle,
}: CareerItemProps) {
  const [height, setHeight] = useState<number | undefined>(undefined);
  const contentRef = useRef<HTMLDivElement>(null);

  // Process content to make emails clickable
  const processedContent = processEmailsInContent(content, title);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  const handleToggle = () => {
    onToggle?.();
  };

  return (
    <div className="border-b border-gray-300 last:border-b-0">
      <button
        onClick={handleToggle}
        className="w-full py-6 px-4 sm:px-6 lg:px-8 text-left flex items-center justify-between transition-colors duration-200"
      >
        <div className="pr-4">
          <span className="text-2xl sm:text-3xl lg:text-4xl font-medium text-gray-700 block">
            {title}
          </span>
          {meta && (
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-gray-500">
              {meta.location && <span>{meta.location}</span>}
              {meta.department && <span>{meta.department}</span>}
              {meta.employmentType && <span>{meta.employmentType}</span>}
              {meta.compensation && (
                <span className="font-medium text-gray-600">
                  {meta.compensation}
                </span>
              )}
            </div>
          )}
        </div>
        <div className="flex-shrink-0">
          <svg
            className={`w-6 h-6 text-gray-500 transition-transform duration-300 ${
              isOpen ? "rotate-45" : ""
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

      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ height: height ?? 0 }}
      >
        <div ref={contentRef} className="pb-6 px-4 sm:px-6 lg:px-8 pr-12">
          <article className="text-gray-600 leading-relaxed space-y-4">
            <ReactMarkdown
              components={{
                h2: ({ children }) => (
                  <h2 className="text-xl font-semibold text-gray-900 mt-4">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-lg font-semibold text-gray-800 mt-3">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-gray-600">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc pl-6 space-y-1.5">{children}</ul>
                ),
                li: ({ children }) => (
                  <li className="text-gray-600 pl-1">{children}</li>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-gray-700">
                    {children}
                  </strong>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className={`text-${theme.colors.orange} underline hover:text-${theme.colors.orange}/90`}
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {processedContent}
            </ReactMarkdown>
          </article>
        </div>
      </div>
    </div>
  );
}
