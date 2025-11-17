import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aerium | Shop with your closet",
  description:
    "Turn your unused items into instant buying power. It's like getting everything for free.",
  keywords: ["trading", "buying", "selling", "cash", "items", "marketplace"],
  authors: [{ name: "Aerium" }],
  openGraph: {
    title: "Aerium | Shop with your closet",
    description:
      "Turn your unused items into instant buying power. It's like getting everything for free.",
    url: "https://joinaerium.com",
    siteName: "Aerium",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aerium | Shop with your closet",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aerium | Shop with your closet",
    description:
      "Turn your unused items into instant buying power. It's like getting everything for free.",
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
