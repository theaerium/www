import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "./components/site/SiteShell";
import { routes } from "./components/site/routes";
import HomeHero from "./components/site/home/HomeHero";
import ContextGraph from "./components/site/home/ContextGraph";
import LayersSection from "./components/site/home/LayersSection";
import IndustriesSection from "./components/site/home/IndustriesSection";
import Showcase, { type ShowcaseItem } from "./components/site/home/Showcase";
import { ClosingCta, RuledColumns, SectionIntro } from "./components/site/sections";
import CountUp from "./components/site/home/CountUp";

export const metadata: Metadata = {
  title: "Aerium | Operationalizing manufacturer data to grow margin",
  description:
    "Every new system and AI tool adds another silo. Aerium turns all of it into faster quotes, healthier margins and growth, before your competitors do.",
};

const PRODUCT_ITEMS: ShowcaseItem[] = [
  {
    title: "Connect every source",
    body: "ERP, telemetry, field service, price sheets and document shares, mapped into one model with every entity and relationship counted.",
    href: routes.products.foundation,
    image: "/site/home/product-sources.jpg",
    imageAlt: "Aerium Sources view: telemetry, field service, ERP and price sheets mapped into one model",
  },
  {
    title: "Map how it all connects",
    body: "Parts, jobs, customers, suppliers and machines linked across every system, so a change in one place shows up everywhere it matters.",
    href: routes.products.foundation,
    image: "/site/home/product-graph.jpg",
    imageAlt: "Aerium graph view linking work orders, equipment, customers, parts and suppliers",
    backdrop: "/site/home/product-backdrop-whiteboard.jpg",
  },
  {
    title: "Find anything in milliseconds",
    body: "Ask about any order, part or supplier in plain language and get the answer with the records behind it.",
    href: routes.products.foundation,
    image: "/site/home/product-search.jpg",
    imageAlt: "Aerium search returning 539 matching alarms in 29 milliseconds",
    backdrop: "/site/home/product-backdrop-laptop.jpg",
  },
  {
    title: "Search past jobs by drawing",
    body: "Drop in a drawing and pull up the closest jobs you’ve run before, with what they cost and how long they took.",
    href: routes.products.forge,
    image: "/site/home/product-job-archive.jpg",
    imageAlt: "Aerium historical job archive with search by drawing",
    backdrop: "/site/home/product-backdrop-estimator.jpg",
  },
];

const QUOTE_SHOT = {
  image: "/site/home/use-cases-quote.jpg",
  imageAlt: "Aerium quote estimation for a brake pressuriser, with estimated hours, sell value and cost",
};

const USE_CASE_ITEMS: ShowcaseItem[] = [
  {
    slug: "quoting",
    title: "Quoting and estimation",
    body: "The agent reads the RFQ and drawings, finds the closest past jobs by geometry, and drafts a quote at today’s costs. Your estimator reviews and sends.",
    href: routes.products.workforce,
    ...QUOTE_SHOT,
  },
  {
    slug: "costing",
    title: "Costing",
    body: "Should-cost every part from live material, labour and machine rates, and see where margin leaks before the job ships.",
    href: routes.products.forge,
    ...QUOTE_SHOT,
  },
  {
    slug: "supply-chain",
    title: "Supply chain",
    body: "The agent watches open POs and supplier lead times, flags slips early, and drafts alternates for your buyer to approve.",
    href: routes.products.workforce,
    ...QUOTE_SHOT,
  },
];

const DIFFERENTIATORS = [
  {
    title: "Any source, even without an API",
    body: "ERPs, inboxes, drawings, spreadsheets and machines with no connector. If your team can see it, we can connect it.",
  },
  { title: "Built around how you work", body: "Bespoke to your processes and built on site alongside your people" },
  { title: "Value in weeks, used every day", body: "Live on real work fast, inside the tools your team already uses" },
];

const TEAMS = [
  {
    title: "Finance",
    body: "Predictable cost, with returns you can measure in margin and revenue.",
  },
  {
    title: "Operations",
    body: "Know where every job, part and dollar is, right now.",
  },
  {
    title: "Estimating and sales",
    body: "Quote faster from every job you’ve run before, and win more of the work you want.",
  },
  {
    title: "IT and security",
    body: "Deployed on-prem or in your cloud, with full audit trails. Your data and models stay yours.",
  },
];

const STORY_STATS = [
  { value: "90%", label: "of targeted work automated" },
  { value: "10 hrs", label: "saved per week" },
  { value: "3 wks", label: "kickoff to live" },
];

