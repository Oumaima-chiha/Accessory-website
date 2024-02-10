import type { IGuestInfo } from 'common';
import type { IUser } from '../../../../models/user';

export declare type IFeedback = {
  id: number;
  comment: string;
  title: string;
  answer: string | null;
  feedbackCategory: IFeedbackCategory;
  guestInfo?: IGuestInfo;
  date: string;
  user: IUser;
};
export declare type IFeedbackCategory = {
  id: number;
  nameAr: string;
  nameEn: string;
  active: boolean;
};
