import type { ContentApprovalResponse } from 'interfaces';

export declare type ITermsConditions = ContentApprovalResponse & {
  id: number;
  titleAr: string;
  titleEn: string;
  contentAr: string;
  contentEn: string;
  active: boolean;
};
export declare type IPrivacyPolicy = ITermsConditions;
