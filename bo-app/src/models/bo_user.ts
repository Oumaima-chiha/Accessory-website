import type { IRole } from './role';

export declare type IBOUser = {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  email: string;
  role: IRole;
  roleId: number;
  active: boolean;
};
