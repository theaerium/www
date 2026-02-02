"use client";

import { useState, useRef, createContext, useContext } from "react";
import Link from "next/link";
import { NavItem } from "../config/navigation";

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
      {children}
    </NavContext.Provider>
  );
}

export function useNavContext() {
  return useContext(NavContext);
}

export function useDropdownOpen() {
  const context = useContext(NavContext);
  return !!context?.activeDropdown;
}

interface NavDropdownProps {
  item: NavItem;
  scrolled?: boolean;
}

export default function NavDropdown({ item }: NavDropdownProps) {
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
      }, 200);
    } else {
      localTimeoutRef.current = setTimeout(() => {
        setLocalIsOpen(false);
      }, 200);
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="flex items-center gap-1 px-4 py-2 font-medium text-lg transition-colors duration-300 text-black hover:text-gray-600 cursor-pointer">
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
      </button>
    </div>
  );
}

interface NavDropdownPanelProps {
  items: NavItem[];
}

export function NavDropdownPanel({ items }: NavDropdownPanelProps) {
  const context = useContext(NavContext);
  const activeItem = items.find(
    (item) => item.label === context?.activeDropdown,
  );
  const isOpen = !!activeItem;

  const handleMouseEnter = () => {
    if (context?.closeTimeoutRef.current) {
      clearTimeout(context.closeTimeoutRef.current);
      context.closeTimeoutRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    if (context) {
      context.closeTimeoutRef.current = setTimeout(() => {
        context.setActiveDropdown(null);
      }, 200);
    }
  };

  return (
    <div
      className={`absolute top-full left-0 right-0 z-40 transition-all duration-300 ease-in-out overflow-hidden ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      style={{
        maxHeight: isOpen ? "75vh" : "0",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="w-full bg-white">
        <div className="px-4 sm:px-6 lg:px-8">
          <div
            key={activeItem?.label}
            className="max-w-7xl mx-auto py-12 sm:py-16 lg:py-20 pl-8 sm:pl-16 lg:pl-32 xl:pl-48"
          >
            <h3 className="text-3xl sm:text-4xl font-normal text-black mb-10">
              {activeItem?.heading}
            </h3>
            <div className="max-w-lg space-y-10">
              {activeItem?.subItems.map((subItem) => (
                <Link
                  key={subItem.label}
                  href={subItem.href}
                  className="block group"
                  onClick={() => context?.setActiveDropdown(null)}
                >
                  <span className="block font-semibold text-xl text-black group-hover:text-gray-500 transition-colors">
                    {subItem.label}
                  </span>
                  <span className="block text-base text-gray-400 mt-2 leading-relaxed">
                    {subItem.description}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
