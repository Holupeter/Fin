import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useCurrency } from "@/providers/CurrencyProvider";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

interface AddPotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

import { useAuth } from "@/providers/AuthProvider";

export default function AddPotModal({ isOpen, onClose }: AddPotModalProps) {
  const { currency, toInternalValue } = useCurrency();
  const [potName, setPotName] = useState("");
  const [target, setTarget] = useState("");
  const [themeColor, setThemeColor] = useState("Green");
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const addPot = useMutation(api.pots.addPot);
  const userId = user?.id || "";

  const handleSubmit = async () => {
    if (!potName || !target || isNaN(parseFloat(target))) return;

    setIsLoading(true);
    try {
      await addPot({
        userId,
        name: potName,
        targetAmount: toInternalValue(parseFloat(target)),
        currentAmount: 0,
        theme: themeColor,
      });
      onClose();
    } catch (error) {
      console.error("Failed to add pot:", error);
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

  const themes = [
    { name: "Green", color: "bg-green" },
    { name: "Yellow", color: "bg-yellow" },
    { name: "Cyan", color: "bg-cyan" },
    { name: "Navy", color: "bg-navy" },
    { name: "Red", color: "bg-red" },
    { name: "Purple", color: "bg-purple-1" },
    { name: "Turquoise", color: "bg-turquoise" },
    { name: "Brown", color: "bg-brown" },
    { name: "Magenta", color: "bg-magenta" },
    { name: "Blue", color: "bg-blue" },
    { name: "Navy Grey", color: "bg-navy-grey" },
    { name: "Army Green", color: "bg-army-green" },
    { name: "Orange", color: "bg-orange" },
    { name: "Peach", color: "bg-peach" },
    { name: "Purple 2", color: "bg-purple-2" }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-grey-900/40 backdrop-blur-sm px-4">
      <div className={`flex flex-col items-start p-8 gap-5 w-full max-w-[335px] md:max-w-[560px] h-auto max-h-[90vh] md:h-[512px] bg-white rounded-xl relative shadow-xl ${isThemeOpen ? 'overflow-visible' : 'overflow-y-auto overflow-x-hidden'} transition-all duration-300 no-scrollbar`}>
        {/* Header */}
        <div className="flex flex-row justify-between items-center w-full">
          <h2 className="text-preset-2 md:text-preset-1 text-grey-900">Add New Pot</h2>
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
          Create a pot to set savings targets. These can help you keep track of your money as you save for special purchases.
        </p>

        {/* Form Content */}
        <div className="flex flex-col items-start gap-4 w-full">
          
          {/* Pot Name Input */}
          <div className="flex flex-col items-start gap-1 w-full">
            <div className="flex flex-row justify-between items-center w-full">
              <label className="text-preset-5-bold text-grey-500">Pot Name</label>
              <span className="text-preset-5 text-grey-500">{30 - potName.length} of 30 characters left</span>
            </div>
            <div className="flex flex-row items-center px-5 py-3 w-full h-[45px] bg-white border border-[#98908B] rounded-lg focus-within:border-grey-900 transition-colors shadow-sm">
              <input
                type="text"
                placeholder="e.g. Rainy Days"
                maxLength={30}
                value={potName}
                onChange={(e) => setPotName(e.target.value)}
                className="w-full h-full border-none outline-none text-preset-4 text-grey-900 placeholder:text-[#98908B] bg-transparent"
              />
            </div>
          </div>

          {/* Target Input */}
          <div className="flex flex-col items-start gap-1 w-full">
            <label className="text-preset-5-bold text-grey-500">Target</label>
            <div className="flex flex-row items-center px-5 py-3 gap-3 w-full h-[45px] bg-white border border-[#98908B] rounded-lg focus-within:border-grey-900 transition-colors shadow-sm">
              <span className="text-preset-4 text-[#98908B]">{currency === "NGN" ? "₦" : "$"}</span>
              <input
                type="number"
                placeholder="e.g. 2000"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="w-full h-full border-none outline-none text-preset-4 text-grey-900 placeholder:text-[#98908B] bg-transparent"
              />
            </div>
          </div>

          {/* Theme Color Input */}
          <div className="flex flex-col items-start gap-1 w-full relative">
            <label className="text-preset-5-bold text-grey-500">Theme</label>
            <div
              onClick={() => setIsThemeOpen(!isThemeOpen)}
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
              <div className="absolute top-[75px] left-0 w-full bg-white shadow-[0px_4px_24px_rgba(0,0,0,0.25)] rounded-lg z-[60] py-3 px-5 flex flex-col gap-3 max-h-[160px] overflow-y-auto no-scrollbar">
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

        {/* Add Pot Button */}
        <button
          className="flex flex-row justify-center items-center p-4 w-full h-[53px] bg-grey-900 rounded-lg mt-auto hover:bg-grey-500 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSubmit}
          disabled={isLoading || !potName || !target}
        >
          <span className="text-preset-4-bold text-white">
            {isLoading ? "Adding Pot..." : "Add Pot"}
          </span>
        </button>
      </div>
    </div>
  );
}
