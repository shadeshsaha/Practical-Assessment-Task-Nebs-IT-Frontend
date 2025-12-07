import { ChevronDown, X } from "lucide-react";
import React from "react";
import { MENU_ITEMS } from "../../lib/constants";
import type { MenuItem } from "../../types/notice";
import type { SidebarProps } from "./types";

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isOpen,
  toggleSidebar,
}) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-sm"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Container */}
      <div
        className={`
        fixed md:static inset-y-0 left-0 z-50 w-[250px] bg-white h-screen flex flex-col border-r border-gray-100 
        transform transition-transform duration-300 ease-in-out flex-shrink-0 font-sans
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
      >
        {/* Logo Section - FIXED */}
        <div className="p-6 pb-8 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <img
              src="/Logo.png"
              alt="Nebs-IT"
              className="h-10 w-auto object-contain flex-shrink-0"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <span className="hidden md:inline text-2xl font-black text-gray-900 tracking-tight truncate">
              Nebs-IT
            </span>
          </div>
          <button
            onClick={toggleSidebar}
            className="md:hidden text-gray-500 hover:text-gray-800 p-1 rounded transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-0 space-y-0.5 custom-scrollbar">
          {MENU_ITEMS.map((item: MenuItem) => (
            <div key={item.id} className="relative">
              <button
                type="button"
                onClick={() => {
                  setActiveTab(item.id);
                  if (
                    typeof window !== "undefined" &&
                    window.innerWidth < 768
                  ) {
                    toggleSidebar();
                  }
                }}
                className={`w-full flex items-center justify-between px-6 py-3 text-sm font-medium transition-colors relative ${
                  activeTab === item.id
                    ? "bg-[#FFF7ED] text-gray-900"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon
                    size={18}
                    className={
                      activeTab === item.id ? "text-[#F97316]" : "text-gray-400"
                    }
                  />
                  <span>{item.label}</span>
                </div>
                {item.hasSubmenu && (
                  <ChevronDown size={14} className="text-gray-400" />
                )}

                {activeTab === item.id && (
                  <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#F97316] rounded-l-full"></div>
                )}
              </button>

              {/* Employee Submenu */}
              {item.id === "employee" && (
                <div className="pl-[52px] pr-4 space-y-2 py-2 bg-white">
                  <div className="text-[13px] font-semibold text-gray-800 cursor-pointer hover:text-[#F97316]">
                    Employee Database
                  </div>
                  <div className="text-[13px] text-gray-500 cursor-pointer hover:text-[#F97316]">
                    Add New Employee
                  </div>
                  <div className="text-[13px] text-gray-500 cursor-pointer hover:text-[#F97316]">
                    Performance Report
                  </div>
                  <div className="text-[13px] text-gray-500 cursor-pointer hover:text-[#F97316]">
                    Performance History
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
