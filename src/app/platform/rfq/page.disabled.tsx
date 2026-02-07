import { Metadata } from "next";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Image from "next/image";
import theme from "@/app/config/theme";

export const metadata: Metadata = {
  title: "Purchasing & RFQ Orchestration | Aerium",
  description:
    "Aerium calculates what you need to purchase, when, and how much, taking into consideration everything from safety stock requirements, lead times, sales forecasts, and supplier scorecards.",
};

export default function RFQPage() {
  const features = [
    {
      title: "Intelligent demand forecasting",
      description:
        "We use machine learning to forecast component prices, considering historical data, seasonality, and market trends, and feedstock to predict your purchasing needs.",
    },
    {
      title: "Automated RFQ generation",
      description:
        "Automatically generate and send RFQs to qualified suppliers based on your requirements and supplier scorecards.",
    },
    {
      title: "Safety stock optimization",
      description:
        "Maintain optimal inventory levels with intelligent safety stock calculations that balance carrying costs against stockout risks.",
    },
    {
      title: "Lead time management",
      description:
        "Factor in supplier lead times and variability to ensure materials arrive exactly when needed.",
    },
  ];

  const benefits = [
    {
      stat: "1000+ hours",
      label: "Saved on supply chain tasks (based on previous experience)",
    },
    {
      stat: "60%",
      label: "Of procurement orchestration automated",
    },
    {
      stat: "24/7",
      label: "Autonomous monitoring and ordering",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
              <div className="flex-1 space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-black">
                  Purchasing & RFQ Orchestration
                </h1>
                <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed">
                  Aerium calculates what you need to purchase, when, and how
                  much, taking into consideration everything from safety stock
                  requirements, lead times, sales forecasts, and supplier
                  scorecards.
                </p>
                <p className="text-lg text-gray-600">
                  Give your supply chain team superpowers and ensure that
                  missing parts never cause the production line to go down.
                </p>
              </div>
              <div className="flex-1">
                <div className="w-full h-64 sm:h-80 lg:h-96 bg-[#EEEFE2] rounded-xl flex items-center justify-center p-4">
                  <Image
                    src="/details/rfq.png"
                    alt="RFQ Orchestration"
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

        <section
          className={`py-16 px-4 sm:px-6 lg:px-8 bg-[${theme.colors.orange}] text-white`}
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit) => (
                <div key={benefit.label} className="text-center">
                  <p className="text-5xl font-bold mb-3">{benefit.stat}</p>
                  <p className="text-lg text-white">{benefit.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-medium text-black mb-12 text-center">
              How it works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature) => (
                <div key={feature.title} className="p-8 rounded-xl">
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
      </main>
      <Footer />
    </div>
  );
}
