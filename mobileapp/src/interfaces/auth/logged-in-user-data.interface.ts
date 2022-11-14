import { IUser } from '../users/user.interface';

export interface ILoggedInUserData {
  accessToken: string;
  user: IUser | null;
}
