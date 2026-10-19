import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteShell from "../../components/site/SiteShell";
import RollLabel from "../../components/site/RollLabel";
import HowWeHire from "../../components/site/careers/HowWeHire";
import Markdown from "../../components/site/content/Markdown";
import { GrainHeader, SiteLink } from "../../components/site/sections";
import { CONTACT_EMAIL, routes } from "../../components/site/routes";
import { getRole, getRoles, type Role } from "@/utils/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return getRoles().map((role) => ({ slug: role.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const role = getRole((await params).slug);
  return role ? { title: `${role.title} | Careers | Aerium`, description: role.summary } : {};
}

const applyHref = (role: Role) =>
  role.applyUrl || `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Application: ${role.title}`)}`;

export default async function RolePage({ params }: { params: Promise<{ slug: string }> }) {
  const role = getRole((await params).slug);
  if (!role) notFound();

  const facts = [
    ["Location", role.location],
    ["Work style", role.workStyle],
    ["Type", role.type],
    ["Reports to", role.reportsTo],
    ["Compensation", role.compensation],
  ].filter((fact): fact is [string, string] => Boolean(fact[1]));

  return (
    <SiteShell navOverlay>
      <GrainHeader
        back={{ label: "All roles", href: `${routes.careers}#open-roles` }}
        eyebrow={role.team}
        title={role.title}
        aside={
          <SiteLink href={applyHref(role)} className="b-btn b-btn-white">
            <RollLabel>Apply for this role</RollLabel>
          </SiteLink>
        }
      >
        <div className="b-chips">
          {[role.type, role.workStyle, role.location].map((chip) => (
            <span key={chip} className="b-chip-outline">
              {chip}
            </span>
          ))}
        </div>
      </GrainHeader>

      <section className="b-white">
        <div className="b-wrap b-role">
          <div className="b-role-main">
            <div className="b-role-intro">
              <div className="b-eyebrow">About the role</div>
              <h2 className="b-role-headline">{role.headline}</h2>
            </div>
            <Markdown className="b-prose-role">{role.body}</Markdown>
          </div>
          <aside className="b-role-card">
            <div className="b-role-card-head">
              <div className="b-role-card-title">{role.title}</div>
              <div className="b-role-card-team">{role.team}</div>
            </div>
            <dl className="b-role-facts">
              {facts.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <div className="b-role-card-apply">
              <SiteLink href={applyHref(role)} className="b-btn b-btn-burgundy" style={{ fontWeight: 600 }}>
                <RollLabel>Apply for this role</RollLabel>
              </SiteLink>
              <p>Or write to {CONTACT_EMAIL}</p>
            </div>
          </aside>
        </div>
      </section>

      <HowWeHire tone="stone" />
    </SiteShell>
  );
}
