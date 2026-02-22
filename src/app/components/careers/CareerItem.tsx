"use client";

import { useRef, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

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
  isLast?: boolean;
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
  isLast = false,
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
    <div
      style={{
        borderBottom: isLast ? "none" : "2px solid #F0DDD4",
      }}
    >
      <button
        onClick={handleToggle}
        className="w-full py-5 px-6 text-left flex items-center justify-between"
        style={{
          background: isOpen ? "#FAEEE8" : "transparent",
          transition: "background 0.1s ease",
        }}
      >
        <div className="pr-4">
          <span
            className="text-xl sm:text-2xl lg:text-3xl block"
            style={{
              fontFamily: "var(--font-display)",
              color: "#390007",
            }}
          >
            {title}
          </span>
          {meta && (
            <div
              className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm"
              style={{ color: "#8C5A50" }}
            >
              {meta.location && <span>{meta.location}</span>}
              {meta.department && <span>{meta.department}</span>}
              {meta.employmentType && <span>{meta.employmentType}</span>}
              {meta.compensation && (
                <span style={{ color: "#FD870B", fontWeight: 600 }}>
                  {meta.compensation}
                </span>
              )}
            </div>
          )}
        </div>
        <div
          className="flex-shrink-0 w-6 h-6 flex items-center justify-center"
          style={{
            border: "1px solid #D4B0A0",
            background: isOpen ? "#FD870B" : "#FAEEE8",
            color: isOpen ? "#fff" : "#390007",
            fontFamily: "var(--font-mono)",
            fontSize: "14px",
            fontWeight: 700,
          }}
        >
          {isOpen ? "\u2212" : "+"}
        </div>
      </button>

      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ height: height ?? 0 }}
      >
        <div ref={contentRef} className="pb-6 px-6 pr-12" style={{ background: "#FAEEE8" }}>
          <article className="leading-relaxed space-y-4">
            <ReactMarkdown
              components={{
                h2: ({ children }) => (
                  <h2
                    className="text-xl mt-4"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "#390007",
                      fontWeight: 600,
                    }}
                  >
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3
                    className="text-lg mt-3"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "#390007",
                      fontWeight: 600,
                    }}
                  >
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p style={{ color: "#6B3030" }}>{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc pl-6 space-y-1.5">{children}</ul>
                ),
                li: ({ children }) => (
                  <li style={{ color: "#6B3030" }} className="pl-1">{children}</li>
                ),
                strong: ({ children }) => (
                  <strong style={{ color: "#390007", fontWeight: 600 }}>
                    {children}
                  </strong>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className="underline"
                    style={{ color: "#FD870B" }}
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
