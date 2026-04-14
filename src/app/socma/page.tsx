import { redirect } from "next/navigation";

export default function SOCMAPage() {
  redirect("https://calendar.app.google/21k4z9MSgxhgZHZU8");
}

/*
"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import Header from "../components/header";
import Footer from "../components/footer";

export default function DemoPage() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "socma" });
      cal("ui", {
        theme: "light",
        cssVarsPerTheme: {
          light: { "cal-brand": "#FD870B" },
          dark: { "cal-brand": "#FD870B" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#FFF8F5" }}>
      <Header />

      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <p
              className="text-xs uppercase tracking-widest font-bold mb-4"
              style={{ color: "#FD870B" }}
            >
              Book a follow up call
            </p>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl mb-10"
              style={{
                fontFamily: "var(--font-display)",
                color: "#390007",
              }}
            >
              AI Supply Chain Analyst
            </h1>

            <div className="text-left max-w-2xl mx-auto space-y-4 mb-8">
              <div className="flex items-start">
                <span
                  className="mr-3 mt-1 flex-shrink-0 text-sm font-bold"
                  style={{
                    color: "#FD870B",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  [+]
                </span>
                <p style={{ color: "#6B3030" }}>
                  Meet with the team to further understand your business needs
                </p>
              </div>
              <div className="flex items-start">
                <span
                  className="mr-3 mt-1 flex-shrink-0 text-sm font-bold"
                  style={{
                    color: "#FD870B",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  [+]
                </span>
                <p style={{ color: "#6B3030" }}>
                  Identify how Aerium can integrate into your business to
                  deliver savings
                </p>
              </div>
              <div className="flex items-start">
                <span
                  className="mr-3 mt-1 flex-shrink-0 text-sm font-bold"
                  style={{
                    color: "#FD870B",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  [+]
                </span>
                <p style={{ color: "#6B3030" }}>
                  Request custom add-ons tailored to your business
                </p>
              </div>
            </div>

            <hr className="fancy mx-auto" style={{ maxWidth: "200px" }} />
          </div>

          <div
            className="w-full"
            style={{
              border: "2px solid #FD870B",
              boxShadow: "4px 4px 0px #FD870B",
            }}
          >
            <div
              style={{
                background: "#390007",
                padding: "0.75rem 1.5rem",
                borderBottom: "2px solid #FD870B",
              }}
            >
              <span
                className="text-xs uppercase tracking-widest font-bold"
                style={{ color: "#FD870B" }}
              >
                Schedule Time
              </span>
            </div>
            <div style={{ background: "#fff", height: "600px" }}>
              <Cal
                namespace="socma"
                calLink="aeriumhq/socma"
                style={{ width: "100%", height: "100%", overflow: "scroll" }}
                config={{ layout: "month_view", theme: "light" }}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
*/
