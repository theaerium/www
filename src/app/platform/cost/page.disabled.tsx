import { Metadata } from "next";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Image from "next/image";
import theme from "@/app/config/theme";

export const metadata: Metadata = {
  title: "Cost Intelligence | Aerium",
  description:
    "Continuous monitoring of prices across all SKUs and landed cost & tariff visibility to ensure you always know you are paying the right price for your components.",
};

export default function CostPage() {
  const features = [
    {
      title: "Price monitoring",
      description:
        "Continuous monitoring of market prices across all your SKUs to identify when you're overpaying and spot negotiation opportunities.",
    },
    {
      title: "Landed cost visibility",
      description:
        "Full visibility into landed costs including shipping, duties, tariffs, and handling fees for accurate total purchasing costs.",
    },
    {
      title: "Tariff intelligence",
      description:
        "Stay ahead of tariff changes and trade policy updates with real-time alerts and impact analysis on your supply chain costs.",
    },
    {
      title: "Savings identification",
      description:
        "Automatically identify and capture savings opportunities to drive bottom line growth without additional effort.",
    },
  ];

  const capabilities = [
    "Market price benchmarking",
    "Supplier price comparison",
    "Historical cost trending",
    "Tariff impact analysis",
    "Currency fluctuation tracking",
    "Automated savings alerts",
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              <div className="flex-1 space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-black">
                  Cost Intelligence
                </h1>
                <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed">
                  Continuous monitoring of prices across all SKUs and landed
                  cost & tariff visibility to ensure you always know you are
                  paying the right price for your components.
                </p>
                <p className="text-lg text-gray-600">
                  Identify and capture savings opportunities automatically to
                  drive bottom line growth.
                </p>
              </div>
              <div className="flex-1">
                <div className="w-full h-64 sm:h-80 lg:h-96 bg-[#FD870B] rounded-xl flex items-center justify-center p-4">
                  <Image
                    src="/details/cost_intelligence_2.png"
                    alt="Cost Intelligence"
                    width={500}
                    height={400}
                    className="object-contain w-full h-full"
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-medium text-black mb-12 text-center">
              Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature) => (
                <div key={feature.title} className={`p-8 rounded-xl`}>
                  <h3 className="text-xl font-medium text-black mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities List Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-medium text-black mb-8 text-center">
              What you can do
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {capabilities.map((capability) => (
                <span
                  key={capability}
                  className="px-6 py-3 bg-orange-100 rounded-full text-black font-medium"
                >
                  {capability}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