const SECURITY_ITEMS = [
  {
    title: "SOC 2",
    body: "Independently audited controls",
    icon: (
      <>
        <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" fill="currentColor" />
        <path d="M8.8 12.2l2.2 2.2 4.2-4.4" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    title: "SSO and SAML",
    body: "Unified access controls",
    icon: (
      <>
        <circle cx="8" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M12 12h9M18 12v3.5M21 12v2.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "Canadian and US hosting",
    body: "Your data stays in your country",
    icon: (
      <>
        <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0113 0c0 5.4-6.5 11-6.5 11z" fill="currentColor" />
        <circle cx="12" cy="10" r="2.4" fill="#FFFFFF" />
      </>
    ),
  },
  {
    title: "On-prem or your cloud",
    body: "Deploy inside your own walls",
    icon: (
      <>
        <rect x="4" y="4" width="16" height="6.5" rx="1.5" fill="currentColor" />
        <rect x="4" y="13.5" width="16" height="6.5" rx="1.5" fill="currentColor" />
        <circle cx="7.5" cy="7.25" r="1" fill="#FFFFFF" />
        <circle cx="7.5" cy="16.75" r="1" fill="#FFFFFF" />
      </>
    ),
  },
];

export default function HomePage() {
  return (
    <SiteShell navOverlay>
      <HomeHero />

      <section className="b-graph">
        <div className="b-wrap b-graph-copy" data-reveal="stagger">
          <div className="b-eyebrow">Grow or fall behind</div>
          <h2 className="b-h2">More AI, more silos, less return</h2>
          <p className="b-lede">
            Each new tool adds another island of data. Without a way to connect it, AI spend generates negative ROI. Aerium is the
            layer that makes it pay off.
          </p>
        </div>
        <ContextGraph />
      </section>

      <LayersSection />

      <Showcase
        id="product"
        eyebrow="Product"
        title="See your whole operation in one place"
        items={PRODUCT_ITEMS}
        backdrop="/site/home/product-backdrop.jpg"
        mediaSide="right"
        frame={{ width: 1027, height: 854 }}
      />

      <section className="b-section b-white">
        <div className="b-wrap">
          <SectionIntro
            eyebrow="Why Aerium"
            title="The final step, not another layer"
            lede="A data warehouse is where data goes to sit. Aerium goes out to every system, collects what’s there, makes sense of it and puts it to work."
          />
          <RuledColumns items={DIFFERENTIATORS} />
        </div>
      </section>

      <Showcase
        id="use-cases"
        eyebrow="Use cases"
        title="Win more work, at a margin you can defend"
        items={USE_CASE_ITEMS}
        backdrop="/site/home/use-cases-backdrop.jpg"
        mediaSide="left"
        frame={{ width: 666, height: 395 }}
      />

      <IndustriesSection />

      <section id="customer-story" className="b-story">
        <div className="b-story-photo" data-reveal="mask" role="img" aria-label="Ward Industrials leadership on the shop floor" />
        <div className="b-story-copy">
          <div className="b-story-copy-inner" data-reveal="stagger">
            <div className="b-eyebrow">Customer story</div>
            <blockquote className="b-story-quote">
              “Aerium’s workforce is already automating 90% of the work we need to do.”
            </blockquote>
            <div className="b-story-attribution">
              <strong>Michael Ward</strong>
              <span>President, Ward Industrials</span>
            </div>
            <dl className="b-story-stats">
              {STORY_STATS.map((stat) => (
                <div key={stat.value}>
                  <dt>
                    <CountUp value={stat.value} />
                  </dt>
                  <dd>{stat.label}</dd>
                </div>
              ))}
            </dl>
            <Link href={routes.customers} className="b-text-link b-story-link">
              Read the full story
            </Link>
          </div>
        </div>
      </section>

      <section className="b-section b-white">
        <div className="b-wrap">
          <SectionIntro
            eyebrow="For everyone in the room"
            title="Built to make your whole team look good"
            lede="One platform that pays back in margin and revenue, answers the questions your team asks every day, and never leaves your walls."
          />
          <RuledColumns items={TEAMS} />
        </div>
      </section>

      <section id="security" className="b-section b-stone">
        <div className="b-wrap b-security">
          <div className="b-security-copy" data-reveal="stagger">
            <div className="b-eyebrow">Security</div>
            <h2 className="b-h2">Enterprise-grade security, wherever your data lives</h2>
            <p className="b-body-copy">
              You keep full ownership of your data and models. Host in Canada or the US, or run Aerium on-prem or in your
              own cloud. Your data is never used to train anyone else’s models.
            </p>
            <Link href={routes.security} className="b-arrow-link">
              More about security
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
          <div className="b-security-grid" data-reveal="stagger">
            {SECURITY_ITEMS.map((item) => (
              <div key={item.title} className="b-security-item">
                <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                  {item.icon}
                </svg>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ClosingCta
        title="Grow faster than your market"
        primary={{ label: "Book a demo", href: routes.bookDemo }}
        secondary={{ label: "See it in action", href: routes.seeItInAction }}
      />
    </SiteShell>
  );
}
