export declare type INotification = {
  id: number;
  descriptionAr: string;
  descriptionEn: string;
  image: string;
  targetType: TargetType;
  status: NotificationStatus;
  titleAr: string;
  titleEn: string;
  sendDate: string;
  createdAt: string;
  updatedAt: string;
};

// type NotificationsCriteria = {
//   all_users?: boolean;
//   age: number;
//   region: string;
//   country: string;
// };

export enum TargetType {
  ALL_USERS = 'ALL',
  GUEST_USERS = 'GUEST',
  REGISTERED_USERS = 'REGISTERED',
  CUSTOM_CRITERIA = 'CUSTOM_CRITERIA',
}

export enum NotificationStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SENT = 'SENT',
}
