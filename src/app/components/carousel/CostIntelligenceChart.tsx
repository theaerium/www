"use client";

import { useMemo } from "react";

const chartData = [
  { month: "Jan", cost: 2.45 },
  { month: "Feb", cost: 2.52 },
  { month: "Mar", cost: 2.38 },
  { month: "Apr", cost: 2.61 },
  { month: "May", cost: 2.48 },
  { month: "Jun", cost: 2.55 },
  { month: "Jul", cost: 2.42 },
  { month: "Aug", cost: 2.35 },
  { month: "Sep", cost: 2.28 },
  { month: "Oct", cost: 2.15 },
  { month: "Nov", cost: 2.22 },
  { month: "Dec", cost: 2.18 },
];

export default function CostIntelligenceChart() {
  const { pathD, areaD, points } = useMemo(() => {
    const width = 280;
    const height = 160;
    const padding = { top: 20, right: 20, bottom: 30, left: 40 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    const minCost = Math.min(...chartData.map((d) => d.cost)) - 0.1;
    const maxCost = Math.max(...chartData.map((d) => d.cost)) + 0.1;

    const xScale = (index: number) =>
      padding.left + (index / (chartData.length - 1)) * chartWidth;
    const yScale = (cost: number) =>
      padding.top +
      chartHeight -
      ((cost - minCost) / (maxCost - minCost)) * chartHeight;

    const pts = chartData.map((d, i) => ({
      x: xScale(i),
      y: yScale(d.cost),
      month: d.month,
      cost: d.cost,
    }));

    // Create smooth curve path
    const linePoints = pts
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
      .join(" ");

    // Create area path (line + bottom)
    const areaPath = `${linePoints} L ${pts[pts.length - 1].x} ${padding.top + chartHeight} L ${pts[0].x} ${padding.top + chartHeight} Z`;

    return { pathD: linePoints, areaD: areaPath, points: pts };
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg p-4 shadow-sm w-full max-w-xs">
        <div className="mb-2">
          <h3 className="text-sm font-semibold text-gray-900">SKU #11098047</h3>
          <p className="text-xs text-gray-500">$/unit over 12 months</p>
        </div>

        <svg viewBox="0 0 280 160" className="w-full h-auto">
          {/* Grid lines */}
          <g className="text-gray-200">
            {[0, 1, 2, 3].map((i) => (
              <line
                key={i}
                x1="40"
                y1={20 + (i * 110) / 3}
                x2="260"
                y2={20 + (i * 110) / 3}
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="4,4"
              />
            ))}
          </g>

          {/* Area fill */}
          <path d={areaD} fill="rgba(249, 115, 22, 0.2)" />

          {/* Line */}
          <path
            d={pathD}
            fill="none"
            stroke="#f97316"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points */}
          {points.map((point, i) => (
            <circle key={i} cx={point.x} cy={point.y} r="3" fill="#f97316" />
          ))}

          {/* X-axis labels */}
          {points
            .filter((_, i) => i % 2 === 0)
            .map((point, i) => (
              <text
                key={i}
                x={point.x}
                y="150"
                textAnchor="middle"
                className="text-[8px] fill-gray-500"
              >
                {point.month}
              </text>
            ))}

          {/* Y-axis labels */}
          {[2.1, 2.3, 2.5, 2.7].map((val, i) => (
            <text
              key={i}
              x="35"
              y={130 - (i * 110) / 3}
              textAnchor="end"
              className="text-[8px] fill-gray-500"
            >
              ${val.toFixed(2)}
            </text>
          ))}
        </svg>

        <div className="mt-2 flex items-center gap-2 text-xs">
          <span className="text-green-600 font-medium flex items-center gap-1">
            <svg
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
            15% savings identified
          </span>
        </div>
      </div>
    </div>
  );
}
