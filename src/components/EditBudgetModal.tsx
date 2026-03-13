"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useCurrency } from "@/providers/CurrencyProvider";

interface EditBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  budget?: {
    category: string;
    maximum: number;
    theme: string;
  };
}

export default function EditBudgetModal({ isOpen, onClose, budget }: EditBudgetModalProps) {
  const { currency } = useCurrency();
  const [budgetCategory, setBudgetCategory] = useState(budget?.category || "Entertainment");
  const [maxSpending, setMaxSpending] = useState(budget?.maximum?.toString() || "");
  const [themeColor, setThemeColor] = useState(budget?.theme || "Green");

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);

  // Update state when budget prop changes
  useEffect(() => {
    if (budget) {
      setBudgetCategory(budget.category);
      setMaxSpending(budget.maximum.toString());
      setThemeColor(budget.theme);
    }
  }, [budget]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const categories = [
    "Entertainment",
    "Bills",
    "Dining Out",
    "Personal Care",
    "Education",
    "Lifestyle",
    "Shopping",
    "Transportation",
    "Groceries"
  ];

  const themes = [
    { name: "Green", color: "bg-green", isUsed: false },
    { name: "Yellow", color: "bg-yellow", isUsed: false },
    { name: "Cyan", color: "bg-cyan", isUsed: false },
    { name: "Navy", color: "bg-navy", isUsed: false },
    { name: "Red", color: "bg-red", isUsed: false },
    { name: "Purple", color: "bg-purple-1", isUsed: false },
    { name: "Turquoise", color: "bg-turquoise", isUsed: false },
    { name: "Brown", color: "bg-brown", isUsed: false },
    { name: "Magenta", color: "bg-magenta", isUsed: false },
    { name: "Blue", color: "bg-blue", isUsed: false },
    { name: "Navy Grey", color: "bg-navy-grey", isUsed: false },
    { name: "Army Green", color: "bg-army-green", isUsed: false },
    { name: "Orange", color: "bg-orange", isUsed: false },
    { name: "Peach", color: "bg-peach", isUsed: false },
    { name: "Purple 2", color: "bg-purple-2", isUsed: false }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-grey-900/40 backdrop-blur-sm px-4">
      <div className={`flex flex-col items-start px-5 py-6 md:p-8 gap-5 w-full max-w-[335px] md:max-w-[560px] h-auto max-h-[90vh] md:h-[469px] bg-white rounded-xl relative shadow-xl ${(isCategoryOpen || isThemeOpen) ? 'overflow-visible' : 'overflow-y-auto overflow-x-hidden'} transition-all duration-300 no-scrollbar`}>
        {/* Header */}
        <div className="flex flex-row justify-between items-center w-full">
          <h2 className="text-preset-2 md:text-preset-1 text-grey-900">Edit Budget</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex justify-center items-center rounded-full hover:bg-beige-100 transition-colors group cursor-pointer"
            aria-label="Close modal"
          >
            <Image
              src="/assets/images/icon-close-modal.svg"
              alt="Close"
              width={16}
              height={16}
              className="opacity-70 group-hover:opacity-100"
            />
          </button>
        </div>

        {/* Description */}
        <p className="text-preset-4 text-grey-500 w-full mb-1">
          As your spending habits change, you can update your budget. These changes will take effect immediately.
        </p>

        {/* Form Content */}
        <div className="flex flex-col items-start gap-4 w-full">

          {/* Budget Category Input */}
          <div className="flex flex-col items-start gap-1 w-full relative">
            <label className="text-preset-5-bold text-grey-500">Budget Category</label>
            <div
              onClick={() => {
                setIsCategoryOpen(!isCategoryOpen);
                setIsThemeOpen(false);
              }}
              className={`flex flex-row items-center justify-between px-5 py-3 w-full h-[45px] bg-white border ${isCategoryOpen ? 'border-grey-900' : 'border-[#98908B]'} rounded-lg cursor-pointer hover:border-grey-900 transition-colors shadow-sm`}
            >
              <span className="text-preset-4 text-grey-900">{budgetCategory}</span>
              <Image
                src="/assets/images/icon-caret-down.svg"
                alt="Dropdown"
                width={12}
                height={12}
                className={`transition-transform duration-200 ${isCategoryOpen ? 'rotate-180' : ''}`}
              />
            </div>

            {/* Category Dropdown */}
            {isCategoryOpen && (
              <div className="absolute top-[75px] left-0 w-full bg-white shadow-[0px_4px_24px_rgba(0,0,0,0.25)] rounded-lg z-[60] py-3 px-5 flex flex-col gap-3 max-h-[300px] overflow-y-auto no-scrollbar">
                {categories.map((category, index) => (
                  <React.Fragment key={category}>
                    <button
                      onClick={() => {
                        setBudgetCategory(category);
                        setIsCategoryOpen(false);
                      }}
                      className="flex flex-row justify-between items-center w-full py-1 bg-transparent border-none cursor-pointer group text-left"
                    >
                      <span className={`text-preset-4 transition-all ${budgetCategory === category ? 'text-grey-900 font-bold' : 'text-grey-900 group-hover:font-bold'}`}>
                        {category}
                      </span>
                      {budgetCategory === category && (
                        <div className="w-4 h-4 rounded-full bg-green flex-shrink-0"></div>
                      )}
                    </button>
                    {index < categories.length - 1 && <div className="w-full h-[1px] bg-[#F2F2F2]"></div>}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>

          {/* Maximum Spending Input */}
          <div className="flex flex-col items-start gap-1 w-full">
            <label className="text-preset-5-bold text-grey-500">Maximum Spending</label>
            <div className="flex flex-row items-center px-5 py-3 gap-3 w-full h-[45px] bg-white border border-[#98908B] rounded-lg focus-within:border-grey-900 transition-colors shadow-sm">
              <span className="text-preset-4 text-[#98908B]">{currency === "NGN" ? "₦" : "$"}</span>
              <input
                type="number"
                placeholder="e.g. 2000"
                value={maxSpending}
                onChange={(e) => setMaxSpending(e.target.value)}
                className="w-full h-full border-none outline-none text-preset-4 text-grey-900 placeholder:text-[#98908B] bg-transparent"
              />
            </div>
          </div>

          {/* Theme Color Input */}
          <div className="flex flex-col items-start gap-1 w-full relative">
            <label className="text-preset-5-bold text-grey-500">Theme</label>
            <div
              onClick={() => {
                setIsThemeOpen(!isThemeOpen);
                setIsCategoryOpen(false);
              }}
              className={`flex flex-row items-center justify-between px-5 py-3 w-full h-[45px] bg-white border ${isThemeOpen ? 'border-grey-900' : 'border-[#98908B]'} rounded-lg cursor-pointer hover:border-grey-900 transition-colors shadow-sm`}
            >
              <div className="flex flex-row items-center gap-3">
                <div className={`w-4 h-4 rounded-full ${themes.find(t => t.name === themeColor)?.color || 'bg-green'} flex-shrink-0`}></div>
                <span className="text-preset-4 text-grey-900">{themeColor}</span>
              </div>
              <Image
                src="/assets/images/icon-caret-down.svg"
                alt="Dropdown"
                width={12}
                height={12}
                className={`transition-transform duration-200 ${isThemeOpen ? 'rotate-180' : ''}`}
              />
            </div>

            {/* Theme Dropdown */}
            {isThemeOpen && (
              <div className="absolute top-[75px] left-0 w-full bg-white shadow-[0px_4px_24px_rgba(0,0,0,0.25)] rounded-lg z-[60] py-3 px-5 flex flex-col gap-3 max-h-[200px] overflow-y-auto no-scrollbar">
                {themes.map((theme, index) => (
                  <React.Fragment key={theme.name}>
                    <button
                      onClick={() => {
                        setThemeColor(theme.name);
                        setIsThemeOpen(false);
                      }}
                      className="flex flex-row items-center justify-between w-full py-1 bg-transparent border-none cursor-pointer group text-left"
                    >
                      <div className="flex flex-row items-center gap-3">
                        <div className={`w-4 h-4 rounded-full ${theme.color} flex-shrink-0`}></div>
                        <span className={`text-preset-4 transition-all ${themeColor === theme.name ? 'text-grey-900 font-bold' : 'text-grey-900 group-hover:font-bold'}`}>
                          {theme.name}
                        </span>
                      </div>
                      {themeColor === theme.name && (
                        <div className="w-4 h-4 rounded-full bg-green flex-shrink-0"></div>
                      )}
                    </button>
                    {index < themes.length - 1 && <div className="w-full h-[1px] bg-[#F2F2F2]"></div>}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Save Budget Button */}
        <button
          className="flex flex-row justify-center items-center p-4 w-full h-[53px] bg-grey-900 rounded-lg mt-4 md:mt-auto hover:bg-grey-500 transition-colors shadow-sm"
          onClick={onClose}
        >
          <span className="text-preset-4-bold text-white">Save Changes</span>
        </button>
      </div>
    </div>
  );
}
