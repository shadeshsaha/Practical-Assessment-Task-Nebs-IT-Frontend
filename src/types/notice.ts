export interface MenuItem {
  id: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  label: string;
  hasSubmenu?: boolean;
}

export interface Notice {
  id: string;
  _id?: string;
  title: string;
  targetType: string;
  targetEmployee?: string;
  noticeType: string;
  publishDate: string;
  body?: string;
  status: "Published" | "Draft" | "Unpublished";
  targetEmployees?: string[];
  position?: string;
  employeeName?: string;
  employeeId?: string;
}

export interface NoticeFormData {
  title: string;
  body?: string;
  targetType:
    | "individual"
    | "finance"
    | "sales-team"
    | "web-team"
    | "database-team"
    | "admin"
    | "hr"
    | "all";
  targetEmployee: string;
  noticeType:
    | "warning-disciplinary"
    | "performance-improvement"
    | "appreciation-recognition"
    | "attendance-leave-issue"
    | "payroll-compensation"
    | "contract-role-update"
    | "advisory-personal-reminder";
  publishDate: string;
  employeeName: string;
  position: string;
  attachments?: Array<{ fileName: string; fileUrl: string }>;
}
