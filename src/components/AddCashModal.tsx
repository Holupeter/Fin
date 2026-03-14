"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useCurrency } from "@/providers/CurrencyProvider";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

interface AddCashModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddCashModal({ isOpen, onClose }: AddCashModalProps) {
  const { currency, toInternalValue } = useCurrency();
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const addTransaction = useMutation(api.transactions.addTransaction);
  const dummyUserId = "j97bt09f8v13wdg5vntas879js16tshd";

  const handleSubmit = async () => {
    if (!amount || isNaN(parseFloat(amount))) return;

    setIsLoading(true);
    try {
      const now = new Date();
      // Format date like "19 Aug 2024" as seen in other parts of the app
      const dateStr = now.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });

      await addTransaction({
        userId: dummyUserId,
        amount: toInternalValue(parseFloat(amount)),
        category: "Cash Deposit",
        type: "income",
        description: "Cash Addition",
        date: dateStr,
      });
      setAmount("");
      onClose();
    } catch (error) {
      console.error("Failed to add cash:", error);
    } finally {
      setIsLoading(false);
    }
  };

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex justify-center items-center bg-grey-900/40 backdrop-blur-sm px-4">
      <div className="flex flex-col items-start p-8 gap-5 w-full max-w-[400px] bg-white rounded-xl relative shadow-xl overflow-hidden transition-all duration-300">
        {/* Header */}
        <div className="flex flex-row justify-between items-center w-full">
          <h2 className="text-preset-1 text-grey-900">Add Cash</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex justify-center items-center rounded-full hover:bg-beige-100 transition-colors group cursor-pointer border-none bg-transparent"
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
        <p className="text-preset-4 text-grey-500 w-full text-left">
          Enter the amount of cash you want to add to your balance. This will reflect as income in your overview.
        </p>

        {/* Input */}
        <div className="flex flex-col items-start gap-1 w-full">
          <label className="text-preset-5-bold text-grey-500">Amount</label>
          <div className="flex flex-row items-center px-5 py-3 w-full h-[45px] bg-white border border-beige-500 border-opacity-30 rounded-lg focus-within:border-grey-900 transition-colors shadow-sm gap-3">
            <span className="text-preset-4 text-beige-500 font-bold">{currency === "USD" ? "$" : "₦"}</span>
            <input
              type="text"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full h-full border-none outline-none text-preset-4 text-grey-900 placeholder:text-beige-500/50 bg-transparent"
              autoFocus
            />
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleSubmit}
          disabled={isLoading || !amount || isNaN(parseFloat(amount))}
          className="flex flex-row justify-center items-center py-4 px-4 w-full h-[53px] bg-grey-900 rounded-lg border-none cursor-pointer mt-2 group hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="text-preset-4-bold text-white">
            {isLoading ? "Adding Cash..." : "Add Cash"}
          </span>
        </button>
      </div>
    </div>
  );
}
