"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { CAL_LINK } from "./routes";

const NAMESPACE = "15-minute-demo";
const BURGUNDY = "#6B0F1A";

export default function CalEmbed() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: NAMESPACE });
      cal("ui", {
        theme: "light",
        cssVarsPerTheme: { light: { "cal-brand": BURGUNDY }, dark: { "cal-brand": BURGUNDY } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <Cal
      namespace={NAMESPACE}
      calLink={CAL_LINK}
      style={{ width: "100%" }}
      config={{ layout: "month_view", theme: "light" }}
    />
  );
}
