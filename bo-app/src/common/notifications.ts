import { NotificationType } from "./enums/notificationType";

interface InitialState {
  list: INotification[];
  currentPage: number;
  PushSubscriptionInfo?: PushSubscriptionState;
}
interface INotification {
  id: number;
  title: string;
  description: string;
  image?: string;
  seenOn: string | null;
  type: NotificationType;
  targetEntityId: number | null;
  createdAt: string;
  updatedAt: string;
}

interface PushSubscriptionState {
  id: string;
  token: string;
  optedIn: boolean;
}

interface TotalUnreadNotificationsResponse {
  count: number;
}

interface MarkNotifAsReadPayload {
  notifId: number;
  currentPage?: number;
  size?: number;
}

export type {
  InitialState as NotificationsInitialState,
  INotification,
  MarkNotifAsReadPayload,
  TotalUnreadNotificationsResponse,
  PushSubscriptionState,
};
