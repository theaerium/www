import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aeriumhq.com"),
  title: "Aerium | Supply chain intelligence",
  description:
    "AI agents that monitor market prices across thousands of SKUs, automatically identify savings opportunities, and autonomously negotiate with suppliers. Manufacturers and Distributors can run McKinsey-level supply chain optimization 24/7 with no additional headcount.",
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
    title: "Aerium | Supply chain intelligence",
    description:
      "AI agents that monitor market prices across thousands of SKUs, automatically identify savings opportunities, and autonomously negotiate with suppliers. Manufacturers and Distributors can run McKinsey-level supply chain optimization 24/7 with no additional headcount.",
    url: "https://aeriumhq.com",
    siteName: "Aerium",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aerium | Supply chain intelligence",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aerium | Supply chain intelligence",
    description:
      "AI agents that monitor market prices across thousands of SKUs, automatically identify savings opportunities, and autonomously negotiate with suppliers. Manufacturers and Distributors can run McKinsey-level supply chain optimization 24/7 with no additional headcount.",
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
        <meta
          name="twitter:image:alt"
          content="Aerium - Supply chain intelligence"
        />
      </head>
      <body
        className={`${dmSans.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable} antialiased`}
        style={{
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {children}
        <Analytics />
        <Script
          id="apollo-tracking"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              function initApollo(){var n=Math.random().toString(36).substring(7),o=document.createElement("script");
              o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,o.async=!0,o.defer=!0,
              o.onload=function(){window.trackingFunctions.onLoad({appId:"6973ca960cffae0011ed5b56"})},
              document.head.appendChild(o)}initApollo();
            `,
          }}
        />
      </body>
    </html>
  );
}
