import { Metadata } from "next";
import Header from "../components/header";
import Footer from "../components/footer";

export const metadata: Metadata = {
  title: "About Us | Aerium",
  description:
    "Our mission is to free supply chain teams from daily firefighting and allow them to drive growth.",
};

export default function AboutPage() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#FFF8F5" }}
    >
      <Header />
      <main className="pt-8 pb-16 flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page title card */}
          <div
            style={{
              border: "2px solid #FD870B",
              boxShadow: "4px 4px 0px #FD870B",
              marginBottom: "2rem",
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
                About Aerium
              </span>
            </div>
            <div className="p-8 sm:p-10" style={{ background: "#FFF8F5" }}>
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "#390007",
                }}
              >
                Manufacturing Advantage
              </h1>
            </div>
          </div>

          <div className="space-y-8">
            <div
              className="bevel-box"
              style={{ borderLeft: "3px solid #FD870B" }}
            >
              <h2
                className="text-2xl mb-4"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "#390007",
                }}
              >
                Our Mission
              </h2>
              <p
                className="text-lg leading-relaxed"
                style={{ color: "#6B3030" }}
              >
                We believe supply chain teams should spend their time focusing
                on strategic initiatives that move the business forward, not
                fighting fires to keep production moving. We give them the tools
                to focus on what really matters.
              </p>
            </div>

            <div
              className="bevel-box"
              style={{ borderLeft: "3px solid #FD870B" }}
            >
              <h2
                className="text-2xl mb-4"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "#390007",
                }}
              >
                Our Background
              </h2>
              <p
                className="text-lg leading-relaxed"
                style={{ color: "#6B3030" }}
              >
                Before Aerium, we spent years at McKinsey building software to
                automate inventory management, pricing optimization, and supply
                chain workflows for some of the largest manufacturers and
                distributors in the world. We saw firsthand how much time and
                money was being lost to manual processes and disconnected
                systems. We started Aerium to bring that same level of
                automation to every manufacturer.
              </p>
            </div>

            <div
              className="bevel-box"
              style={{ borderLeft: "3px solid #FD870B" }}
            >
              <h2
                className="text-2xl mb-4"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "#390007",
                }}
              >
                Built Together
              </h2>
              <p
                className="text-lg leading-relaxed"
                style={{ color: "#6B3030" }}
              >
                We believe the best products are built together. We bring the
                platform and spend time with our customers to tailor the product
                to their company&apos;s specific needs. Every business is
                different, and cookie-cutter solutions don&apos;t cut it. We
                understand their unique challenges and build solutions that
                actually work.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
