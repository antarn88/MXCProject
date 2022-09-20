import { IUser } from '../users/user.interface';

export interface ILoginResponse {
  content: {
    accessToken: string | null;
    user: IUser | null;
  };
}
