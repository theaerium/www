import HeroMedia from "../HeroMedia";
import {
  PLATFORM_HERO_INTERVAL_MS,
  PLATFORM_HERO_SEQUENCE,
  PLATFORM_HERO_SLIDES,
} from "../platformHeroSlides";
import { routes } from "../routes";
import Link from "next/link";
import RollLabel from "../RollLabel";

const LOGOS = [
  { src: "/site/home/logo-stak-white.png", alt: "STAK Industries Inc.", width: 131, height: 48, href: "https://www.stakindustries.com/" },
  {
    src: "/site/home/logo-hammond-white.png",
    alt: "Hammond Power Solutions",
    width: 145,
    height: 46,
    href: "https://americas.hammondpowersolutions.com/",
  },
  { src: "/site/home/logo-ward-white.png", alt: "Ward Industrials", width: 168, height: 34, href: "https://ward.ca/" },
];

export default function HomeHero() {
  return (
    <section className="b-hero">
      <HeroMedia slides={PLATFORM_HERO_SLIDES} sequence={PLATFORM_HERO_SEQUENCE} intervalMs={PLATFORM_HERO_INTERVAL_MS} />
      <div className="b-hero-overlay" aria-hidden="true" />

      <div className="b-hero-content">
        <h1 className="b-hero-title">Operationalizing manufacturer data to grow margin.</h1>
        <p className="b-hero-sub">
          Every new system and AI tool adds another silo. Aerium turns all of it into faster quotes, healthier margins and
          growth, before your competitors do.
        </p>
        <div className="b-btn-row">
          <Link href={routes.bookDemo} className="b-btn b-btn-white">
            <RollLabel>Book a demo</RollLabel>
          </Link>
          <Link href={routes.seeItInAction} className="b-btn b-btn-burgundy">
            <RollLabel>See it in action</RollLabel>
          </Link>
        </div>
      </div>

      <div className="b-hero-logos">
        {LOGOS.map((logo) => (
          <a key={logo.src} href={logo.href} target="_blank" rel="noreferrer" aria-label={logo.alt}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} />
          </a>
        ))}
        <span className="b-hero-logos-more">+ more</span>
      </div>
    </section>
  );
}
