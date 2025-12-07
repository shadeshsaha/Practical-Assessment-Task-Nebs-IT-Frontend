import {
  Bell,
  Briefcase,
  CreditCard,
  File,
  FileText,
  LayoutDashboard,
  LogOut,
  Receipt,
  User,
  UserCheck,
  Users,
} from "lucide-react";
import type { MenuItem } from "../types/notice";

export const MENU_ITEMS: MenuItem[] = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "employee", icon: Users, label: "Employee", hasSubmenu: true },
  { id: "payroll", icon: CreditCard, label: "Payroll" },
  { id: "payslip", icon: Receipt, label: "Pay Slip" },
  { id: "attendance", icon: UserCheck, label: "Attendance" },
  { id: "request", icon: FileText, label: "Request Center" },
  { id: "career", icon: Briefcase, label: "Career Database", hasSubmenu: true },
  { id: "docs", icon: File, label: "Document manager" },
  { id: "notice", icon: Bell, label: "Notice Board" },
  { id: "activity", icon: LogOut, label: "Activity Log" },
  { id: "exit", icon: LogOut, label: "Exit Interview" },
  { id: "profile", icon: User, label: "Profile" },
];

export const NOTICE_TYPE_OPTIONS = [
  "Warning / Disciplinary",
  "Performance Improvement",
  "Appreciation / Recognition",
  "Attendance / Leave Issue",
  "Payroll / Compensation",
  "Contract / Role Update",
  "Advisory / Personal Reminder",
] as const;

// export const API_BASE_URL = (import.meta.env.VITE_API_URL as string) || "/api";
// export const API_BASE_URL = "http://localhost:5000/api/v1";
export const API_BASE_URL = "https://nebs-it-backend-task.vercel.app/api/v1";

export const ASSETS = {
  logo: "/Logo.png",
  profile: "/Profile.jpg",
} as const;
