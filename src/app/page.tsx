"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import MobileSidebar from "@/components/MobileSidebar";
import DesktopSidebar from "@/components/DesktopSidebar";
import ProfileModal from "@/components/ProfileModal";
import { useCurrency } from "@/providers/CurrencyProvider";

export default function Home() {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const { formatCurrency } = useCurrency();
  return (
    <div className="flex flex-col lg:flex-row items-start w-full min-h-screen bg-beige-100 relative">
      {/* Desktop Sidebar (hidden on mobile, visible on lg) - added for structure consistency */}
      <DesktopSidebar />

      {/* Main Content Area */}
      <main className="flex flex-col items-center w-full flex-1 mb-20 lg:mb-0 max-w-[1140px] mx-auto">

        {/* Main Content Title */}
        <div className="sticky top-0 z-10 flex flex-row items-start justify-center w-full bg-beige-100 px-4 pt-6 pb-6 md:px-10 md:pt-8 md:pb-8 lg:px-10 lg:pt-8 lg:pb-8">
          <div className="w-full flex-row items-center justify-between flex max-w-[480px] md:max-w-[688px] lg:max-w-[1060px]">
             <h1 className="text-preset-1 text-grey-900">Overview</h1>
             
             {/* Profile Avatar Trigger */}
             <button 
               onClick={() => setIsProfileModalOpen(true)}
               className="w-10 h-10 rounded-full bg-white overflow-hidden border border-grey-500 relative cursor-pointer opacity-90 hover:opacity-100 transition-opacity p-0"
               aria-label="Open Profile"
             >
               <Image src="/assets/images/avatars/emma-richardson.jpg" alt="Profile" fill sizes="40px" className="object-cover" />
             </button>
          </div>
        </div>

        <div className="flex flex-col items-center px-4 pb-6 md:px-10 md:pb-8 lg:px-10 lg:pb-8 gap-8 w-full">
        {/* Summary (Balances) */}
        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 w-full max-w-[480px] md:max-w-[688px] lg:max-w-[1060px]">
          {/* Current Balance */}
          <div className="flex flex-col items-start p-5 md:p-6 gap-3 w-full bg-grey-900 rounded-xl flex-1">
            <span className="text-preset-4 text-white">Current Balance</span>
            <span className="text-preset-1 text-white">{formatCurrency(1836)}</span>
          </div>

          {/* Income */}
          <div className="flex flex-col items-start p-5 md:p-6 gap-3 w-full bg-white rounded-xl flex-1">
            <span className="text-preset-4 text-grey-500">Income</span>
            <span className="text-preset-1 text-grey-900">{formatCurrency(2350)}</span>
          </div>

          {/* Expenses */}
          <div className="flex flex-col items-start p-5 md:p-6 gap-3 w-full bg-white rounded-xl flex-1">
            <span className="text-preset-4 text-grey-500">Expenses</span>
            <span className="text-preset-1 text-grey-900">{formatCurrency(514)}</span>
          </div>
        </div>

        {/* Dashboard Content Split (Left & Right Sides) */}
        <div className="flex flex-col xl:flex-row items-start gap-6 w-full max-w-[480px] md:max-w-[688px] lg:max-w-[1060px]">

          {/* Left Side */}
          <div className="flex flex-col items-start gap-4 md:gap-6 w-full flex-1 xl:max-w-[608px]">

            {/* Saving Pot */}
            <div className="flex flex-col items-start p-5 md:p-8 gap-5 w-full bg-white rounded-xl">
              <div className="flex flex-row justify-between items-center w-full">
                <h2 className="text-preset-2 text-grey-900">Saving Pot</h2>
                <button className="flex flex-row items-center gap-3 bg-transparent border-none text-preset-4 text-grey-500 hover:text-grey-900 group cursor-pointer">
                  See Details
                  <span className="flex items-center justify-center w-3 h-3 text-grey-500 group-hover:text-grey-900">
                    <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L5 5.5L1 10" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </span>
                </button>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-5 w-full">
                {/* Total Saved Card */}
                <div className="flex flex-row items-center p-4 md:p-5 gap-4 w-full md:w-[247px] bg-beige-100 rounded-xl md:shrink-0">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <Image src="/assets/images/icon-pot.svg" alt="Pot" width={40} height={40} />
                  </div>
                  <div className="flex flex-col items-start gap-1 md:gap-[11px]">
                    <span className="text-preset-4 text-grey-500">Total Saved</span>
                    <span className="text-preset-1 text-grey-900">{formatCurrency(850)}</span>
                  </div>
                </div>

                {/* Savings Array */}
                <div className="flex flex-col items-start gap-4 w-full flex-1">
                  <div className="flex flex-row items-center gap-4 md:gap-6 w-full">
                    {/* Item 1 */}
                    <div className="flex flex-row items-center gap-4 w-full flex-1 md:max-w-[170px]">
                      <div className="w-1 h-11 bg-green rounded-lg"></div>
                      <div className="flex flex-col justify-center gap-1">
                        <span className="text-preset-5 text-grey-500">Savings</span>
                        <span className="text-preset-4-bold text-grey-900">{formatCurrency(159)}</span>
                      </div>
                    </div>
                    {/* Item 2 */}
                    <div className="flex flex-row items-center gap-4 w-full flex-1 md:max-w-[170px]">
                      <div className="w-1 h-11 bg-cyan rounded-lg"></div>
                      <div className="flex flex-col justify-center gap-1">
                        <span className="text-preset-5 text-grey-500">Christmas Gift</span>
                        <span className="text-preset-4-bold text-grey-900">{formatCurrency(40)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row items-center gap-4 md:gap-6 w-full">
                    {/* Item 3 */}
                    <div className="flex flex-row items-center gap-4 w-full flex-1 md:max-w-[170px]">
                      <div className="w-1 h-11 bg-navy rounded-lg"></div>
                      <div className="flex flex-col justify-center gap-1">
                        <span className="text-preset-5 text-grey-500">Concert Ticket</span>
                        <span className="text-preset-4-bold text-grey-900">{formatCurrency(110)}</span>
                      </div>
                    </div>
                    {/* Item 4 */}
                    <div className="flex flex-row items-center gap-4 w-full flex-1 md:max-w-[170px]">
                      <div className="w-1 h-11 bg-yellow rounded-lg"></div>
                      <div className="flex flex-col justify-center gap-1">
                        <span className="text-preset-5 text-grey-500">New Laptop</span>
                        <span className="text-preset-4-bold text-grey-900">{formatCurrency(10)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Transactions */}
            <div className="flex flex-col items-start p-5 md:p-8 gap-8 w-full bg-white rounded-xl">
              <div className="flex flex-row justify-between items-center w-full">
                <h2 className="text-preset-2 text-grey-900">Transactions</h2>
                <button className="flex flex-row items-center gap-3 bg-transparent border-none text-preset-4 text-grey-500 hover:text-grey-900 group cursor-pointer">
                  View All
                  <span className="flex items-center justify-center w-3 h-3 text-grey-500 group-hover:text-grey-900">
                    <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L5 5.5L1 10" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </span>
                </button>
              </div>

              {/* Transaction List */}
              <div className="flex flex-col items-start w-full">
                {[
                  { name: "Bravo Zen Spa", amount: 25.00, date: "29 Aug 2024", img: "/assets/images/avatars/emma-richardson.jpg", isPos: false },
                  { name: "Alpha Analytics", amount: 450.00, date: "27 Aug 2024", img: "/assets/images/avatars/savory-bites-bistro.jpg", isPos: true },
                  { name: "Echo Game Store", amount: 21.50, date: "22 Aug 2024", img: "/assets/images/avatars/daniel-carter.jpg", isPos: false },
                  { name: "Food Merchant", amount: 21.50, date: "20 Aug 2024", img: "/assets/images/avatars/sun-park.jpg", isPos: false },
                  { name: "Delta Taxi", amount: 15.00, date: "19 Aug 2024", img: "/assets/images/avatars/urban-services-hub.jpg", isPos: false },
                ].map((txn, index, array) => (
                  <div key={index} className="flex flex-col w-full">
                    <div className="flex flex-row justify-between items-center py-3 w-full">
                      <div className="flex flex-row items-center gap-4">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-beige-100 overflow-hidden relative">
                          <Image
                            src={txn.img}
                            alt={txn.name}
                            fill
                            sizes="32px"
                            className="object-cover"
                          />
                        </div>
                        <span className="text-preset-4-bold text-grey-900">{txn.name}</span>
                      </div>
                      <div className="flex flex-col justify-center items-end gap-2">
                        <span className={`text-preset-4-bold ${txn.isPos ? 'text-green' : 'text-grey-900'}`}>{txn.isPos ? '+' : '-'}{formatCurrency(txn.amount)}</span>
                        <span className="text-preset-5 text-grey-500">{txn.date}</span>
                      </div>
                    </div>
                    {index < array.length - 1 && <div className="w-full h-[1px] bg-grey-100 my-1"></div>}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Side */}
          <div className="flex flex-col items-start gap-4 md:gap-6 w-full flex-1 xl:max-w-[428px]">

            {/* My Budgets */}
            <div className="flex flex-col items-start p-5 md:p-8 gap-5 w-full bg-white rounded-xl">
              <div className="flex flex-row justify-between items-center w-full">
                <h2 className="text-preset-2 text-grey-900">My Budgets</h2>
                <button className="flex flex-row items-center gap-3 bg-transparent border-none text-preset-4 text-grey-500 hover:text-grey-900 group cursor-pointer">
                  See Details
                  <span className="flex items-center justify-center w-3 h-3 text-grey-500 group-hover:text-grey-900">
                    <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L5 5.5L1 10" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </span>
                </button>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 w-full py-2">
                {/* Pie Chart Representation */}
                <div className="relative flex justify-center items-center w-[240px] h-[240px]">
                  <div
                    className="absolute w-[240px] h-[240px] rounded-full"
                    style={{
                      background: "conic-gradient(#277C78 0% 6.1%, #82C9D7 6.1% 67.5%, #F2CDAC 67.5% 84%, #626070 84% 100%)"
                    }}
                  ></div>
                  <div className="absolute w-[187.5px] h-[187.5px] bg-white opacity-25 rounded-full mix-blend-screen"></div>
                  <div className="absolute w-[162px] h-[162px] bg-white rounded-full flex flex-col justify-center items-center gap-2">
                    <span className="text-preset-1 text-grey-900">{formatCurrency(407)}</span>
                    <span className="text-preset-5 text-grey-500">of {formatCurrency(975)} limit</span>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex flex-col gap-4 w-full md:w-auto">
                  <div className="flex flex-row md:flex-col gap-4 w-full">
                    {/* Item 1 */}
                    <div className="flex flex-row items-center gap-4 flex-1">
                      <div className="w-1 h-11 bg-green rounded-lg"></div>
                      <div className="flex flex-col justify-center gap-1">
                        <span className="text-preset-5 text-grey-500">Entertainment</span>
                        <span className="text-preset-4-bold text-grey-900">{formatCurrency(25)}</span>
                      </div>
                    </div>
                    {/* Item 2 */}
                    <div className="flex flex-row items-center gap-4 flex-1">
                      <div className="w-1 h-11 bg-cyan rounded-lg"></div>
                      <div className="flex flex-col justify-center gap-1">
                        <span className="text-preset-5 text-grey-500">Dining Out</span>
                        <span className="text-preset-4-bold text-grey-900">{formatCurrency(67)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row md:flex-col gap-4 w-full">
                    {/* Item 3 */}
                    <div className="flex flex-row items-center gap-4 flex-1">
                      <div className="w-1 h-11 bg-navy rounded-lg"></div>
                      <div className="flex flex-col justify-center gap-1">
                        <span className="text-preset-5 text-grey-500">Personal Care</span>
                        <span className="text-preset-4-bold text-grey-900">{formatCurrency(65)}</span>
                      </div>
                    </div>
                    {/* Item 4 */}
                    <div className="flex flex-row items-center gap-4 flex-1">
                      <div className="w-1 h-11 bg-yellow rounded-lg"></div>
                      <div className="flex flex-col justify-center gap-1">
                        <span className="text-preset-5 text-grey-500">Bills</span>
                        <span className="text-preset-4-bold text-grey-900">{formatCurrency(250)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recurring Bills */}
            <div className="flex flex-col items-start p-5 md:p-8 gap-8 w-full bg-white rounded-xl">
              <div className="flex flex-row justify-between items-center w-full">
                <h2 className="text-preset-2 text-grey-900">Recurring Bills</h2>
                <button className="flex flex-row items-center gap-3 bg-transparent border-none text-preset-4 text-grey-500 hover:text-grey-900 group cursor-pointer">
                  See Details
                  <span className="flex items-center justify-center w-3 h-3 text-grey-500 group-hover:text-grey-900">
                    <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L5 5.5L1 10" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </span>
                </button>
              </div>

              <div className="flex flex-col items-start gap-3 w-full">
                {/* Total */}
                <div className="flex flex-row justify-between items-center py-5 px-4 w-full bg-beige-100 border-l-[4px] border-green rounded-lg">
                  <span className="text-preset-4 text-grey-500">Total recurring bills</span>
                  <span className="text-preset-4-bold text-grey-900">{formatCurrency(1550)}</span>
                </div>
                {/* Remaining */}
                <div className="flex flex-row justify-between items-center py-5 px-4 w-full bg-beige-100 border-l-[4px] border-yellow rounded-lg">
                  <span className="text-preset-4 text-grey-500">Remaining this month</span>
                  <span className="text-preset-4-bold text-grey-900">{formatCurrency(1230)}</span>
                </div>
                {/* Due Soon */}
                <div className="flex flex-row justify-between items-center py-5 px-4 w-full bg-beige-100 border-l-[4px] border-cyan rounded-lg">
                  <span className="text-preset-4 text-grey-500">Total bills due soon</span>
                  <span className="text-preset-4-bold text-grey-900">{formatCurrency(40)}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
        </div>

      </main>

      {/* Mobile Bottom Nav */}
      <div className="lg:hidden w-full fixed bottom-0 left-0 bg-transparent z-50">
        <MobileSidebar />
      </div>

      {/* Profile Modal */}
      <ProfileModal 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)} 
      />
    </div>
  );
}
