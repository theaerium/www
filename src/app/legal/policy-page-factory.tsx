import { readFile } from "fs/promises";
import path from "path";

import ReactMarkdown from "react-markdown";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PolicyNavigation from "./policy-navigation";
import { findPolicy } from "./policies";
import AeriumLogo from "../../components/AeriumLogo";

const docsDirectory = path.join(process.cwd(), "docs");

export function createPolicyMetadata(slug: string): Metadata {
  const policy = findPolicy(slug);

  if (!policy) {
    return {};
  }

  return {
    title: `${policy.title} | Aerium`,
    description: `Read Aerium's ${policy.title}.`,
  };
}

export function createPolicyPage(slug: string) {
  return async function PolicyPage() {
    const policy = findPolicy(slug);

    if (!policy) {
      notFound();
    }

    const filePath = path.join(docsDirectory, policy.fileName);
    const file = await readFile(filePath, "utf8");

    return (
      <main
        className="mx-auto w-full max-w-6xl px-4 py-16 lg:px-10"
        style={{ background: "#FFF8F5" }}
      >
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-16">
          <div className="md:w-64">
            <div className="mb-6">
              <AeriumLogo size="sm" />
            </div>
            <PolicyNavigation currentSlug={slug} />
          </div>
          <div className="flex-1">
            <header
              className="mb-10 space-y-2 pb-6"
              style={{ borderBottom: "2px solid #F0DDD4" }}
            >
              <p
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "#FD870B" }}
              >
                Legal
              </p>
              <h1
                className="text-3xl md:text-4xl"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "#390007",
                }}
              >
                {policy.title}
              </h1>
            </header>
            <article className="legal-content">
              <ReactMarkdown>{file}</ReactMarkdown>
            </article>
          </div>
        </div>
      </main>
    );
  };
}
