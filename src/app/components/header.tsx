"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import theme from "../config/theme";
import Button from "./button";
import NavDropdown, {
  NavDropdownGroup,
  NavDropdownPanel,
  useDropdownOpen,
} from "./NavDropdown";
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
  return (
    <NavDropdownGroup>
      <HeaderInner />
    </NavDropdownGroup>
  );
}

function HeaderInner() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const dropdownOpen = useDropdownOpen();

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = window.innerHeight * 0.1;
      setScrolled(window.scrollY > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Use light theme when scrolled, not on homepage, or dropdown is open
  const useLightTheme = scrolled || !isHomePage || dropdownOpen;

  return (
    <header
      className="sticky top-0 py-2 z-50 transition-all duration-300"
      style={
        dropdownOpen
          ? {
              backgroundColor: "#FFFFFF",
            }
          : useLightTheme
            ? {
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }
            : {
                backgroundColor: "transparent",
              }
      }
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-1 flex-shrink-0">
            <Link
              href="/"
              className="flex items-center gap-2 font-medium text-3xl tracking-wide transition-colors duration-300 text-black w-fit"
            >
              <Image
                src="/brand/logo.svg"
                alt="Aerium logo"
                width={36}
                height={38}
                className="h-9 w-auto"
              />
              Aerium
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            {navigationConfig.map((item) => (
              <NavDropdown
                key={item.label}
                item={item}
                scrolled={useLightTheme}
              />
            ))}
          </div>

          <div className="flex-1 hidden md:flex items-center justify-end space-x-4">
            <Link href="/demo" target="_blank">
              <Button
                text="Get started"
                fontSize="large"
                padding="px-5 py-2.5"
                backgroundColor={
                  useLightTheme ? theme.colors.black : theme.colors.white
                }
                textColor={
                  useLightTheme ? theme.colors.white : theme.colors.black
                }
                hoverColor={useLightTheme ? "#333333" : "#f0f0f0"}
                icon={arrowIcon(useLightTheme ? "white" : "black")}
              />
            </Link>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-4">
            <Link href="/demo" target="_blank">
              <Button
                text="Get started"
                backgroundColor={
                  useLightTheme ? theme.colors.black : theme.colors.white
                }
                textColor={
                  useLightTheme ? theme.colors.white : theme.colors.black
                }
                hoverColor={useLightTheme ? "#333333" : "#f0f0f0"}
                padding="px-5 py-2.5"
                fontSize="large"
                icon={arrowIcon(useLightTheme ? "white" : "black")}
              />
            </Link>
          </div>
        </div>
      </div>

      <NavDropdownPanel items={navigationConfig} />
    </header>
  );
}
