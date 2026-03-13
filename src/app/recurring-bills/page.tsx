"use client";

import DesktopSidebar from "@/components/DesktopSidebar";
import MobileSidebar from "@/components/MobileSidebar";
import Image from "next/image";
import { useState } from "react";
import ProfileModal from "@/components/ProfileModal";
import { useCurrency } from "@/providers/CurrencyProvider";

export default function RecurringBillsPage() {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const { formatCurrency } = useCurrency();
  const bills = [
    { title: "Elevate Education", date: "1 Aug 2024, 13:44", amount: 250.00, logo: "/assets/images/avatars/alpha-analytics.jpg", isDueSoon: false },
    { title: "Bravo Zen Spa", date: "1 Aug 2024, 13:44", amount: 250.00, logo: "/assets/images/avatars/bravo-zen-spa.jpg", isDueSoon: false },
    { title: "Charlie Electric Company", date: "5 Aug 2024, 12:10", amount: 250.00, logo: "/assets/images/avatars/charlie-electric-company.jpg", isDueSoon: true },
    { title: "Delta Taxi", date: "5 Aug 2024, 12:10", amount: 250.00, logo: "/assets/images/avatars/delta-taxi.jpg", isDueSoon: true },
    { title: "Echo Game Store", date: "1 Aug 2024, 13:44", amount: 250.00, logo: "/assets/images/avatars/echo-game-store.jpg", isDueSoon: false },
    { title: "Food Merchant", date: "1 Aug 2024, 13:44", amount: 250.00, logo: "/assets/images/avatars/food-merchant.jpg", isDueSoon: false },
    { title: "Tango Gas Company", date: "1 Aug 2024, 13:44", amount: 250.00, logo: "/assets/images/avatars/tango-gas-company.jpg", isDueSoon: false },
    { title: "Juliet Restaurant", date: "1 Aug 2024, 13:44", amount: 250.00, logo: "/assets/images/avatars/juliet-restaurant.jpg", isDueSoon: false },
  ];

  return (
    <div className="flex flex-col lg:flex-row items-start w-full min-h-screen bg-beige-100 relative">
      <DesktopSidebar />

      <main className="flex flex-col items-center w-full flex-1 mb-[52px] lg:mb-0 max-w-[1140px] mx-auto">
        {/* Top Title */}
        <div className="sticky top-0 z-10 flex flex-row items-center justify-center w-full bg-beige-100 px-4 pt-6 pb-6 md:px-10 md:pt-8 md:pb-8 lg:px-10 lg:pt-8 lg:pb-8">
          <div className="flex flex-row items-center justify-between w-full max-w-[480px] md:max-w-[688px] lg:max-w-[1060px]">
            <h1 className="text-preset-1 text-grey-900">Recurring Bills</h1>
            <button 
              onClick={() => setIsProfileModalOpen(true)}
              className="w-10 h-10 rounded-full bg-white overflow-hidden border border-grey-500 relative cursor-pointer opacity-90 hover:opacity-100 transition-opacity p-0 flex-shrink-0"
              aria-label="Open Profile"
            >
              <Image src="/assets/images/avatars/emma-richardson.jpg" alt="Profile" fill sizes="40px" className="object-cover" />
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center w-full px-4 pb-6 md:px-10 md:pb-8 lg:px-10 lg:pb-8">
          <div className="flex flex-col lg:flex-row items-start gap-6 w-full max-w-[480px] md:max-w-[688px] lg:max-w-[1060px]">
          {/* Bills Content */}

          {/* Left Side Equivalent (Tablet/Desktop) */}
          <div className="flex flex-col gap-6 w-full lg:w-[337px] lg:flex-none">
            {/* Total Bills */}
            <div className="flex flex-row items-center p-6 gap-5 w-full bg-grey-900 rounded-xl">
              <div className="w-10 h-10 flex items-center justify-center">
                <Image src="/assets/images/icon-recurring-bills.svg" alt="Recurring Bills" width={40} height={40} className="brightness-0 invert" />
              </div>
              <div className="flex flex-col gap-3 w-full">
                <span className="text-preset-4 text-white">Total bills</span>
                <span className="text-preset-1 text-white">{formatCurrency(1550)}</span>
              </div>
            </div>

            {/* Summary */}
            <div className="flex flex-col p-5 gap-5 w-full bg-white rounded-xl">
              <span className="text-preset-3 text-grey-900">Summary</span>

              <div className="flex flex-col w-full">
                {/* Paid Bills */}
                <div className="flex flex-row justify-between items-center py-4 w-full border-b border-grey-100 border-opacity-15">
                  <span className="text-preset-5 text-grey-500">Paid Bills</span>
                  <span className="text-preset-5-bold text-grey-900">2 ({formatCurrency(320)})</span>
                </div>
                {/* Total Upcoming */}
                <div className="flex flex-row justify-between items-center py-4 w-full border-b border-grey-100 border-opacity-15">
                  <span className="text-preset-5 text-grey-500">Total Upcoming</span>
                  <span className="text-preset-5-bold text-grey-900">6 ({formatCurrency(1230)})</span>
                </div>
                {/* Due Soon */}
                <div className="flex flex-row justify-between items-center pt-4 w-full">
                  <span className="text-preset-5 text-red text-opacity-80">Due soon</span>
                  <span className="text-preset-5-bold text-red">2 ({formatCurrency(40)})</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Equivalent (Tablet/Desktop) */}
          <div className="flex flex-col p-5 md:p-8 gap-6 w-full bg-white rounded-xl flex-1">
            {/* Search Top */}
            <div className="flex flex-row items-center gap-6 w-full">
               <div className="flex flex-row items-center px-5 py-3 gap-4 w-full bg-white border border-beige-500 border-opacity-30 rounded-lg">
                 <input type="text" placeholder="Search bills" className="w-full text-preset-4 text-grey-900 bg-transparent border-none outline-none placeholder-beige-500" />
                 <Image src="/assets/images/icon-search.svg" alt="Search" width={16} height={16} />
               </div>
               <div className="flex items-center justify-center cursor-pointer min-w-5">
                  <Image src="/assets/images/icon-filter-mobile.svg" alt="Filter" width={20} height={20} />
               </div>
            </div>

            {/* Table Content Mobile/Desktop */}
            <div className="flex flex-col w-full mt-2">
               {/* Desktop Table Header */}
               <div className="hidden md:flex flex-row items-center py-3 w-full border-b border-grey-100 border-opacity-20 gap-8">
                 <span className="text-preset-5 text-grey-500 flex-1">Bill Title</span>
                 <span className="text-preset-5 text-grey-500 w-[120px]">Due Date</span>
                 <span className="text-preset-5 text-grey-500 w-[100px] text-right">Amount</span>
               </div>
               
               {bills.map((bill, index) => (
                  <div key={index} className="flex flex-col md:flex-row md:items-center py-4 w-full border-b border-grey-100 border-opacity-20 last:border-none gap-2 md:gap-8 hover:bg-beige-100/50 transition-colors">
                     <div className="flex flex-row items-center gap-4 w-full md:flex-1">
                       <div className="w-8 h-8 rounded-full overflow-hidden relative bg-beige-100 flex-shrink-0">
                         <Image src={bill.logo} alt={bill.title} fill sizes="32px" className="object-cover" />
                       </div>
                       <span className="text-preset-4-bold text-grey-900">{bill.title}</span>
                     </div>
                     <div className="flex flex-row justify-between items-center w-full md:w-auto md:gap-8">
                        <div className="flex flex-row items-center gap-2 md:w-[120px]">
                           <span className={`text-preset-5 ${bill.isDueSoon ? 'text-green' : 'text-green'}`}>{bill.date}</span>
                           {bill.isDueSoon && <Image src="/assets/images/icon-bill-due.svg" alt="Due soon" width={16} height={16} className="md:hidden" />}
                        </div>
                        <span className={`text-preset-4-bold ${bill.isDueSoon ? 'text-red' : 'text-grey-900'} md:w-[100px] md:text-right`}>{formatCurrency(bill.amount)}</span>
                     </div>
                  </div>
               ))}
            </div>
          </div>
        </div>
        </div>
      </main>

      {/* Mobile Bottom Nav */}
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
