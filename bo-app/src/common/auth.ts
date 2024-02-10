import { type IUser } from '../models';
interface InitialState {
  user: IUser;
  isAuthenticated: boolean;
  isGuest: boolean;
  refreshToken: string | null;
  expiresAt:number |null
  OS_external_id?:string
}

interface SignInWithGooglePayload {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  prompt: string;
}

interface SignInWithEmail {
  email: string;
  password: string;
}

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export type {
  InitialState as AuthInitialState,
  SignInWithGooglePayload,
  SignInWithEmail,
  AuthResponse,
};
