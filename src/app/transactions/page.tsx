"use client";

import Image from "next/image";
import MobileSidebar from "@/components/MobileSidebar";
import DesktopSidebar from "@/components/DesktopSidebar";
import { useState } from "react";
import ProfileModal from "@/components/ProfileModal";
import { useCurrency } from "@/providers/CurrencyProvider";

export default function TransactionsPage() {
  const { formatCurrency } = useCurrency();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [activeSort, setActiveSort] = useState("Latest");
  const sortOptions = ["Latest", "Oldest", "A to Z", "Z to A", "Highest", "Lowest"];
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All Transactions");
  const categoryOptions = ["All Transactions", "Entertainment", "Bills", "Groceries", "Dining Out", "Transportation", "Personal Care", "Education", "Lifestyle", "Shopping", "General"];
  const txns = [
    { name: "Bravo Zen Spa", category: "Personal Care", amount: 25.00, date: "29 Aug 2024, 21:45", img: "/assets/images/avatars/emma-richardson.jpg", isPos: false },
    { name: "Alpha Analytics", category: "General", amount: 450.00, date: "27 Aug 2024, 15:00", img: "/assets/images/avatars/savory-bites-bistro.jpg", isPos: true },
    { name: "Echo Game Store", category: "Entertainment", amount: 21.50, date: "22 Aug 2024, 14:30", img: "/assets/images/avatars/daniel-carter.jpg", isPos: false },
    { name: "Food Merchant", category: "Dining Out", amount: 21.50, date: "20 Aug 2024, 20:15", img: "/assets/images/avatars/sun-park.jpg", isPos: false },
    { name: "Delta Taxi", category: "Transportation", amount: 15.00, date: "19 Aug 2024, 08:45", img: "/assets/images/avatars/urban-services-hub.jpg", isPos: false },
    { name: "Bravo Zen Spa", category: "Personal Care", amount: 25.00, date: "18 Aug 2024, 21:45", img: "/assets/images/avatars/emma-richardson.jpg", isPos: false },
    { name: "Echo Game Store", category: "Entertainment", amount: 21.50, date: "16 Aug 2024, 14:30", img: "/assets/images/avatars/daniel-carter.jpg", isPos: false },
    { name: "Food Merchant", category: "Dining Out", amount: 21.50, date: "15 Aug 2024, 20:15", img: "/assets/images/avatars/sun-park.jpg", isPos: false },
    { name: "Bravo Zen Spa", category: "Personal Care", amount: 25.00, date: "12 Aug 2024, 21:45", img: "/assets/images/avatars/emma-richardson.jpg", isPos: false },
    { name: "Alpha Analytics", category: "General", amount: 450.00, date: "10 Aug 2024, 15:00", img: "/assets/images/avatars/savory-bites-bistro.jpg", isPos: true },
  ];

  return (
    <div className="flex flex-col lg:flex-row items-start w-full min-h-screen bg-beige-100 relative">
      <DesktopSidebar />

      <main className="flex flex-col items-center w-full flex-1 mb-[52px] lg:mb-0 max-w-[1140px] mx-auto">
        <div className="sticky top-0 z-10 flex flex-row items-center justify-center w-full bg-beige-100 px-4 pt-6 pb-6 md:px-10 md:pt-8 md:pb-8 lg:px-10 lg:pt-8 lg:pb-8">
          <div className="w-full flex justify-between items-center max-w-[480px] md:max-w-[688px] lg:max-w-[1060px]">
            <h1 className="text-preset-1 text-grey-900">Transactions</h1>
            <button 
              onClick={() => setIsProfileModalOpen(true)}
              className="w-10 h-10 rounded-full bg-white overflow-hidden border border-grey-500 relative cursor-pointer opacity-90 hover:opacity-100 transition-opacity p-0 flex-shrink-0"
              aria-label="Open Profile"
            >
              <Image src="/assets/images/avatars/emma-richardson.jpg" alt="Profile" fill sizes="40px" className="object-cover" />
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center px-4 pb-6 md:px-10 md:pb-8 lg:px-10 lg:pb-8 gap-8 w-full">
        <div className="flex flex-col items-center px-5 py-6 gap-6 w-full max-w-[343px] md:max-w-[688px] lg:max-w-[1060px] bg-white rounded-xl">
          <div className="flex flex-row justify-between items-center w-full gap-6">
            <div className="flex flex-row items-center px-5 py-3 gap-4 w-[215px] h-[45px] bg-white border border-grey-500 rounded-lg group focus-within:border-grey-900">
              <input
                type="text"
                placeholder="Search transaction"
                className="w-full text-preset-4 text-grey-900 placeholder:text-grey-500 outline-none bg-transparent"
              />
              <Image src="/assets/images/icon-search.svg" alt="Search" width={16} height={16} className="opacity-60 group-focus-within:opacity-100" />
            </div>

            <div className="flex flex-row justify-end items-center gap-6 shrink-0 md:h-[45px]">
              
              {/* Sort By Container */}
              <div className="flex flex-row items-center gap-2 relative">
                <span className="hidden md:block text-preset-4 text-grey-500">Sort by</span>
                <button 
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="flex items-center justify-center md:justify-between w-5 h-5 md:w-[114px] md:h-[45px] md:px-5 md:py-3 md:border md:border-grey-500 md:rounded-lg bg-transparent md:bg-white cursor-pointer hover:border-grey-900 group transition-colors" 
                  aria-label="Sort"
                >
                  <Image src="/assets/images/icon-sort-mobile.svg" alt="Sort" width={20} height={20} className="md:hidden" />
                  <span className="hidden md:block text-preset-4 text-grey-900">{activeSort}</span>
                  <Image src="/assets/images/icon-caret-down.svg" alt="Caret" width={12} height={12} className={`hidden md:block transition-transform duration-300 ${isSortOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown Menu */}
                {isSortOpen && (
                  <div className="absolute top-[30px] md:top-[55px] right-0 flex flex-col items-start p-3 md:py-3 md:px-5 gap-3 w-[114px] bg-white shadow-[0px_4px_24px_rgba(0,0,0,0.25)] rounded-lg z-50">
                    {sortOptions.map((opt, i) => (
                      <div key={opt} className="flex flex-col w-full gap-3">
                        <button
                          onClick={() => { setActiveSort(opt); setIsSortOpen(false); }}
                          className="flex flex-row items-center w-full bg-transparent border-none p-0 cursor-pointer text-left hover:opacity-80 transition-opacity"
                        >
                          <span className={`w-full ${activeSort === opt ? "text-preset-4-bold text-grey-900" : "text-preset-4 text-grey-900"}`}>{opt}</span>
                        </button>
                        {i < sortOptions.length - 1 && <div className="w-full h-[1px] border-b border-[#F2F2F2]"></div>}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Filter By Container */}
              <div className="flex flex-row items-center gap-2 relative">
                <span className="hidden md:block text-preset-4 text-grey-500">Category</span>
                <button 
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="flex items-center justify-center md:justify-between w-5 h-5 md:w-[177px] md:h-[45px] md:px-5 md:py-3 md:border md:border-grey-500 md:rounded-lg bg-transparent md:bg-white cursor-pointer hover:border-grey-900 group transition-colors" 
                  aria-label="Filter"
                >
                  <Image src="/assets/images/icon-filter-mobile.svg" alt="Filter" width={20} height={20} className="md:hidden" />
                  <span className="hidden md:block text-preset-4 text-grey-900">{activeCategory}</span>
                  <Image src="/assets/images/icon-caret-down.svg" alt="Caret" width={12} height={12} className={`hidden md:block transition-transform duration-300 ${isCategoryOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown Menu */}
                {isCategoryOpen && (
                  <div className="absolute top-[30px] md:top-[55px] right-0 flex flex-col items-start p-3 md:py-3 md:px-5 gap-3 w-[177px] max-h-[300px] overflow-y-auto bg-white shadow-[0px_4px_24px_rgba(0,0,0,0.25)] rounded-lg z-50">
                    {categoryOptions.map((opt, i) => (
                      <div key={opt} className="flex flex-col w-full gap-3">
                        <button
                          onClick={() => { setActiveCategory(opt); setIsCategoryOpen(false); }}
                          className="flex flex-row items-center w-full bg-transparent border-none p-0 cursor-pointer text-left hover:opacity-80 transition-opacity"
                        >
                          <span className={`w-full ${activeCategory === opt ? "text-preset-4-bold text-grey-900" : "text-preset-4 text-grey-900"}`}>{opt}</span>
                        </button>
                        {i < categoryOptions.length - 1 && <div className="w-full h-[1px] border-b border-[#F2F2F2]"></div>}
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>

          <div className="flex flex-col items-start gap-4 w-full">
            {txns.map((txn, index) => (
              <div key={index} className="flex flex-col w-full gap-4">
                <div className="flex flex-row justify-between items-center w-full">
                  <div className="flex flex-row items-center gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden relative shrink-0">
                      <Image src={txn.img} alt={txn.name} fill sizes="32px" className="object-cover" />
                    </div>
                    <div className="flex flex-col justify-center items-start gap-1">
                      <h2 className="text-preset-4-bold text-grey-900">{txn.name}</h2>
                      <p className="text-preset-5 text-grey-500">{txn.category}</p>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center items-end gap-1 shrink-0">
                    <span className={`text-preset-4-bold ${txn.isPos ? 'text-green' : 'text-grey-900'}`}>{txn.isPos ? '+' : '-'}{formatCurrency(txn.amount)}</span>
                    <span className="text-preset-5 text-grey-500">{txn.date}</span>
                  </div>
                </div>
                {index < txns.length - 1 && <div className="w-full h-[1px] bg-grey-100"></div>}
              </div>
            ))}
          </div>

          <div className="flex flex-row justify-between items-center pt-6 w-full">
            <button className="flex justify-center items-center w-[48px] h-10 border border-grey-500 rounded-lg bg-white cursor-pointer hover:bg-beige-100 transition-colors">
              <Image src="/assets/images/icon-caret-left.svg" alt="Previous" width={16} height={16} className="rotate-0" />
            </button>

            <div className="flex flex-row items-center gap-2">
              <button className="flex justify-center items-center w-10 h-10 bg-grey-900 text-white text-preset-4 rounded-lg cursor-pointer">1</button>
              <button className="flex justify-center items-center w-10 h-10 bg-white border border-grey-500 text-grey-900 text-preset-4 rounded-lg cursor-pointer hover:bg-beige-100 transition-colors">2</button>
              <button className="flex justify-center items-center w-10 h-10 bg-white border border-grey-500 text-grey-900 text-preset-4 rounded-lg cursor-pointer hover:bg-beige-100 transition-colors">3</button>
            </div>

            <button className="flex justify-center items-center w-[48px] h-10 border border-grey-500 rounded-lg bg-white cursor-pointer hover:bg-beige-100 transition-colors">
              <Image src="/assets/images/icon-caret-right.svg" alt="Next" width={16} height={16} className="rotate-0" />
            </button>
          </div>
        </div>
        </div>
      </main>

      <div className="lg:hidden w-full fixed bottom-0 left-0 bg-transparent z-50">
        <MobileSidebar />
      </div>

      <ProfileModal 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)} 
      />
    </div>
  );
}
