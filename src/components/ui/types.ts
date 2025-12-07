export interface NoticeTypeDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

export interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewNotice: () => void;
  onCreateAnother: () => void;
}
