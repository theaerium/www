"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "./button";
import { arrowIcon } from "./header";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden -mt-20">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/background/background.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Warm overlay with blur */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "rgba(252, 229, 205, 0.7)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 lg:pt-44">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-black leading-tight">
            The AI supply chain analyst, built for manufacturers.
          </h1>

          <p className="mt-8 text-lg sm:text-xl lg:text-2xl text-black leading-relaxed max-w-2xl mx-auto">
            From aeri@yourcompany.com, Aeri manages inventory and identifies
            cost savings like the best analyst on your team
          </p>

          {/* CTA */}
          <div className="mt-10 flex items-center justify-center">
            <Link href="/demo">
              <Button
                text="Book a demo"
                fontSize="large"
                backgroundColor="#000000"
                textColor="#FFFFFF"
                hoverColor="#333333"
                padding="px-10 py-3"
                icon={arrowIcon("white")}
              />
            </Link>
          </div>
        </div>

        {/* Product image */}
        <div className="mt-12 w-full max-w-3xl mx-auto">
          <Image
            src="/ui/laptop.png"
            alt="Aerium command center"
            width={746}
            height={447}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>
    </section>
  );
}
