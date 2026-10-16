import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteShell from "../../components/site/SiteShell";
import { Eyebrow, SiteButton } from "../../components/site/primitives";
import { routes } from "../../components/site/routes";
import { fundingAnnouncement } from "../funding-announcement";

export const metadata: Metadata = {
  title: `${fundingAnnouncement.title} | Aerium`,
  description: fundingAnnouncement.excerpt,
  authors: [{ name: "Adam Trotman" }, { name: "Michael Dawes" }],
  alternates: { canonical: fundingAnnouncement.href },
  openGraph: {
    type: "article",
    title: fundingAnnouncement.title,
    description: fundingAnnouncement.excerpt,
    url: fundingAnnouncement.href,
    authors: ["Adam Trotman", "Michael Dawes"],
  },
  twitter: {
    card: "summary",
    title: fundingAnnouncement.title,
    description: fundingAnnouncement.excerpt,
  },
};

export default function FundingAnnouncementPage() {
  return (
    <SiteShell>
      <article style={{ maxWidth: 824, margin: "0 auto", padding: "64px 32px 96px" }}>
        <Link href={`${routes.media}#news`} className="site-link" style={{ display: "inline-block", fontSize: 14, fontWeight: 600, marginBottom: 48 }}>
          ← Media &amp; Events
        </Link>
        <header style={{ paddingBottom: 36, borderBottom: "1px solid var(--site-hairline)" }}>
          <Eyebrow style={{ display: "block", marginBottom: 20 }}>COMPANY NEWS · FUNDING</Eyebrow>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 50px)", fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1.12, textWrap: "balance" }}>
            {fundingAnnouncement.title}
          </h1>
        </header>

        <figure style={{ margin: "36px 0 0" }}>
          <Image
            src="/site/images/media/aerium-co-founders.png"
            alt="Aerium co-founders Adam Trotman and Michael Dawes sitting together in Aerium sweaters"
            width={1050}
            height={700}
            sizes="(max-width: 824px) calc(100vw - 64px), 760px"
            preload
            style={{ display: "block", width: "100%", height: "auto", borderRadius: 14 }}
          />
        </figure>

        <div style={{ display: "grid", gap: 24, paddingTop: 36, fontSize: 18, lineHeight: 1.8, color: "var(--site-body)" }}>
          <p>{fundingAnnouncement.excerpt}</p>
          <p>
            We started Aerium with a conviction: the people who make and move the products the world depends on should have extraordinary technology at their disposal. Industrial manufacturers and distributors underpin the physical economy. The ability to build more, deliver faster, and use resources better depends on how well these businesses run.
          </p>
          <p>
            Both of us grew up around manufacturing and later built software and agentic AI for industrial clients at McKinsey. We saw how much these businesses accomplish through the experience and ingenuity of their people. We also saw how difficult it is to coordinate work when critical information sits across disconnected systems, spreadsheets, emails, and people’s heads.
          </p>
          <p>
            <strong style={{ color: "var(--site-ink)", fontWeight: 600 }}>
              We want Aerium to be the next Honeywell, Emerson, or Siemens: an enduring industrial technology company that becomes essential to how the physical world operates.
            </strong>
          </p>
          <p>
            We believe artificial intelligence (AI) will become part of the infrastructure of industry, embedded in the daily decisions and workflows that turn materials into products and keep supply chains moving. Our ambition is to build that operating layer: a foundation companies can rely on to understand their business, coordinate their work, and expand what they are capable of producing.
          </p>
          <p>
            We’re starting with an AI workforce purpose-built for industrial manufacturers and distributors. Aerium connects information across a business and puts it to work, helping teams quote complex jobs, coordinate production, manage procurement, predict maintenance needs, and make better decisions overall. Over time, the knowledge gained from every job, every order, and every operational decision helps the businesses self-improve.
          </p>
          <p>
            That future depends on preserving the knowledge people have spent careers building. A company’s understanding of its products, processes, suppliers, and customers is one of its most valuable assets. We want to make that expertise available wherever it is needed, so teams can accomplish more with the people they have and carry that knowledge into the next generation.
          </p>
          <p>
            Building a company of this significance will take years of close work with customers and a commitment to technology they can trust in daily operations. This funding gives us the resources to keep developing the product, deepen our customer deployments, and build the team that will carry that ambition forward.
          </p>
          <p>
            We’re hiring forward-deployed engineers in Toronto who want to help build the next great industrial technology company. You’ll work closely with customers, learn how their businesses operate, and take solutions from an initial idea through deployment. Your work will shape software that helps people make things, move products, and solve problems with a direct impact on the physical world.
          </p>
          <p>Thank you to our investors and customers for their trust. We’re building Aerium for the long term, and we’re just getting started.</p>
          <p style={{ color: "var(--site-ink)", fontSize: 17, marginTop: 8, lineHeight: 1.6 }}>
            <strong style={{ fontWeight: 600 }}>Adam Trotman and Michael Dawes</strong>
            <span style={{ display: "block", marginTop: 4, color: "var(--site-body)", fontSize: 15 }}>
              Co-founders of Aerium
            </span>
          </p>
        </div>

        <aside style={{ marginTop: 48, paddingTop: 32, borderTop: "1px solid var(--site-hairline)" }}>
          <p style={{ fontSize: 20, lineHeight: 1.5, color: "var(--site-ink)" }}>
            <strong>Want to help build Aerium? We’d love to hear from you.</strong>
          </p>
          <SiteButton href={routes.careers} variant="dark" style={{ marginTop: 24 }}>
            Explore careers →
          </SiteButton>
        </aside>
      </article>
    </SiteShell>
  );
}
