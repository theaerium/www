"use client";

import Link from "next/link";
import Image from "next/image";
import theme from "../config/theme";

type SubstackSubscribeEmbedProps = {
  className?: string;
};

function SubstackSubscribeEmbed({ className }: SubstackSubscribeEmbedProps) {
  return (
    <div className={className}>
      <iframe
        src="https://joinaerium.substack.com/embed"
        title="Subscribe to Aerium on Substack"
        style={{
          backgroundColor: "#fefff4",
          borderRadius: "12px",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          width: "100%",
          height: "220px",
        }}
        width="100%"
        height="220"
        frameBorder="0"
        scrolling="no"
        loading="lazy"
      />
    </div>
  );
}

export default function Footer() {
  return (
    <footer
      className="text-white"
      style={{ backgroundColor: theme.colors.orange }}
    >
      <div className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="w-full">
          {/* Mobile Layout */}
          <div className="block md:hidden space-y-8">
            {/* Need Help Section */}
            <div className="text-left">
              <p className="text-sm mb-2">Available daily, 7am to 9pm ET</p>
              <h3 className="text-xl font-medium mb-2">Contact us</h3>
              <a
                href="tel:+12899716341"
                className="text-2xl font-semibold text-black"
              >
                1 (289) 971-6341
              </a>
            </div>

            {/* Legal and Stay in touch - two columns */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
                  Legal
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/terms-of-service" // TODO: Update this page
                      className="text-white hover:text-gray-200 text-sm transition-colors"
                    >
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy-policy" // TODO: Update this page
                      className="text-white hover:text-gray-200 text-sm transition-colors"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">Stay in touch</h3>
                <div className="flex space-x-4 mb-6">
                  <a
                    href="https://x.com/aeriumhq"
                    className="text-white hover:text-gray-200 transition-colors"
                  >
                    <span className="sr-only">X</span>
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  {/*<a
                    href="https://joinaerium.substack.com/"
                    className="text-white hover:text-gray-200 transition-colors"
                  >
                    <span className="sr-only">X</span>
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
                    </svg>
                  </a>*/}
                  <a
                    href="https://www.linkedin.com/company/aeriumhq"
                    className="text-white hover:text-gray-200 transition-colors"
                  >
                    <span className="sr-only">LinkedIn</span>
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="col-span-2">
                <SubstackSubscribeEmbed className="mt-6 w-full" />
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:flex gap-24 items-start max-w-7xl mx-auto">
            {/* Legal section */}
            {/*<div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-6">
                Legal
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/terms-of-service"
                    className="text-white hover:text-gray-900 text-sm transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-white hover:text-gray-900 text-sm transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>*/}

            <div>
              <h3 className="text-lg font-bold mb-6">Contact us</h3>
              <div className="flex space-x-4 mb-8">
                {/*<a
                  href="https://www.instagram.com/joinaerium"
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <span className="sr-only">Instagram</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>*/}
                <a
                  href="https://x.com/aeriumhq"
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <span className="sr-only">X</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                {/*<a
                  href="https://joinaerium.substack.com/"
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <span className="sr-only">X</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
                  </svg>
                </a>*/}
                <a
                  href="https://www.linkedin.com/company/aeriumhq"
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/*<div className="col-span-2">
              <h3 className="text-lg font-bold mb-6">Subscribe</h3>
              <SubstackSubscribeEmbed />
            </div>*/}

            {/*<div className="col-span-2 flex justify-center md:justify-end">
              <div className="">
                <Image
                  src="/distribution/qr_code.png"
                  alt="QR Code"
                  width={400}
                  height={400}
                  className="w-fit h-fit"
                  draggable={false}
                />
              </div>
            </div>*/}
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-white/20 max-w-7xl mx-auto">
            <p className="text-sm text-white/80">
              © 2026 Senchi Technologies Inc.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
