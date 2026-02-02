"use client";

import theme from "../config/theme";
import DetailCard from "./detail-cards/DetailCard";
import SecurityCard from "./detail-cards/SecurityCard";
import ROICalculator from "./ROICalculator";

export default function DetailCardsSection() {
  const detailCards = [
    {
      title: "Data Ingestion & Cleaning", // TODO: reframe
      description:
        "Our data extraction pipelines take data from multiple sources and different data types and create a single source of truth representing the data foundation of your business",
      subText:
        "We currently support Excel, CSV, Word, PDFs, standard text files, SQL / database exports and common ERPs such as Epicor Kinetic or Netsuite",
      imageSrc: "/details/ingestion.png", // TODO: Get a cooler picture
      imageAlt: "Ingest data",
      isReversed: false,
      backgroundColor: theme.colors.gray,
      showArrow: false,
    },
    {
      title: "Purchasing & RFQ Orchestration",
      description:
        "Aerium calculates what you need to purchase, when, and how much, taking into consideration everything from safety stock requirements, lead times, sales forecasts, and supplier scorecards",
      subText:
        "Give your supply chain team superpowers and ensure that missing parts never cause the production line to go down",
      imageSrc: "/details/rfq.png",
      imageAlt: "Orchestration",
      isReversed: true,
      backgroundColor: theme.colors.orange,
      showArrow: false,
    },
    {
      title: "Cost Intelligence",
      description:
        "Continuous monitoring of prices acroess all SKUs and landed cost & tariff visibility to ensure you always know you are paying the right price for your components",
      subText:
        "Identify can capture savings opportunities automatically to drive bottom line growth",
      imageSrc: "/details/cost_intelligence_2.png",
      imageAlt: "Cost Intelligence",
      isReversed: false,
      backgroundColor: theme.colors.gray,
      showArrow: false,
    },
    {
      title: "Built with your team, for your team",
      description:
        "We embed ourselves directly within your team to complete the last-mile of development, which is always bespoke to you",
      subText:
        "After initial implementation, we provide ongoing support to ensure you realize value",
      imageSrc: "/details/embedded.png",
      imageAlt: "Cost Intelligence",
      isReversed: true,
      backgroundColor: theme.colors.orange,
      showArrow: false,
    },
  ];

  return (
    <section id="detail-cards-section">
      {detailCards.map((card, index) => (
        <div key={card.title} data-card-index={index}>
          <DetailCard
            title={card.title}
            description={card.description}
            subText={card.subText}
            imageSrc={card.imageSrc}
            imageAlt={card.imageAlt}
            isReversed={card.isReversed}
            backgroundColor={card.backgroundColor}
            className={index === 0 ? "pt-0" : ""}
            showArrow={card.showArrow}
            imageTouchesBottom={index === 0}
          />
        </div>
      ))}
      <SecurityCard />
      <ROICalculator />
    </section>
  );
}
