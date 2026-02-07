"use client";

import { useState, useMemo } from "react";
import theme from "../config/theme";
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
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border-2 ${
            selectedIndex === index
              ? "bg-black text-white border-black"
              : "bg-white text-black border-gray-200 hover:border-gray-400"
          }`}
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
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-black mb-4 text-center">
          Learn what Aeri can save you
        </h2>
        <p className="text-lg sm:text-xl text-gray-500 text-center mb-12">
          Estimates based on previous deployments
        </p>

        <div
          className="rounded-2xl relative p-6 sm:p-8 lg:p-10"
          style={{
            backgroundColor: "#FCE5CD",
            backgroundImage: "url(/brand/logo-thin.svg)",
            backgroundSize: "150%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="relative bg-white rounded-lg overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Left side - Inputs */}
              <div className="flex-1 p-8 sm:p-10 lg:p-12 space-y-8">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Company Details
                </p>

                {/* SKUs Slider */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-base font-medium text-black">
                      Total # of SKUs
                    </label>
                    <span
                      className="px-3 py-1 rounded-md text-sm font-semibold text-black"
                      style={{ backgroundColor: "#F0F0F0" }}
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
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-black [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #FCE5CD 0%, #FCE5CD ${((totalSKUs - 100) / (10000 - 100)) * 100}%, #e5e7eb ${((totalSKUs - 100) / (10000 - 100)) * 100}%, #e5e7eb 100%)`,
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>100</span>
                    <span>10,000</span>
                  </div>
                </div>

                {/* Revenue Tier Bubbles */}
                <div>
                  <label className="block text-base font-medium text-black mb-4">
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
                  <label className="block text-base font-medium text-black mb-4">
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
                style={{ backgroundColor: "#F0F0F0" }}
              >
                {/* Total Savings - Prominent */}
                <div className="mb-8">
                  <p className="text-sm text-gray-500 mb-2">
                    Estimated annual savings
                  </p>
                  <p
                    className="text-5xl sm:text-6xl font-semibold"
                    style={{ color: theme.colors.black }}
                  >
                    {formatCurrency(calculations.totalSavings)}
                  </p>
                </div>

                {/* Breakdown - Side by side */}
                <div className="flex gap-8 mb-8">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Time savings</p>
                    <p className="text-lg font-semibold text-black">
                      {formatCurrency(calculations.timeSavings)}
                      <span className="text-sm font-normal text-gray-400 ml-1">
                        /year
                      </span>
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-1">
                      Procurement savings
                    </p>
                    <p className="text-lg font-semibold text-black">
                      {formatCurrency(calculations.procurementSavings)}
                      <span className="text-sm font-normal text-gray-400 ml-1">
                        /year
                      </span>
                    </p>
                  </div>
                </div>

                <div className="mt-auto">
                  <p className="text-xs text-gray-500 mb-4">
                    This is only directional. We offer more accurate estimates
                    once we better understanding of your specific situation.
                  </p>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
