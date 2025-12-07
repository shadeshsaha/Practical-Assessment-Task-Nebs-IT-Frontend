import type { Notice, NoticeFormData } from "../../types/notice";

export type { Notice, NoticeFormData } from "../../types/notice";

export interface CreateNoticeFormProps {
  onCancel: () => void;
  onSave: (data: NoticeFormData) => void;
}

export interface NoticeListProps {
  notices: Notice[];
  onCreateClick: () => void;
  onToggleStatus: (id: string, status: Notice["status"]) => void;
}
