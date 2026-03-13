"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  {
    label: "Overview",
    href: "/",
    icon: "/assets/images/icon-nav-overview.svg",
  },
  {
    label: "Transactions",
    href: "/transactions",
    icon: "/assets/images/icon-nav-transactions.svg",
  },
  {
    label: "Budgets",
    href: "/budgets",
    icon: "/assets/images/icon-nav-budgets.svg",
  },
  {
    label: "Pots",
    href: "/pots",
    icon: "/assets/images/icon-nav-pots.svg",
  },
  {
    label: "Recurring Bills",
    href: "/recurring-bills",
    icon: "/assets/images/icon-nav-recurring-bills.svg",
  },
];

export default function DesktopSidebar() {
  const pathname = usePathname();
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <aside
      className={`hidden lg:flex flex-col items-start pb-6 gap-6 sticky top-0 h-screen overflow-y-auto bg-grey-900 rounded-r-2xl transition-all duration-300 flex-shrink-0 z-20 ${
        isMinimized ? "w-[88px]" : "w-[300px]"
      }`}
    >
      {/* Logo */}
      <div
        className={`flex flex-col justify-center gap-2 py-10 ${
          isMinimized ? "items-center px-8 w-[88px]" : "items-start px-8 w-[300px]"
        }`}
      >
        {isMinimized ? (
          <Image
            src="/assets/images/logo-small.svg"
            alt="Finance App Logo"
            width={13}
            height={22}
          />
        ) : (
          <Image
            src="/assets/images/logo-large.svg"
            alt="Finance App Logo"
            width={121.45}
            height={21.76}
          />
        )}
      </div>

      {/* Menu Section */}
      <div
        className={`flex flex-col items-start pr-2 gap-1 flex-1 ${
          isMinimized ? "w-[88px]" : "w-[300px]"
        }`}
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex flex-row items-center py-4 pl-8 h-14 rounded-r-xl border-l-[4px] gap-4 transition-all duration-300 group
                ${isMinimized ? "w-20" : "w-[276px]"}
                ${
                  isActive
                    ? "bg-beige-100 border-green text-grey-900"
                    : "border-transparent text-grey-500 hover:text-white"
                }
              `}
            >
              <Image
                src={item.icon}
                alt={item.label}
                width={24}
                height={24}
                className={
                  isActive
                    ? "brightness-0 group-hover:brightness-0"
                    : "opacity-60 group-hover:opacity-100"
                }
                style={
                  isActive
                    ? {
                        filter:
                          "invert(38%) sepia(25%) saturate(1000%) hue-rotate(130deg) brightness(85%) contrast(85%)",
                      }
                    : undefined
                }
              />
              {!isMinimized && (
                <span
                  className={`text-preset-3 ${
                    isActive ? "text-grey-900 group-hover:text-grey-900" : ""
                  }`}
                >
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Minimize Button */}
      <button
        onClick={() => setIsMinimized(!isMinimized)}
        className={`flex flex-row items-center py-4 pl-8 h-14 rounded-r-xl opacity-60 hover:opacity-100 cursor-pointer bg-transparent border-none outline-none mt-auto gap-4 group transition-all duration-300 text-grey-500 hover:text-white ${
          isMinimized ? "w-20 justify-start" : "w-[276px] pr-8"
        }`}
      >
        <Image
          src="/assets/images/icon-minimize-menu.svg"
          alt="Minimize Menu"
          width={24}
          height={24}
          className={`transition-transform duration-300 ${
            isMinimized ? "rotate-180" : "rotate-0"
          }`}
        />
        {!isMinimized && (
          <span className="text-preset-3">Minimize Menu</span>
        )}
      </button>
    </aside>
  );
}
