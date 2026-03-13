"use client";

import MobileSidebar from "@/components/MobileSidebar";
import DesktopSidebar from "@/components/DesktopSidebar";
import Image from "next/image";
import { useState } from "react";
import ProfileModal from "@/components/ProfileModal";
import AddBudgetModal from "@/components/AddBudgetModal";
import EditBudgetModal from "@/components/EditBudgetModal";
import DeleteBudgetModal from "@/components/DeleteBudgetModal";
import { useCurrency } from "@/providers/CurrencyProvider";

export default function BudgetsPage() {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAddBudgetModalOpen, setIsAddBudgetModalOpen] = useState(false);
  const [isEditBudgetModalOpen, setIsEditBudgetModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState("");
  const [editingBudget, setEditingBudget] = useState<{category: string, maximum: number, theme: string} | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const { formatCurrency } = useCurrency();

  const toggleDropdown = (id: string) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };
  return (
    <div className="flex flex-col lg:flex-row items-start w-full min-h-screen bg-beige-100 relative">
      <DesktopSidebar />

      <main className="flex flex-col items-center w-full flex-1 mb-[52px] lg:mb-0 max-w-[1140px] mx-auto">
        <div className="sticky top-0 z-10 flex flex-row items-center justify-center w-full bg-beige-100 px-4 pt-6 pb-6 md:px-10 md:pt-8 md:pb-8 lg:px-10 lg:pt-8 lg:pb-8">
          <div className="flex flex-row items-center justify-between w-full max-w-[480px] md:max-w-[688px] lg:max-w-[1060px]">
            <h1 className="text-preset-1 text-grey-900">Budgets</h1>
            <div className="flex flex-row items-center gap-4">
              <button 
                onClick={() => setIsAddBudgetModalOpen(true)}
                className="flex flex-row justify-center items-center px-4 h-[53px] bg-grey-900 text-white text-preset-4-bold rounded-lg cursor-pointer hover:bg-grey-500 transition-colors"
              >
                + Add New Budget
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

        <div className="flex flex-col items-center w-full px-4 pb-6 md:px-10 md:pb-8 lg:px-10 lg:pb-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 w-full max-w-[480px] md:max-w-[688px] lg:max-w-[1060px]">
            {/* Left Side (Chart container) */}
            <div className="flex flex-col md:flex-row lg:flex-col justify-center items-center md:items-start py-6 px-5 gap-8 md:p-8 w-full max-w-[480px] md:max-w-[688px] lg:max-w-[428px] lg:w-[428px] bg-white rounded-xl">
            {/* Chart */}
            <div className="flex flex-row justify-center items-center gap-2 w-full max-w-[303px] md:max-w-[296px] lg:max-w-[364px] md:h-[280px]">
              <div className="relative flex justify-center items-center w-[240px] h-[240px]">
                <div 
                  className="absolute w-[240px] h-[240px] rounded-full"
                  style={{
                    background: "conic-gradient(#277C78 0% 6.1%, #82C9D7 6.1% 67.5%, #F2CDAC 67.5% 84%, #626070 84% 100%)"
                  }}
                ></div>
                <div className="absolute w-[187.5px] h-[187.5px] bg-white opacity-25 rounded-full mix-blend-screen"></div>
                <div className="absolute w-[162px] h-[162px] bg-white rounded-full flex flex-col justify-center items-center gap-2">
                  <span className="text-preset-1 text-grey-900">{formatCurrency(407)}</span>
                  <span className="text-preset-5 text-grey-500">of {formatCurrency(975)} limit</span>
                </div>
              </div>
            </div>

            {/* Spending Summary */}
            <div className="flex flex-col items-start gap-6 w-full max-w-[303px] md:max-w-[296px] lg:max-w-[364px] flex-1 lg:flex-none">
              <h2 className="text-preset-2 text-grey-900">Spending Summary</h2>
              
              <div className="flex flex-col items-start gap-4 w-full">
                {/* Entertainment */}
                <div className="flex flex-row justify-between items-center w-full">
                  <div className="flex flex-row items-center gap-4">
                    <div className="w-1 h-[21px] bg-green rounded-lg"></div>
                    <span className="text-preset-4 text-grey-500">Entertainment</span>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <span className="text-preset-3 text-grey-900">{formatCurrency(50)}</span>
                    <span className="text-preset-5 text-grey-500">of {formatCurrency(50)}</span>
                  </div>
                </div>
                <div className="w-full h-[1px] bg-grey-100"></div>

                {/* Bills */}
                <div className="flex flex-row justify-between items-center w-full">
                  <div className="flex flex-row items-center gap-4">
                    <div className="w-1 h-[21px] bg-cyan rounded-lg"></div>
                    <span className="text-preset-4 text-grey-500">Bills</span>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <span className="text-preset-3 text-grey-900">{formatCurrency(250)}</span>
                    <span className="text-preset-5 text-grey-500">of {formatCurrency(750)}</span>
                  </div>
                </div>
                <div className="w-full h-[1px] bg-grey-100"></div>

                {/* Dining Out */}
                <div className="flex flex-row justify-between items-center w-full">
                  <div className="flex flex-row items-center gap-4">
                    <div className="w-1 h-[21px] bg-yellow rounded-lg"></div>
                    <span className="text-preset-4 text-grey-500">Dining Out</span>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <span className="text-preset-3 text-grey-900">{formatCurrency(67)}</span>
                    <span className="text-preset-5 text-grey-500">of {formatCurrency(75)}</span>
                  </div>
                </div>
                <div className="w-full h-[1px] bg-grey-100"></div>

                {/* Personal Care */}
                <div className="flex flex-row justify-between items-center w-full">
                  <div className="flex flex-row items-center gap-4">
                    <div className="w-1 h-[21px] bg-navy rounded-lg"></div>
                    <span className="text-preset-4 text-grey-500">Personal Care</span>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <span className="text-preset-3 text-grey-900">{formatCurrency(65)}</span>
                    <span className="text-preset-5 text-grey-500">of {formatCurrency(100)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side (Budget List) */}
          <div className="flex flex-col items-start gap-6 w-full max-w-[480px] md:max-w-[688px] lg:max-w-[608px] lg:w-[608px]">
            {/* Entertainment Budget */}
            <div className="flex flex-col items-start p-6 gap-5 w-full bg-white rounded-xl md:p-8">
              <div className="flex flex-row justify-between items-center w-full">
                <div className="flex flex-row items-center gap-4">
                  <div className="w-4 h-4 bg-green rounded-full"></div>
                  <h2 className="text-preset-2 text-grey-900">Entertainment</h2>
                </div>
                <div className="relative">
                  <button 
                    onClick={() => toggleDropdown('entertainment')}
                    className="bg-transparent border-none cursor-pointer p-0 opacity-60 hover:opacity-100 group"
                  >
                    <Image src="/assets/images/icon-ellipsis.svg" alt="Options" width={16} height={16} className="text-grey-300" style={{filter: 'brightness(0) saturate(100%) invert(80%) sepia(2%) saturate(16%) hue-rotate(14deg) brightness(85%) contrast(92%)'}}/>
                  </button>

                  {/* Dropdown */}
                  {openDropdownId === 'entertainment' && (
                    <div className="flex absolute top-8 right-0 flex-col items-start p-[12px_20px] gap-3 w-[134px] bg-white shadow-[0px_4px_24px_rgba(0,0,0,0.25)] rounded-lg z-20">
                      <button 
                        onClick={() => {
                          setEditingBudget({category: 'Entertainment', maximum: 50, theme: 'Green'});
                          setIsEditBudgetModalOpen(true);
                          setOpenDropdownId(null);
                        }}
                        className="flex flex-row items-center p-0 gap-4 w-full bg-transparent border-none cursor-pointer hover:opacity-70 transition-opacity"
                      >
                        <span className="text-preset-4 text-grey-900">Edit Budget</span>
                      </button>
                      <div className="w-full h-[1px] bg-[#F2F2F2]"></div>
                      <button 
                        onClick={() => {
                          setCategoryToDelete('Entertainment');
                          setIsDeleteModalOpen(true);
                          setOpenDropdownId(null);
                        }}
                        className="flex flex-row items-center p-0 gap-4 w-full bg-transparent border-none cursor-pointer hover:opacity-70 transition-opacity"
                      >
                        <span className="text-preset-4 text-red">Delete Budget</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-start gap-4 w-full">
                <div className="flex flex-row items-center gap-4 w-full">
                  <span className="text-preset-4 text-grey-500">Maximum of {formatCurrency(50)}</span>
                </div>
                
                {/* Progress Bar */}
                <div className="flex flex-row items-start p-1 w-full h-8 bg-beige-100 rounded-[4px]">
                  <div className="h-6 bg-green rounded-[4px]" style={{width: '100%'}}></div>
                </div>

                {/* Spent & Free */}
                <div className="flex flex-row items-center w-full gap-4">
                  <div className="flex flex-row items-center gap-4 flex-1">
                    <div className="w-1 h-[43px] bg-green rounded-lg"></div>
                    <div className="flex flex-col justify-center gap-1">
                      <span className="text-preset-5 text-grey-500">Spent</span>
                      <span className="text-preset-4-bold text-grey-900">{formatCurrency(50)}</span>
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-4 flex-1">
                    <div className="w-1 h-[43px] bg-beige-100 rounded-lg"></div>
                    <div className="flex flex-col justify-center gap-1">
                      <span className="text-preset-5 text-grey-500">Free</span>
                      <span className="text-preset-4-bold text-grey-900">{formatCurrency(0)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Latest Spending */}
              <div className="flex flex-col justify-center items-start p-4 md:p-5 gap-5 w-full bg-beige-100 rounded-xl">
                <div className="flex flex-row justify-between items-center w-full">
                  <span className="text-preset-3 text-grey-900">Latest Spending</span>
                  <button className="flex flex-row items-center gap-3 bg-transparent border-none text-preset-4 text-grey-500 hover:text-grey-900 cursor-pointer group">
                    See All
                    <Image src="/assets/images/icon-caret-down.svg" alt="See All" width={12} height={12} className="-rotate-90 opacity-60 group-hover:opacity-100" />
                  </button>
                </div>
                
                <div className="flex flex-col items-start gap-3 w-full">
                  {/* Item */}
                  <div className="flex flex-row justify-between items-center w-full h-[40px]">
                    <div className="flex flex-row items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-white overflow-hidden relative border border-grey-100 flex-shrink-0">
                        <Image src="/assets/images/avatars/papa-software.jpg" alt="Audiobook service" fill sizes="32px" className="object-cover" />
                      </div>
                      <span className="text-preset-5-bold text-grey-900">Audiobook service</span>
                    </div>
                    <div className="flex flex-col justify-center items-end gap-1">
                      <span className="text-preset-5-bold text-grey-900">-$10.00</span>
                      <span className="text-preset-5 text-grey-500">16 Aug 2024, 14:00</span>
                    </div>
                  </div>
                  <div className="w-full h-[1px] bg-grey-500 opacity-15"></div>

                  <div className="flex flex-row justify-between items-center w-full h-[40px]">
                    <div className="flex flex-row items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-white overflow-hidden relative border border-grey-100 flex-shrink-0">
                        <Image src="/assets/images/avatars/quebec-services.jpg" alt="Music streaming service" fill sizes="32px" className="object-cover" />
                      </div>
                      <span className="text-preset-5-bold text-grey-900">Music streaming service</span>
                    </div>
                    <div className="flex flex-col justify-center items-end gap-1">
                      <span className="text-preset-5-bold text-grey-900">-$5.00</span>
                      <span className="text-preset-5 text-grey-500">12 Aug 2024, 10:00</span>
                    </div>
                  </div>
                  <div className="w-full h-[1px] bg-grey-500 opacity-15"></div>

                  <div className="flex flex-row justify-between items-center w-full h-[40px]">
                    <div className="flex flex-row items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-white overflow-hidden relative border border-grey-100 flex-shrink-0">
                        <Image src="/assets/images/avatars/romeo-cloud-service.jpg" alt="Video streaming service" fill sizes="32px" className="object-cover" />
                      </div>
                      <span className="text-preset-5-bold text-grey-900">Video streaming service</span>
                    </div>
                    <div className="flex flex-col justify-center items-end gap-1">
                      <span className="text-preset-5-bold text-grey-900">-$10.00</span>
                      <span className="text-preset-5 text-grey-500">5 Aug 2024, 12:10</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Bills Budget */}
            <div className="flex flex-col items-start p-6 gap-5 w-full bg-white rounded-xl md:p-8">
              <div className="flex flex-row justify-between items-center w-full">
                <div className="flex flex-row items-center gap-4">
                  <div className="w-4 h-4 bg-cyan rounded-full"></div>
                  <h2 className="text-preset-2 text-grey-900">Bills</h2>
                </div>
                <div className="relative">
                  <button 
                    onClick={() => toggleDropdown('bills')}
                    className="bg-transparent border-none cursor-pointer p-0 opacity-60 hover:opacity-100 group"
                  >
                    <Image src="/assets/images/icon-ellipsis.svg" alt="Options" width={16} height={16} className="text-grey-300" style={{filter: 'brightness(0) saturate(100%) invert(80%) sepia(2%) saturate(16%) hue-rotate(14deg) brightness(85%) contrast(92%)'}}/>
                  </button>

                  {/* Dropdown */}
                  {openDropdownId === 'bills' && (
                    <div className="flex absolute top-8 right-0 flex-col items-start p-[12px_20px] gap-3 w-[134px] bg-white shadow-[0px_4px_24px_rgba(0,0,0,0.25)] rounded-lg z-20">
                      <button 
                        onClick={() => {
                          setEditingBudget({category: 'Bills', maximum: 750, theme: 'Cyan'});
                          setIsEditBudgetModalOpen(true);
                          setOpenDropdownId(null);
                        }}
                        className="flex flex-row items-center p-0 gap-4 w-full bg-transparent border-none cursor-pointer hover:opacity-70 transition-opacity"
                      >
                        <span className="text-preset-4 text-grey-900">Edit Budget</span>
                      </button>
                      <div className="w-full h-[1px] bg-[#F2F2F2]"></div>
                      <button 
                        onClick={() => {
                          setCategoryToDelete('Bills');
                          setIsDeleteModalOpen(true);
                          setOpenDropdownId(null);
                        }}
                        className="flex flex-row items-center p-0 gap-4 w-full bg-transparent border-none cursor-pointer hover:opacity-70 transition-opacity"
                      >
                        <span className="text-preset-4 text-red">Delete Budget</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-start gap-4 w-full">
                <div className="flex flex-row items-center gap-4 w-full">
                  <span className="text-preset-4 text-grey-500">Maximum of {formatCurrency(750)}</span>
                </div>
                
                {/* Progress Bar */}
                <div className="flex flex-row items-start p-1 w-full h-8 bg-beige-100 rounded-[4px]">
                  <div className="h-6 bg-cyan rounded-[4px]" style={{width: '33%'}}></div>
                </div>

                {/* Spent & Free */}
                <div className="flex flex-row items-center w-full gap-4">
                  <div className="flex flex-row items-center gap-4 flex-1">
                    <div className="w-1 h-[43px] bg-cyan rounded-lg"></div>
                    <div className="flex flex-col justify-center gap-1">
                      <span className="text-preset-5 text-grey-500">Spent</span>
                      <span className="text-preset-4-bold text-grey-900">{formatCurrency(250)}</span>
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-4 flex-1">
                    <div className="w-1 h-[43px] bg-beige-100 rounded-lg"></div>
                    <div className="flex flex-col justify-center gap-1">
                      <span className="text-preset-5 text-grey-500">Free</span>
                      <span className="text-preset-4-bold text-grey-900">{formatCurrency(500)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Latest Spending */}
              <div className="flex flex-col justify-center items-start p-4 md:p-5 gap-5 w-full bg-beige-100 rounded-xl">
                <div className="flex flex-row justify-between items-center w-full">
                  <span className="text-preset-3 text-grey-900">Latest Spending</span>
                  <button className="flex flex-row items-center gap-3 bg-transparent border-none text-preset-4 text-grey-500 hover:text-grey-900 cursor-pointer group">
                    See All
                    <Image src="/assets/images/icon-caret-down.svg" alt="See All" width={12} height={12} className="-rotate-90 opacity-60 group-hover:opacity-100" />
                  </button>
                </div>
                
                <div className="flex flex-col items-start gap-3 w-full">
                  {/* Item */}
                  <div className="flex flex-row justify-between items-center w-full h-[40px]">
                    <div className="flex flex-row items-center gap-4">
                      {/* Avatar placeholder */}
                      <div className="w-8 h-8 rounded-full bg-white overflow-hidden relative border border-grey-100">
                        <Image src="/assets/images/avatars/spark-electric-solutions.jpg" alt="Charlie Electric Company" fill sizes="32px" className="object-cover" />
                      </div>
                      <span className="text-preset-5-bold text-grey-900">Charlie Electric Company</span>
                    </div>
                    <div className="flex flex-col justify-center items-end gap-1">
                      <span className="text-preset-5-bold text-grey-900">-$100.00</span>
                      <span className="text-preset-5 text-grey-500">1 Aug 2024, 13:44</span>
                    </div>
                  </div>
                  <div className="w-full h-[1px] bg-grey-500 opacity-15"></div>

                  <div className="flex flex-row justify-between items-center w-full h-[40px]">
                    <div className="flex flex-row items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-white overflow-hidden relative border border-grey-100">
                        <Image src="/assets/images/avatars/swift-ride-share.jpg" alt="Tango Gas Company" fill sizes="32px" className="object-cover" />
                      </div>
                      <span className="text-preset-5-bold text-grey-900">Tango Gas Company</span>
                    </div>
                    <div className="flex flex-col justify-center items-end gap-1">
                      <span className="text-preset-5-bold text-grey-900">-$50.00</span>
                      <span className="text-preset-5 text-grey-500">1 Aug 2024, 13:44</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            
            {/* Dining Out Budget */}
            <div className="flex flex-col items-start p-6 gap-5 w-full bg-white rounded-xl md:p-8">
              <div className="flex flex-row justify-between items-center w-full">
                <div className="flex flex-row items-center gap-4">
                  <div className="w-4 h-4 bg-yellow rounded-full"></div>
                  <h2 className="text-preset-2 text-grey-900">Dining Out</h2>
                </div>
                <div className="relative">
                  <button 
                    onClick={() => toggleDropdown('dining')}
                    className="bg-transparent border-none cursor-pointer p-0 opacity-60 hover:opacity-100 group"
                  >
                    <Image src="/assets/images/icon-ellipsis.svg" alt="Options" width={16} height={16} className="text-grey-300" style={{filter: 'brightness(0) saturate(100%) invert(80%) sepia(2%) saturate(16%) hue-rotate(14deg) brightness(85%) contrast(92%)'}}/>
                  </button>

                  {/* Dropdown */}
                  {openDropdownId === 'dining' && (
                    <div className="flex absolute top-8 right-0 flex-col items-start p-[12px_20px] gap-3 w-[134px] bg-white shadow-[0px_4px_24px_rgba(0,0,0,0.25)] rounded-lg z-20">
                      <button 
                        onClick={() => {
                          setEditingBudget({category: 'Dining Out', maximum: 75, theme: 'Yellow'});
                          setIsEditBudgetModalOpen(true);
                          setOpenDropdownId(null);
                        }}
                        className="flex flex-row items-center p-0 gap-4 w-full bg-transparent border-none cursor-pointer hover:opacity-70 transition-opacity"
                      >
                        <span className="text-preset-4 text-grey-900">Edit Budget</span>
                      </button>
                      <div className="w-full h-[1px] bg-[#F2F2F2]"></div>
                      <button 
                        onClick={() => {
                          setCategoryToDelete('Dining Out');
                          setIsDeleteModalOpen(true);
                          setOpenDropdownId(null);
                        }}
                        className="flex flex-row items-center p-0 gap-4 w-full bg-transparent border-none cursor-pointer hover:opacity-70 transition-opacity"
                      >
                        <span className="text-preset-4 text-red">Delete Budget</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-start gap-4 w-full">
                <div className="flex flex-row items-center gap-4 w-full">
                  <span className="text-preset-4 text-grey-500">Maximum of {formatCurrency(75)}</span>
                </div>
                
                {/* Progress Bar */}
                <div className="flex flex-row items-start p-1 w-full h-8 bg-beige-100 rounded-[4px]">
                  <div className="h-6 bg-yellow rounded-[4px]" style={{width: '89.3%'}}></div>
                </div>

                {/* Spent & Free */}
                <div className="flex flex-row items-center w-full gap-4">
                  <div className="flex flex-row items-center gap-4 flex-1">
                    <div className="w-1 h-[43px] bg-yellow rounded-lg"></div>
                    <div className="flex flex-col justify-center gap-1">
                      <span className="text-preset-5 text-grey-500">Spent</span>
                      <span className="text-preset-4-bold text-grey-900">{formatCurrency(67)}</span>
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-4 flex-1">
                    <div className="w-1 h-[43px] bg-beige-100 rounded-lg"></div>
                    <div className="flex flex-col justify-center gap-1">
                      <span className="text-preset-5 text-grey-500">Free</span>
                      <span className="text-preset-4-bold text-grey-900">{formatCurrency(8)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Latest Spending */}
              <div className="flex flex-col justify-center items-start p-4 md:p-5 gap-5 w-full bg-beige-100 rounded-xl">
                <div className="flex flex-row justify-between items-center w-full">
                  <span className="text-preset-3 text-grey-900">Latest Spending</span>
                  <button className="flex flex-row items-center gap-3 bg-transparent border-none text-preset-4 text-grey-500 hover:text-grey-900 cursor-pointer group">
                    See All
                    <Image src="/assets/images/icon-caret-down.svg" alt="See All" width={12} height={12} className="-rotate-90 opacity-60 group-hover:opacity-100" />
                  </button>
                </div>
                
                <div className="flex flex-col items-start gap-3 w-full">
                  {/* Item */}
                  <div className="flex flex-row justify-between items-center w-full h-[40px]">
                    <div className="flex flex-row items-center gap-4">
                      {/* Avatar placeholder */}
                      <div className="w-8 h-8 rounded-full bg-white overflow-hidden relative border border-grey-100">
                         <Image src="/assets/images/avatars/savory-bites-bistro.jpg" alt="Lima Dining House" fill sizes="32px" className="object-cover" />
                      </div>
                      <span className="text-preset-5-bold text-grey-900">Lima Dining House</span>
                    </div>
                    <div className="flex flex-col justify-center items-end gap-1">
                      <span className="text-preset-5-bold text-grey-900">-$30.00</span>
                      <span className="text-preset-5 text-grey-500">21 Aug 2024, 18:59</span>
                    </div>
                  </div>
                  <div className="w-full h-[1px] bg-grey-500 opacity-15"></div>
                  
                  <div className="flex flex-row justify-between items-center w-full h-[40px]">
                    <div className="flex flex-row items-center gap-4">
                      {/* Avatar placeholder */}
                      <div className="w-8 h-8 rounded-full bg-white overflow-hidden relative border border-grey-100">
                         <Image src="/assets/images/avatars/sun-park.jpg" alt="Food Merchant" fill sizes="32px" className="object-cover" />
                      </div>
                      <span className="text-preset-5-bold text-grey-900">Food Merchant</span>
                    </div>
                    <div className="flex flex-col justify-center items-end gap-1">
                      <span className="text-preset-5-bold text-grey-900">-$21.50</span>
                      <span className="text-preset-5 text-grey-500">20 Aug 2024, 12:16</span>
                    </div>
                  </div>
                  <div className="w-full h-[1px] bg-grey-500 opacity-15"></div>
                  
                  <div className="flex flex-row justify-between items-center w-full h-[40px]">
                    <div className="flex flex-row items-center gap-4">
                      {/* Avatar placeholder */}
                      <div className="w-8 h-8 rounded-full bg-white overflow-hidden relative border border-grey-100">
                         <Image src="/assets/images/avatars/juliet-restaurant.jpg" alt="Juliet Restaurant" fill sizes="32px" className="object-cover" />
                      </div>
                      <span className="text-preset-5-bold text-grey-900">Juliet Restaurant</span>
                    </div>
                    <div className="flex flex-col justify-center items-end gap-1">
                      <span className="text-preset-5-bold text-grey-900">-$15.50</span>
                      <span className="text-preset-5 text-grey-500">12 Aug 2024, 13:44</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Personal Care Budget */}
            <div className="flex flex-col items-start p-6 gap-5 w-full bg-white rounded-xl md:p-8">
              <div className="flex flex-row justify-between items-center w-full">
                <div className="flex flex-row items-center gap-4">
                  <div className="w-4 h-4 bg-navy rounded-full"></div>
                  <h2 className="text-preset-2 text-grey-900">Personal Care</h2>
                </div>
                <div className="relative">
                  <button 
                    onClick={() => toggleDropdown('personal')}
                    className="bg-transparent border-none cursor-pointer p-0 opacity-60 hover:opacity-100 group"
                  >
                    <Image src="/assets/images/icon-ellipsis.svg" alt="Options" width={16} height={16} className="text-grey-300" style={{filter: 'brightness(0) saturate(100%) invert(80%) sepia(2%) saturate(16%) hue-rotate(14deg) brightness(85%) contrast(92%)'}}/>
                  </button>

                  {/* Dropdown */}
                  {openDropdownId === 'personal' && (
                    <div className="flex absolute top-8 right-0 flex-col items-start p-[12px_20px] gap-3 w-[134px] bg-white shadow-[0px_4px_24px_rgba(0,0,0,0.25)] rounded-lg z-20">
                      <button 
                        onClick={() => {
                          setEditingBudget({category: 'Personal Care', maximum: 100, theme: 'Navy'});
                          setIsEditBudgetModalOpen(true);
                          setOpenDropdownId(null);
                        }}
                        className="flex flex-row items-center p-0 gap-4 w-full bg-transparent border-none cursor-pointer hover:opacity-70 transition-opacity"
                      >
                        <span className="text-preset-4 text-grey-900">Edit Budget</span>
                      </button>
                      <div className="w-full h-[1px] bg-[#F2F2F2]"></div>
                      <button 
                        onClick={() => {
                          setCategoryToDelete('Personal Care');
                          setIsDeleteModalOpen(true);
                          setOpenDropdownId(null);
                        }}
                        className="flex flex-row items-center p-0 gap-4 w-full bg-transparent border-none cursor-pointer hover:opacity-70 transition-opacity"
                      >
                        <span className="text-preset-4 text-red">Delete Budget</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-start gap-4 w-full">
                <div className="flex flex-row items-center gap-4 w-full">
                  <span className="text-preset-4 text-grey-500">Maximum of {formatCurrency(100)}</span>
                </div>
                
                {/* Progress Bar */}
                <div className="flex flex-row items-start p-1 w-full h-8 bg-beige-100 rounded-[4px]">
                  <div className="h-6 bg-navy rounded-[4px]" style={{width: '65%'}}></div>
                </div>

                {/* Spent & Free */}
                <div className="flex flex-row items-center w-full gap-4">
                  <div className="flex flex-row items-center gap-4 flex-1">
                    <div className="w-1 h-[43px] bg-navy rounded-lg"></div>
                    <div className="flex flex-col justify-center gap-1">
                      <span className="text-preset-5 text-grey-500">Spent</span>
                      <span className="text-preset-4-bold text-grey-900">{formatCurrency(65)}</span>
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-4 flex-1">
                    <div className="w-1 h-[43px] bg-beige-100 rounded-lg"></div>
                    <div className="flex flex-col justify-center gap-1">
                      <span className="text-preset-5 text-grey-500">Free</span>
                      <span className="text-preset-4-bold text-grey-900">{formatCurrency(35)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Latest Spending */}
              <div className="flex flex-col justify-center items-start p-4 md:p-5 gap-5 w-full bg-beige-100 rounded-xl">
                <div className="flex flex-row justify-between items-center w-full">
                  <span className="text-preset-3 text-grey-900">Latest Spending</span>
                  <button className="flex flex-row items-center gap-3 bg-transparent border-none text-preset-4 text-grey-500 hover:text-grey-900 cursor-pointer group">
                    See All
                    <Image src="/assets/images/icon-caret-down.svg" alt="See All" width={12} height={12} className="-rotate-90 opacity-60 group-hover:opacity-100" />
                  </button>
                </div>
                
                <div className="flex flex-col items-start gap-3 w-full">
                  {/* Item */}
                  <div className="flex flex-row justify-between items-center w-full h-[40px]">
                    <div className="flex flex-row items-center gap-4">
                      {/* Avatar placeholder */}
                      <div className="w-8 h-8 rounded-full bg-white overflow-hidden relative border border-grey-100">
                         <Image src="/assets/images/avatars/emma-richardson.jpg" alt="Bravo Zen Spa" fill sizes="32px" className="object-cover" />
                      </div>
                      <span className="text-preset-5-bold text-grey-900">Bravo Zen Spa</span>
                    </div>
                    <div className="flex flex-col justify-center items-end gap-1">
                      <span className="text-preset-5-bold text-grey-900">-$25.00</span>
                      <span className="text-preset-5 text-grey-500">29 Aug 2024, 21:45</span>
                    </div>
                  </div>
                  <div className="w-full h-[1px] bg-grey-500 opacity-15"></div>
                  
                  <div className="flex flex-row justify-between items-center w-full h-[40px]">
                    <div className="flex flex-row items-center gap-4">
                      {/* Avatar placeholder */}
                      <div className="w-8 h-8 rounded-full bg-white overflow-hidden relative border border-grey-100">
                         <Image src="/assets/images/avatars/aqua-flow-utilities.jpg" alt="Online Shop" fill sizes="32px" className="object-cover" />
                      </div>
                      <span className="text-preset-5-bold text-grey-900">Online Shop</span>
                    </div>
                    <div className="flex flex-col justify-center items-end gap-1">
                      <span className="text-preset-5-bold text-grey-900">-$15.00</span>
                      <span className="text-preset-5 text-grey-500">15 Aug 2024, 11:32</span>
                    </div>
                  </div>
                  <div className="w-full h-[1px] bg-grey-500 opacity-15"></div>
                  
                  <div className="flex flex-row justify-between items-center w-full h-[40px]">
                    <div className="flex flex-row items-center gap-4">
                      {/* Avatar placeholder */}
                      <div className="w-8 h-8 rounded-full bg-white overflow-hidden relative border border-grey-100">
                         <Image src="/assets/images/avatars/emma-richardson.jpg" alt="Bravo Zen Spa" fill sizes="32px" className="object-cover" />
                      </div>
                      <span className="text-preset-5-bold text-grey-900">Bravo Zen Spa</span>
                    </div>
                    <div className="flex flex-col justify-center items-end gap-1">
                      <span className="text-preset-5-bold text-grey-900">-$25.00</span>
                      <span className="text-preset-5 text-grey-500">13 Aug 2024, 21:30</span>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>

          </div>
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

      <AddBudgetModal
        isOpen={isAddBudgetModalOpen}
        onClose={() => setIsAddBudgetModalOpen(false)}
      />
      <EditBudgetModal 
        isOpen={isEditBudgetModalOpen} 
        onClose={() => setIsEditBudgetModalOpen(false)} 
        budget={editingBudget || undefined} 
      />
      <DeleteBudgetModal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)} 
        categoryName={categoryToDelete} 
      />
    </div>
  );
}
