/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Edit,
  Eye,
  MoreVertical,
  Plus,
} from "lucide-react";
import React from "react";
import type { Notice } from "../../types/notice";
import type { NoticeListProps } from "./types";

export const NoticeList: React.FC<NoticeListProps> = ({
  notices,
  onCreateClick,
  onToggleStatus,
}) => {
  const activeNotices = notices.filter((n) => n.status === "Published").length;
  const draftNotices = notices.filter((n) => n.status === "Draft").length;

  const getDepartmentColor = (department: string) => {
    const colors: Record<string, string> = {
      "All Department": "text-blue-600",
      Finance: "text-[#10B981]",
      "Sales Team": "text-orange-500",
      HR: "text-rose-500",
      Admin: "text-purple-600",
      "Web Team": "text-blue-400",
    };
    return colors[department] || "text-cyan-500";
  };

  const getStatusColor = (status: Notice["status"]) => {
    switch (status) {
      case "Published":
        return "bg-emerald-50 text-[#10B981]";
      case "Draft":
        return "bg-[#FFF7ED] text-orange-500";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString)
      .toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
      .replace(/ /g, "-");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Notice Management</h2>
          <div className="flex gap-3 mt-1.5 text-xs">
            <span className="text-[#10B981] font-medium">
              Active Notices: {activeNotices}
            </span>
            <span className="text-gray-300">|</span>
            <span className="text-orange-400 font-medium">
              Draft Notice: {draftNotices}
            </span>
          </div>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button
            onClick={onCreateClick}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 bg-[#F97316] text-white rounded hover:bg-orange-600 font-medium text-sm transition-colors shadow-sm whitespace-nowrap"
          >
            <Plus size={16} /> Create Notice
          </button>
          <button className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 border border-orange-200 text-[#F97316] bg-[#FFFBF7] rounded hover:bg-orange-50 font-medium text-sm transition-colors whitespace-nowrap">
            <Edit size={14} /> All Draft Notice
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-end gap-3">
        <span className="text-sm font-bold text-gray-700 mr-1 hidden md:inline">
          Filter by:
        </span>
        <div className="relative flex-1 min-w-[140px]">
          <button className="w-full flex items-center justify-between gap-2 px-3 py-2 bg-white border border-gray-200 rounded text-xs text-gray-600 hover:border-gray-300">
            <span className="truncate">Departments or individuals</span>
            <ChevronDown size={14} className="text-gray-400 flex-shrink-0" />
          </button>
        </div>
        <input
          placeholder="Employee Id or Name"
          className="flex-1 min-w-[140px] px-3 py-2 bg-white border border-gray-200 rounded text-xs outline-none text-gray-600 placeholder-gray-400 hover:border-gray-300"
        />
        <div className="relative flex-1 min-w-[100px]">
          <button className="w-full flex items-center justify-between gap-2 px-3 py-2 bg-white border border-gray-200 rounded text-xs text-gray-600 hover:border-gray-300">
            Status
            <ChevronDown size={14} className="text-gray-400 flex-shrink-0" />
          </button>
        </div>
        <div className="relative flex-1 min-w-[120px]">
          <button className="w-full flex items-center justify-between gap-2 px-3 py-2 bg-white border border-gray-200 rounded text-xs text-gray-600 hover:border-gray-300">
            Published on
            <Calendar size={14} className="text-gray-400 flex-shrink-0" />
          </button>
        </div>
        <button className="text-blue-500 text-xs font-semibold px-2 hover:underline whitespace-nowrap">
          Reset Filters
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead className="bg-[#F8FAFC] border-b border-gray-200">
              <tr>
                <th className="p-4 w-14 text-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-0 cursor-pointer"
                  />
                </th>
                <th className="p-4 text-xs font-bold text-gray-600 uppercase tracking-wide">
                  Title
                </th>
                <th className="p-4 text-xs font-bold text-gray-600 uppercase tracking-wide">
                  Notice Type
                </th>
                <th className="p-4 text-xs font-bold text-gray-600 uppercase tracking-wide">
                  Departments/Individual
                </th>
                <th className="p-4 text-xs font-bold text-gray-600 uppercase tracking-wide">
                  Published On
                </th>
                <th className="p-4 text-xs font-bold text-gray-600 uppercase tracking-wide">
                  Status
                </th>
                <th className="p-4 text-xs font-bold text-gray-600 uppercase tracking-wide text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {notices.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="p-8 text-center text-gray-400 text-sm"
                  >
                    No notices found. Create one to get started.
                  </td>
                </tr>
              ) : (
                notices.map((notice) => (
                  <tr
                    key={notice.id}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="p-4 text-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-0 cursor-pointer"
                      />
                    </td>
                    <td className="p-4">
                      <p
                        className="font-semibold text-gray-800 text-[13px] line-clamp-1 max-w-[220px]"
                        title={notice.title}
                      >
                        {notice.title}
                      </p>
                    </td>
                    <td className="p-4">
                      <span className="text-gray-500 text-[13px]">
                        {notice.noticeType}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`text-[12px] font-medium ${getDepartmentColor(
                          (notice as any).targetType || ""
                          // notice.targetDepartment
                        )}`}
                      >
                        {(notice as any).targetType || "All Departments"}
                        {/* {notice.targetDepartment} */}
                      </span>
                    </td>
                    <td className="p-4 text-gray-500 text-[13px] whitespace-nowrap">
                      {formatDate(notice.publishDate)}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-3 py-1 rounded-[4px] text-[10px] font-bold uppercase tracking-wider w-[85px] text-center ${getStatusColor(
                            notice.status
                          )}`}
                        >
                          {notice.status}
                        </span>

                        {notice.status !== "Draft" && (
                          <button
                            onClick={() =>
                              onToggleStatus(notice.id, notice.status)
                            }
                            className={`w-9 h-5 rounded-full relative transition-colors duration-300 ${
                              notice.status === "Published"
                                ? "bg-[#10B981]"
                                : "bg-gray-300"
                            }`}
                          >
                            <div
                              className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${
                                notice.status === "Published"
                                  ? "translate-x-4"
                                  : "translate-x-0"
                              }`}
                            ></div>
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5 text-gray-400">
                        <button className="hover:text-blue-500 transition-colors p-1 hover:bg-blue-50 rounded">
                          <Eye size={16} />
                        </button>
                        <button className="hover:text-green-500 transition-colors p-1 hover:bg-green-50 rounded">
                          <Edit size={16} />
                        </button>
                        <button className="hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center p-4 border-t border-gray-200 gap-2 bg-white overflow-x-auto">
          <button className="w-8 h-8 flex-shrink-0 flex items-center justify-center hover:bg-gray-100 rounded text-gray-400">
            <ChevronLeft size={16} />
          </button>
          <button className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-blue-50 border border-blue-100 text-blue-600 rounded text-xs font-bold">
            1
          </button>
          <button className="w-8 h-8 flex-shrink-0 flex items-center justify-center hover:bg-gray-50 text-gray-500 rounded text-xs font-medium">
            2
          </button>
          <button className="w-8 h-8 flex-shrink-0 flex items-center justify-center hover:bg-gray-50 text-gray-500 rounded text-xs font-medium">
            3
          </button>
          <button className="w-8 h-8 flex-shrink-0 flex items-center justify-center hover:bg-gray-50 text-gray-500 rounded text-xs font-medium">
            4
          </button>
          <button className="w-8 h-8 flex-shrink-0 flex items-center justify-center hover:bg-gray-50 text-gray-500 rounded text-xs font-medium">
            5
          </button>
          <button className="w-8 h-8 flex-shrink-0 flex items-center justify-center hover:bg-gray-100 rounded text-gray-400">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
