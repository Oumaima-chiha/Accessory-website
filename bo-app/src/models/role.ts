import type { PERMISSIONS_CODES } from 'interfaces';

export declare type IRole = {
  id: number;
  name: string;
  permissions: IPermission[];
};

export declare type ICategory = {
  id: number;
  name: string;
  permissions: IPermission[];
};

export declare type IPermission = {
  id: number;
  name: string;
  code: PERMISSIONS_CODES;
  categoryId: number;
};
