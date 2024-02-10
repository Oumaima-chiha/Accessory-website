import type { ContentApprovalResponse } from 'interfaces';

export declare type INews = ContentApprovalResponse & {
  id: number;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  topic: ITopic;
  image: File;
  active: boolean;
};

export declare type ITopic = {
  id: number;
  titleAr: string;
  titleEn: string;
  createdAt: string;
  updatedAt: string;
  active: boolean;
};
