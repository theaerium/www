"use client";

import Link from "next/link";
import Button from "./button";
import { arrowIcon } from "./header";

export default function Footer() {
  return (
    <footer style={{ background: "#390007" }}>
      {/* CTA Section */}
      <div
        style={{
          borderBottom: "2px solid #FD870B",
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center mb-8">
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl uppercase tracking-wider"
              style={{
                fontFamily: "var(--font-display)",
                color: "#FFFFFF",
              }}
            >
              Upgrade Your Supply Chain
            </h2>
            <div
              className="w-48 mx-auto mt-2"
              style={{ borderTop: "2px solid #FD870B" }}
            />
          </div>

          <p
            className="text-lg sm:text-xl text-center max-w-xl mx-auto mb-8 leading-relaxed"
            style={{ color: "#D4A89C" }}
          >
            Aerium will help you get ahead, like your best employees help you
            do.
          </p>

          <div className="flex justify-center">
            <Link href="/demo">
              <Button
                text=">> Book a Demo"
                fontSize="large"
                backgroundColor="#FFF8F5"
                textColor="#390007"
                hoverColor="#FAEEE8"
                padding="px-8 py-3"
                icon={arrowIcon("#390007")}
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Contact boxes */}
      <div style={{ borderBottom: "2px solid #FD870B" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {/* About */}
            <div className="text-center">
              <div
                className="p-4"
                style={{
                  border: "2px solid #FD870B",
                  background: "#4A0A12",
                }}
              >
                <h4
                  className="font-bold uppercase tracking-wider text-sm mb-3"
                  style={{ color: "#FFFFFF" }}
                >
                  About Aerium
                </h4>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#D4A89C" }}
                >
                  The AI supply chain analyst, built for manufacturers and
                  distributors.
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="text-center">
              <div
                className="p-4"
                style={{
                  border: "2px solid #FD870B",
                  background: "#4A0A12",
                }}
              >
                <h4
                  className="font-bold uppercase tracking-wider text-sm mb-3"
                  style={{ color: "#FFFFFF" }}
                >
                  Contact Us
                </h4>
                <div className="space-y-2 text-sm">
                  <a
                    href="https://www.linkedin.com/company/aeriumhq"
                    className="block underline"
                    style={{ color: "#D4A89C" }}
                  >
                    LinkedIn
                  </a>
                  <a
                    href="mailto:founders@aeriumhq.com"
                    className="block underline"
                    style={{ color: "#D4A89C" }}
                  >
                    founders@aeriumhq.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center text-xs" style={{ color: "#D4A89C" }}>
          &copy; 2026 Senchi Technologies Inc. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
