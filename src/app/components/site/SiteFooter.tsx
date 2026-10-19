import Link from "next/link";
import AeriumLogo from "./AeriumLogo";
import { routes, CONTACT_EMAIL } from "./routes";

const columns = [
  {
    title: "Products",
    links: [
      { label: "Foundation", href: routes.products.foundation },
      { label: "Forge", href: routes.products.forge },
      { label: "Workforce", href: routes.products.workforce },
    ],
  },
  {
    title: "Use cases",
    links: [
      { label: "Quoting and estimation", href: routes.useCases.quoting },
      { label: "Costing", href: routes.useCases.costing },
      { label: "Supply chain", href: routes.useCases.supplyChain },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Power and electrical", href: routes.industries.power },
      { label: "Design to manufacture", href: routes.industries.designToManufacture },
      { label: "Chemicals", href: routes.industries.chemicals },
      { label: "Distributors", href: routes.industries.distributors },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: routes.about },
      { label: "Careers", href: routes.careers },
      { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="b-footer">
      <div className="b-footer-top">
        <Link href={routes.home} className="b-footer-brand" aria-label="Aerium home">
          <AeriumLogo color="#FFFFFF" gap="#6B0F1A" />
        </Link>
        <div className="b-footer-cols">
          {columns.map((col) => (
            <div key={col.title} className="b-footer-col">
              <span className="b-footer-label">{col.title}</span>
              {col.links.map((l) =>
                // Hash links use native navigation so the homepage accordion hears `hashchange`.
                l.href.startsWith("mailto:") || l.href.includes("#") ? (
                  <a key={l.label} href={l.href} className="b-footer-link">
                    {l.label}
                  </a>
                ) : (
                  <Link key={l.label} href={l.href} className="b-footer-link">
                    {l.label}
                  </Link>
                ),
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="b-footer-bottom">
        <span>© 2026 Senchi Technologies Inc.</span>
        <span>Toronto and New York</span>
      </div>
    </footer>
  );
}
