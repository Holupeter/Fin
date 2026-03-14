"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Currency = "USD" | "NGN";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatCurrency: (amount: number) => string;
  toDisplayValue: (amount: number) => number;
  toInternalValue: (displayValue: number) => number;
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

  const toDisplayValue = (amount: number) => {
    if (currency === "NGN") return amount * NGN_RATE;
    return amount;
  };

  const toInternalValue = (displayValue: number) => {
    if (currency === "NGN") return displayValue / NGN_RATE;
    return displayValue;
  };

  const formatCurrency = (amount: number) => {
    const value = toDisplayValue(amount);
    
    if (currency === "NGN") {
      return `₦${value.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    // Default to USD
    const absoluteValue = Math.abs(value);
    const sign = amount < 0 ? "-" : "";
    return `${sign}$${absoluteValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <CurrencyContext.Provider value={{ 
      currency, 
      setCurrency, 
      formatCurrency,
      toDisplayValue,
      toInternalValue 
    }}>
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
