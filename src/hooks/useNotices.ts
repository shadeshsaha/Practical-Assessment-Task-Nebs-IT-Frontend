/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import { API_BASE_URL } from "../lib/constants";
import { MOCK_NOTICES } from "../lib/mockData";
import type { Notice } from "../types/notice";

const mapBackendStatus = (backendStatus?: string): Notice["status"] => {
  if (!backendStatus) return "Draft";

  switch (backendStatus.toLowerCase()) {
    case "published":
      return "Published";
    case "unpublished":
      return "Unpublished";
    case "draft":
      return "Draft";
    default:
      return "Draft";
  }
};

export const useNotices = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotices = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/notices`); // /api/v1/notices

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.json();

      // Safe data extraction
      const apiData = result?.data || [];
      if (!Array.isArray(apiData)) {
        console.warn("API data is not an array:", apiData);
        setNotices([]);
        return;
      }

      // Safe mapping with status check
      const formattedData: Notice[] = apiData.map((item: any) => ({
        ...item,
        id: item._id || item.id,
        status: mapBackendStatus(item.status),
      }));

      setNotices(formattedData);
    } catch (err) {
      console.error("Backend unavailable:", err);
      setNotices(MOCK_NOTICES);
      setError(err instanceof Error ? err.message : "Failed to fetch notices");
    } finally {
      setLoading(false);
    }
  }, []);

  const createNotice = useCallback(async (formData: any) => {
    try {
      const backendPayload = {
        title: formData.title?.trim() || "",
        body: formData.body?.trim() || "",
        targetType: formData.targetType || "all",
        targetEmployees: formData.targetEmployee
          ? [formData.targetEmployee]
          : [],
        noticeType: formData.noticeType || "performance-improvement",
        publishDate:
          formData.publishDate || new Date().toISOString().split("T")[0],
        status: "published",
      };

      const response = await fetch(`${API_BASE_URL}/notices`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(backendPayload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed: ${response.status} - ${errorText}`);
      }

      const result = await response.json();

      // const newNotice = result.data;
      const newNotice = result.data || result;
      setNotices((prev) => [
        {
          ...newNotice,
          id: newNotice._id || newNotice.id,
          status: mapBackendStatus(newNotice?.status),
        },
        ...prev,
      ]);

      return { success: true, notice: newNotice };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : "Failed",
      };
    }
  }, []);

  const toggleStatus = useCallback(
    async (id: string, currentStatus: Notice["status"]) => {
      const newStatus =
        currentStatus === "Published" ? "Unpublished" : "Published";

      // Optimistic update
      setNotices((prev) =>
        prev.map((n) => (n.id === id ? { ...n, status: newStatus } : n))
      );

      try {
        await fetch(`${API_BASE_URL}/notices/${id}/toggle-status`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        });
      } catch (err) {
        console.error("Error updating status:", err);
        // Revert optimistic update on error
        setNotices((prev) =>
          prev.map((n) => (n.id === id ? { ...n, status: currentStatus } : n))
        );
      }
    },
    []
  );

  useEffect(() => {
    fetchNotices();
  }, [fetchNotices]);

  return {
    notices,
    loading,
    error,
    refetch: fetchNotices,
    createNotice,
    toggleStatus,
  };
};
