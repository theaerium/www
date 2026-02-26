"use client";

import Link from "next/link";
import Button from "./button";
import { arrowIcon } from "./header";

export default function HeroSection() {
  return (
    <section style={{ background: "#FAEEE8" }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Old-school beveled hero box */}
        <div
          style={{
            border: "2px solid #FD870B",
            background: "#FFF8F5",
            boxShadow: "4px 4px 0px #FD870B",
          }}
        >
          {/* Dark header bar */}
          <div
            style={{
              background: "#390007",
              padding: "0.75rem 1.5rem",
              borderBottom: "2px solid #FD870B",
            }}
          >
            <h2
              className="text-lg sm:text-xl text-center uppercase tracking-wider font-bold"
              style={{
                fontFamily: "var(--font-display)",
                color: "#FFFFFF",
              }}
            >
              Welcome to Aerium &mdash; Supply Chain Intelligence
            </h2>
          </div>

          <div className="p-6 sm:p-10">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Left content */}
              <div className="flex-1 space-y-6">
                <div
                  style={{
                    borderLeft: "4px solid #FD870B",
                    paddingLeft: "1rem",
                  }}
                >
                  <h1
                    className="text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4 font-bold"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "#390007",
                    }}
                  >
                    The AI Supply Chain Analyst,
                    <br />
                    Built for Manufacturers.
                  </h1>
                  <p
                    className="leading-relaxed text-lg font-medium"
                    style={{ color: "#4A1018" }}
                  >
                    From aeri@yourcompany.com, Aeri gets work done like the best
                    employees on your team.
                  </p>
                </div>

                <hr className="fancy" />

                {/* Stats boxes */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="bevel-box">
                    <div
                      className="text-2xl font-bold"
                      style={{
                        color: "#390007",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      5-10%
                    </div>
                    <div
                      className="text-xs uppercase tracking-wider"
                      style={{ color: "#FD870B" }}
                    >
                      Profitability Increase
                    </div>
                  </div>
                  <div className="bevel-box">
                    <div
                      className="text-2xl font-bold"
                      style={{
                        color: "#390007",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      50-60%
                    </div>
                    <div
                      className="text-xs uppercase tracking-wider"
                      style={{ color: "#FD870B" }}
                    >
                      Team Productivity Increase
                    </div>
                  </div>
                  <div className="bevel-box">
                    <div
                      className="text-2xl font-bold"
                      style={{
                        color: "#390007",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      &lt;6mo
                    </div>
                    <div
                      className="text-xs uppercase tracking-wider"
                      style={{ color: "#FD870B" }}
                    >
                      To positive ROI
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/demo">
                    <Button
                      text=">> Book a Demo"
                      fontSize="medium"
                      padding="px-6 py-3"
                      backgroundColor="#390007"
                      textColor="#FFFFFF"
                      hoverColor="#4A0A12"
                      icon={arrowIcon("#FFFFFF")}
                    />
                  </Link>
                  <Link href="/roi-calculator">
                    <Button
                      text=">> Calculate ROI"
                      fontSize="medium"
                      padding="px-6 py-3"
                      backgroundColor="transparent"
                      textColor="#390007"
                      hoverColor="#FAEEE8"
                    />
                  </Link>
                </div>
              </div>

              {/* Right side - What's New */}
              <div className="lg:w-96 w-full space-y-4">
                {/* Popular Use Cases box */}
                <div
                  style={{
                    border: "2px solid #FD870B",
                    boxShadow: "3px 3px 0px #FD870B",
                  }}
                >
                  <div
                    style={{
                      background: "#FD870B",
                      padding: "0.5rem 1rem",
                    }}
                  >
                    <h4
                      className="text-sm font-bold uppercase tracking-wider"
                      style={{ color: "#fff" }}
                    >
                      &bull; Popular Use Cases &bull;
                    </h4>
                  </div>
                  <div
                    className="p-4 space-y-3 text-sm"
                    style={{ background: "#FFF8F5" }}
                  >
                    <div
                      style={{
                        borderBottom: "1px solid #F0DDD4",
                        paddingBottom: "0.75rem",
                      }}
                    >
                      <div
                        className="text-sm font-bold"
                        style={{ color: "#FD870B" }}
                      >
                        Tail Spend Automation
                      </div>
                      <div style={{ color: "#390007" }}>
                        Put your MRO, other indirects, and remaining tail spend
                        on autopilot.
                      </div>
                    </div>
                    <div
                      style={{
                        borderBottom: "1px solid #F0DDD4",
                        paddingBottom: "0.75rem",
                      }}
                    >
                      <div
                        className="text-sm font-bold"
                        style={{ color: "#FD870B" }}
                      >
                        Should-Cost Modelling
                      </div>
                      <div style={{ color: "#390007" }}>
                        Move supplier conversations to transparent, data-backed
                        discussions rather than comparing quotes.
                      </div>
                    </div>
                    <div
                      style={{
                        borderBottom: "1px solid #F0DDD4",
                        paddingBottom: "0.75rem",
                      }}
                    >
                      <div
                        className="text-sm font-bold"
                        style={{ color: "#FD870B" }}
                      >
                        Sales Pricing Optimization
                      </div>
                      <div style={{ color: "#390007" }}>
                        Cluster historical sales data and real-time market
                        signals to quote quicker with optimal pricing that
                        maximizes your margins.
                      </div>
                    </div>
                    <div>
                      <div
                        className="text-sm font-bold"
                        style={{ color: "#FD870B" }}
                      >
                        Category, Supplier, &amp; Inventory Management
                      </div>
                      <div style={{ color: "#390007" }}>
                        Feed operations and risk data directly into your
                        sourcing decisions. Improve procurement planning for
                        shutdowns &amp; turnarounds.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
