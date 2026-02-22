"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMemo } from "react";

import { POLICIES } from "./policies";

type PolicyNavigationProps = {
  currentSlug: string;
};

export default function PolicyNavigation({ currentSlug }: PolicyNavigationProps) {
  const router = useRouter();
  const currentPolicy = useMemo(() => POLICIES.find((policy) => policy.slug === currentSlug), [currentSlug]);

  return (
    <aside className="md:w-64 md:shrink-0 md:sticky md:top-32 md:self-start">
      <div className="mb-6 md:hidden">
        <label
          htmlFor="policy-selector"
          className="mb-2 block text-sm font-semibold uppercase tracking-wider"
          style={{ color: "#390007" }}
        >
          Select policy
        </label>
        <select
          id="policy-selector"
          value={currentPolicy?.slug ?? ""}
          onChange={(event) => router.push(`/${event.target.value}`)}
          className="w-full px-3 py-2 text-sm focus:outline-none"
          style={{
            background: "#FFF8F5",
            color: "#390007",
            border: "2px solid #FD870B",
            boxShadow: "2px 2px 0px #FD870B",
          }}
        >
          {POLICIES.map((policy) => (
            <option key={policy.slug} value={policy.slug}>
              {policy.title}
            </option>
          ))}
        </select>
      </div>
      <nav className="hidden md:block">
        <p
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color: "#FD870B" }}
        >
          Policies
        </p>
        <ul className="mt-4 space-y-1">
          {POLICIES.map((policy) => {
            const isActive = policy.slug === currentSlug;
            return (
              <li key={policy.slug}>
                <Link
                  href={`/${policy.slug}`}
                  className="block px-3 py-2 text-sm"
                  style={
                    isActive
                      ? {
                          background: "#FAEEE8",
                          color: "#FD870B",
                          fontWeight: 600,
                          borderLeft: "3px solid #FD870B",
                        }
                      : {
                          color: "#6B3030",
                          borderLeft: "3px solid transparent",
                        }
                  }
                >
                  {policy.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
