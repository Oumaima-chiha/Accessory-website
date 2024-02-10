import type { NotificationStatus, TargetType } from './notification';

export interface NotificationsFiltersPayload {
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  status: NotificationStatus;
  targetType: TargetType;
  startDate?: string;
  endDate?: string;
}
