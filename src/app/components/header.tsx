"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import AeriumLogoSvg from "@/components/AeriumLogo_no_background.svg";
import Button from "./button";
import NavDropdown, { NavDropdownGroup, NavDropdownPanel } from "./NavDropdown";
import { navigationConfig } from "../config/navigation";

export const arrowIcon = (color: string = "currentColor") => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2.2"
      stroke={color}
      className="size-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      />
    </svg>
  );
};

export default function Header() {
  return (
    <NavDropdownGroup>
      <HeaderInner />
    </NavDropdownGroup>
  );
}

function HeaderInner() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [headerVisible, setHeaderVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const scrollAnchorRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;

      // Banner logic
      if (y <= 0) setShowBanner(true);
      else if (y > 50) setShowBanner(false);

      // Hide/show header on scroll direction with threshold
      if (y > lastScrollYRef.current && y > 500) {
        // Scrolling down — hide and reset anchor
        setHeaderVisible(false);
        scrollAnchorRef.current = y;
      } else if (scrollAnchorRef.current - y > 500) {
        // Scrolling up — only show after 500px of upward scroll
        setHeaderVisible(true);
      }

      if (y <= 0) setHeaderVisible(true);
      lastScrollYRef.current = y;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        transform: headerVisible ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.5s ease",
      }}
    >
      {/* Marquee banner */}
      <div
        className="marquee-banner"
        style={{
          maxHeight: showBanner ? "2.5rem" : "0",
          padding: showBanner ? "6px 0" : "0",
          borderBottomWidth: showBanner ? "2px" : "0",
          overflow: "hidden",
          transition:
            "max-height 0.3s ease, padding 0.3s ease, border-bottom-width 0.3s ease",
        }}
      >
        <span>
          *** Aerium &mdash; AI Supply Chain Intelligence for Manufacturers and
          Distributors &mdash; Monitor Prices &bull; Automate Purchasing &bull;
          Identify Savings &mdash; Book a Demo Today &mdash; Trusted by
          Industrial Manufacturers Across North America ***
        </span>
      </div>

      {/* Main header bar */}
      <div
        style={{
          background: "#FAEEE8",
          borderBottom: "4px double #390007",
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            {/* Logo area */}
            <Link href="/" className="flex items-center gap-3">
              <div
                className="hidden sm:flex w-14 h-14 items-center justify-center"
                style={{
                  border: "2px solid #FD870B",
                  background: "#390007",
                  boxShadow: "2px 2px 0px #FD870B",
                }}
              >
                <Image
                  src={AeriumLogoSvg}
                  alt="Aerium logo"
                  width={52}
                  height={52}
                />
              </div>
              <div>
                <h1
                  className="text-xl sm:text-2xl font-bold tracking-wide uppercase"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "#390007",
                  }}
                >
                  Aerium
                </h1>
                <p
                  className="text-xs tracking-widest uppercase"
                  style={{ color: "#FD870B" }}
                >
                  Supply Chain Intelligence
                </p>
              </div>
            </Link>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2"
                style={{ color: "#390007" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  {mobileOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  )}
                </svg>
              </button>
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center">
              <Link href="/demo">
                <Button
                  text=">> Get Started"
                  fontSize="small"
                  padding="px-5 py-2"
                  backgroundColor="#390007"
                  textColor="#FFF5F0"
                  hoverColor="#4A0A12"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation bar */}
      <nav
        style={{
          background: "#390007",
          borderBottom: "2px solid #FD870B",
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hidden lg:flex items-center justify-center gap-1 py-1">
            {navigationConfig.map((item) => (
              <NavDropdown key={item.label} item={item} />
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div
          style={{
            background: "#390007",
            borderBottom: "2px solid #FD870B",
          }}
        >
          <div className="px-4 py-2 space-y-1">
            {navigationConfig.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2 text-sm uppercase tracking-wider"
                style={{
                  color: "#E8CCC4",
                  fontFamily: "var(--font-display)",
                }}
              >
                {item.label}
              </Link>
            ))}
            <div
              className="pt-2 mt-2 px-4 pb-2"
              style={{ borderTop: "1px solid #7A2832" }}
            >
              <Link href="/demo">
                <Button
                  text=">> Get Started"
                  fontSize="small"
                  padding="px-4 py-2"
                  backgroundColor="#FD870B"
                  textColor="#fff"
                  hoverColor="#FFA040"
                />
              </Link>
            </div>
          </div>
        </div>
      )}

      <NavDropdownPanel items={navigationConfig} />
    </header>
  );
}
