"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Button from "./button";
import { arrowIcon } from "./header";

// Base assumptions (configurable via env vars in the future)
const HOURS_WORKED_PER_YEAR =
  Number(process.env.NEXT_PUBLIC_HOURS_WORKED_PER_YEAR) || 5 * 7 * 48;
const AVERAGE_SALARY = Number(process.env.NEXT_PUBLIC_AVERAGE_SALARY) || 75000;
const TIME_SAVED_PERCENT =
  Number(process.env.NEXT_PUBLIC_TIME_SAVED_PERCENT) || 0.3;
const CONTRACT_SAVINGS =
  Number(process.env.NEXT_PUBLIC_CONTRACT_SAVINGS) || 0.05;
const PROCUREMENT_SPEND_PERCENT =
  Number(process.env.NEXT_PUBLIC_PROCUREMENT_SPEND_PERCENT) || 0.4;
const HOURS_PER_DAY = 7;
const WORKDAYS_PER_WEEK = 5;
const WORKWEEKS_PER_YEAR = 48;

const revenueTiers = [
  { label: "<$25M", value: 12500000 },
  { label: "$25-100M", value: 62500000 },
  { label: "$100-250M", value: 175000000 },
  { label: "$250M-1B", value: 625000000 },
  { label: "$1-5B", value: 3000000000 },
  { label: "$5B+", value: 7500000000 },
];

const teamSizeOptions = [
  { label: "1-5", value: 3 },
  { label: "5-10", value: 7 },
  { label: "10-25", value: 17 },
  { label: "25-50", value: 37 },
  { label: "50-100", value: 75 },
  { label: "100+", value: 150 },
];

function formatCurrency(value: number): string {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }
  return `$${value.toFixed(0)}`;
}

