"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import Header from "../components/header";
import Footer from "../components/footer";
import theme from "../config/theme";

export default function DemoPage() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "15-minute-demo" });
      cal("ui", {
        theme: "light",
        cssVarsPerTheme: {
          light: { "cal-brand": "#000000" },
          dark: { "cal-brand": "#ffffff" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-black mb-10">
              Giving supply chain teams superpowers
            </h1>

            <div className="text-left max-w-2xl mx-auto space-y-4 mb-8">
              <div className="flex items-start">
                <svg
                  className={`w-6 h-6 text-${theme.colors.orange} mr-3 mt-1 flex-shrink-0`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <p className="text-gray-700">
                  Meet with an expert who will listen and learn about your
                  business needs
                </p>
              </div>
              <div className="flex items-start">
                <svg
                  className={`w-6 h-6 text-${theme.colors.orange} mr-3 mt-1 flex-shrink-0`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <p className="text-gray-700">
                  Identify how Aerium can integrate into your business to
                  deliver savings
                </p>
              </div>
              <div className="flex items-start">
                <svg
                  className={`w-6 h-6 text-${theme.colors.orange} mr-3 mt-1 flex-shrink-0`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <p className="text-gray-700">
                  Request custom add-ons tailored to your business needs
                </p>
              </div>
            </div>
          </div>

          <div className="w-full h-[600px]">
            <Cal
              namespace="15-minute-demo"
              calLink="aeriumhq/15-minute-demo"
              style={{ width: "100%", height: "100%", overflow: "scroll" }}
              config={{ layout: "month_view", theme: "light" }}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
