import type { ContentApprovalResponse } from 'interfaces';

export declare type IFaq = ContentApprovalResponse & {
  id: number;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  faqCategory: IFaqCategory;
  updatedAt: Date;
  createdAt: Date;
  active: boolean;
};

export declare type IFaqCategory = {
  id: number;
  titleAr: string;
  titleEn: string;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};
