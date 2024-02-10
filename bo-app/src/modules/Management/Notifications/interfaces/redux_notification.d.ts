import type { INotification } from 'models';
import type { NotificationsFiltersPayload } from './filters';

declare namespace IReduxNotification {
  export interface InitialState {
    list: INotification[];
    filters: NotificationsFiltersPayload;
  }

  export interface CreateNotificationPayload {
    titleAr: string;
    titleEn: string;
    descriptionAr: string;
    descriptionEn: string;
    sendDate: string;
    image: string;
  }

  export interface UpdateNotificationPayload
    extends Partial<CreateNotificationPayload> {
    id: number;
  }
}

export { IReduxNotification };
