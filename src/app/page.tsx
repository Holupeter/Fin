"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import MobileSidebar from "@/components/MobileSidebar";
import DesktopSidebar from "@/components/DesktopSidebar";
import ProfileModal from "@/components/ProfileModal";
import { SmartAmount } from "@/components/SmartAmount";
import { useCurrency } from "@/providers/CurrencyProvider";
import { TransactionTable } from "@/components/TransactionTable";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
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

  const transactions = useQuery(api.transactions.getTransactions, { userId });
  const budgets = useQuery(api.budgets.getBudgets, { userId });
  const pots = useQuery(api.pots.getPots, { userId });
  const bills = useQuery(api.bills.getBills, { userId });

  if (isAuthLoading || !user || !transactions || !budgets || !pots || !bills) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-beige-100">
        <p className="text-preset-4 text-grey-500 animate-pulse">Loading Dashboard...</p>
      </div>
    );
  }

  // Helpers
  const getThemeColor = (theme?: string, index: number = 0) => {
    const themeMap: Record<string, string> = {
      "Green": "#277C78",
      "Yellow": "#F2CDAC",
      "Cyan": "#82C9D7",
      "Navy": "#626070",
      "Red": "#C94736",
      "Purple": "#826CB0",
      "Turquoise": "#597C7C",
      "Brown": "#93674F",
      "Magenta": "#934F6F",
      "Blue": "#3F82B2",
      "Navy Grey": "#97A0AC",
      "Army Green": "#7F9161",
      "Orange": "#BE6C49",
      "Peach": "#CAB361",
      "Purple 2": "#7F61DC"
    };
    if (theme && themeMap[theme]) return themeMap[theme];
    const colors = ["#277C78", "#82C9D7", "#F2CDAC", "#626070", "#AF81BA", "#BE6C49"];
    return colors[index % colors.length];
  };

  // Summary Calcs
  const statsIncome = transactions
    .filter((t: any) => t.type === "income" && t.category !== "Savings")
    .reduce((sum: number, t: any) => sum + t.amount, 0);

  const statsExpenses = transactions
    .filter((t: any) => t.type === "expense" && t.category !== "Savings")
    .reduce((sum: number, t: any) => sum + t.amount, 0);

  const totalIncome = transactions
    .filter((t: any) => t.type === "income")
    .reduce((sum: number, t: any) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t: any) => t.type === "expense")
    .reduce((sum: number, t: any) => sum + t.amount, 0);

  const totalBudgetLimit = budgets.reduce((sum: number, b: any) => sum + b.budgetAmount, 0);
  const currentBalance = (totalIncome - totalExpenses) - totalBudgetLimit;

  // Pots Calcs
  const totalSaved = pots.reduce((sum: number, p: any) => sum + p.currentAmount, 0);
  const potsDisplay = [...pots].sort((a: any, b: any) => b.createdAt - a.createdAt).slice(0, 3);

  // Budgets Calcs
  const budgetStats = budgets.map((b: any, i: number) => {
    const spent = transactions
      .filter((t: any) => t.category === b.category && t.type === "expense")
      .reduce((sum: number, t: any) => sum + t.amount, 0);
    return {
      ...b,
      spent,
      color: getThemeColor(b.theme, i)
    };
  });

  const totalBudgetSpent = budgetStats.reduce((sum: number, b: any) => sum + b.spent, 0);

  // Recurring Bills Calcs
  const totalBillsAmount = bills.reduce((sum: number, b: any) => sum + b.amount, 0);
  const remainingBillsAmount = bills
    .filter((b: any) => b.status === "upcoming" || b.status === "due-soon")
    .reduce((sum: number, b: any) => sum + b.amount, 0);
  const dueSoonBillsAmount = bills
    .filter((b: any) => b.status === "due-soon")
    .reduce((sum: number, b: any) => sum + b.amount, 0);
  const paidBillsAmount = bills
    .filter((b: any) => b.status === "paid")
    .reduce((sum: number, b: any) => sum + b.amount, 0);


  const conicGradient = budgets.length > 0
    ? budgetStats.map((b: any) => {
      const percentage = (b.budgetAmount / totalBudgetLimit) * 100;
      return { color: b.color, percentage };
    }).reduce((acc: any, curr: any, i: number, arr: any[]) => {
      const start = acc.prev;
      const end = start + curr.percentage;
      acc.str += `${curr.color} ${start}% ${end}%${i < arr.length - 1 ? ', ' : ''}`;
      acc.prev = end;
      return acc;
    }, { str: "", prev: 0 }).str
    : "#F2F2F2 0% 100%";
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
            <div className="flex flex-col items-start p-5 md:p-6 gap-3 w-full bg-grey-900 rounded-xl flex-1 min-w-0 overflow-hidden">
              <span className="text-preset-4 text-white">Current Balance</span>
              <SmartAmount amount={formatCurrency(currentBalance)} className="text-preset-1 text-white" />
            </div>

            {/* Income */}
            <div className="flex flex-col items-start p-5 md:p-6 gap-3 w-full bg-white rounded-xl flex-1 min-w-0 overflow-hidden">
              <span className="text-preset-4 text-grey-500">Income</span>
              <SmartAmount amount={formatCurrency(statsIncome)} className="text-preset-1 text-grey-900" />
            </div>

            {/* Expenses */}
            <div className="flex flex-col items-start p-5 md:p-6 gap-3 w-full bg-white rounded-xl flex-1 min-w-0 overflow-hidden">
              <span className="text-preset-4 text-grey-500">Expenses</span>
              <SmartAmount amount={formatCurrency(statsExpenses)} className="text-preset-1 text-grey-900" />
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
                  <Link href="/pots" className="flex flex-row items-center gap-3 bg-transparent border-none text-preset-4 text-grey-500 hover:text-grey-900 group cursor-pointer no-underline">
                    See Details
                    <span className="flex items-center justify-center w-3 h-3 text-grey-500 group-hover:text-grey-900">
                      <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L5 5.5L1 10" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    </span>
                  </Link>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-5 w-full">
                  <div className="flex flex-row items-center p-4 md:p-5 gap-4 w-full md:w-[247px] bg-beige-100 rounded-xl md:shrink-0 overflow-hidden">
                    <div className="w-10 h-10 flex items-center justify-center shrink-0">
                      <Image src="/assets/images/icon-pot.svg" alt="Pot" width={40} height={40} />
                    </div>
                    <div className="flex flex-col items-start gap-1 md:gap-[11px] flex-1 w-full min-w-0">
                      <span className="text-preset-4 text-grey-500">Total Saved</span>
                      <SmartAmount amount={formatCurrency(totalSaved)} className="text-preset-1 text-grey-900" />
                    </div>
                  </div>

                  {/* Savings Array */}
                  <div className="flex flex-col items-start gap-4 w-full flex-1">
                    <div className="flex flex-wrap items-center gap-y-4 md:gap-x-6 w-full">
                      {potsDisplay.map((pot: any, i: number) => (
                        <div key={pot._id} className="flex flex-row items-center gap-4 w-[calc(50%-8px)] md:max-w-[170px]">
                          <div className="w-1 h-11 rounded-lg shrink-0" style={{ backgroundColor: getThemeColor(pot.theme, i) }}></div>
                          <div className="flex flex-col justify-center gap-1 flex-1 w-full min-w-0">
                            <span className="text-preset-5 text-grey-500 line-clamp-1">{pot.name}</span>
                            <SmartAmount amount={formatCurrency(pot.currentAmount)} className="text-preset-4-bold text-grey-900" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Transactions */}
              <div className="flex flex-col items-start p-5 md:p-8 gap-8 w-full bg-white rounded-xl">
                <div className="flex flex-row justify-between items-center w-full">
                  <h2 className="text-preset-2 text-grey-900">Transactions</h2>
                  <Link href="/transactions" className="flex flex-row items-center gap-3 bg-transparent border-none text-preset-4 text-grey-500 hover:text-grey-900 group cursor-pointer no-underline">
                    View All
                    <span className="flex items-center justify-center w-3 h-3 text-grey-500 group-hover:text-grey-900">
                      <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L5 5.5L1 10" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    </span>
                  </Link>
                </div>

                <div className="flex flex-col items-start w-full">
                  <TransactionTable userId={userId as any} limit={5} />
                </div>
              </div>

            </div>

            {/* Right Side */}
            <div className="flex flex-col items-start gap-4 md:gap-6 w-full flex-1 xl:max-w-[428px]">

              {/* My Budgets */}
              <div className="flex flex-col items-start p-5 md:p-8 gap-5 w-full bg-white rounded-xl">
                <div className="flex flex-row justify-between items-center w-full">
                  <h2 className="text-preset-2 text-grey-900">My Budgets</h2>
                  <Link href="/budgets" className="flex flex-row items-center gap-3 bg-transparent border-none text-preset-4 text-grey-500 hover:text-grey-900 group cursor-pointer no-underline">
                    See Details
                    <span className="flex items-center justify-center w-3 h-3 text-grey-500 group-hover:text-grey-900">
                      <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L5 5.5L1 10" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    </span>
                  </Link>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 w-full py-2">
                  {/* Pie Chart Representation */}
                  <div className="relative flex justify-center items-center w-[240px] h-[240px] shrink-0">
                    <div
                      className="absolute w-[240px] h-[240px] rounded-full"
                      style={{
                        background: `conic-gradient(${conicGradient})`
                      }}
                    ></div>
                    <div className="absolute w-[187.5px] h-[187.5px] bg-white opacity-25 rounded-full mix-blend-screen z-10"></div>
                    <div className="absolute w-[162px] h-[162px] bg-white rounded-full z-20"></div>
                    <div className="absolute w-[162px] h-[162px] flex flex-col justify-center items-center gap-1 overflow-hidden px-2 z-30">
                      <SmartAmount amount={formatCurrency(totalBudgetSpent)} className="text-preset-1 text-grey-900 text-center" />
                      <SmartAmount
                        amount={formatCurrency(totalBudgetLimit)}
                        prefix="of "
                        suffix=" limit"
                        className="text-preset-4-bold text-grey-500 text-center"
                      />
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="flex flex-col gap-4 w-full md:w-auto min-w-0">
                    <div className="grid grid-cols-2 md:grid-cols-1 gap-x-4 gap-y-4 w-full">
                      {[...budgetStats].sort((a: any, b: any) => b.createdAt - a.createdAt).slice(0, 3).map((b: any, i: number) => (
                        <div key={b._id} className="flex flex-row items-center gap-4 min-w-[120px]">
                          <div className="w-1 h-[44px] rounded-lg shrink-0" style={{ backgroundColor: b.color }}></div>
                          <div className="flex flex-col justify-center min-w-0">
                            <span className="text-preset-5 text-grey-500 truncate">{b.category}</span>
                            <SmartAmount 
                              amount={formatCurrency(b.spent)} 
                              className="text-preset-4-bold text-grey-900" 
                              maxWidth={150}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Recurring Bills */}
              <div className="flex flex-col items-start p-5 md:p-8 gap-8 w-full bg-white rounded-xl relative overflow-hidden group">
                <div className="flex flex-row justify-between items-center w-full">
                  <h2 className="text-preset-2 text-grey-900">Recurring Bills</h2>
                  <div className="flex flex-row items-center gap-3 bg-transparent border-none text-preset-4 text-grey-500 group cursor-default no-underline">
                    See Details
                    <span className="flex items-center justify-center w-3 h-3 text-grey-500">
                      <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L5 5.5L1 10" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    </span>
                  </div>
                </div>

                {/* Blurrable Content */}
                <div className="flex flex-col items-start gap-3 w-full blur-[4px] select-none pointer-events-none opacity-50">
                  {/* Total */}
                  <div className="flex flex-row justify-between items-center py-5 px-4 w-full bg-beige-100 border-l-[4px] border-green rounded-lg">
                    <span className="text-preset-4 text-grey-500">Total recurring bills</span>
                    <span className="text-preset-4-bold text-grey-900">{formatCurrency(totalBillsAmount)}</span>
                  </div>
                  {/* Remaining */}
                  <div className="flex flex-row justify-between items-center py-5 px-4 w-full bg-beige-100 border-l-[4px] border-yellow rounded-lg">
                    <span className="text-preset-4 text-grey-500">Remaining this month</span>
                    <span className="text-preset-4-bold text-grey-900">{formatCurrency(remainingBillsAmount)}</span>
                  </div>
                  {/* Paid */}
                  <div className="flex flex-row justify-between items-center py-5 px-4 w-full bg-beige-100 border-l-[4px] border-cyan rounded-lg">
                    <span className="text-preset-4 text-grey-500">Paid Bills</span>
                    <span className="text-preset-4-bold text-grey-900">{formatCurrency(paidBillsAmount)}</span>
                  </div>
                </div>

                {/* Coming Soon Overlay */}
                <div className="absolute inset-0 flex items-center justify-center z-40 bg-white/50 backdrop-blur-[2px]">
                  <div className="px-6 py-3 bg-grey-900 rounded-xl shadow-2xl transform rotate-[-5deg] border-2 border-white/20">
                    <span className="text-preset-3 text-white uppercase tracking-widest font-bold">Coming Soon</span>
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
