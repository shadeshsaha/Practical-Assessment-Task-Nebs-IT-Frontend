/* eslint-disable @typescript-eslint/no-unused-vars */
import { Briefcase } from "lucide-react";
import { useState } from "react";
import { Header } from "./components/layout/Header";
import { Sidebar } from "./components/layout/Sidebar";
import { CreateNoticeForm } from "./components/notice/CreateNoticeForm";
import { NoticeList } from "./components/notice/NoticeList";
import { SuccessModal } from "./components/ui/SuccessModal";
import { useNotices } from "./hooks/useNotices";
import type { Notice, NoticeFormData } from "./types/notice";

export default function App() {
  const [activeTab, setActiveTab] = useState("notice");
  const [view, setView] = useState<"list" | "create">("list");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { notices, createNotice, toggleStatus, loading } = useNotices();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleCreateNotice = async (formData: NoticeFormData) => {
    // Validation
    const requiredFields = [
      // "targetDepartment",
      "title",
      "targetType",
      "targetEmployee",
      // "employeeId",
      // "employeeName",
      // "position",
      "noticeType",
      "publishDate",
    ];

    const missingFields = requiredFields.filter(
      (field) => !formData[field as keyof typeof formData]
    );
    if (missingFields.length > 0) {
      alert("Please fill in all required fields (marked with *).");
      return;
    }

    console.log("✅ VALIDATION PASSED, creating notice...");
    const result = await createNotice(formData);

    if (result.success) {
      setShowSuccessModal(true);
      setView("list");
    } else {
      alert(`Failed to create notice: ${result.error}`);
    }
  };

  const handleToggleStatus = (id: string, currentStatus: Notice["status"]) => {
    toggleStatus(id, currentStatus);
  };

  const handleSuccessModalActions = (action: "close" | "view" | "create") => {
    setShowSuccessModal(false);
    if (action === "create") {
      setView("create");
    } else {
      setView("list");
    }
  };

  return (
    <div className="flex h-screen bg-[#F8F9FA] font-sans text-gray-900">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <div className="flex-1 flex flex-col h-screen overflow-hidden relative w-full">
        <Header toggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-auto p-4 md:p-8 custom-scrollbar">
          {activeTab === "notice" ? (
            <>
              {view === "list" ? (
                <NoticeList
                  notices={notices}
                  onCreateClick={() => setView("create")}
                  onToggleStatus={handleToggleStatus}
                />
              ) : (
                <CreateNoticeForm
                  onCancel={() => setView("list")}
                  onSave={handleCreateNotice}
                />
              )}
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400 flex-col gap-3">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <Briefcase size={32} className="opacity-40" />
              </div>
              <p className="font-medium">See you in future...</p>
            </div>
          )}
        </main>
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => handleSuccessModalActions("close")}
        onViewNotice={() => handleSuccessModalActions("view")}
        onCreateAnother={() => handleSuccessModalActions("create")}
      />
    </div>
  );
}
