import type { IBOUser } from 'models';
import type { ContentApprovalTypes } from './enums/contentApprovalTypes';
import type { ContentReviewStatus } from './enums/contentReviewStatus';

export interface ContentApproval {
  type: ContentApprovalTypes;
  payload: ApproveContentPayload | DisapproveContentPayload;
}

export interface ApproveContentPayload {
  id: string;
  publishDate: string;
}

export interface DisapproveContentPayload {
  id: string;
  comment: string;
}

export interface ContentApprovalResponse {
  reviewStatus: ContentReviewStatus;
  reviewedByUser: IBOUser;
  createdByUser: IBOUser;
  publish: boolean;
  publishDate: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
}
