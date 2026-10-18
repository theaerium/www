"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AeriumMark from "./AeriumMark";
import { routes } from "./routes";

const products = [
  {
    href: routes.products.foundation,
    title: "Foundation",
    desc: "Every system you run, in one live model.",
  },
  {
    href: routes.products.forge,
    title: "Forge",
    desc: "Custom models trained on your jobs and parts.",
  },
  {
    href: routes.products.workforce,
    title: "Workforce",
    desc: "Agents that run workflows end to end.",
  },
];

const links = [
  { href: routes.customers, title: "Customers" },
  { href: routes.research, title: "Research" },
  { href: routes.resources, title: "Resources" },
];

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * `overlay` floats the nav transparently over a dark full-bleed hero until the
 * page scrolls, then it settles into the solid white bar used everywhere else.
 */
export default function SiteNav({ overlay = false }: { overlay?: boolean }) {
  const [productOpen, setProductOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!overlay) return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overlay]);

  const transparent = overlay && !scrolled && !mobileOpen;

  return (
    <>
      {!overlay && <div className="b-nav-spacer" />}
      <header className={`b-nav ${transparent ? "b-nav-transparent" : ""}`}>
        <div className="b-nav-inner">
          <Link href={routes.home} className="b-nav-brand" aria-label="Aerium home">
            {transparent ? <AeriumMark fill="#FFFFFF" stroke="#111111" /> : <AeriumMark fill="#111111" stroke="#FFFFFF" />}
            <span>Aerium</span>
          </Link>

          <nav className="b-nav-links">
            <div
              className="b-nav-dd-wrap"
              onMouseEnter={() => setProductOpen(true)}
              onMouseLeave={() => setProductOpen(false)}
            >
              <button
                type="button"
                className="b-nav-link"
                aria-expanded={productOpen}
                onClick={() => setProductOpen((v) => !v)}
              >
                Product
              </button>
              {productOpen && (
                <div className="b-nav-dropdown">
                  {products.map((p) => (
                    <Link key={p.title} href={p.href} className="b-nav-dditem" onClick={() => setProductOpen(false)}>
                      <span className="b-nav-dditem-title">{p.title}</span>
                      <span className="b-nav-dditem-desc">{p.desc}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {links.map((l) => (
              <Link key={l.title} href={l.href} className="b-nav-link">
                {l.title}
              </Link>
            ))}
          </nav>

          <div className="b-nav-end">
            <Link href={routes.seeItInAction} className="b-btn b-btn-burgundy b-nav-cta">
              See it in action
              <Arrow />
            </Link>
            <button
              className="b-nav-burger"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                {mobileOpen ? (
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="b-nav-mobile">
            <div className="b-nav-mobile-label">Product</div>
            {products.map((p) => (
              <Link key={p.title} href={p.href} className="b-nav-mobile-sub" onClick={() => setMobileOpen(false)}>
                {p.title}
              </Link>
            ))}
            {links.map((l) => (
              <Link key={l.title} href={l.href} onClick={() => setMobileOpen(false)}>
                {l.title}
              </Link>
            ))}
            <Link
              href={routes.bookDemo}
              className="b-btn b-btn-burgundy"
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
