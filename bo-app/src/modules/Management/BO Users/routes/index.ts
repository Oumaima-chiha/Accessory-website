import Loadable from 'components/Loaders/Loadable';
import { PERMISSIONS_CODES } from 'interfaces';
import { type IRoute } from 'interfaces/route';
import { lazy } from 'react';

// export lazy route
const BOUsersContainer = Loadable(
  lazy(async () => await import('modules/Management/BO Users')),
);

const BOUsersForm = Loadable(
  lazy(
    async () =>
      await import('modules/Management/BO Users/components/BOUsersForm'),
  ),
);

const BO_USER_MANAGEMENT_ROUTES: IRoute[] = [
  {
    path: 'bo-user-management',
    element: BOUsersContainer,
    name: 'BOUsers Management',
    permissions: [PERMISSIONS_CODES.BO_USER_MANAGEMENT_VIEW_BO_USER],
    private: true,
  },
  {
    path: 'bo-user-management/add',
    element: BOUsersForm,
    name: 'BOUsers Management Add',
    permissions: [PERMISSIONS_CODES.BO_USER_MANAGEMENT_CREATE_BO_USER],

    private: true,
  },
  {
    path: 'bo-user-management/edit',
    element: BOUsersForm,
    name: 'BOUsers Management Edit',
    permissions: [PERMISSIONS_CODES.BO_USER_MANAGEMENT_UPDATE_BO_USER],
    private: true,
  },
  {
    path: 'bo-user-management/view',
    element: BOUsersForm,
    name: 'BOUsers Management View',
    permissions: [PERMISSIONS_CODES.BO_USER_MANAGEMENT_VIEW_BO_USER],

    private: true,
  },
];

export default BO_USER_MANAGEMENT_ROUTES;
