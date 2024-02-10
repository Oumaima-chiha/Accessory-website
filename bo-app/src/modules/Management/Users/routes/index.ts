import Loadable from 'components/Loaders/Loadable';
import { PERMISSIONS_CODES } from 'interfaces';
import { type IRoute } from 'interfaces/route';
import { lazy } from 'react';

// export lazy route
const UsersContainer = Loadable(
  lazy(async () => await import('modules/Management/Users')),
);

const UsersForm = Loadable(
  lazy(
    async () => await import('modules/Management/Users/components/UsersForm'),
  ),
);

const USER_MANAGEMENT_ROUTES: IRoute[] = [
  {
    path: 'user-management',
    element: UsersContainer,
    name: 'Users Management',
    permissions: [PERMISSIONS_CODES.USER_MANAGEMENT_VIEW_END_USERS],
    private: true,
  },
  {
    path: 'user-management/add',
    element: UsersForm,
    name: 'Users Management Add',
    permissions: [PERMISSIONS_CODES.USER_MANAGEMENT_CREATE_END_USER],
    private: true,
  },
  {
    path: 'user-management/edit',
    element: UsersForm,
    name: 'Users Management Edit',
    permissions: [PERMISSIONS_CODES.USER_MANAGEMENT_UPDATE_END_USER],
    private: true,
  },
  {
    path: 'user-management/view',
    element: UsersForm,
    name: 'Users Management View',
    permissions: [PERMISSIONS_CODES.USER_MANAGEMENT_VIEW_END_USERS],
    private: true,
  },
];

export default USER_MANAGEMENT_ROUTES;
