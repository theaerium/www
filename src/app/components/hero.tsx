"use client";

import Image from "next/image";
import Link from "next/link";
import theme from "../config/theme";
import Button from "./button";
import { arrowIcon } from "./header";

export default function Hero() {
  const scrollToDetails = () => {
    const detailSection = document.getElementById("detail-cards-section");
    if (detailSection) {
      detailSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange from-5% to-cream to-100%" />

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pt-24 sZm:pt-32 lg:pt-40 pb-24 sm:pb-36 lg:pb-48">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left side - Text content */}
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-black leading-tight">
                The operating system for procurement teams
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-xl">
                Easy to use data-cleaning, RFQ orchestration and cost analysis
                tools to turn procurement into your advantage
              </p>

              {/* Buttons */}
              <div className="flex flex-col items-start gap-4 pt-4">
                <Link href="/demo" target="_blank">
                  <Button
                    text="Request a demo"
                    fontSize="large"
                    backgroundColor={theme.colors.orange}
                    textColor={theme.colors.black}
                    hoverColor="#E67A00"
                    icon={arrowIcon()}
                  />
                </Link>

                <button
                  onClick={scrollToDetails}
                  className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors text-base font-medium"
                >
                  Explore product
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
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Right side - Image */}
            <div className="flex-1 lg:flex-[1.5] ml-12">
              <Image
                src="/hero/hero_img.png"
                alt="Aerium procurement platform"
                width={1500}
                height={1125}
                className="object-contain w-full h-auto scale-125 lg:scale-150"
                draggable={false}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
