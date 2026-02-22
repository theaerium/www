"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Button from "./button";
import { arrowIcon } from "./header";

export default function Footer() {
  const [hitCount, setHitCount] = useState(0);

  useEffect(() => {
    setHitCount(14832 + Math.floor(Math.random() * 200));
  }, []);

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
                color: "#E8CCC4",
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
            Focus on moving production instead of chasing parts and materials.
          </p>

          <div className="flex justify-center">
            <Link href="/demo">
              <Button
                text=">> Book a Demo"
                fontSize="large"
                backgroundColor="#FD870B"
                textColor="#fff"
                hoverColor="#FFA040"
                padding="px-8 py-3"
                icon={arrowIcon("white")}
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
                  style={{ color: "#E8CCC4" }}
                >
                  About Aerium
                </h4>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#D4A89C" }}
                >
                  The AI supply chain analyst, built for manufacturers.
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
                  style={{ color: "#E8CCC4" }}
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

      {/* Bottom bar with hit counter */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <div
            className="text-center md:text-left"
            style={{ color: "#7A2832" }}
          >
            &copy; 2026 Senchi Technologies Inc.. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4" style={{ color: "#7A2832" }}>
            <span>Visitors:</span>
            <span className="hit-counter">{hitCount.toLocaleString()}</span>
            <span style={{ color: "#5C141E" }}>|</span>
            <span>Best viewed at 1024x768</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
