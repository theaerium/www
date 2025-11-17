import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aerium | Procurement intelligence",
  description:
    "AI agents that monitor market prices across thousands of SKUs, automatically identify savings opportunities, and autonomously negotiate with suppliers. Manufacturers can run McKinsey-level procurement optimization 24/7 with no additional headcount.",
  keywords: ["trading", "buying", "selling", "cash", "items", "marketplace"],
  authors: [{ name: "Aerium" }],
  openGraph: {
    title: "Aerium | Procurement intelligence",
    description:
      "AI agents that monitor market prices across thousands of SKUs, automatically identify savings opportunities, and autonomously negotiate with suppliers. Manufacturers can run McKinsey-level procurement optimization 24/7 with no additional headcount.",
    url: "https://joinaerium.com",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Additional meta tags for better link previews */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image:alt" content="Aerium - Buy now, pay never" />
      </head>
      <body className={`${geistMono.variable} antialiased overflow-x-hidden`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