interface BubbleSelectorProps {
  options: { label: string; value: number }[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

function BubbleSelector({
  options,
  selectedIndex,
  onSelect,
}: BubbleSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option, index) => (
        <button
          key={option.label}
          onClick={() => onSelect(index)}
          className="px-4 py-2 text-sm font-semibold uppercase tracking-wider"
          style={
            selectedIndex === index
              ? {
                  background: "#390007",
                  color: "#FFF5F0",
                  border: "2px solid #FD870B",
                  boxShadow: "1px 1px 0px #FD870B",
                }
              : {
                  background: "#FFF8F5",
                  color: "#390007",
                  border: "2px solid #D4B0A0",
                  cursor: "pointer",
                }
          }
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default function ROICalculator() {
  const [totalSKUs, setTotalSKUs] = useState(5000);
  const [revenueTierIndex, setRevenueTierIndex] = useState(3);
  const [teamSizeIndex, setTeamSizeIndex] = useState(3);

  const calculations = useMemo(() => {
    const annualRevenue = revenueTiers[revenueTierIndex].value;
    const teamSize = teamSizeOptions[teamSizeIndex].value;
    const skuMultiplier = 1 + totalSKUs / 1000 / 10;
    const hoursPerYear = HOURS_PER_DAY * WORKDAYS_PER_WEEK * WORKWEEKS_PER_YEAR;
    const corrective = 0.1;

    const timeSavings =
      HOURS_WORKED_PER_YEAR *
      (TIME_SAVED_PERCENT * skuMultiplier * teamSize) *
      (AVERAGE_SALARY / hoursPerYear) *
      (1 - corrective);

    const procurementSavings =
      annualRevenue *
      PROCUREMENT_SPEND_PERCENT *
      CONTRACT_SAVINGS *
      skuMultiplier *
      (1 - corrective);

    const totalSavings = timeSavings + procurementSavings;

    return {
      timeSavings,
      procurementSavings,
      totalSavings,
    };
  }, [totalSKUs, revenueTierIndex, teamSizeIndex]);

  return (
    <section
      className="py-16 px-4 sm:px-6 lg:px-8"
      style={{ background: "#FFF8F5" }}
    >
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl mb-4 text-center"
          style={{
            fontFamily: "var(--font-display)",
            color: "#390007",
          }}
        >
          Learn What Aeri Can Save You
        </h2>
        <p
          className="text-lg text-center mb-12"
          style={{ color: "#8C5A50" }}
        >
          Estimates based on previous deployments
        </p>

        {/* Main calculator card */}
        <div
          style={{
            border: "2px solid #FD870B",
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
            <span
              className="text-sm uppercase tracking-widest font-bold"
              style={{ color: "#FD870B" }}
            >
              ROI Calculator
            </span>
          </div>

          <div className="flex flex-col lg:flex-row" style={{ background: "#FFF8F5" }}>
            {/* Left side - Inputs */}
            <div className="flex-1 p-8 sm:p-10 lg:p-12 space-y-8">
              <p
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "#FD870B" }}
              >
                Company Details
              </p>

              {/* SKUs Slider */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label
                    className="text-base font-semibold"
                    style={{ color: "#390007" }}
                  >
                    Total # of SKUs
                  </label>
                  <span
                    className="px-3 py-1 text-sm font-bold"
                    style={{
                      background: "#390007",
                      color: "#FD870B",
                      fontFamily: "var(--font-mono)",
                      border: "1px solid #FD870B",
                    }}
                  >
                    {totalSKUs.toLocaleString()}
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="100"
                    max="10000"
                    step="100"
                    value={totalSKUs}
                    onChange={(e) => setTotalSKUs(Number(e.target.value))}
                    className="w-full h-2 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#390007] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#FD870B] [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-[#390007] [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#FD870B] [&::-moz-range-thumb]:cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #FD870B 0%, #FD870B ${((totalSKUs - 100) / (10000 - 100)) * 100}%, #F0DDD4 ${((totalSKUs - 100) / (10000 - 100)) * 100}%, #F0DDD4 100%)`,
                    }}
                  />
                </div>
                <div
                  className="flex justify-between text-xs mt-2"
                  style={{
                    color: "#B08074",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  <span>100</span>
                  <span>10,000</span>
                </div>
              </div>

              {/* Revenue Tier Bubbles */}
              <div>
                <label
                  className="block text-base font-semibold mb-4"
                  style={{ color: "#390007" }}
                >
                  Total annual revenue
                </label>
                <BubbleSelector
                  options={revenueTiers}
                  selectedIndex={revenueTierIndex}
                  onSelect={setRevenueTierIndex}
                />
              </div>

              {/* Team Size Bubbles */}
              <div>
                <label
                  className="block text-base font-semibold mb-4"
                  style={{ color: "#390007" }}
                >
                  Size of procurement team
                </label>
                <BubbleSelector
                  options={teamSizeOptions}
                  selectedIndex={teamSizeIndex}
                  onSelect={setTeamSizeIndex}
                />
              </div>
            </div>

            {/* Right side - Results */}
            <div
              className="flex-1 lg:max-w-md p-8 sm:p-10 lg:p-12 flex flex-col"
              style={{
                background: "#FAEEE8",
                borderLeft: "2px solid #FD870B",
              }}
            >
              {/* Total Savings */}
              <div className="mb-8">
                <p
                  className="text-xs uppercase tracking-widest font-bold mb-2"
                  style={{ color: "#FD870B" }}
                >
                  Estimated Annual Savings
                </p>
                <p
                  className="text-5xl sm:text-6xl font-bold"
                  style={{
                    color: "#390007",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {formatCurrency(calculations.totalSavings)}
                </p>
              </div>

              {/* Breakdown */}
              <div className="flex gap-8 mb-8">
                <div className="bevel-box flex-1">
                  <p
                    className="text-xs uppercase tracking-wider font-bold mb-1"
                    style={{ color: "#FD870B" }}
                  >
                    Time savings
                  </p>
                  <p
                    className="text-lg font-bold"
                    style={{
                      color: "#390007",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {formatCurrency(calculations.timeSavings)}
                    <span
                      className="text-xs font-normal ml-1"
                      style={{ color: "#B08074" }}
                    >
                      /year
                    </span>
                  </p>
                </div>

                <div className="bevel-box flex-1">
                  <p
                    className="text-xs uppercase tracking-wider font-bold mb-1"
                    style={{ color: "#FD870B" }}
                  >
                    Procurement savings
                  </p>
                  <p
                    className="text-lg font-bold"
                    style={{
                      color: "#390007",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {formatCurrency(calculations.procurementSavings)}
                    <span
                      className="text-xs font-normal ml-1"
                      style={{ color: "#B08074" }}
                    >
                      /year
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-auto">
                <p className="text-xs mb-4" style={{ color: "#8C5A50" }}>
                  This is only directional. We offer more accurate estimates
                  once we better understanding of your specific situation.
                </p>
                <Link href="/demo">
                  <Button
                    text=">> Book a Demo"
                    fontSize="large"
                    backgroundColor="#390007"
                    textColor="#FFF5F0"
                    hoverColor="#4A0A12"
                    padding="px-10 py-3"
                    icon={arrowIcon("#FFF5F0")}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
