"use client";

import Link from "next/link";
import Button from "./button";
import { arrowIcon } from "./header";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#FCE5CD" }}>
      <div className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto">
          {/* CTA Section */}
          <div className="mb-16 sm:mb-20 lg:mb-24">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-normal text-black leading-tight max-w-xl">
              Upgrade your supply chain
            </h2>
            <p className="mt-6 text-xl sm:text-2xl lg:text-3xl text-black leading-snug max-w-xl">
              Focus on moving metal rather than following parts.
            </p>
            <div className="mt-8">
              <Link href="/demo">
                <Button
                  text="Book a demo"
                  fontSize="large"
                  backgroundColor="#000000"
                  textColor="#FFFFFF"
                  hoverColor="#333333"
                  padding="px-8 py-3"
                  icon={arrowIcon("white")}
                />
              </Link>
            </div>
          </div>

          {/* Footer info */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-8">
            <div>
              <p className="text-xl sm:text-2xl text-black leading-snug">
                The AI supply chain
                <br />
                analyst
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-black mb-2">Contact</p>
              <a
                href="https://www.linkedin.com/company/aeriumhq"
                className="text-lg text-black hover:text-gray-600 transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-black/10">
            <p className="text-sm text-black/50">
              Senchi Technologies Inc. 2026
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
