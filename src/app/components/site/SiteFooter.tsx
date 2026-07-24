import Link from "next/link";
import { routes, CONTACT_EMAIL } from "./routes";

export default function SiteFooter() {
  return (
    <footer className="site-footer railed rail-dark">
      <div className="rail-lines" aria-hidden="true" />
      <div className="site-footer-inner">
        <div className="site-footer-grid">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/site/aerium-logo-cream.svg"
              alt="Aerium"
              style={{ height: 20, width: "auto", display: "block" }}
            />
            <p
              style={{
                margin: "18px 0 0",
                color: "rgba(255,255,255,0.6)",
                fontSize: 14.5,
                lineHeight: 1.6,
                maxWidth: 320,
              }}
            >
              The AI workforce for industrial manufacturers and distributors.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              style={{
                display: "inline-block",
                marginTop: 16,
                color: "var(--site-amber)",
                fontFamily: "var(--font-plex)",
                fontSize: 13,
                textDecoration: "none",
              }}
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          <div className="site-footer-col">
            <span className="site-footer-label">PRODUCT</span>
            <Link href={routes.platform} className="site-footer-link">
              Platform
            </Link>
            <Link href={routes.bookDemo} className="site-footer-link">
              Book a demo
            </Link>
          </div>

          <div className="site-footer-col">
            <span className="site-footer-label">SOLUTIONS</span>
            <Link href={routes.solutions.equipment} className="site-footer-link">
              Equipment Manufacturing
            </Link>
            <Link href={routes.solutions.chemicals} className="site-footer-link">
              Specialty Chemicals
            </Link>
            <Link href={routes.solutions.metal} className="site-footer-link">
              Metal Fabrication
            </Link>
            <Link href={routes.solutions.distribution} className="site-footer-link">
              Distribution
            </Link>
          </div>

          <div className="site-footer-col">
            <span className="site-footer-label">COMPANY</span>
            <Link href={routes.about} className="site-footer-link">
              About
            </Link>
            <Link href={routes.careers} className="site-footer-link">
              Careers
            </Link>
            <Link href={routes.media} className="site-footer-link">
              Media &amp; Events
            </Link>
          </div>
        </div>
      </div>
      <div className="site-footer-rule" aria-hidden="true" />
      <div className="site-footer-inner site-footer-inner-bottom">
        <div className="site-footer-bottom">
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>
            © 2026 2026 Senchi Technologies Inc. All rights reserved.
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/site/aerium-mark.svg" alt="" style={{ height: 28, width: "auto", opacity: 0.85 }} />
        </div>
      </div>
    </footer>
  );
}
