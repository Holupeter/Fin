"use client";

import React from "react";
import MobileSidebar from "@/components/MobileSidebar";
import DesktopSidebar from "@/components/DesktopSidebar";
import Image from "next/image";
import { useState } from "react";
import ProfileModal from "@/components/ProfileModal";
import UserAvatar from "@/components/UserAvatar";
import AddBudgetModal from "@/components/AddBudgetModal";
import EditBudgetModal from "@/components/EditBudgetModal";
import DeleteBudgetModal from "@/components/DeleteBudgetModal";
import SpendModal from "@/components/SpendModal";
import { SmartAmount } from "@/components/SmartAmount";
import { useCurrency } from "@/providers/CurrencyProvider";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function BudgetsPage() {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAddBudgetModalOpen, setIsAddBudgetModalOpen] = useState(false);
  const [isEditBudgetModalOpen, setIsEditBudgetModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSpendModalOpen, setIsSpendModalOpen] = useState(false);
  const [spendCategory, setSpendCategory] = useState("");
  const [categoryToDelete, setCategoryToDelete] = useState<any>(null);
  const [editingBudget, setEditingBudget] = useState<any>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const { formatCurrency } = useCurrency();
  const { user, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push("/login");
    }
  }, [user, isAuthLoading, router]);

  const toggleDropdown = (id: string) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const userId = user?.id || "";

  const budgets = useQuery(api.budgets.getBudgets, { userId });
  const transactions = useQuery(api.transactions.getTransactions, { userId });

  if (isAuthLoading || !user || !budgets || !transactions) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-beige-100">
        <p className="text-preset-4 text-grey-500 animate-pulse">Loading Budgets...</p>
      </div>
    );
  }

  // Helper for background colors - since our schema doesn't have theme yet, we'll map or fallback
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

  const getThemeName = (theme?: string, index: number = 0) => {
    if (theme) return theme;
    const names = ["Green", "Cyan", "Yellow", "Navy", "Purple", "Orange"];
    return names[index % names.length];
  };

  // Calculate stats per budget
  const budgetStats = budgets.map((budget, index) => {
    const spent = transactions
      .filter(t => t.category === budget.category && t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
    
    const latestSpending = transactions
      .filter(t => t.category === budget.category)
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 3);

    return {
      ...budget,
      color: getThemeColor(budget.theme, index),
      theme: getThemeName(budget.theme, index),
      spent,
      free: Math.max(0, budget.budgetAmount - spent),
      latestSpending
    };
  });

  const totalSpent = budgetStats.reduce((sum, b) => sum + b.spent, 0);
  const totalLimit = budgets.reduce((sum, b) => sum + b.budgetAmount, 0);

  const conicGradient = budgets.length > 0 
    ? budgetStats.map((b) => {
        const percentage = (b.budgetAmount / totalLimit) * 100;
        return { color: b.color, percentage };
      }).reduce((acc, curr, i, arr) => {
        const start = acc.prev;
        const end = start + curr.percentage;
        acc.str += `${curr.color} ${start}% ${end}%${i < arr.length - 1 ? ', ' : ''}`;
        acc.prev = end;
        return acc;
      }, { str: "", prev: 0 }).str
    : "#F2F2F2 0% 100%";

  return (
    <div className="flex flex-col lg:flex-row items-start w-full min-h-screen bg-beige-100 relative">
      <DesktopSidebar />

      <main className="flex flex-col items-center flex-1 min-w-0 mb-[52px] lg:mb-0 max-w-[1140px] mx-auto">
        <div className="sticky top-0 z-10 flex flex-row items-center justify-center w-full bg-beige-100 px-4 pt-6 pb-6 md:px-10 md:pt-8 md:pb-8 lg:px-10 lg:pt-8 lg:pb-8">
          <div className="flex flex-row items-center justify-between w-full max-w-[480px] md:max-w-[688px] lg:max-w-[1060px]">
            <h1 className="text-preset-1 text-grey-900">Budgets</h1>
            <div className="flex flex-row items-center gap-4">
              <button
                onClick={() => setIsAddBudgetModalOpen(true)}
                className="flex flex-row justify-center items-center px-4 h-[53px] bg-grey-900 text-white text-preset-4-bold rounded-lg cursor-pointer hover:bg-grey-500 transition-colors"
              >
                + Add New Budget
              </button>
              <button
                onClick={() => setIsProfileModalOpen(true)}
                className="p-0 border-none bg-transparent cursor-pointer opacity-90 hover:opacity-100 transition-opacity flex-shrink-0"
                aria-label="Open Profile"
              >
                <UserAvatar />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center w-full px-4 pb-6 md:px-10 md:pb-8 lg:px-10 lg:pb-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 w-full max-w-[480px] md:max-w-[688px] lg:max-w-[1060px]">
            {/* Left Side (Chart container) */}
            <div className="flex flex-col md:flex-row lg:flex-col justify-center items-center md:items-start py-6 px-5 gap-8 md:p-8 w-full max-w-[480px] md:max-w-[688px] lg:max-w-[428px] lg:flex-1 bg-white rounded-xl">
              {/* Chart */}
              <div className="flex flex-row justify-center items-center gap-2 w-full max-w-[303px] md:max-w-[296px] lg:max-w-[364px] md:h-[280px]">
                <div className="relative flex justify-center items-center w-[240px] h-[240px]">
                  <div
                    className="absolute w-[240px] h-[240px] rounded-full"
                    style={{
                      background: `conic-gradient(${conicGradient})`
                    }}
                  ></div>
                  <div className="absolute w-[187.5px] h-[187.5px] bg-white opacity-25 rounded-full mix-blend-screen z-10"></div>
                  <div className="absolute w-[162px] h-[162px] bg-white rounded-full z-20"></div>
                  <div className="absolute w-[162px] h-[162px] flex flex-col justify-center items-center gap-1 overflow-hidden px-2 z-30">
                    <SmartAmount amount={formatCurrency(totalSpent)} className="text-preset-1 text-grey-900 text-center" />
                    <SmartAmount 
                      amount={formatCurrency(totalLimit)} 
                      prefix="of " 
                      suffix=" limit" 
                      className="text-preset-4-bold text-grey-500 text-center" 
                    />
                  </div>
                </div>
              </div>

              {/* Spending Summary */}
              <div className="flex flex-col items-start gap-6 w-full max-w-[303px] md:max-w-[296px] lg:max-w-[364px] flex-1 lg:flex-none">
                <h2 className="text-preset-2 text-grey-900">Spending Summary</h2>

                <div className="flex flex-col items-start gap-4 w-full">
                  {budgetStats.map((budget, i) => (
                    <React.Fragment key={budget._id}>
                      <div className="flex flex-row justify-between items-center w-full">
                        <div className="flex flex-row items-center gap-4">
                          <div className="w-1 h-[21px] rounded-lg" style={{ backgroundColor: budget.color }}></div>
                          <span className="text-preset-4 text-grey-500">{budget.category}</span>
                        </div>
                        <div className="grid grid-cols-[1fr_auto] gap-2 items-center justify-end">
                          <div className="flex justify-end min-w-[80px] md:min-w-[100px]">
                            <SmartAmount amount={formatCurrency(budget.spent)} className="text-preset-3 text-grey-900 text-right" />
                          </div>
                          <div className="flex justify-start min-w-[90px] md:min-w-[110px]">
                            <SmartAmount amount={formatCurrency(budget.budgetAmount)} prefix="of " className="text-preset-4-bold text-grey-500" />
                          </div>
                        </div>
                      </div>
                      {i < budgetStats.length - 1 && <div className="w-full h-[1px] bg-grey-100"></div>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side (Budget List) */}
            <div className="flex flex-col items-start gap-6 w-full max-w-[480px] md:max-w-[688px] lg:max-w-[608px] lg:flex-[1.5] lg:min-w-0">
              {budgetStats.map((budget, i) => {
                const progressWidth = Math.min(100, (budget.spent / budget.budgetAmount) * 100);
                const themeColor = budget.color;
                
                return (
                  <div key={budget._id} className="flex flex-col items-start p-6 gap-5 w-full bg-white rounded-xl md:p-8">
                    {/* Header with Spend Button */}
                    <div className="flex flex-row justify-between items-center w-full">
                      <div className="flex flex-row items-center gap-4">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: themeColor }}></div>
                        <h2 className="text-preset-2 text-grey-900">{budget.category}</h2>
                      </div>
                      <div className="flex flex-row items-center gap-4">
                        <button
                          onClick={() => {
                            setSpendCategory(budget.category);
                            setIsSpendModalOpen(true);
                          }}
                          className="flex flex-row items-center gap-2 px-3 py-1.5 bg-grey-900 text-white text-preset-5-bold rounded-lg hover:bg-grey-500 transition-colors cursor-pointer border-none"
                        >
                          <span className="text-lg leading-none">+</span>
                          <span>Spend</span>
                        </button>
                        <div className="relative">
                          <button
                            onClick={() => toggleDropdown(budget._id)}
                            className="bg-transparent border-none cursor-pointer p-0 opacity-60 hover:opacity-100 group"
                          >
                            <Image src="/assets/images/icon-ellipsis.svg" alt="Options" width={16} height={16} className="text-grey-300" style={{ filter: 'brightness(0) saturate(100%) invert(80%) sepia(2%) saturate(16%) hue-rotate(14deg) brightness(85%) contrast(92%)' }} />
                          </button>

                          {/* Options Dropdown */}
                          {openDropdownId === budget._id && (
                            <div className="flex absolute top-8 right-0 flex-col items-start p-[12px_20px] gap-3 w-[134px] bg-white shadow-[0px_4px_24px_rgba(0,0,0,0.25)] rounded-lg z-20">
                              <button
                                onClick={() => {
                                  setEditingBudget(budget);
                                  setIsEditBudgetModalOpen(true);
                                  setOpenDropdownId(null);
                                }}
                                className="flex flex-row items-center p-0 gap-4 w-full bg-transparent border-none cursor-pointer hover:opacity-70 transition-opacity"
                              >
                                <span className="text-preset-4 text-grey-900">Edit Budget</span>
                              </button>
                              <div className="w-full h-[1px] bg-[#F2F2F2]"></div>
                              <button
                                onClick={() => {
                                  setCategoryToDelete(budget);
                                  setIsDeleteModalOpen(true);
                                  setOpenDropdownId(null);
                                }}
                                className="flex flex-row items-center p-0 gap-4 w-full bg-transparent border-none cursor-pointer hover:opacity-70 transition-opacity"
                              >
                                <span className="text-preset-4 text-red">Delete Budget</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-start gap-4 w-full">
                      <div className="flex flex-row items-center gap-1 w-full flex-wrap overflow-hidden">
                        <span className="text-preset-4 text-grey-500">Maximum of</span>
                        <SmartAmount amount={formatCurrency(budget.budgetAmount)} className="text-preset-4 text-grey-500" />
                      </div>

                      {/* Progress Bar */}
                      <div className="flex flex-row items-start p-1 w-full h-8 bg-beige-100 rounded-[4px]">
                        <div className="h-6 rounded-[4px]" style={{ width: `${progressWidth}%`, backgroundColor: themeColor }}></div>
                      </div>

                      {/* Spent & Free */}
                      <div className="flex flex-row items-center w-full gap-4">
                        <div className="flex flex-row items-center gap-4 flex-1 overflow-hidden">
                          <div className="w-1 h-[43px] rounded-lg shrink-0" style={{ backgroundColor: themeColor }}></div>
                          <div className="flex flex-col justify-center gap-1 overflow-hidden">
                            <span className="text-preset-5 text-grey-500">Spent</span>
                            <SmartAmount amount={formatCurrency(budget.spent)} className="text-preset-4-bold text-grey-900" />
                          </div>
                        </div>
                        <div className="flex flex-row items-center gap-4 flex-1 overflow-hidden">
                          <div className="w-1 h-[43px] bg-beige-100 rounded-lg shrink-0"></div>
                          <div className="flex flex-col justify-center gap-1 overflow-hidden">
                            <span className="text-preset-5 text-grey-500">Free</span>
                            <SmartAmount amount={formatCurrency(budget.free)} className="text-preset-4-bold text-grey-900" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Latest Spending */}
                    <div className="flex flex-col justify-center items-start p-4 md:p-5 gap-5 w-full bg-beige-100 rounded-xl">
                      <div className="flex flex-row justify-between items-center w-full">
                        <span className="text-preset-3 text-grey-900">Latest Spending</span>
                        <button className="flex flex-row items-center gap-3 bg-transparent border-none text-preset-4 text-grey-500 hover:text-grey-900 cursor-pointer group">
                          See All
                          <Image src="/assets/images/icon-caret-down.svg" alt="See All" width={12} height={12} className="-rotate-90 opacity-60 group-hover:opacity-100" />
                        </button>
                      </div>

                      <div className="flex flex-col items-start gap-3 w-full">
                        {budget.latestSpending.map((txn, index, array) => (
                          <React.Fragment key={txn._id}>
                            <div className="flex flex-row justify-between items-center w-full h-[40px]">
                              <div className="flex flex-row items-center gap-4">
                                <div className="w-8 h-8 rounded-full bg-white overflow-hidden relative border border-grey-100 flex-shrink-0">
                                   <Image src="/assets/images/avatars/emma-richardson.jpg" alt={txn.description} fill sizes="32px" className="object-cover" />
                                </div>
                                <span className="text-preset-5-bold text-grey-900 line-clamp-1">{txn.description}</span>
                              </div>
                              <div className="flex flex-col justify-center items-end gap-1 overflow-hidden">
                                <SmartAmount 
                                  amount={formatCurrency(txn.amount)} 
                                  prefix={txn.type === "income" ? "+" : "-"} 
                                  className="text-preset-5-bold text-grey-900 text-right" 
                                />
                                <span className="text-preset-5 text-grey-500 text-right whitespace-nowrap">
                                  {new Date(txn.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                </span>
                              </div>
                            </div>
                            {index < array.length - 1 && <div className="w-full h-[1px] bg-grey-500 opacity-15"></div>}
                          </React.Fragment>
                        ))}
                        {budget.latestSpending.length === 0 && (
                          <p className="text-preset-5 text-grey-500">No recent spending</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
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

      <AddBudgetModal
        isOpen={isAddBudgetModalOpen}
        onClose={() => setIsAddBudgetModalOpen(false)}
      />
      <EditBudgetModal
        isOpen={isEditBudgetModalOpen}
        onClose={() => setIsEditBudgetModalOpen(false)}
        budget={editingBudget || undefined}
      />
      <DeleteBudgetModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        budget={categoryToDelete}
      />
      <SpendModal
        isOpen={isSpendModalOpen}
        onClose={() => setIsSpendModalOpen(false)}
        category={spendCategory}
      />
    </div>
  );
}
