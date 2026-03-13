"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Currency = "USD" | "NGN";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatCurrency: (amount: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("USD");
  const NGN_RATE = 1500; // Placeholder exchange rate 1 USD = 1500 NGN

  // Persist preference to localStorage
  useEffect(() => {
    const saved = localStorage.getItem("app_currency") as Currency | null;
    if (saved) setCurrency(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("app_currency", currency);
  }, [currency]);

  const formatCurrency = (amount: number) => {
    if (currency === "NGN") {
      const converted = amount * NGN_RATE;
      return `₦${converted.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    // Default to USD
    const absoluteAmount = Math.abs(amount);
    const sign = amount < 0 ? "-" : "";
    return `${sign}$${absoluteAmount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
