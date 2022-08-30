import { IUser } from '../users/user.interface';

export interface IUserEditorModalProps {
  incomingUser: IUser | null;
  isLoading: boolean;
  updateUserOutputEvent: (user: IUser) => void;
  createUserOutputEvent: (user: IUser) => void;
}
