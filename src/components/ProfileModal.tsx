"use client";

import Image from "next/image";
import { useCurrency } from "@/providers/CurrencyProvider";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const { currency, setCurrency } = useCurrency();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    onClose();
    router.push("/login");
  };

  if (!isOpen || !mounted) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-grey-900/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-xl w-full max-w-[400px] p-6 flex flex-col gap-6 relative shadow-xl">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-preset-1 text-grey-900">Profile</h2>
          <button onClick={onClose} className="p-2 cursor-pointer hover:opacity-70 transition-opacity bg-transparent border-none">
            {/* simple close icon using text or an SVG. Since we might not have icon-close-modal.svg, I'll use a neat inline SVG */}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-grey-900">
              <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-full border border-grey-500 overflow-hidden relative">
            <Image src="/assets/images/avatars/emma-richardson.jpg" alt="Profile" fill className="object-cover" sizes="80px" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <h3 className="text-preset-2 text-grey-900">Emma Richardson</h3>
            <p className="text-preset-4 text-grey-500">emma.richardson@example.com</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-6 border-t border-grey-100">
          <span className="text-preset-3 text-grey-900">Display Currency</span>
          <div className="flex items-center bg-beige-100 rounded-lg p-1 w-full gap-1 shadow-sm border border-grey-500 border-opacity-30">
            <button
              onClick={() => setCurrency("USD")}
              className={`flex-1 flex items-center justify-center py-2 rounded-md transition-colors border-none cursor-pointer outline-none w-full ${currency === "USD" ? "bg-white text-grey-900 shadow-sm font-bold" : "bg-transparent text-grey-500 hover:text-grey-900"
                } text-preset-4`}
            >
              USD ($)
            </button>
            <button
              onClick={() => setCurrency("NGN")}
              className={`flex-1 flex items-center justify-center py-2 rounded-md transition-colors border-none cursor-pointer outline-none w-full ${currency === "NGN" ? "bg-white text-grey-900 shadow-sm font-bold" : "bg-transparent text-grey-500 hover:text-grey-900"
                } text-preset-4`}
            >
              NGN (₦)
            </button>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex flex-row justify-center items-center py-4 px-4 w-full bg-grey-100 rounded-lg border-none cursor-pointer mt-2 group hover:bg-grey-900 transition-colors"
        >
          <span className="text-preset-4-bold text-red group-hover:text-white transition-colors">Log Out</span>
        </button>
      </div>
    </div>
  );
}
