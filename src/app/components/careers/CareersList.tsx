"use client";

import { useState } from "react";
import CareerItem from "./CareerItem";

interface CareerMeta {
  location?: string;
  employmentType?: string;
  locationType?: string;
  department?: string;
  compensation?: string;
}

interface Career {
  title: string;
  content: string;
  meta: CareerMeta;
  slug: string;
}

interface CareersListProps {
  careers: Career[];
}

export default function CareersList({ careers }: CareersListProps) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const handleToggle = (slug: string) => {
    setOpenSlug(openSlug === slug ? null : slug);
  };

  return (
    <div
      style={{
        border: "2px solid #FD870B",
        boxShadow: "4px 4px 0px #FD870B",
      }}
    >
      <div
        style={{
          background: "#390007",
          padding: "0.75rem 1.5rem",
          borderBottom: "2px solid #FD870B",
        }}
      >
        <span
          className="text-xs uppercase tracking-widest font-bold"
          style={{ color: "#FD870B" }}
        >
          Open Positions
        </span>
      </div>
      <div style={{ background: "#FFF8F5" }}>
        {careers.map((career, i) => (
          <CareerItem
            key={career.slug}
            title={career.title}
            content={career.content}
            meta={career.meta}
            isOpen={openSlug === career.slug}
            onToggle={() => handleToggle(career.slug)}
            isLast={i === careers.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
