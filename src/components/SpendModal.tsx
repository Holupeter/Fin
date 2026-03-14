"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useCurrency } from "@/providers/CurrencyProvider";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

interface SpendModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
}

export default function SpendModal({ isOpen, onClose, category }: SpendModalProps) {
  const { currency, toInternalValue, formatCurrency } = useCurrency();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const addTransaction = useMutation(api.transactions.addTransaction);
  const dummyUserId = "j97bt09f8v13wdg5vntas879js16tshd";

  useEffect(() => {
    if (isOpen) {
      setAmount("");
      setDescription(`Spending on ${category}`);
      setErrorMessage("");
    }
  }, [isOpen, category]);

  const handleSubmit = async () => {
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      setErrorMessage("Please enter a valid amount.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const date = new Date();
      const formattedDate = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });

      await addTransaction({
        userId: dummyUserId,
        amount: toInternalValue(parseFloat(amount)),
        category: category,
        type: "expense",
        description: description,
        date: formattedDate
      });
      
      onClose();
    } catch (error) {
      console.error("Failed to add transaction:", error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-center items-center bg-grey-900/40 backdrop-blur-sm px-4">
      <div className="flex flex-col items-start px-5 py-6 md:p-8 gap-5 w-full max-w-[335px] md:max-w-[560px] bg-white rounded-xl relative shadow-xl overflow-visible transition-all duration-300">
        {/* Header */}
        <div className="flex flex-row justify-between items-center w-full">
          <h2 className="text-preset-2 md:text-preset-1 text-grey-900">Record Spend</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex justify-center items-center rounded-full hover:bg-beige-100 transition-colors group cursor-pointer border-none bg-transparent"
          >
            <Image src="/assets/images/icon-close-modal.svg" alt="Close" width={16} height={16} className="opacity-70 group-hover:opacity-100" />
          </button>
        </div>

        <p className="text-preset-4 text-grey-500">
          Enter the amount you spent on <span className="font-bold text-grey-900">{category}</span>. This will be deducted from your budget and balance.
        </p>

        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col items-start gap-1 w-full">
            <label className="text-preset-5-bold text-grey-500">Amount to Spend</label>
            <div className="flex flex-row items-center px-5 py-3 gap-3 w-full h-[45px] bg-white border border-[#98908B] rounded-lg focus-within:border-grey-900 transition-colors shadow-sm">
              <span className="text-preset-4 text-[#98908B]">{currency === "NGN" ? "₦" : "$"}</span>
              <input
                type="text"
                placeholder="0.00"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setErrorMessage("");
                }}
                className="w-full h-full border-none outline-none text-preset-4 text-grey-900 placeholder:text-beige-500/50 bg-transparent"
              />
            </div>
            {errorMessage && <p className="text-preset-5 text-red mt-1">{errorMessage}</p>}
          </div>

          <div className="flex flex-col items-start gap-1 w-full">
            <label className="text-preset-5-bold text-grey-500">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="px-5 py-3 w-full h-[45px] bg-white border border-[#98908B] rounded-lg focus-within:border-grey-900 outline-none text-preset-4 text-grey-900 transition-colors shadow-sm"
              placeholder="e.g. Lunch at restaurant"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading || !amount}
          className="flex flex-row justify-center items-center p-4 w-full h-[53px] bg-grey-900 rounded-lg mt-2 hover:bg-grey-500 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer border-none"
        >
          <span className="text-preset-4-bold text-white">
            {isLoading ? "Recording..." : "Record Spending"}
          </span>
        </button>
      </div>
    </div>
  );
}
