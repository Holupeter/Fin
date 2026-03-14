"use client";

import Image from "next/image";
import { useCurrency } from "@/providers/CurrencyProvider";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import AddCashModal from "./AddCashModal";
import { useRef } from "react";
import { useMutation } from "convex/react";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

import { useAuth } from "@/providers/AuthProvider";

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const { currency, setCurrency, formatCurrency } = useCurrency();
  const [mounted, setMounted] = useState(false);
  const [isAddCashOpen, setIsAddCashOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { user, signOut } = useAuth();

  const userId = user?.id || "";
  const transactions = useQuery(api.transactions.getTransactions, { userId });
  const allBudgets = useQuery(api.budgets.getBudgets, { userId });
  const convexUser = useQuery(api.users.getUser, { userId });
  const avatarUrl = useQuery(api.users.getAvatarUrl, { storageId: convexUser?.avatarStorageId });

  const generateUploadUrl = useMutation(api.users.generateUploadUrl);
  const updateAvatar = useMutation(api.users.updateAvatar);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalIncome = transactions
    ? transactions
        .filter((t: any) => t.type === "income" && t.category !== "Savings")
        .reduce((sum: number, t: any) => sum + t.amount, 0)
    : 0;

  const totalExpenses = transactions
    ? transactions
        .filter((t: any) => t.type === "expense")
        .reduce((sum: number, t: any) => sum + t.amount, 0)
    : 0;

  const totalBudgeted = allBudgets
    ? allBudgets.reduce((sum: number, b: any) => sum + b.budgetAmount, 0)
    : 0;

  const currentBalance = totalIncome - totalExpenses - totalBudgeted;

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    // Check file size (limit to 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert("Image size should be less than 2MB");
      return;
    }

    setIsUploading(true);
    try {
      // 1. Get Convex Upload URL
      const postUrl = await generateUploadUrl();

      // 2. POST the file to Convex Storage
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!result.ok) throw new Error("Upload failed");

      const { storageId } = await result.json();

      // 3. Update User's avatar storage ID in Convex
      await updateAvatar({
        userId,
        storageId,
      });

    } catch (error: any) {
      console.error("Error uploading avatar:", error.message);
      alert("Failed to upload image to Convex storage.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleLogout = async () => {
    onClose();
    await signOut();
    router.push("/login");
  };

  if (!isOpen || !mounted) return null;

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-grey-900/40 backdrop-blur-sm px-4">
        <div className="bg-white rounded-xl w-full max-w-[400px] p-6 flex flex-col gap-6 relative shadow-xl">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-preset-1 text-grey-900">Profile</h2>
            <button
              onClick={onClose}
              className="p-2 cursor-pointer hover:opacity-70 transition-opacity bg-transparent border-none"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-grey-900">
                <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <div className="w-24 h-24 rounded-full border-4 border-beige-100 overflow-hidden relative shadow-md group-hover:opacity-80 transition-all">
                {avatarUrl ? (
                  <Image src={avatarUrl} alt="Profile" fill className="object-cover" sizes="96px" />
                ) : (
                  <Image src="/assets/images/avatars/emma-richardson.jpg" alt="Profile" fill className="object-cover" sizes="96px" />
                )}
                
                {isUploading && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                      <path d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 17C14.2091 17 16 15.2091 16 13C16 10.7909 14.2091 9 12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                   </svg>
                </div>
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleAvatarUpload} 
                className="hidden" 
                accept="image/*"
              />
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-preset-2 text-grey-900">{convexUser?.fullName || user?.user_metadata?.full_name || "User"}</h3>
              <p className="text-preset-4 text-grey-500">{user?.email}</p>
              <div className="flex flex-col gap-2 mt-2">
                <div className="px-3 py-1 bg-green/10 rounded-full border border-green/20">
                  <span className="text-preset-5-bold text-green uppercase tracking-wide">Total Income: {formatCurrency(totalIncome)}</span>
                </div>
                <div className="px-3 py-1 bg-grey-900/5 rounded-full border border-grey-900/10">
                  <span className="text-preset-5-bold text-grey-900 uppercase tracking-wide">Current Balance: {formatCurrency(currentBalance)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Add Cash Button */}
          <button
            onClick={() => setIsAddCashOpen(true)}
            className="flex flex-row justify-center items-center py-4 px-4 w-full bg-grey-900 rounded-lg border-none cursor-pointer group hover:bg-grey-500 transition-colors shadow-md"
          >
            <span className="text-preset-4-bold text-white uppercase tracking-wider">+ Add Cash</span>
          </button>

          <div className="flex flex-col gap-3 pt-6 border-t border-grey-100">
            <span className="text-preset-3 text-grey-900">Display Currency</span>
            <div className="flex items-center bg-beige-100 rounded-lg p-1 w-full gap-1 shadow-sm border border-grey-500 border-opacity-30">
              <button
                onClick={() => setCurrency("USD")}
                className={`flex-1 flex items-center justify-center py-2 rounded-md transition-colors border-none cursor-pointer outline-none w-full ${
                  currency === "USD" ? "bg-white text-grey-900 shadow-sm font-bold" : "bg-transparent text-grey-500 hover:text-grey-900"
                } text-preset-4`}
              >
                USD ($)
              </button>
              <button
                onClick={() => setCurrency("NGN")}
                className={`flex-1 flex items-center justify-center py-2 rounded-md transition-colors border-none cursor-pointer outline-none w-full ${
                  currency === "NGN" ? "bg-white text-grey-900 shadow-sm font-bold" : "bg-transparent text-grey-500 hover:text-grey-900"
                } text-preset-4`}
              >
                NGN (₦)
              </button>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex flex-row justify-center items-center py-4 px-4 w-full bg-grey-100 rounded-lg border-none cursor-pointer group hover:bg-grey-900 transition-colors"
          >
            <span className="text-preset-4-bold text-red group-hover:text-white transition-colors">Log Out</span>
          </button>
        </div>
      </div>

      <AddCashModal isOpen={isAddCashOpen} onClose={() => setIsAddCashOpen(false)} />
    </>
  );
}
