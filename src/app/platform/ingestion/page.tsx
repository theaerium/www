import { Metadata } from "next";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Image from "next/image";
import theme from "@/app/config/theme";

export const metadata: Metadata = {
  title: "Data Ingestion & Cleaning | Aerium",
  description:
    "Our data extraction pipelines take data from multiple sources and different data types and creates a single source of truth representing the data foundation of your business.",
};

export default function IngestionPage() {
  const features = [
    {
      title: "Multi-source data extraction",
      description:
        "Connect to multiple data sources including ERPs, spreadsheets, databases, and legacy systems to consolidate all your procurement data.",
    },
    {
      title: "Intelligent data cleaning",
      description:
        "Automatically identify and resolve data quality issues including duplicates, inconsistencies, and missing values.",
    },
    {
      title: "Single source of truth",
      description:
        "Create a unified data foundation that serves as the backbone for all your procurement operations and analytics.",
    },
    {
      title: "Real-time synchronization",
      description:
        "Keep your data up-to-date with automatic syncing across all connected systems and sources.",
    },
  ];

  const integrations = [
    {
      name: "NetSuite",
      logo: "/integrations/netsuite.jpeg",
      bgColor: "#3F3A37",
    },
    { name: "Epicor", logo: "/integrations/epicor.png", bgColor: "#025064" },
    { name: "SAP", logo: "/integrations/sap.png", bgColor: "#ffffff" },
    { name: "Odoo", logo: "/integrations/odoo.svg", bgColor: "#A24689" },
    {
      name: "Microsoft Dynamics",
      logo: "/integrations/dynamics.png",
      bgColor: "#002050",
    },
    { name: "Oracle", logo: "/integrations/oracle.png", bgColor: "#c74634" },
    { name: "Excel", logo: "/integrations/excel.png", bgColor: "#217346" },
    { name: "More", logo: null, bgColor: "#1a1a2e" },
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
                  Data Ingestion & Cleaning
                </h1>
                <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed">
                  Our data extraction pipelines take data from multiple sources
                  and different data types and create a single source of truth
                  representing the data foundation of your business.
                </p>
              </div>
              <div className="flex-1">
                <div
                  className={`w-full h-64 sm:h-80 lg:h-96 rounded-xl flex items-center justify-center p-4 bg-[#EEEFE2]`}
                >
                  <Image
                    src="/details/ingestion.png"
                    alt="Data Ingestion"
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

        {/* Integrations Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-medium text-black mb-8 text-center">
              Integrating into your existing systems
            </h2>
            <p className="text-lg text-gray-400 text-center mb-12 max-w-3xl mx-auto">
              We currently support a wide range of data formats and sources
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {integrations.map((integration) => (
                <div
                  key={integration.name}
                  className="rounded-xl p-2 flex items-center justify-center aspect-square"
                  style={{ backgroundColor: integration.bgColor }}
                >
                  {integration.logo ? (
                    <Image
                      src={integration.logo}
                      alt={integration.name}
                      width={200}
                      height={120}
                      className="object-contain w-3/4 h-auto max-h-24"
                      draggable={false}
                    />
                  ) : (
                    <span className="text-white text-6xl font-light">+</span>
                  )}
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
