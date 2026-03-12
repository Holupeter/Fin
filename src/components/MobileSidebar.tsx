"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

export default function MobileSidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-row justify-between items-center px-4 md:px-10 pt-2 pb-0 w-full md:w-[768px] mx-auto bg-grey-900 rounded-t-lg md:rounded-t-[8px]">
      <div className="flex flex-row justify-between items-center mx-auto w-full max-w-[800px] md:w-[688px] h-11 md:h-[66px] gap-4 md:gap-[52px]">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex flex-col items-center justify-center pt-2 pb-3 gap-1 md:gap-1 flex-1 md:w-[104px] md:h-[66px] md:flex-none rounded-t-lg
                ${
                  isActive
                    ? "bg-beige-100 border-b-4 border-green text-grey-900"
                    : "text-grey-300"
                }
              `}
            >
              <div className={`relative w-6 h-6 ${isActive ? "" : "text-grey-300 fill-current"}`}>
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={24}
                  height={24}
                  className={isActive ? "brightness-0" : ""}
                  style={
                    isActive
                      ? {
                          filter:
                            "invert(38%) sepia(25%) saturate(1000%) hue-rotate(130deg) brightness(85%) contrast(85%)",
                        }
                      : { filter: "invert(70%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(95%) contrast(90%)" } // Approx #B3B3B3
                  }
                />
              </div>
              {/* Label - hidden on mobile, visible on tablet+ */}
              <span
                className={`hidden md:block text-preset-5-bold ${
                  isActive ? "text-grey-900" : "text-grey-300"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
