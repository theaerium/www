"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "./button";

export default function Hero() {
  const cardDimensions = (cardWidth: number) => {
    const width = 453;
    const height = 485;
    const aspectRatio = width / height;
    const newWidth = cardWidth;
    const newHeight = newWidth / aspectRatio;
    return { width: newWidth, height: newHeight };
  };
  const phoneDimensions = (phoneWidth: number) => {
    const width = 252.52;
    const height = 536;
    const aspectRatio = width / height;
    const newWidth = phoneWidth;
    const newHeight = newWidth / aspectRatio;
    return { width: newWidth, height: newHeight };
  };

  const arrowIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2.2"
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
        />
      </svg>
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Main Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-4">
        <div className="pt-16">
          <div className="relative">
            <div className="bg-gradient-to-b from-cream to-orange rounded-xl sm:rounded-[1rem] lg:rounded-[1rem] pt-10 sm:pt-14 lg:pt-18 px-10 sm:px-14 lg:px-18 pb-6 sm:pb-8 lg:pb-10 min-h-[60vh] sm:min-h-[65vh] md:min-h-[65vh] lg:min-h-[75vh] xl:min-h-[80vh] max-h-[90vh]">
              {/* Overlaid headline with left indent */}
              <div className="absolute -top-6 sm:-top-8 lg:-top-10 left-6 sm:left-12 lg:left-16 z-30">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-black leading-tight">
                  Continuous price monitoring and autonomous negotiations for
                  procurement teams
                </h1>
              </div>

              {/* Overlaid descriptive text */}
              <div className="absolute top-56 sm:top-64 lg:top-52 left-6 sm:left-12 lg:left-16 z-30 max-w-2xl">
                <p className="text-base sm:text-lg lg:text-xl text-black leading-relaxed">
                  We use AI to monitor prices across thousands of SKUs,
                  identifying savings opportunities, creating bidsheets,
                  analyzing, and negotiating with suppliers to deliver savings
                  without months of work
                </p>
              </div>

              <div className="h-full flex flex-col min-h-[50vh] relative">
                <div className="flex justify-center items-center -mt-8 sm:-mt-4 lg:-mt-2 flex-shrink-0 flex-grow">
                  {/*<div className="relative">
                    <Image
                      src="/mocks/phone_main.png"
                      alt="Aerium App on Phone"
                      width={phoneDimensions(280).width}
                      height={phoneDimensions(280).height}
                      className="object-contain translate-x-8 w-[160px] sm:w-[180px] md:w-[160px] lg:w-[200px] xl:w-[280px] 2xl:w-[320px]"
                      draggable={false}
                    />
                    <Image
                      src="/cards/aerium_card.png"
                      alt="Aerium Visa Card"
                      width={cardDimensions(220).width}
                      height={cardDimensions(220).height}
                      className="object-contain absolute bottom-0 left-1/2 -translate-x-24 sm:-translate-x-32 md:-translate-x-28 lg:-translate-x-36 xl:-translate-x-48 2xl:-translate-x-64 z-10 w-[120px] sm:w-[130px] md:w-[120px] lg:w-[140px] xl:w-[200px] 2xl:w-[240px]"
                      draggable={false}
                    />
                  </div>*/}
                </div>
              </div>

              {/* CTA Button at bottom */}
              <div className="absolute bottom-8 left-0 right-0 px-10 sm:left-14 sm:right-auto sm:px-0 lg:left-18 z-30">
                <Link href="/demo" className="block sm:inline-block">
                  <Button
                    text="Request a demo"
                    fontSize="large"
                    backgroundColor="white"
                    textColor="black"
                    hoverColor="#F5F5F5"
                    icon={arrowIcon()}
                    className="w-full sm:w-auto justify-between"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
