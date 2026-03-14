"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { SmartAmount } from "./SmartAmount";
import { useCurrency } from "@/providers/CurrencyProvider";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

interface AdjustPotBalanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  pot: {
    _id: string;
    name: string;
    saved: number;
    target: number;
    color: string;
    percentage: string;
  } | null;
  mode: "add" | "withdraw";
}

export default function AdjustPotBalanceModal({ isOpen, onClose, pot, mode }: AdjustPotBalanceModalProps) {
  const { formatCurrency, currency, toInternalValue } = useCurrency();
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const addMoney = useMutation(api.pots.addMoneyToPot);
  const withdrawMoney = useMutation(api.pots.withdrawMoneyFromPot);
  const addTransaction = useMutation(api.transactions.addTransaction);
  const dummyUserId = "j97bt09f8v13wdg5vntas879js16tshd";
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setAmount("");
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!pot || !amount || isNaN(parseFloat(amount))) return;

    setIsLoading(true);
    try {
      const internalAmount = toInternalValue(parseFloat(amount));
      const now = new Date();
      const dateStr = now.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });

      if (mode === "add") {
        await addMoney({ id: pot._id as any, amount: internalAmount });
        await addTransaction({
          userId: dummyUserId,
          amount: internalAmount,
          category: "Savings",
          type: "expense",
          description: `Addition to ${pot.name}`,
          date: dateStr
        });
      } else {
        await withdrawMoney({ id: pot._id as any, amount: internalAmount });
        await addTransaction({
          userId: dummyUserId,
          amount: internalAmount,
          category: "Savings",
          type: "income",
          description: `Withdrawal from ${pot.name}`,
          date: dateStr
        });
      }
      onClose();
    } catch (error) {
      console.error("Failed to adjust pot balance:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen || !pot) return null;

  const isAdd = mode === "add";
  const numAmount = toInternalValue(parseFloat(amount) || 0);
  
  // Calculate new state for the bar
  const currentPercentage = (pot.saved / pot.target) * 100;
  const newBalance = isAdd ? pot.saved + numAmount : Math.max(0, pot.saved - numAmount);
  const newPercentage = (newBalance / pot.target) * 100;
  
  // Progress bar logic
  // If adding: Base (Green) -> Newly added (Lighter Green/Transparent Green)
  // If withdrawing: Remaining (Green) -> Portion being removed (Red)
  
  const barColorClass = pot.color || "bg-green";
  const actionColorClass = isAdd ? "bg-green" : "bg-red";

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-grey-900/40 backdrop-blur-sm px-4">
      <div className="flex flex-col items-start p-8 gap-5 w-full max-w-[335px] md:max-w-[560px] h-auto md:h-[458px] bg-white rounded-xl relative shadow-xl overflow-hidden transition-all duration-300">
        {/* Header */}
        <div className="flex flex-row justify-between items-center w-full">
          <h2 className="text-preset-2 md:text-preset-1 text-grey-900">
            {isAdd ? `Add to ‘${pot.name}’` : `Withdraw from ‘${pot.name}’`}
          </h2>
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
        <p className="text-preset-4 text-grey-500 w-full">
          {isAdd 
            ? "Add money to your pot to reach your savings target faster."
            : "Withdraw money from your pot for a special purchase or to reallocate your savings."}
        </p>

        {/* Pot Bar and Details */}
        <div className="flex flex-col justify-center items-start gap-4 w-full h-[114px]">
          {/* Total Saved Texts */}
          <div className="flex flex-row flex-wrap justify-between items-center w-full gap-2">
            <span className="text-preset-4 text-grey-500">New Amount</span>
            <SmartAmount amount={formatCurrency(newBalance)} className="text-preset-1 text-grey-900" />
          </div>

          {/* Progress Bar Container */}
          <div className="flex flex-col items-start gap-4 w-full">
            <div className="w-full h-2 bg-beige-100 rounded-lg overflow-hidden flex flex-row">
              {/* The bar logic derived from tokens */}
              {isAdd ? (
                <>
                  <div 
                    className={`h-full ${barColorClass}`} 
                    style={{ width: `${Math.min(100, currentPercentage)}%` }}
                  />
                  <div 
                    className={`h-full ${barColorClass} opacity-50 border-l border-white`} 
                    style={{ width: `${Math.min(100 - currentPercentage, (numAmount / pot.target) * 100)}%` }}
                  />
                </>
              ) : (
                <>
                  <div 
                    className={`h-full ${barColorClass}`} 
                    style={{ width: `${Math.min(100, newPercentage)}%` }}
                  />
                  <div 
                    className={`h-full bg-red border-l border-white`} 
                    style={{ width: `${Math.min(currentPercentage - newPercentage, (numAmount / pot.target) * 100)}%` }}
                  />
                </>
              )}
            </div>

            {/* Target Texts */}
            <div className="flex flex-row justify-between items-end w-full gap-2 overflow-hidden">
              <span className={`text-preset-5-bold ${isAdd ? 'text-green' : 'text-red'}`}>
                {newPercentage.toFixed(2)}%
              </span>
              <SmartAmount 
                prefix="Target of "
                amount={formatCurrency(pot.target)} 
                className="text-preset-5 text-grey-500 text-right" 
                maxWidth={220} 
              />
            </div>
          </div>
        </div>

        {/* Input Content */}
        <div className="flex flex-col items-start gap-4 w-full mt-2">
          <div className="flex flex-col items-start gap-1 w-full">
            <label className="text-preset-5-bold text-grey-500">
              Amount to {isAdd ? "Add" : "Withdraw"}
            </label>
            <div className="flex flex-row items-center px-5 py-3 gap-3 w-full h-[45px] bg-white border border-[#98908B] rounded-lg focus-within:border-grey-900 transition-colors shadow-sm">
              <span className="text-preset-4 text-[#98908B]">{currency === "NGN" ? "₦" : "$"}</span>
              <input
                type="number"
                placeholder="e.g. 100"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full h-full border-none outline-none text-preset-4 text-grey-900 placeholder:text-[#98908B] bg-transparent"
              />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          className="flex flex-row justify-center items-center p-4 w-full h-[53px] bg-grey-900 rounded-lg mt-auto hover:bg-grey-500 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSubmit}
          disabled={isLoading || !amount}
        >
          <span className="text-preset-4-bold text-white">
            {isLoading ? "Processing..." : `Confirm ${isAdd ? "Addition" : "Withdrawal"}`}
          </span>
        </button>
      </div>
    </div>
  );
}
