import { IUser } from '../users/user.interface';

export interface ILoginResponse {
  accessToken: string | null;
  user: IUser | null;
}
