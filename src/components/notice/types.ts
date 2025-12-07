// import type { FormData, Notice } from "../../types/notice";
// // import type { CreateNoticeFormProps } from './types';

import type { Notice, NoticeFormData } from "../../types/notice";

// export interface CreateNoticeFormProps {
//   onCancel: () => void;
//   onSave: (data: FormData) => void;
// }

// export interface NoticeListProps {
//   notices: Notice[];
//   onCreateClick: () => void;
//   onToggleStatus: (id: string, status: Notice["status"]) => void;
// }

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
