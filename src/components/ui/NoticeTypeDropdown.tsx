import { CheckSquare, ChevronDown, Square } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { NOTICE_TYPE_OPTIONS } from "../../lib/constants";
import type { NoticeTypeDropdownProps } from "./types";

export const NoticeTypeDropdown: React.FC<NoticeTypeDropdownProps> = ({
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = useCallback(
    (option: string) => {
      onChange(option);
      setIsOpen(false);
    },
    [onChange]
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-10 px-3 border border-gray-200 rounded text-sm text-gray-600 flex items-center justify-between cursor-pointer bg-white hover:border-gray-300 transition-colors"
      >
        <span className={value ? "text-gray-900" : "text-gray-500"}>
          {value || "Select Notice Type"}
        </span>
        <ChevronDown size={16} className="text-gray-400" />
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-100 rounded-lg shadow-lg py-2 animate-fade-in-down max-h-[300px] overflow-y-auto">
          {NOTICE_TYPE_OPTIONS.map((option) => (
            <div
              key={option}
              onClick={() => handleSelect(option)}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="text-gray-400 flex-shrink-0">
                {value === option ? (
                  <CheckSquare size={18} className="text-blue-500" />
                ) : (
                  <Square size={18} />
                )}
              </div>
              <span
                className={`text-sm ${
                  value === option
                    ? "text-blue-600 font-medium"
                    : "text-gray-600"
                }`}
              >
                {option}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
