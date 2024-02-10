import Loadable from 'components/Loaders/Loadable';
import { PERMISSIONS_CODES } from 'interfaces';
import { type IRoute } from 'interfaces/route';
import { lazy } from 'react';

// export lazy route
const NotificationsContainer = Loadable(
  lazy(async () => await import('modules/Management/Notifications')),
);

const NotificationsForm = Loadable(
  lazy(
    async () =>
      await import(
        'modules/Management/Notifications/components/NotificationsForm'
      ),
  ),
);

const NOTIFICATION_MANAGEMENT_ROUTES: IRoute[] = [
  {
    path: 'notifications-management',
    element: NotificationsContainer,
    name: 'Notifications Management',
    permissions: [
      PERMISSIONS_CODES.NOTIFICATIONS_MANAGEMENT_VIEW_NOTIFICATIONS,
    ],
    private: true,
  },
  {
    path: 'notifications-management/push',
    element: NotificationsForm,
    name: 'Notifications Management Send',
    permissions: [
      PERMISSIONS_CODES.NOTIFICATIONS_MANAGEMENT_CREATE_NOTIFICATION,
    ],
    private: true,
  },
  {
    path: 'notifications-management/edit',
    element: NotificationsForm,
    name: 'Notifications Management Edit',
    permissions: [
      PERMISSIONS_CODES.NOTIFICATIONS_MANAGEMENT_UPDATE_NOTIFICATION,
    ],
    private: true,
  },
  {
    path: 'notifications-management/view',
    element: NotificationsForm,
    name: 'Notifications Management View',
    permissions: [
      PERMISSIONS_CODES.NOTIFICATIONS_MANAGEMENT_VIEW_NOTIFICATIONS,
    ],
    private: true,
  },
];

export default NOTIFICATION_MANAGEMENT_ROUTES;
