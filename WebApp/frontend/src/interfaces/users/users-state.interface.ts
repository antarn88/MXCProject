import { IUserError } from './user-error.interface';
import { IUser } from './user.interface';

export interface IUsersState {
  user: IUser | null;
  users: IUser[];
  isLoading: boolean;
  error: IUserError;
}
