import React from "react";
import SiteNav from "./SiteNav";
import SiteFooter from "./SiteFooter";

/** Wraps every marketing page: applies the Archivo/cream base, nav, and footer. */
export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="site">
      <div className="site-rails" aria-hidden="true" />
      <SiteNav />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
