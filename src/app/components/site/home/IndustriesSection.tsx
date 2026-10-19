import { routes } from "../routes";
import ExpandingCards from "./ExpandingCards";

const INDUSTRIES = [
  {
    title: "Power and Electrical",
    body: "Transformers, switchgear and motors. Quote faster while copper and steel move under you.",
    hashId: "industries-power",
    href: routes.industries.power,
    image: "/site/home/industry-power.jpg",
  },
  {
    title: "Design to Manufacture",
    body: "Fabricators and contract manufacturers. Quote from the drawing and know your margin before you cut metal.",
    hashId: "industries-design-to-manufacture",
    href: routes.industries.designToManufacture,
    image: "/site/home/industry-design-to-manufacture.jpg",
  },
  {
    title: "Chemicals",
    body: "Specialty and formulated chemicals. Price batches as feedstock moves, with every spec and certificate in one place.",
    hashId: "industries-chemicals",
    href: routes.industries.chemicals,
    image: "/site/home/industry-chemicals.jpg",
  },
  {
    title: "Distributors",
    body: "Industrial and MRO distribution. Quote across thousands of SKUs and supplier price lists, and see every open PO before it slips.",
    hashId: "industries-distributors",
    href: routes.industries.distributors,
    image: "/site/home/industry-distributors.jpg",
  },
];

const INDUSTRY_HASH_IDS = INDUSTRIES.map((industry) => industry.hashId);

export default function IndustriesSection() {
  return (
    <section className="b-industries">
      <div className="b-wrap b-industries-intro" data-reveal="stagger">
        <div className="b-eyebrow">Industries</div>
        <h2 className="b-h2">Built for the companies that build everything else</h2>
      </div>
      <ExpandingCards defaultIndex={0} activeGrow={800 / 284} className="b-industry-cards" hashIds={INDUSTRY_HASH_IDS}>
        {INDUSTRIES.map((industry) => (
          <a
            key={industry.title}
            href={industry.href}
            className="b-industry-card"
            style={{ ["--industry-image" as string]: `url(${industry.image})` }}
          >
            <span className="b-industry-title-compact">{industry.title}</span>
            <span className="b-industry-detail">
              <span className="b-industry-title">{industry.title}</span>
              <span className="b-industry-footer">
                <span className="b-industry-body">{industry.body}</span>
              </span>
            </span>
          </a>
        ))}
      </ExpandingCards>
    </section>
  );
}
