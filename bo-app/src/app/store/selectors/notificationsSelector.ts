import type {
  INotification,
  NotificationsFiltersPayload,
} from 'modules/Management/Notifications/interfaces';
import type { IRootState } from '..';

export const selectNotifications = (state: IRootState): INotification[] =>
  state.notifications.list;
export const selectNotificationsFilters = (
  state: IRootState,
): NotificationsFiltersPayload => state.notifications.filters;
