import { PERMISSIONS_CODES } from 'interfaces';
import type { ICategory, IPermission, IRole } from 'models';

export const permissions: IPermission[] = [
  {
    id: 1,
    name: 'Permission 1',
    code: PERMISSIONS_CODES.BO_USER_MANAGEMENT_CREATE_BO_USER,
    categoryId: 1,
  },
  {
    id: 2,
    name: 'Permission 1',
    code: PERMISSIONS_CODES.FAQ_MANAGEMENT_CREATE_FAQ,
    categoryId: 2,
  },
  {
    id: 3,
    name: 'Permission 2',
    code: PERMISSIONS_CODES.FAQ_MANAGEMENT_UPDATE_FAQ,
    categoryId: 3,
  },
  {
    id: 4,
    name: 'Permission 3',
    code: PERMISSIONS_CODES.FAQ_MANAGEMENT_DELETE_FAQ,
    categoryId: 3,
  },
  {
    id: 5,
    name: 'Permission 4',
    code: PERMISSIONS_CODES.FEEDBACK_MANAGEMENT_ANSWER_USER_FEEDBACK,
    categoryId: 3,
  },
  {
    id: 6,
    name: 'Permission 4',
    code: PERMISSIONS_CODES.BO_USER_MANAGEMENT_VIEW_BO_USER,
    categoryId: 4,
  },
];

export const categories: ICategory[] = [
  {
    id: 1,
    name: 'User Management',
    permissions: permissions.filter(permission => permission.categoryId === 1),
  },
  {
    id: 2,
    name: 'FAQ Management',
    permissions: permissions.filter(permission => permission.categoryId === 2),
  },
  {
    id: 3,
    name: 'BO Users Management',
    permissions: permissions.filter(permission => permission.categoryId === 3),
  },
  {
    id: 4,
    name: 'FAQ Management',
    permissions: permissions.filter(permission => permission.categoryId === 4),
  },
];

const roles: IRole[] = [
  { id: 1, name: 'Admin', permissions: permissions },
  { id: 2, name: 'Manager', permissions: permissions },
  { id: 3, name: 'Supervisor', permissions: permissions },
];

export default roles;
