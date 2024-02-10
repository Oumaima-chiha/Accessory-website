import type { ContentApprovalResponse } from 'interfaces';

export declare type ITip = ContentApprovalResponse & {
  id: number;
  image: string;
  labelAr: string;
  labelEn: string;
  active: boolean;
};
