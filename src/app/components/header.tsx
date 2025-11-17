"use client";

import Link from "next/link";
import theme from "../config/theme";
import Button from "./button";

export default function Header() {
  const arrowIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2.2"
        stroke="currentColor"
        className="size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
        />
      </svg>
    );
  };

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
    // TODO: Maybe kill the opacity and just use a background color
    <header className="border-black sticky top-0 py-2 z-50 bg-cream opacity-100">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-black font-medium text-3xl tracking-wide"
            >
              AERIUM
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/demo">
              <Button
                text="Request a demo"
                fontSize="large"
                backgroundColor={theme.colors.orange}
                textColor={theme.colors.black}
                hoverColor="#E67A00"
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
            <Link href="/demo">
              <Button
                text="Request a demo"
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
