import type { Metadata } from "next";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{
    ref: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ref } = await params;

  return {
    title: "Aerium | Procurement intelligence",
    description:
      "AI agents that monitor market prices across thousands of SKUs, automatically identify savings opportunities, and autonomously negotiate with suppliers. Manufacturers can run McKinsey-level procurement optimization 24/7 with no additional headcount.",
    keywords: [
      "procurement",
      "supply chain",
      "savings",
      "buying",
      "manufacturing",
      "items",
    ],
    authors: [{ name: "Aerium" }],
    openGraph: {
      title: "Aerium | Procurement intelligence",
      description:
        "AI agents that monitor market prices across thousands of SKUs, automatically identify savings opportunities, and autonomously negotiate with suppliers. Manufacturers can run McKinsey-level procurement optimization 24/7 with no additional headcount.",
      url: `https://aeriumhq.com/${ref}`,
      siteName: "Aerium",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Aerium | Procurement intelligence",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Aerium | Procurement intelligence",
      description:
        "AI agents that monitor market prices across thousands of SKUs, automatically identify savings opportunities, and autonomously negotiate with suppliers. Manufacturers can run McKinsey-level procurement optimization 24/7 with no additional headcount.",
      images: ["/og-image.png"],
      creator: "@aerium",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ReferralPage({ params }: Props) {
  const { ref } = await params;
  redirect(`/waitlist?ref=${ref}`);
}
