import React from "react";
import SiteNav from "./SiteNav";
import SiteFooter from "./SiteFooter";

/**
 * Wraps every marketing page: applies the Archivo/cream base, nav, and footer.
 * `navOverlay` floats the nav over a full-bleed dark hero instead of reserving space for it.
 */
export default function SiteShell({
  children,
  navOverlay = false,
}: {
  children: React.ReactNode;
  navOverlay?: boolean;
}) {
  return (
    <div className="site">
      <div className="site-rails" aria-hidden="true" />
      <SiteNav overlay={navOverlay} />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
