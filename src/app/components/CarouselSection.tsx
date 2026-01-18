"use client";

import { useRef } from "react";
import Carousel from "./carousel/Carousel";
import Button from "./button";
import theme from "../config/theme";
import CostIntelligenceChart from "./carousel/CostIntelligenceChart";

export default function CarouselSection() {
  const carouselRef = useRef<{
    goToNext: () => void;
    goToPrevious: () => void;
  }>(null);

  const scrollToDetailSection = (sectionIndex: number) => {
    const detailSection = document.getElementById("detail-cards-section");
    if (detailSection) {
      const cards = detailSection.querySelectorAll("[data-card-index]");
      const targetCard = cards[sectionIndex] as HTMLElement;
      if (targetCard) {
        targetCard.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };
  const carouselCards = [
    {
      id: "data_ingestion",
      backgroundColor: theme.colors.gray,
      imageSrc: "/carousel/ingestion.svg",
      imageAlt: "Ingest data",
      imagePosition: "center" as const,
      imageSize: "full" as const,
      bottomText: "Ingest Data",
      bottomTextColor: "black",
      onClick: () => scrollToDetailSection(0),
    },
    {
      id: "rfq",
      backgroundColor: theme.colors.orange,
      imageSrc: "/carousel/rfq.png",
      imageAlt: "Orchestrate RFQs",
      imagePosition: "center" as const,
      imageSize: "large" as const,
      bottomText: "RFQ and Purchasing Orchestration",
      bottomTextColor: "black",
      onClick: () => scrollToDetailSection(1),
    },
    {
      id: "cost-intelligence",
      backgroundColor: theme.colors.gray,
      imageAlt: "Monitor and understand SKU costs",
      bottomText: "Cost Intelligence",
      bottomTextColor: "black",
      onClick: () => scrollToDetailSection(2),
      customContent: <CostIntelligenceChart />,
    },
    {
      id: "security",
      backgroundColor: theme.colors.black,
      imageSrc: "/carousel/lock.png",
      imageAlt: "Security",
      imagePosition: "center" as const,
      bottomText: "Security",
      bottomTextColor: "black",
      onClick: () => scrollToDetailSection(3),
    },
    {
      id: "embedded",
      backgroundColor: theme.colors.orange,
      imageSrc: "/carousel/embedded.png",
      imageAlt: "Embedded",
      imagePosition: "center" as const,
      imageSize: "large" as const,
      bottomText: "Built for your team",
      bottomTextColor: "black",
      onClick: () => scrollToDetailSection(3),
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="w-full">
        {/* Section Header with Navigation */}
        <div className="mb-8 flex items-start justify-between">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-black text-left">
            Product suite
          </h2>
          <div className="flex space-x-2">
            <Button
              text=""
              backgroundColor={theme.colors.gray}
              textColor={theme.colors.black}
              hoverColor="#D4D5C8"
              padding="px-4 py-2"
              onClick={() => carouselRef.current?.goToPrevious()}
              icon={
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              }
            />
            <Button
              text=""
              backgroundColor={theme.colors.gray}
              textColor={theme.colors.black}
              hoverColor="#D4D5C8"
              padding="px-4 py-2"
              onClick={() => carouselRef.current?.goToNext()}
              icon={
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              }
            />
          </div>
        </div>

        <div className="px-4 sm:px-6 lg:px-8">
          <Carousel ref={carouselRef} cards={carouselCards} />
        </div>
      </div>
    </section>
  );
}
