import type { Metadata } from "next";
import SiteShell from "../components/site/SiteShell";
import { Eyebrow } from "../components/site/primitives";
import { CONTACT_EMAIL, CAL_LINK } from "../components/site/routes";

export const metadata: Metadata = {
  title: "Book a demo | Aerium",
  description: "Learn how we'd approach your toughest challenges. Book a 15-minute demo with the Aerium team.",
};

export default function BookADemoPage() {
  return (
    <SiteShell>
      {/* Hero */}
      <section style={{ background: "var(--site-cream)", padding: "80px 32px 64px", borderBottom: "1px solid var(--site-hairline)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", textAlign: "center" }}>
          <Eyebrow style={{ display: "block", marginBottom: 20 }}>BOOK A DEMO</Eyebrow>
          <h1
            style={{
              margin: "0 auto",
              fontSize: "clamp(34px, 5.4vw, 50px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              maxWidth: "22ch",
              textWrap: "balance",
            }}
          >
            Learn how we&rsquo;d approach your toughest challenges.
          </h1>
        </div>
      </section>

      {/* Cal.com embed */}
      <section style={{ padding: "64px 32px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div
            style={{
              border: "1px solid var(--site-hairline)",
              borderRadius: 14,
              overflow: "hidden",
              background: "#FFFFFF",
            }}
          >
            <iframe
              src={`https://cal.com/${CAL_LINK}?embed=true&theme=light`}
              title="Book a 15 minute demo"
              style={{ display: "block", width: "100%", height: 720, border: 0 }}
            />
          </div>
          <p style={{ margin: "28px 0 0", textAlign: "center", color: "var(--site-body)", fontSize: 15 }}>
            Calendar not loading, or no time that works? Email us and we will find one:{" "}
            <a href={`mailto:${CONTACT_EMAIL}?subject=Demo request`} className="site-link" style={{ fontWeight: 600 }}>
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
