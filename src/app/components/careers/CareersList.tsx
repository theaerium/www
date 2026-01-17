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
    <div className="border-t border-gray-300">
      {careers.map((career) => (
        <CareerItem
          key={career.slug}
          title={career.title}
          content={career.content}
          meta={career.meta}
          isOpen={openSlug === career.slug}
          onToggle={() => handleToggle(career.slug)}
        />
      ))}
    </div>
  );
}
