"use client";

import React, { useEffect } from "react";
import Image from "next/image";

interface DeleteBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryName: string;
}

export default function DeleteBudgetModal({ isOpen, onClose, categoryName }: DeleteBudgetModalProps) {
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
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-grey-900/40 backdrop-blur-sm px-4">
      <div className="flex flex-col items-start px-5 py-6 md:p-8 gap-5 w-full max-w-[335px] md:max-w-[560px] h-auto md:h-[278px] bg-white rounded-xl relative shadow-xl overflow-hidden transition-all duration-300">
        {/* Header */}
        <div className="flex flex-row justify-between items-center w-full">
          <h2 className="text-preset-2 md:text-preset-1 text-grey-900">
            Delete ‘{categoryName}’?
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
        <p className="text-preset-4 text-grey-500 w-full mb-1">
          Are you sure you want to delete this budget? This action cannot be undone, and will remove all data associated with it.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 w-full">
          <button
            onClick={onClose}
            className="flex flex-row justify-center items-center p-4 w-full h-[53px] bg-red rounded-lg hover:opacity-80 transition-opacity shadow-sm"
          >
            <span className="text-preset-4-bold text-white">Yes, Confirm Deletion</span>
          </button>
          
          <button
            onClick={onClose}
            className="flex flex-row justify-center items-center w-full h-[21px] bg-transparent border-none cursor-pointer hover:text-grey-900 transition-colors"
          >
            <span className="text-preset-4 text-grey-500">No, I want to go back</span>
          </button>
        </div>
      </div>
    </div>
  );
}
