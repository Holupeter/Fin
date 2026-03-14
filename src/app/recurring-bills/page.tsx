"use client";

import DesktopSidebar from "@/components/DesktopSidebar";
import MobileSidebar from "@/components/MobileSidebar";
import Image from "next/image";
import { useState } from "react";
import ProfileModal from "@/components/ProfileModal";
import UserAvatar from "@/components/UserAvatar";
import { SmartAmount } from "@/components/SmartAmount";
import { useCurrency } from "@/providers/CurrencyProvider";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RecurringBillsPage() {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const { formatCurrency } = useCurrency();
  const { user, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push("/login");
    }
  }, [user, isAuthLoading, router]);

  const userId = user?.id || "";
  const liveBills = useQuery(api.bills.getBills, { userId });

  if (isAuthLoading || !user || !liveBills) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-beige-100">
        <p className="text-preset-4 text-grey-500 animate-pulse">Loading Bills...</p>
      </div>
    );
  }

  const totalBillsAmount = liveBills.reduce((sum: number, b: any) => sum + b.amount, 0);
  
  const paidBills = liveBills.filter((b: any) => b.status === "paid");
  const paidAmount = paidBills.reduce((sum: number, b: any) => sum + b.amount, 0);
  
  const upcomingBills = liveBills.filter((b: any) => b.status === "upcoming");
  const upcomingAmount = upcomingBills.reduce((sum: number, b: any) => sum + b.amount, 0);
  
  const dueSoonBills = liveBills.filter((b: any) => b.status === "due-soon");
  const dueSoonAmount = dueSoonBills.reduce((sum: number, b: any) => sum + b.amount, 0);

  const bills = liveBills.map((b: any) => ({
    title: b.name,
    date: b.dueDate, // Expecting a string like "5th" or a date string
    amount: b.amount,
    logo: "/assets/images/avatars/alpha-analytics.jpg", // Fallback logo
    isDueSoon: b.status === "due-soon",
    status: b.status
  }));

  return (
    <div className="flex flex-col lg:flex-row items-start w-full min-h-screen bg-beige-100 relative">
      <DesktopSidebar />

      <main className="flex flex-col items-center flex-1 min-w-0 mb-[52px] lg:mb-0 max-w-[1140px] mx-auto">
        {/* Top Title */}
        <div className="sticky top-0 z-10 flex flex-row items-center justify-center w-full bg-beige-100 px-4 pt-6 pb-6 md:px-10 md:pt-8 md:pb-8 lg:px-10 lg:pt-8 lg:pb-8">
          <div className="flex flex-row items-center justify-between w-full max-w-[480px] md:max-w-[688px] lg:max-w-[1060px]">
            <h1 className="text-preset-1 text-grey-900">Recurring Bills</h1>
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="p-0 border-none bg-transparent cursor-pointer opacity-90 hover:opacity-100 transition-opacity flex-shrink-0"
              aria-label="Open Profile"
            >
              <UserAvatar />
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center w-full px-4 pb-6 md:px-10 md:pb-8 lg:px-10 lg:pb-8 relative overflow-hidden">
          {/* Main Content with Blur */}
          <div className="flex flex-col lg:flex-row items-start gap-6 w-full max-w-[480px] md:max-w-[688px] lg:max-w-[1060px] blur-[6px] select-none pointer-events-none opacity-40">
            {/* Bills Content */}

            {/* Left Side Equivalent (Tablet/Desktop) */}
            <div className="flex flex-col gap-6 w-full lg:w-[337px] lg:flex-none">
              {/* Total Bills */}
              <div className="flex flex-row items-center p-6 gap-5 w-full bg-grey-900 rounded-xl shadow-sm">
                <div className="w-10 h-10 flex items-center justify-center">
                  <Image src="/assets/images/icon-recurring-bills.svg" alt="Recurring Bills" width={40} height={40} className="brightness-0 invert" />
                </div>
                <div className="flex flex-col gap-3 w-full overflow-hidden">
                  <span className="text-preset-4 text-white">Total bills</span>
                  <SmartAmount amount={formatCurrency(totalBillsAmount)} className="text-preset-1 text-white" />
                </div>
              </div>

              {/* Summary */}
              <div className="flex flex-col p-5 gap-5 w-full bg-white rounded-xl shadow-sm">
                <span className="text-preset-3 text-grey-900">Summary</span>

                <div className="flex flex-col w-full">
                  {/* Paid Bills */}
                  <div className="flex flex-row justify-between items-center py-4 w-full border-b border-grey-100 border-opacity-15">
                    <span className="text-preset-5 text-grey-500">Paid Bills</span>
                    <span className="text-preset-5-bold text-grey-900">{paidBills.length} ({formatCurrency(paidAmount)})</span>
                  </div>
                  {/* Total Upcoming */}
                  <div className="flex flex-row justify-between items-center py-4 w-full border-b border-grey-100 border-opacity-15">
                    <span className="text-preset-5 text-grey-500">Total Upcoming</span>
                    <span className="text-preset-5-bold text-grey-900">{upcomingBills.length} ({formatCurrency(upcomingAmount)})</span>
                  </div>
                  {/* Due Soon */}
                  <div className="flex flex-row justify-between items-center pt-4 w-full">
                    <span className="text-preset-5 text-red text-opacity-80">Due soon</span>
                    <span className="text-preset-5-bold text-red">{dueSoonBills.length} ({formatCurrency(dueSoonAmount)})</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side Equivalent (Tablet/Desktop) */}
            <div className="flex flex-col p-5 md:p-8 gap-6 w-full bg-white rounded-xl flex-1 shadow-sm">
              {/* Search Top */}
              <div className="flex flex-row items-center gap-6 w-full">
                <div className="flex flex-row items-center px-5 py-3 gap-4 w-full bg-white border border-beige-500 border-opacity-30 rounded-lg">
                  <input type="text" placeholder="Search bills" className="w-full text-preset-4 text-grey-900 bg-transparent border-none outline-none placeholder-beige-500" readOnly />
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
                  <div key={index} className="flex flex-col md:flex-row md:items-center py-4 w-full border-b border-grey-100 border-opacity-20 last:border-none gap-2 md:gap-8">
                    <div className="flex flex-row items-center gap-4 w-full md:flex-1">
                      <div className="w-8 h-8 rounded-full overflow-hidden relative bg-beige-100 flex-shrink-0">
                        <Image src={bill.logo} alt={bill.title} fill sizes="32px" className="object-cover" />
                      </div>
                      <span className="text-preset-4-bold text-grey-900">{bill.title}</span>
                    </div>
                    <div className="flex flex-row justify-between items-center w-full md:w-auto md:gap-8">
                      <div className="flex flex-row items-center gap-2 md:w-[120px]">
                        <span className={`text-preset-5 text-grey-500`}>{bill.date}</span>
                      </div>
                      <SmartAmount 
                        amount={formatCurrency(bill.amount)} 
                        className={`text-preset-4-bold text-grey-900 md:w-[100px] text-right`} 
                        maxWidth={100}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Coming Soon Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-40 bg-white/50 backdrop-blur-[2px] pt-20">
            <div className="flex flex-col items-center gap-6 p-10 bg-white rounded-2xl shadow-[0px_10px_40px_rgba(0,0,0,0.1)] transform rotate-[-3deg] border border-beige-500/20">
              <div className="w-16 h-16 flex items-center justify-center bg-grey-900 rounded-full shadow-lg">
                <Image src="/assets/images/icon-nav-recurring-bills.svg" alt="Coming Soon" width={32} height={32} className="brightness-0 invert" />
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <h2 className="text-preset-1 text-grey-900 tracking-tight">COMING SOON</h2>
                <p className="text-preset-4 text-grey-500 max-w-[280px]">We're currently building the specialized tracking engine for your recurring expenses.</p>
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
