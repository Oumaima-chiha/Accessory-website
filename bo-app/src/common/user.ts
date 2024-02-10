import { type IUser } from '../models';

interface ICreateUserPayload {
  id: number;
  name: string;
  job: string;
}

interface IInitialState {
  users: IUser[];
}

export type { ICreateUserPayload, IInitialState as UserInitialState };
