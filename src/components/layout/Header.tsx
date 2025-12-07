import { Bell, Menu } from "lucide-react";
import React from "react";
import type { HeaderProps } from "./types";

export const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => (
  <header className="bg-white h-[72px] border-b border-gray-100 flex items-center justify-between px-4 md:px-8 flex-shrink-0 sticky top-0 z-20">
    <div className="flex items-center gap-3">
      <button
        onClick={toggleSidebar}
        className="md:hidden text-gray-600 p-2 hover:bg-gray-50 rounded-lg transition-colors"
      >
        <Menu size={24} />
      </button>

      <div>
        <h1 className="text-gray-800 font-bold text-base">
          Good Afternoon Asif
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">13 June, 2026</p>
      </div>
    </div>

    <div className="flex items-center gap-4 md:gap-6">
      <div className="relative cursor-pointer">
        <Bell
          className="text-gray-400 hover:text-gray-600 transition-colors"
          size={20}
        />
        <span className="absolute -top-1.5 -right-0.5 h-2 w-2 bg-red-500 rounded-full border border-white"></span>
      </div>
      <div className="h-6 w-[1px] bg-gray-200 hidden md:block"></div>
      <div className="flex items-center gap-3 cursor-pointer">
        <div className="text-right hidden md:block">
          <p className="text-sm font-bold text-gray-900">Asif Riaj</p>
          <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">
            Hr
          </p>
        </div>
        <img
          src="/Profile.jpg"
          alt="Profile"
          className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-white shadow-sm object-cover bg-gray-100"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            // target.src = "#";
            target.style.display = "none";
          }}
        />
      </div>
    </div>
  </header>
);
