"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import theme from "../config/theme";
import Button from "./button";
import NavDropdown, { NavDropdownGroup } from "./NavDropdown";
import { navigationConfig } from "../config/navigation";

export const arrowIcon = (color: string = "currentColor") => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2.2"
      stroke={color}
      className="size-6"
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
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = window.innerHeight * 0.1;
      setScrolled(window.scrollY > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Use light theme (cream bg, black text) when scrolled OR when not on homepage
  const useLightTheme = scrolled || !isHomePage;

  const burgerMenuIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 9h16.5m-16.5 6.75h16.5"
        />
      </svg>
    );
  };

  return (
    <header
      className={`sticky top-0 py-2 z-50 transition-all duration-300 ${
        useLightTheme
          ? "bg-cream/90 backdrop-blur-sm"
          : "bg-orange backdrop-blur-sm"
      }`}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link
              href="/"
              className={`font-medium text-3xl tracking-wide transition-colors duration-300 ${
                useLightTheme ? "text-black" : "text-white"
              }`}
            >
              Aerium
            </Link>
          </div>

          <div className="hidden md:flex items-center">
            <NavDropdownGroup scrolled={useLightTheme}>
              {navigationConfig.map((item) => (
                <NavDropdown
                  key={item.label}
                  item={item}
                  scrolled={useLightTheme}
                />
              ))}
            </NavDropdownGroup>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/demo" target="_blank">
              <Button
                text="Request a demo"
                fontSize="large"
                backgroundColor={useLightTheme ? theme.colors.orange : "white"}
                textColor={theme.colors.black}
                hoverColor={useLightTheme ? "#E67A00" : "#f0f0f0"}
                icon={arrowIcon()}
              />
            </Link>
            {/* <Button
                text="Log in"
                backgroundColor={theme.colors.black}
                textColor="white"
                hoverColor="#333333"
              /> */}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-4">
            <Link
              href="https://apps.apple.com/ca/app/id6751736126"
              target="_blank"
            >
              <Button
                text="Sign up"
                backgroundColor={theme.colors.orange}
                textColor={theme.colors.black}
                hoverColor="#E67A00"
                padding="px-4 py-4"
                fontSize="large"
                icon={arrowIcon()}
              />
            </Link>
            {/* <Button
              text=""
              backgroundColor={theme.colors.black}
              textColor="white"
              hoverColor="#333333"
              padding="p-4"
              icon={burgerMenuIcon()}
            /> */}
          </div>
        </div>
      </div>
    </header>
  );
}
