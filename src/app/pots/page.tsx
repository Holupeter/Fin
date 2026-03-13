"use client";

import DesktopSidebar from "@/components/DesktopSidebar";
import MobileSidebar from "@/components/MobileSidebar";
import Image from "next/image";
import { useState } from "react";
import ProfileModal from "@/components/ProfileModal";
import AddPotModal from "@/components/AddPotModal";
import EditPotModal from "@/components/EditPotModal";
import DeletePotModal from "@/components/DeletePotModal";
import AdjustPotBalanceModal from "@/components/AdjustPotBalanceModal";
import { SmartAmount } from "@/components/SmartAmount";
import { useCurrency } from "@/providers/CurrencyProvider";

export default function PotsPage() {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAddPotModalOpen, setIsAddPotModalOpen] = useState(false);
  const [isEditPotModalOpen, setIsEditPotModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false);
  const [adjustMode, setAdjustMode] = useState<"add" | "withdraw">("add");
  const [selectedPotForAdjust, setSelectedPotForAdjust] = useState<any>(null);
  const [potToDelete, setPotToDelete] = useState("");
  const [editingPot, setEditingPot] = useState<{name: string, target: number, theme: string} | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const { formatCurrency } = useCurrency();

  const toggleDropdown = (id: string) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const pots = [
    {
      name: "Savings",
      color: "bg-green",
      theme: "Green",
      saved: 159.00,
      target: 2000,
      percentage: "7.95%",
    },
    {
      name: "Concert Ticket",
      color: "bg-navy",
      theme: "Navy",
      saved: 110.00,
      target: 150,
      percentage: "73.3%",
    },
    {
      name: "Christmas Gift",
      color: "bg-cyan",
      theme: "Cyan",
      saved: 40.00,
      target: 60,
      percentage: "66.6%",
    },
    {
      name: "Holiday to Japan",
      color: "bg-purple-1",
      theme: "Purple",
      saved: 531.00,
      target: 1440,
      percentage: "36.8%",
    },
    {
      name: "New Laptop",
      color: "bg-yellow",
      theme: "Yellow",
      saved: 10.00,
      target: 1000,
      percentage: "1.0%",
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row items-start w-full min-h-screen bg-beige-100 relative">
      <DesktopSidebar />

      <main className="flex flex-col items-center w-full flex-1 mb-[52px] lg:mb-0 max-w-[1140px] mx-auto">
        <div className="sticky top-0 z-10 flex flex-row items-center justify-center w-full bg-beige-100 px-4 pt-6 pb-6 md:px-10 md:pt-8 md:pb-8 lg:px-10 lg:pt-8 lg:pb-8">
          <div className="flex flex-row items-center justify-between w-full max-w-[480px] md:max-w-[688px] lg:max-w-[1060px]">
            <h1 className="text-preset-1 text-grey-900">Pots</h1>
            <div className="flex flex-row items-center gap-4">
              <button 
                onClick={() => setIsAddPotModalOpen(true)}
                className="flex flex-row justify-center items-center px-4 h-[53px] bg-grey-900 text-white text-preset-4-bold rounded-lg cursor-pointer hover:bg-grey-500 transition-colors"
              >
                + Add New Pot
              </button>
              <button 
                onClick={() => setIsProfileModalOpen(true)}
                className="w-10 h-10 rounded-full bg-white overflow-hidden border border-grey-500 relative cursor-pointer opacity-90 hover:opacity-100 transition-opacity p-0 flex-shrink-0"
                aria-label="Open Profile"
              >
                <Image src="/assets/images/avatars/emma-richardson.jpg" alt="Profile" fill sizes="40px" className="object-cover" />
              </button>
            </div>
          </div>
        </div>

        {/* Pots List */}
        <div className="flex flex-col items-center w-full px-4 pb-6 md:px-10 md:pb-8 lg:px-10 lg:pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-[480px] md:max-w-[688px] lg:max-w-[1060px]">
            {pots.map((pot, index) => (
              <div key={index} className="flex flex-col items-start p-6 gap-8 w-full bg-white rounded-xl">
              
              {/* Title Header */}
              <div className="flex flex-row justify-between items-center w-full">
                <div className="flex flex-row items-center gap-4">
                  <div className={`w-4 h-4 rounded-full ${pot.color}`}></div>
                  <h2 className="text-preset-2 text-grey-900">{pot.name}</h2>
                </div>
                {/* Ellipsis icon */}
                <div className="relative">
                  <button 
                    onClick={() => toggleDropdown(pot.name)}
                    className="bg-transparent border-none cursor-pointer p-0 opacity-60 hover:opacity-100 group"
                  >
                    <Image 
                      src="/assets/images/icon-ellipsis.svg" 
                      alt="Options" 
                      width={16} 
                      height={16} 
                      className="text-grey-300" 
                      style={{filter: 'brightness(0) saturate(100%) invert(80%) sepia(2%) saturate(16%) hue-rotate(14deg) brightness(85%) contrast(92%)'}}
                    />
                  </button>

                  {/* Dropdown - Edit Delete Pot */}
                  {openDropdownId === pot.name && (
                    <div className="flex absolute top-8 right-0 flex-col items-start p-[12px_20px] gap-3 w-[114px] bg-white shadow-[0px_4px_24px_rgba(0,0,0,0.25)] rounded-lg z-20">
                      <button 
                         onClick={() => {
                          setEditingPot({ name: pot.name, target: pot.target, theme: pot.theme });
                          setIsEditPotModalOpen(true);
                          setOpenDropdownId(null);
                        }}
                        className="flex flex-row items-center p-0 gap-4 w-full bg-transparent border-none cursor-pointer hover:opacity-70 transition-opacity text-left"
                      >
                        <span className="text-preset-4 text-grey-900">Edit Pot</span>
                      </button>
                      <div className="w-full h-[1px] bg-[#F2F2F2]"></div>
                      <button 
                        onClick={() => {
                          setPotToDelete(pot.name);
                          setIsDeleteModalOpen(true);
                          setOpenDropdownId(null);
                        }}
                        className="flex flex-row items-center p-0 gap-4 w-full bg-transparent border-none cursor-pointer hover:opacity-70 transition-opacity text-left"
                      >
                        <span className="text-preset-4 text-red">Delete Pot</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Pot Bar and Details */}
              <div className="flex flex-col justify-center items-start gap-4 w-full">
                
                <div className="flex flex-row flex-wrap justify-between items-center w-full gap-2 overflow-hidden">
                  <span className="text-preset-4 text-grey-500">Total Saved</span>
                  <SmartAmount amount={formatCurrency(pot.saved)} className="text-preset-1 text-grey-900 text-right" maxWidth={300} />
                </div>

                {/* Tracking Bar */}
                <div className="flex flex-col items-start gap-[13px] w-full">
                  <div className="w-full h-2 bg-beige-100 rounded-lg overflow-hidden">
                    <div 
                      className={`h-full ${pot.color} rounded-lg`} 
                      style={{ width: pot.percentage }}
                    />
                  </div>
                  <div className="flex flex-row justify-between w-full overflow-hidden">
                    <span className="text-preset-5-bold text-grey-500">{pot.percentage}</span>
                    <div className="flex flex-row gap-1 items-center shrink-0">
                      <span className="text-preset-5 text-grey-500">Target of</span>
                      <SmartAmount amount={formatCurrency(pot.target)} className="text-preset-5 text-grey-500" maxWidth={60} />
                    </div>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex flex-row items-start gap-4 w-full">
                <button 
                  onClick={() => {
                    setSelectedPotForAdjust(pot);
                    setAdjustMode("add");
                    setIsAdjustModalOpen(true);
                  }}
                  className="flex-1 flex flex-row justify-center items-center py-4 bg-beige-100 rounded-lg h-[53px] hover:bg-white hover:border hover:border-beige-500 transition-colors"
                >
                  <span className="text-preset-4-bold text-grey-900">+ Add Money</span>
                </button>
                <button 
                  onClick={() => {
                    setSelectedPotForAdjust(pot);
                    setAdjustMode("withdraw");
                    setIsAdjustModalOpen(true);
                  }}
                  className="flex-1 flex flex-row justify-center items-center py-4 bg-beige-100 rounded-lg h-[53px] hover:bg-white hover:border hover:border-beige-500 transition-colors"
                >
                  <span className="text-preset-4-bold text-grey-900">Withdraw</span>
                </button>
              </div>

            </div>
            ))}
          </div>
        </div>
      </main>

      <div className="lg:hidden w-full fixed bottom-0 left-0 bg-transparent z-50">
        <MobileSidebar />
      </div>

      <ProfileModal 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)} 
      />
      <AddPotModal 
        isOpen={isAddPotModalOpen} 
        onClose={() => setIsAddPotModalOpen(false)} 
      />
      <EditPotModal 
        isOpen={isEditPotModalOpen} 
        onClose={() => setIsEditPotModalOpen(false)} 
        pot={editingPot || undefined}
      />
      <DeletePotModal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)} 
        potName={potToDelete}
      />
      <AdjustPotBalanceModal
        isOpen={isAdjustModalOpen}
        onClose={() => setIsAdjustModalOpen(false)}
        pot={selectedPotForAdjust}
        mode={adjustMode}
      />
    </div>
  );
}
