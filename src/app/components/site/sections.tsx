import Link from "next/link";
import RollLabel from "./RollLabel";
import SplitWords from "./SplitWords";
import { CONTACT_EMAIL } from "./routes";

/** Internal routes use client navigation; mail, external and hash links stay plain anchors. */
export function SiteLink({ href, ...props }: React.ComponentProps<"a"> & { href: string }) {
  const external = /^https?:/.test(href);
  if (/^(mailto:|https?:)/.test(href) || href.includes("#")) {
    return <a href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})} {...props} />;
  }
  return <Link href={href} {...props} />;
}

export const ArrowIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" aria-hidden="true">
    <path d="M3 9h11M10 5l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

export const ExternalIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M5 11l6-6M6 5h5v5" fill="none" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

/** Underlined link with a trailing arrow, used for "Read the article", emails and event links. */
export function ArrowLink({ href, children, external = false }: { href: string; children: React.ReactNode; external?: boolean }) {
  return (
    <SiteLink href={href} className="b-underline-link">
      <span>{children}</span>
      {external ? <ExternalIcon /> : <ArrowIcon />}
    </SiteLink>
  );
}

export function SectionIntro({ eyebrow, title, lede }: { eyebrow: string; title: string; lede?: React.ReactNode }) {
  return (
    <div className="b-intro" data-reveal="stagger">
      <div className="b-intro-heading">
        <div className="b-eyebrow">{eyebrow}</div>
        <h2 className="b-h2">{title}</h2>
      </div>
      {lede && <div className="b-lede b-intro-lede">{lede}</div>}
    </div>
  );
}

export function RuledColumns({ items, numbered = false }: { items: { title: string; body: string }[]; numbered?: boolean }) {
  return (
    <div className="b-ruled-cols" data-reveal="stagger" style={{ ["--cols" as string]: items.length }}>
      {items.map((item, i) => (
        <div key={item.title} className="b-ruled-col">
          {numbered && <span className="b-ruled-num">{i + 1}</span>}
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </div>
      ))}
    </div>
  );
}

type CtaLink = { label: string; href: string };

export function ClosingCta({ title, primary, secondary }: { title: string; primary: CtaLink; secondary: CtaLink }) {
  return (
    <section className="b-cta" data-reveal="stagger">
      <h2 className="b-cta-title">
        <SplitWords text={title} />
      </h2>
      <div className="b-btn-row">
        <SiteLink href={primary.href} className="b-btn b-btn-burgundy" style={{ fontWeight: 600 }}>
          <RollLabel>{primary.label}</RollLabel>
        </SiteLink>
        <SiteLink href={secondary.href} className="b-btn b-btn-outline">
          <RollLabel>{secondary.label}</RollLabel>
        </SiteLink>
      </div>
    </section>
  );
}

/** Full-bleed photo hero with a centred headline, for top-level pages like About and Careers. */
export function PhotoHero({ image, title, sub, children }: { image: string; title: string; sub?: string; children?: React.ReactNode }) {
  return (
    <section className="b-page-hero">
      <div className="b-page-hero-photo" style={{ backgroundImage: `url(${image})` }} />
      <div className="b-page-hero-content">
        <h1 className="b-page-hero-title">
          <SplitWords text={title} />
        </h1>
        {sub && <p className="b-hero-sub">{sub}</p>}
        {children && <div className="b-page-hero-extra">{children}</div>}
      </div>
    </section>
  );
}

/** Dark grain header with a left-aligned headline, for listings and detail pages. */
export function GrainHeader({
  back,
  eyebrow,
  title,
  children,
  aside,
  size = "large",
}: {
  back?: CtaLink;
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
  aside?: React.ReactNode;
  size?: "large" | "article";
}) {
  return (
    <section className="b-header">
      <div className="b-wrap b-header-inner">
        {back && (
          <Link href={back.href} className="b-header-back">
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M13 8H3M6 4L2 8l4 4" fill="none" stroke="currentColor" strokeWidth="1.6" />
            </svg>
            {back.label}
          </Link>
        )}
        <div className="b-header-row">
          <div className={`b-header-main b-header-main-${size}`}>
            <div className="b-header-eyebrow">{eyebrow}</div>
            <h1 className="b-header-title">
              <SplitWords text={title} />
            </h1>
            {children}
          </div>
          {aside && <div className="b-header-aside">{aside}</div>}
        </div>
      </div>
    </section>
  );
}

export function PressSection({ tone = "white" }: { tone?: "white" | "stone" }) {
  return (
    <section className={`b-section b-${tone}`}>
      <div className="b-wrap b-intro b-intro-flush" data-reveal="stagger">
        <div className="b-intro-heading">
          <div className="b-eyebrow">Press and media</div>
          <h2 className="b-h2">Writing about Aerium?</h2>
        </div>
        <div className="b-intro-lede b-press-copy">
          <p className="b-lede">For interviews, speaking requests and media inquiries, write to the founders.</p>
          <ArrowLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</ArrowLink>
        </div>
      </div>
    </section>
  );
}
