"use client";

import Image from "next/image";
import { SmartAmount } from "./SmartAmount";
import { useCurrency } from "@/providers/CurrencyProvider";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

interface TransactionTableProps {
  userId: string;
  search?: string;
  category?: string;
  sort?: string;
  limit?: number;
}

export function TransactionTable({ userId, search, category, sort, limit }: TransactionTableProps) {
  const { formatCurrency } = useCurrency();
  
  const transactions = useQuery(
    api.transactions.getTransactions,
    { userId, search, category, sort }
  );

  if (!transactions) {
    return (
      <div suppressHydrationWarning className="flex flex-col items-center justify-center py-10 w-full">
        <p className="text-preset-4 text-grey-500 animate-pulse">Loading transactions...</p>
      </div>
    );
  }

  const displayedTransactions = limit ? transactions.slice(0, limit) : transactions;

  return (
    <div suppressHydrationWarning className="flex flex-col items-start gap-4 w-full">
      {displayedTransactions.map((txn, index) => {
        // Map Convex data to UI needs
        const isPos = txn.type === "income";
        // fallback avatar if missing
        const avatarImg = "/assets/images/avatars/emma-richardson.jpg"; 

        return (
          <div key={txn._id} className="flex flex-col w-full gap-4">
            <div className="flex flex-row justify-between items-center w-full">
              <div className="flex flex-row items-center gap-3 md:gap-4 lg:gap-4">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden relative shrink-0">
                  <Image 
                    src={avatarImg} 
                    alt={txn.description} 
                    fill 
                    sizes="(max-width: 768px) 32px, 40px" 
                    className="object-cover" 
                  />
                </div>
                <div className="flex flex-col justify-center items-start gap-1">
                  <h2 className="text-preset-4-bold text-grey-900 line-clamp-1">{txn.description}</h2>
                  <p className="text-preset-5 text-grey-500">{txn.category}</p>
                </div>
              </div>

              <div className="flex flex-col justify-center items-end gap-1 shrink-0 overflow-hidden">
                <SmartAmount 
                  amount={formatCurrency(txn.amount)} 
                  prefix={isPos ? '+' : '-'}
                  className={`text-preset-4-bold ${isPos ? 'text-green' : 'text-grey-900'} text-right`} 
                />
                <span className="text-preset-5 text-grey-500">{txn.date}</span>
              </div>
            </div>
            {index < displayedTransactions.length - 1 && <div className="w-full h-[1px] bg-grey-100"></div>}
          </div>
        );
      })}
      {transactions.length === 0 && (
        <p className="text-preset-4 text-grey-500 text-center w-full py-4">No transactions found.</p>
      )}
    </div>
  );
}
