import type { Notice } from "../types/notice";

export const MOCK_NOTICES: Notice[] = [
  {
    id: "1",
    title: "Monthly Performance Review Meeting",
    targetDepartment: "All Department",
    employeeId: "EMP-001",
    employeeName: "Asif Riaj",
    position: "HR Manager",
    noticeType: "Performance Improvement",
    publishDate: "2025-12-01",
    body: "All employees are required to attend...",
    status: "Published",
  },
  {
    id: "2",
    title: "Salary Adjustment Notice",
    targetDepartment: "Finance",
    employeeId: "EMP-002",
    employeeName: "John Doe",
    position: "Accountant",
    noticeType: "Payroll / Compensation",
    publishDate: "2025-12-05",
    body: "Your salary has been adjusted...",
    status: "Draft",
  },
];
