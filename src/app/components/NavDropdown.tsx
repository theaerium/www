"use client";

import { useState, useRef, createContext, useContext } from "react";
import Link from "next/link";
import { NavItem } from "../config/navigation";
import theme from "../config/theme";

interface NavContextType {
  activeDropdown: string | null;
  setActiveDropdown: (label: string | null) => void;
  closeTimeoutRef: React.MutableRefObject<NodeJS.Timeout | null>;
}

const NavContext = createContext<NavContextType | null>(null);

interface NavDropdownGroupProps {
  children: React.ReactNode;
  scrolled?: boolean;
}

export function NavDropdownGroup({ children }: NavDropdownGroupProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  return (
    <NavContext.Provider
      value={{ activeDropdown, setActiveDropdown, closeTimeoutRef }}
    >
      <div className="flex items-center space-x-2">{children}</div>
    </NavContext.Provider>
  );
}

interface NavDropdownProps {
  item: NavItem;
  scrolled?: boolean;
}

export default function NavDropdown({
  item,
  scrolled = true,
}: NavDropdownProps) {
  const context = useContext(NavContext);

  const [localIsOpen, setLocalIsOpen] = useState(false);
  const localTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isOpen = context ? context.activeDropdown === item.label : localIsOpen;

  const handleMouseEnter = () => {
    if (context) {
      if (context.closeTimeoutRef.current) {
        clearTimeout(context.closeTimeoutRef.current);
        context.closeTimeoutRef.current = null;
      }
      context.setActiveDropdown(item.label);
    } else {
      if (localTimeoutRef.current) {
        clearTimeout(localTimeoutRef.current);
      }
      setLocalIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (context) {
      context.closeTimeoutRef.current = setTimeout(() => {
        context.setActiveDropdown(null);
      }, 100);
    } else {
      localTimeoutRef.current = setTimeout(() => {
        setLocalIsOpen(false);
      }, 150);
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={item.href}
        className={`flex items-center gap-1 px-4 py-2 font-medium text-lg transition-colors duration-300 ${
          scrolled
            ? "text-black hover:text-gray-600"
            : "text-white hover:text-gray-200"
        }`}
      >
        {item.label}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </Link>

      <div
        className={`absolute top-full left-0 pt-2 z-50 transition-all duration-150 ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-1 pointer-events-none"
        }`}
        style={{ minWidth: "280px" }}
      >
        <div
          className="rounded-lg shadow-lg border overflow-hidden pl-2 pr-10 py-2"
          style={{
            backgroundColor: theme.colors.white,
            borderColor: theme.colors.gray,
          }}
        >
          {item.subItems.map((subItem, index) => (
            <Link
              key={subItem.href}
              href={subItem.href}
              className={`block pl-2 pr-10 py-3 transition-colors hover:${theme.colors.cream} ${
                index !== item.subItems.length - 1 ? "border-b" : ""
              }`}
              style={{
                borderColor: theme.colors.gray,
              }}
            >
              <span
                className="block font-medium text-base"
                style={{ color: theme.colors.black }}
              >
                {subItem.label}
              </span>
              <span className="block text-sm text-gray-500 mt-0.5">
                {subItem.description}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
