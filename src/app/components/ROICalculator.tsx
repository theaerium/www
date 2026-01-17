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
  { label: "<$10M", value: 5000000 },
  { label: "$10-50M", value: 30000000 },
  { label: "$50-150M", value: 100000000 },
  { label: "$150-500M", value: 325000000 },
  { label: "$500M+", value: 750000000 },
];

const teamSizeOptions = [
  { label: "1-5", value: 3 },
  { label: "5-10", value: 7 },
  { label: "10-25", value: 17 },
  { label: "25-50", value: 37 },
  { label: "50+", value: 60 },
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
  const [totalSKUs, setTotalSKUs] = useState(1000);
  const [revenueTierIndex, setRevenueTierIndex] = useState(1);
  const [teamSizeIndex, setTeamSizeIndex] = useState(2);

  const calculations = useMemo(() => {
    const annualRevenue = revenueTiers[revenueTierIndex].value;
    const teamSize = teamSizeOptions[teamSizeIndex].value;
    const skuMultiplier = 1 + totalSKUs / 1000 / 10;
    const hoursPerYear = HOURS_PER_DAY * WORKDAYS_PER_WEEK * WORKWEEKS_PER_YEAR;
    const corrective = 0.2;

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
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-cream">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-black mb-12 text-center">
          Driving real enterprise value
        </h2>

        <div className="bg-white rounded-2xl overflow-hidden">
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
                  <span className="px-3 py-1 bg-gray-100 rounded-md text-sm font-semibold text-black">
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
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, ${theme.colors.orange} 0%, ${theme.colors.orange} ${((totalSKUs - 100) / (10000 - 100)) * 100}%, #e5e7eb ${((totalSKUs - 100) / (10000 - 100)) * 100}%, #e5e7eb 100%)`,
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
              style={{ backgroundColor: theme.colors.gray }}
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
                  The calculation is only directional. We will offer more
                  accurate estimates once we have a better understanding of your
                  current situation
                </p>
                <Link href="/demo" target="_blank">
                  <Button
                    text="Request a demo"
                    fontSize="medium"
                    backgroundColor={theme.colors.orange}
                    textColor={theme.colors.black}
                    hoverColor="#E67A00"
                    icon={arrowIcon()}
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
