import Link from "next/link";
import { routes } from "../routes";
import ExpandingCards from "./ExpandingCards";

const INDUSTRIES = [
  {
    title: "Power and Electrical",
    body: "Transformers, switchgear and motors. Quote faster while copper and steel move under you.",
    href: routes.industries.power,
    image: "/site/home/industry-power.jpg",
  },
  {
    title: "Design to Manufacture",
    body: "Fabricators and contract manufacturers. Quote from the drawing and know your margin before you cut metal.",
    href: routes.industries.designToManufacture,
    image: "/site/home/industry-design-to-manufacture.jpg",
  },
  {
    title: "Chemicals",
    body: "Specialty and formulated chemicals. Price batches as feedstock moves, with every spec and certificate in one place.",
    href: routes.industries.chemicals,
    image: "/site/home/industry-chemicals.jpg",
  },
];

export default function IndustriesSection() {
  return (
    <section className="b-industries">
      <div className="b-wrap b-industries-intro">
        <div className="b-eyebrow">Industries</div>
        <h2 className="b-h2">Built for the companies that build everything else</h2>
      </div>
      <ExpandingCards defaultIndex={0} activeGrow={800 / 284} className="b-industry-cards">
        {INDUSTRIES.map((industry) => (
          <Link
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
                <span className="b-industry-more">Learn more</span>
              </span>
            </span>
          </Link>
        ))}
      </ExpandingCards>
    </section>
  );
}
