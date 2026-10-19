import type { Metadata } from "next";
import SiteShell from "../components/site/SiteShell";
import { ClosingCta, PhotoHero, RuledColumns, SectionIntro } from "../components/site/sections";
import { CONTACT_EMAIL, routes } from "../components/site/routes";

export const metadata: Metadata = {
  title: "About | Aerium",
  description:
    "Aerium is a place for people who keep the physical economy running: manufacturers and distributors with AI built for their work.",
};

const VALUES = [
  { title: "Customer obsession", body: "We measure success by the value we deliver to the people we work with." },
  { title: "Excellence", body: "Our customers set a high bar. We aim higher." },
  { title: "Real problems, real people", body: "We work on hard problems, side by side with the teams who live them." },
  { title: "Pushing the limit", body: "We bring frontier AI into manufacturing and distribution." },
];

export default function AboutPage() {
  return (
    <SiteShell navOverlay>
      <PhotoHero
        image="/site/pages/about-hero.jpg"
        title="A place for people who keep the physical economy running"
        sub="Our name comes from -arium, a place for. Aerium is where the people who make, move, and maintain things get AI built for their work."
      >
        <div className="b-definition">
          <span className="b-definition-word">ae·ri·um</span>
          <span className="b-definition-note">noun, from -arium: a place for</span>
        </div>
      </PhotoHero>

      <section className="b-section b-white">
        <div className="b-wrap">
          <SectionIntro
            eyebrow="What we stand for"
            title="Aerium is a place for"
            lede="Four things we hold ourselves to, with customers and with each other."
          />
          <RuledColumns items={VALUES} />
        </div>
      </section>

      <section className="b-split">
        <div className="b-split-photo" data-reveal="mask" style={{ ["--photo" as string]: "url(/site/pages/about-story.jpg)" }} />
        <div className="b-split-copy" data-reveal="stagger">
          <div className="b-eyebrow">Our story</div>
          <h2 className="b-h2">Built with industrials</h2>
          <p className="b-lede">
            Manufacturers and distributors run on knowledge that lives in people’s heads, inboxes, and spreadsheets.
            General-purpose AI is of little use until it understands their equipment, their margins, and their customers.
          </p>
          <p className="b-lede">
            So our engineers go on site. They learn how the work actually flows, connect every system that holds it, and
            deploy an AI workforce grounded in each customer’s context, one that takes real work off people’s plates and
            helps their teams win.
          </p>
        </div>
      </section>

      <ClosingCta
        title="Do the best work of your career with us"
        primary={{ label: "See open roles", href: `${routes.careers}#open-roles` }}
        secondary={{ label: "Email the founders", href: `mailto:${CONTACT_EMAIL}` }}
      />
    </SiteShell>
  );
}
