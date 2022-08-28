import { IUser } from '../users/user.interface';

export interface IUserEditorModalProps {
  incomingUser: IUser | null;
  isLoading: boolean;
  outputEvent: (user: IUser) => void;
}
