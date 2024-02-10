import type { ContentApprovalResponse } from 'interfaces';

export declare type IAboutUs = ContentApprovalResponse & {
  id: number;
  titleAr: string;
  titleEn: string;
  contentAr: string;
  contentEn: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};
