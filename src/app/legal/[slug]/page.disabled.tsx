import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { POLICIES, findPolicy } from "../policies";
import { createPolicyPage, createPolicyMetadata } from "../policy-page-factory";

type LegalPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return POLICIES.map((policy) => ({ slug: policy.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return createPolicyMetadata(slug);
}

export default async function LegalPolicyPage({ params }: LegalPageProps) {
  const { slug } = await params;
  const policy = findPolicy(slug);

  if (!policy) {
    notFound();
  }

  const PolicyComponent = createPolicyPage(slug);
  return <PolicyComponent />;
}
