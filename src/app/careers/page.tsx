import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "../components/site/SiteShell";
import RollLabel from "../components/site/RollLabel";
import HowWeHire from "../components/site/careers/HowWeHire";
import { ArrowIcon, ArrowLink, ClosingCta, PhotoHero, RuledColumns, SectionIntro } from "../components/site/sections";
import { CONTACT_EMAIL } from "../components/site/routes";
import { getRoles, rolePath } from "@/utils/content";

export const metadata: Metadata = {
  title: "Careers | Aerium",
  description:
    "Do the best work of your career, where the work is real. Small team, high ownership, forward deployed onto real factory floors.",
};

const HOW_WE_WORK = [
  { title: "Small team, high ownership", body: "You own a customer outcome end to end, from the first site visit to the agent running in production." },
  { title: "Forward deployed", body: "You spend real time on site with estimators, planners and plant managers, learning how the work actually flows." },
  { title: "Live in weeks", body: "We put real work into production fast, then improve it every week alongside the people who use it." },
  { title: "Hard, unglamorous data", body: "ERPs, CAD files, inboxes and machines with no API. If it can be seen, we find a way to use it." },
];

export default function CareersPage() {
  const roles = getRoles();

  return (
    <SiteShell navOverlay>
      <PhotoHero
        image="/site/pages/careers-hero.jpg"
        title="Do the best work of your career, where the work is real"
        sub="Small team, high ownership, forward deployed. You will ship AI onto real factory floors and see it change how a business runs within weeks."
      >
        <a href="#open-roles" className="b-btn b-btn-white">
          <RollLabel>See open roles</RollLabel>
        </a>
      </PhotoHero>

      <section className="b-section b-white">
        <div className="b-wrap">
          <SectionIntro
            eyebrow="How we work"
            title="Built on the factory floor, with the people who run it"
            lede="We are a small team building custom AI for manufacturers. Everyone ships, everyone talks to customers, and the work shows up in their numbers."
          />
          <RuledColumns items={HOW_WE_WORK} />
        </div>
      </section>

      <section id="open-roles" className="b-section b-stone">
        <div className="b-wrap">
          <SectionIntro eyebrow="Open roles" title="Join the team" />
          <div className="b-list-card" data-reveal="stagger">
            {roles.map((role) => (
              <div key={role.slug} className="b-role-row">
                <div className="b-role-row-main">
                  <div className="b-role-row-title">
                    <Link href={rolePath(role.slug)}>{role.title}</Link>
                    {role.hiring && <span className="b-tag b-tag-accent">Hiring now</span>}
                  </div>
                  <p className="b-body-copy">{role.summary}</p>
                </div>
                <div className="b-role-row-meta">
                  <div>
                    <div className="b-role-row-team">{role.team}</div>
                    <div className="b-role-row-detail">{role.availability}</div>
                  </div>
                  <Link href={rolePath(role.slug)} className="b-btn b-btn-burgundy b-btn-small">
                    <RollLabel>View role</RollLabel>
                    <ArrowIcon size={14} />
                  </Link>
                </div>
              </div>
            ))}
            <div className="b-role-row b-role-row-open">
              <div>
                <div className="b-role-row-title">Don’t see your role?</div>
                <p className="b-body-copy">We hire ahead of the org chart for exceptional people. Tell us what you would build.</p>
              </div>
              <ArrowLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</ArrowLink>
            </div>
          </div>
        </div>
      </section>

      <HowWeHire tone="white" />

      <ClosingCta
        title="Help shape the next generation of manufacturing"
        primary={{ label: "View open roles", href: "#open-roles" }}
        secondary={{ label: "Email the founders", href: `mailto:${CONTACT_EMAIL}` }}
      />
    </SiteShell>
  );
}
