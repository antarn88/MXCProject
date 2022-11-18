import {IUser} from './user.interface';

export interface ILoginResponse {
  content: {
    accessToken: string | null;
    user: IUser | null;
  };
}
