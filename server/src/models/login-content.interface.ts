import { UserDocument } from 'src/schemas/user.schema';

export interface ILoginContent {
  accessToken: string;
  user: UserDocument;
}
