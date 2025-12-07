export interface SidebarProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  isOpen: boolean;
  toggleSidebar: () => void;
}

export interface HeaderProps {
  toggleSidebar: () => void;
}
