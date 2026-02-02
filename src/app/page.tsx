import Header from "./components/header";
import Footer from "./components/footer";
import HeroSection from "./components/HeroSection";
import ProductOverview from "./components/ProductOverview";
import FeatureSection from "./components/FeatureSection";
import DeploymentSection from "./components/DeploymentSection";
import FAQSection from "./components/FAQSection";

const featureSections = [
  {
    label: "Sentinel",
    headline: "Understand the real costs of your business",
    bullets: [
      "Monitor upstream price movements from feedstock and other raw materials",
      "Factor in tariff movements, import duties, and customs to get a complete picture of your costs",
      "Identify opportunities to reduce spend 5-10%",
    ],
    imageSrc: "/ui/costs.svg",
    imageAlt: "Cost intelligence dashboard",
  },
  {
    label: "Orchestrator",
    headline: "Get your inputs when you need them",
    bullets: [
      "Connect to your ERP, Excel files, and other documents to understand your business needs",
      "Cut POs or create RFPs and source suppliers on custom orders to adhere to S&OP",
      "Extract supplier responses from any format: Excel, CSV, PDF, Text, and more, and conduct analysis",
    ],
    imageSrc: "/ui/orchestration.svg",
    imageAlt: "Orchestration dashboard",
  },
  {
    label: "Concierge",
    headline: "Updates and insights an email away",
    bullets: [
      "Aeri lives where you and your suppliers work.  Interact via email or teams, no new interfaces to learn",
      "Autonomously provides updates and insights to relevant team members",
      "Follow up with suppliers, keeping your team in the loop",
    ],
    imageSrc: "/ui/email.svg",
    imageAlt: "Email communication dashboard",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ProductOverview />
        {featureSections.map((section) => (
          <FeatureSection key={section.label} {...section} />
        ))}
        <DeploymentSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
