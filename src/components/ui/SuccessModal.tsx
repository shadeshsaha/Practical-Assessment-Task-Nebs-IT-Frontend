import { CheckCircle, X } from "lucide-react";
import React from "react";
import type { SuccessModalProps } from "./types";

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  onViewNotice,
  onCreateAnother,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 backdrop-blur-[2px]">
      <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-10 max-w-[550px] w-full text-center relative animate-fade-in-up mx-4">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-1 rounded transition-colors"
        >
          <X size={20} />
        </button>

        <div className="w-16 h-16 md:w-20 md:h-20 bg-[#10B981] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_10px_20px_rgba(16,185,129,0.2)]">
          <CheckCircle
            className="text-white w-8 h-8 md:w-10 md:h-10"
            strokeWidth={3}
          />
        </div>

        <h2 className="text-xl md:text-[26px] font-bold text-gray-800 mb-3 tracking-tight">
          Notice Published Successfully
        </h2>
        <p className="text-gray-500 text-sm mb-8 md:mb-10 leading-relaxed max-w-[400px] mx-auto">
          Your notice has been published and is now visible to all selected
          departments.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
          <button
            onClick={onViewNotice}
            className="w-full sm:w-auto px-8 py-2.5 border border-blue-500 text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-colors text-sm"
          >
            View Notice
          </button>
          <button
            onClick={onCreateAnother}
            className="w-full sm:w-auto px-8 py-2.5 border border-orange-500 text-orange-600 font-semibold rounded-full hover:bg-orange-50 transition-colors text-sm"
          >
            + Create Another
          </button>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-8 py-2.5 border border-gray-300 text-gray-600 font-semibold rounded-full hover:bg-gray-50 transition-colors text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
