"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import AeriumMark from "./AeriumMark";
import RollLabel from "./RollLabel";
import { CONTACT_EMAIL, routes } from "./routes";

type MenuLink = { title: string; href: string; desc?: string };
type MenuColumn = { label: string; links: MenuLink[]; size?: "large" | "regular" | "plain" };
type Menu = {
  id: string;
  title: string;
  columns: MenuColumn[];
  featured: { label: string; image: string; caption: string; href: string };
};

const MENUS: Menu[] = [
  {
    id: "product",
    title: "Product",
    columns: [
      {
        label: "Platform",
        size: "large",
        links: [
          { title: "Foundation", desc: "Every system you run, in one live model", href: routes.products.foundation },
          { title: "Forge", desc: "Custom models built for your business", href: routes.products.forge },
          { title: "Workforce", desc: "Agents that run workflows end to end", href: routes.products.workforce },
        ],
      },
      {
        label: "Use cases",
        links: [
          { title: "Quoting and estimation", desc: "Quotes drafted from the RFQ and drawings", href: routes.useCases.quoting },
          { title: "Costing", desc: "Every part costed at today’s rates", href: routes.useCases.costing },
          { title: "Supply chain", desc: "Open POs and lead times, watched", href: routes.useCases.supplyChain },
        ],
      },
      {
        label: "Industries",
        size: "plain",
        links: [
          { title: "Power and electrical", href: routes.industries.power },
          { title: "Design to manufacture", href: routes.industries.designToManufacture },
          { title: "Chemicals", href: routes.industries.chemicals },
          { title: "Distributors", href: routes.industries.distributors },
        ],
      },
    ],
    featured: {
      label: "Customer story",
      image: "/site/home/customer-story.jpg",
      caption: "How Ward Industrials automated 90% of its targeted work in three weeks",
      href: routes.customers,
    },
  },
  {
    id: "resources",
    title: "Resources",
    columns: [
      {
        label: "Company",
        size: "large",
        links: [
          { title: "About", desc: "Who we are and how we work", href: routes.about },
          { title: "Careers", desc: "Build with us on site", href: routes.careers },
        ],
      },
      {
        label: "Learn",
        links: [
          { title: "Media and events", desc: "Talks, press and where to find us", href: routes.media },
          { title: "Security", desc: "Hosting, access and audit", href: routes.security },
        ],
      },
      {
        label: "Contact",
        size: "plain",
        links: [
          { title: "Book a demo", href: routes.bookDemo },
          { title: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
        ],
      },
    ],
    featured: {
      label: "Platform",
      image: "/site/images/equipment.jpg",
      caption: "See how Foundation, Forge and Workforce fit together",
      href: routes.platform,
    },
  },
];

const LINKS = [
  { href: routes.customers, title: "Customers" },
  { href: routes.research, title: "Research" },
];

const Arrow = () => (
  <svg className="b-arrow" width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Hash links (homepage sections) and other origins skip client routing: native
// navigation fires `hashchange`, which the homepage accordions listen for.
const isPlainAnchor = (href: string) => /^(mailto:|https?:)/.test(href) || href.includes("#");

function MenuAnchor({ link, className, onNavigate }: { link: MenuLink; className: string; onNavigate: () => void }) {
  const content = (
    <>
      <span className="b-mega-link-title">{link.title}</span>
      {link.desc && <span className="b-mega-link-desc">{link.desc}</span>}
    </>
  );
  return isPlainAnchor(link.href) ? (
    <a href={link.href} className={className} onClick={onNavigate}>
      {content}
    </a>
  ) : (
    <Link href={link.href} className={className} onClick={onNavigate}>
      {content}
    </Link>
  );
}

/**
 * `overlay` floats the nav transparently over a dark full-bleed hero until the
 * page scrolls, then it settles into the solid white bar used everywhere else.
 */
export default function SiteNav({ overlay = false }: { overlay?: boolean }) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (!overlay) return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overlay]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenMenu(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const open = (id: string) => {
    clearTimeout(closeTimer.current);
    setOpenMenu(id);
  };
  // A short grace period lets the pointer cross the gap between trigger and panel.
  const scheduleClose = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };
  const close = () => {
    clearTimeout(closeTimer.current);
    setOpenMenu(null);
  };

  const transparent = overlay && !scrolled && !mobileOpen && !openMenu;

  return (
    <>
      {!overlay && <div className="b-nav-spacer" />}
      <div className={`b-nav-scrim ${openMenu ? "is-open" : ""}`} aria-hidden="true" onClick={close} />
      <header
        className={`b-nav ${transparent ? "b-nav-transparent" : ""} ${openMenu ? "b-nav-menu-open" : ""}`}
        onMouseLeave={scheduleClose}
      >
        <div className="b-nav-inner">
          <Link href={routes.home} className="b-nav-brand" aria-label="Aerium home" onMouseEnter={close}>
            {transparent ? <AeriumMark fill="#FFFFFF" stroke="#111111" /> : <AeriumMark fill="#111111" stroke="#FFFFFF" />}
            <span>Aerium</span>
          </Link>

          <nav className="b-nav-links">
            {MENUS.slice(0, 1).map((menu) => (
              <button
                key={menu.id}
                type="button"
                className={`b-nav-link ${openMenu === menu.id ? "is-active" : ""}`}
                aria-expanded={openMenu === menu.id}
                aria-controls={`mega-${menu.id}`}
                onMouseEnter={() => open(menu.id)}
                onClick={() => (openMenu === menu.id ? close() : open(menu.id))}
              >
                {menu.title}
              </button>
            ))}
            {LINKS.map((l) =>
              isPlainAnchor(l.href) ? (
                <a key={l.title} href={l.href} className="b-nav-link" onMouseEnter={close}>
                  {l.title}
                </a>
              ) : (
                <Link key={l.title} href={l.href} className="b-nav-link" onMouseEnter={close}>
                  {l.title}
                </Link>
              ),
            )}
            {MENUS.slice(1).map((menu) => (
              <button
                key={menu.id}
                type="button"
                className={`b-nav-link ${openMenu === menu.id ? "is-active" : ""}`}
                aria-expanded={openMenu === menu.id}
                aria-controls={`mega-${menu.id}`}
                onMouseEnter={() => open(menu.id)}
                onClick={() => (openMenu === menu.id ? close() : open(menu.id))}
              >
                {menu.title}
              </button>
            ))}
          </nav>

          <div className="b-nav-end" onMouseEnter={close}>
            <Link href={routes.seeItInAction} className="b-btn b-btn-burgundy b-nav-cta">
              <RollLabel>See it in action</RollLabel>
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

        {MENUS.map((menu) => (
          <div
            key={menu.id}
            id={`mega-${menu.id}`}
            className={`b-mega ${openMenu === menu.id ? "is-open" : ""}`}
            onMouseEnter={() => open(menu.id)}
            inert={openMenu !== menu.id}
          >
            <div className="b-mega-columns">
              {menu.columns.map((column) => (
                <div key={column.label} className={`b-mega-col b-mega-col-${column.size ?? "regular"}`}>
                  <div className="b-mega-label">{column.label}</div>
                  {column.links.map((link) => (
                    <MenuAnchor key={link.title} link={link} className="b-mega-link" onNavigate={close} />
                  ))}
                </div>
              ))}
            </div>
            <Link href={menu.featured.href} className="b-mega-featured" onClick={close}>
              <div className="b-mega-label">{menu.featured.label}</div>
              <span className="b-mega-featured-image" style={{ backgroundImage: `url(${menu.featured.image})` }} />
              <span className="b-mega-featured-caption">
                {menu.featured.caption} <Arrow />
              </span>
            </Link>
          </div>
        ))}

        {mobileOpen && (
          <div className="b-nav-mobile">
            {MENUS.map((menu) => (
              <div key={menu.id} className="b-nav-mobile-group">
                {menu.columns.map((column) => (
                  <div key={column.label}>
                    <div className="b-nav-mobile-label">{column.label}</div>
                    {column.links.map((link) =>
                      isPlainAnchor(link.href) ? (
                        <a key={link.title} href={link.href} className="b-nav-mobile-sub" onClick={() => setMobileOpen(false)}>
                          {link.title}
                        </a>
                      ) : (
                        <Link key={link.title} href={link.href} className="b-nav-mobile-sub" onClick={() => setMobileOpen(false)}>
                          {link.title}
                        </Link>
                      ),
                    )}
                  </div>
                ))}
              </div>
            ))}
            {LINKS.map((l) => (
              <a key={l.title} href={l.href} onClick={() => setMobileOpen(false)}>
                {l.title}
              </a>
            ))}
            <Link
              href={routes.bookDemo}
              className="b-btn b-btn-burgundy"
              style={{ marginTop: 20, width: "100%" }}
              onClick={() => setMobileOpen(false)}
            >
              <RollLabel>Book a demo</RollLabel>
            </Link>
          </div>
        )}
      </header>
    </>
  );
}
