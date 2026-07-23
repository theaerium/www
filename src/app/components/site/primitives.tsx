import Link from "next/link";
import React from "react";

type Variant = "amber" | "dark" | "outline-light" | "outline-dark";

const variantClass: Record<Variant, string> = {
  amber: "site-btn-amber",
  dark: "site-btn-dark",
  "outline-light": "site-btn-outline-light",
  "outline-dark": "site-btn-outline-dark",
};

export function SiteButton({
  href,
  children,
  variant = "amber",
  className = "",
  external = false,
  style,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
  style?: React.CSSProperties;
}) {
  const cls = `site-btn ${variantClass[variant]} ${className}`;
  if (external || href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={cls}
        style={style}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} style={style}>
      {children}
    </Link>
  );
}

export function Eyebrow({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span className={`site-eyebrow ${className}`} style={style}>
      {children}
    </span>
  );
}

/** Standard section wrapper: 96px vertical padding + centered 1240px container. */
export function Section({
  children,
  className = "",
  style,
  container = true,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  container?: boolean;
  id?: string;
}) {
  return (
    <section id={id} className={`site-section ${className}`} style={style}>
      {container ? <div className="site-container">{children}</div> : children}
    </section>
  );
}
