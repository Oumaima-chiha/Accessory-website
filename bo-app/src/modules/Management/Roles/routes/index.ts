import Loadable from 'components/Loaders/Loadable';
import { PERMISSIONS_CODES } from 'interfaces';
import { type IRoute } from 'interfaces/route';
import { lazy } from 'react';

// export lazy route
const RolesContainer = Loadable(
  lazy(async () => await import('modules/Management/Roles')),
);

const RolesForm = Loadable(
  lazy(
    async () => await import('modules/Management/Roles/components/RolesForm'),
  ),
);

const ROLE_MANAGEMENT_ROUTES: IRoute[] = [
  {
    path: 'role-management',
    element: RolesContainer,
    name: 'Role Management',
    permissions: [PERMISSIONS_CODES.ROLE_MANAGEMENT_VIEW_ROLES],
    private: true,
  },
  {
    path: 'role-management/add',
    element: RolesForm,
    name: 'Role Management Add',
    permissions: [PERMISSIONS_CODES.ROLE_MANAGEMENT_CREATE_ROLE],
    private: true,
  },
  {
    path: 'role-management/edit',
    element: RolesForm,
    name: 'Role Management Edit',
    permissions: [PERMISSIONS_CODES.ROLE_MANAGEMENT_UPDATE_ROLE],
    private: true,
  },
  {
    path: 'role-management/view',
    element: RolesForm,
    name: 'Role Management View',
    permissions: [PERMISSIONS_CODES.ROLE_MANAGEMENT_VIEW_ROLES],
    private: true,
  },
];

export default ROLE_MANAGEMENT_ROUTES;
