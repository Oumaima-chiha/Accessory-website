import type { IBOUser } from 'models';

declare namespace IReduxAuth {
  export interface InitialState {
    user: IBOUser;
    isAuthenticated: boolean;
    refreshToken: string | null;
  }

  export interface LoginPayload {
    username: string;
    password: string;
  }

  export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
  }

  export interface ChangePasswordPayload {
    id: number;
    password: string;
  }
}

export { IReduxAuth };
