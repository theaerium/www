import type { Metadata } from "next";
import SiteShell from "../components/site/SiteShell";
import CalEmbed from "../components/site/CalEmbed";
import { ArrowLink, GrainHeader, RuledColumns, SectionIntro } from "../components/site/sections";
import { CONTACT_EMAIL } from "../components/site/routes";

export const metadata: Metadata = {
  title: "Book a demo | Aerium",
  description: "Book a 15-minute demo and see how Aerium would approach your toughest challenges.",
};

const EXPECT = [
  { title: "We learn your operation", body: "Meet with someone who will listen and learn how quoting, costing and supply chain run in your business today." },
  { title: "We show where Aerium fits", body: "See how Aerium connects to the systems you already use and which work it can take off your team’s plate." },
  { title: "We tailor it to you", body: "Ask for the custom models, agents and add-ons your workflows need." },
];

export default function BookADemoPage() {
  return (
    <SiteShell navOverlay>
      <GrainHeader eyebrow="Book a demo" title="Learn how we would approach your toughest challenges">
        <p className="b-header-sub">Fifteen minutes with the team building Aerium, on the work your business actually does.</p>
      </GrainHeader>

      <section className="b-section b-white">
        <div className="b-wrap">
          <SectionIntro
            eyebrow="What to expect"
            title="A short call about your work"
            lede="Pick a time below. If none of them work, email us and we will find one."
          />
          <RuledColumns items={EXPECT} numbered />
          <div className="b-demo-calendar">
            <CalEmbed />
          </div>
          <div className="b-demo-fallback">
            <p className="b-body-copy">Calendar not loading, or no time that works?</p>
            <ArrowLink href={`mailto:${CONTACT_EMAIL}?subject=Demo request`}>{CONTACT_EMAIL}</ArrowLink>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
