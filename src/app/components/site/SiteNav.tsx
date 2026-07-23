"use client";

import Link from "next/link";
import { useState } from "react";
import { routes } from "./routes";

const solutions = [
  {
    href: routes.solutions.equipment,
    title: "Equipment Manufacturing",
    desc: "Quote faster. Keep lines fed.",
  },
  {
    href: routes.solutions.chemicals,
    title: "Specialty Chemicals",
    desc: "Feedstock, yield, and compliance in one picture.",
  },
  {
    href: routes.solutions.metal,
    title: "Metal Fabrication",
    desc: "RFQ to shipped part, nothing lost between.",
  },
  {
    href: routes.solutions.distribution,
    title: "Distribution",
    desc: "Right stock, right branch, right price.",
  },
];

const company = [
  { href: routes.about, title: "About us" },
  { href: routes.careers, title: "Careers" },
  { href: routes.media, title: "Media & Events" },
];

const Chevron = () => (
  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ display: "block" }}>
    <path
      d="M1 1l4 4 4-4"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function SiteNav() {
  const [open, setOpen] = useState<null | "solutions" | "company">(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className="site-nav-spacer" />
      <header className="site-nav">
        <div className="rail-lines" aria-hidden="true" />
        <div className="site-nav-inner">
          <Link
            href={routes.home}
            style={{ display: "flex", alignItems: "center", flexShrink: 0 }}
            aria-label="Aerium home"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/site/aerium-logo-black.svg"
              alt="Aerium"
              style={{ height: 20, width: "auto", display: "block" }}
            />
          </Link>

          <nav className="site-nav-links">
            <Link href={routes.platform} className="site-nav-link">
              Platform
            </Link>

            <div
              className="site-nav-dd-wrap"
              onMouseEnter={() => setOpen("solutions")}
              onMouseLeave={() => setOpen(null)}
            >
              <span className="site-nav-link site-nav-trigger">
                Solutions
                <Chevron />
              </span>
              {open === "solutions" && (
                <div className="site-nav-dropdown" style={{ minWidth: 300 }}>
                  {solutions.map((s) => (
                    <Link key={s.href} href={s.href} className="site-nav-dditem">
                      <span className="site-nav-dditem-title">{s.title}</span>
                      <span className="site-nav-dditem-desc">{s.desc}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div
              className="site-nav-dd-wrap"
              onMouseEnter={() => setOpen("company")}
              onMouseLeave={() => setOpen(null)}
            >
              <span className="site-nav-link site-nav-trigger">
                Company
                <Chevron />
              </span>
              {open === "company" && (
                <div className="site-nav-dropdown" style={{ minWidth: 220 }}>
                  {company.map((c) => (
                    <Link key={c.href} href={c.href} className="site-nav-dditem">
                      <span className="site-nav-dditem-title">{c.title}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <Link href={routes.bookDemo} className="site-btn site-btn-amber site-nav-cta site-nav-cta-desktop">
            Book a demo
          </Link>

          <button
            className="site-nav-burger"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              {mobileOpen ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div className="site-nav-mobile">
            <Link href={routes.platform} onClick={() => setMobileOpen(false)}>
              Platform
            </Link>
            <div className="mgroup-label">Solutions</div>
            <div className="sub">
              {solutions.map((s) => (
                <Link key={s.href} href={s.href} onClick={() => setMobileOpen(false)}>
                  {s.title}
                </Link>
              ))}
            </div>
            <div className="mgroup-label">Company</div>
            <div className="sub">
              {company.map((c) => (
                <Link key={c.href} href={c.href} onClick={() => setMobileOpen(false)}>
                  {c.title}
                </Link>
              ))}
            </div>
            <Link
              href={routes.bookDemo}
              className="site-btn site-btn-amber"
              style={{ marginTop: 20, width: "100%" }}
              onClick={() => setMobileOpen(false)}
            >
              Book a demo
            </Link>
          </div>
        )}
      </header>
    </>
  );
}
