/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronDown, ChevronLeft, Paperclip, Upload, X } from "lucide-react";
import React, { useCallback, useState } from "react";
import { NoticeTypeDropdown } from "../ui/NoticeTypeDropdown";
import type { CreateNoticeFormProps, NoticeFormData } from "./types";

export const CreateNoticeForm: React.FC<CreateNoticeFormProps> = ({
  onCancel,
  onSave,
}) => {
  const [formData, setFormData] = useState<NoticeFormData>({
    title: "",
    body: "",
    targetType: "individual",
    targetEmployee: "",
    noticeType: "",
    position: "",
    employeeName: "",
    publishDate: "",
  });

  const handleChange = useCallback(
    (field: keyof NoticeFormData, value: string) => {
      setFormData((prev: any) => ({ ...prev, [field]: value }));
    },
    []
  );

  return (
    <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-200 m-1 flex flex-col min-h-[calc(100vh-140px)]">
      {/* Header */}
      <div className="px-4 md:px-8 py-5 border-b border-gray-100 flex items-center gap-4">
        <button
          onClick={onCancel}
          className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-md hover:bg-gray-50 text-gray-600 transition-colors"
        >
          <ChevronLeft size={18} />
        </button>
        <h2 className="text-lg font-bold text-gray-800">Create a Notice</h2>
      </div>

      <div className="p-4 md:p-8 max-w-[1200px]">
        <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
          <h3 className="text-sm font-semibold text-gray-800 mb-6 bg-[#F9FAFB] p-3 rounded-md border-l-[3px] border-transparent">
            Please fill in the details below
          </h3>

          <div className="space-y-6">
            {/* Target Department */}
            <div className="bg-[#F4F7FE] p-4 md:p-6 rounded-lg border border-[#F4F7FE]">
              <label className="block text-xs font-bold text-gray-700 mb-2">
                <span className="text-red-500 mr-1">*</span>Target Department(s)
                or Individual
              </label>
              <div className="relative">
                <select
                  className="w-full h-10 px-3 bg-white border border-blue-100 rounded text-sm text-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-200 appearance-none cursor-pointer"
                  value={formData.targetType}
                  onChange={(e) => handleChange("targetType", e.target.value)}
                >
                  <option value="individual">Individual</option>
                  <option value="all">All Department</option>
                  <option value="sales-team">Sales Team</option>
                  <option value="finance">Finance</option>
                  <option value="hr">HR</option>
                </select>
                <ChevronDown
                  className="absolute right-3 top-3 text-blue-400 pointer-events-none"
                  size={16}
                />
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                <span className="text-red-500 mr-1">*</span>Notice Title
              </label>
              <input
                type="text"
                placeholder="Write the Title of Notice"
                className="w-full h-10 px-3 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-400 placeholder-gray-400 transition-colors"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </div>

            {/* Employee Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">
                  <span className="text-red-500 mr-1">*</span>Select Employee ID
                </label>
                <div className="relative">
                  <select
                    className="w-full h-10 px-3 border border-gray-200 rounded text-sm text-gray-500 focus:outline-none appearance-none bg-white"
                    value={formData.targetEmployee}
                    onChange={(e) =>
                      handleChange("targetEmployee", e.target.value)
                    }
                  >
                    <option value="">Select employee designation</option>
                    <option value="EMP-001">EMP-001</option>
                    <option value="EMP-002">EMP-002</option>
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-3 text-gray-400 pointer-events-none"
                    size={16}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">
                  <span className="text-red-500 mr-1">*</span>Employee Name
                </label>
                <input
                  type="text"
                  placeholder="Enter employee full name"
                  className="w-full h-10 px-3 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-400 placeholder-gray-400"
                  value={formData.employeeName}
                  onChange={(e) => handleChange("employeeName", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">
                  <span className="text-red-500 mr-1">*</span>Position
                </label>
                <input
                  type="text"
                  placeholder="Select employee department"
                  className="w-full h-10 px-3 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-400 placeholder-gray-400"
                  value={formData.position}
                  onChange={(e) => handleChange("position", e.target.value)}
                />
              </div>
            </div>

            {/* Type & Date Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">
                  <span className="text-red-500 mr-1">*</span>Notice Type
                </label>
                <NoticeTypeDropdown
                  value={formData.noticeType}
                  onChange={(val) => handleChange("noticeType", val)}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">
                  <span className="text-red-500 mr-1">*</span>Publish Date
                </label>
                <input
                  type="date"
                  className="w-full h-10 px-3 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-400 placeholder-gray-400 text-gray-600"
                  value={formData.publishDate}
                  onChange={(e) => handleChange("publishDate", e.target.value)}
                />
              </div>
            </div>

            {/* Body */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                Notice Body
              </label>
              <textarea
                placeholder="Write the details about notice"
                className="w-full p-3 border border-gray-200 rounded text-sm h-32 focus:outline-none focus:border-blue-400 resize-none placeholder-gray-400"
                value={formData.body}
                onChange={(e) => handleChange("body", e.target.value)}
              />
            </div>

            {/* Upload Area */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                Upload Attachments (optional)
              </label>
              <div className="border border-dashed border-[#10B981] bg-[#F0FDF4] rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#DCFCE7] transition-colors">
                <div className="mb-2 text-[#10B981]">
                  <Upload size={24} />
                </div>
                <p className="text-xs text-gray-700">
                  <span className="font-bold text-[#10B981]">Upload</span>{" "}
                  nominee profile image or drag and drop.
                </p>
                <p className="text-[10px] text-gray-400 mt-1">
                  Accepted File Type: jpg, png
                </p>
              </div>

              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-[#F3F4F6] rounded-full border border-gray-200 max-w-full overflow-hidden">
                <Paperclip size={14} className="text-gray-500 flex-shrink-0" />
                <span className="text-xs text-gray-600 font-medium truncate">
                  Policy_Document.pdf
                </span>
                <button className="ml-1 text-red-400 hover:text-red-600 bg-white rounded-full p-0.5 shadow-sm flex-shrink-0">
                  <X size={10} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="px-4 md:px-8 py-5 border-t border-gray-100 flex flex-col-reverse sm:flex-row justify-end gap-3 mt-auto">
        <button
          onClick={onCancel}
          className="px-6 py-2 rounded-full border border-gray-300 text-gray-600 font-medium text-sm hover:bg-gray-50 transition-colors w-full sm:w-auto"
        >
          Cancel
        </button>
        <button className="px-6 py-2 rounded-full border border-blue-400 text-blue-500 font-medium text-sm hover:bg-blue-50 transition-colors w-full sm:w-auto">
          Save as Draft
        </button>
        <button
          // onClick={() => onSave(formData)}
          onClick={() => {
            const noticeTypeMap: Record<string, string> = {
              "Warning / Disciplinary": "warning-disciplinary",
              "Performance Improvement": "performance-improvement",
              "Appreciation / Recognition": "appreciation-recognition",
              "Attendance / Leave Issue": "attendance-leave-issue",
              "Payroll / Compensation": "payroll-compensation",
              "Contract / Role Update": "contract-role-update",
              "Advisory / Personal Reminder": "advisory-personal-reminder",
            };

            const backendData = {
              title: formData.title.trim(),
              body: formData.body?.trim() || "",
              targetType: formData.targetType,
              targetEmployee: formData.targetEmployee,
              noticeType:
                noticeTypeMap[formData.noticeType as string] ||
                "performance-improvement",
              publishDate: formData.publishDate,
              status: "published",
            };

            (onSave as any)(backendData);
          }}
          className="px-6 py-2 rounded-full bg-[#F97316] text-white font-medium text-sm hover:bg-orange-600 shadow-md flex items-center justify-center gap-2 transition-all w-full sm:w-auto"
        >
          <span className="text-xs">✓</span> Publish Notice
        </button>
      </div>
    </div>
  );
};
