import { ObjectId } from 'mongodb';

export interface IJwtPayload {
  id: ObjectId;
  username: string;
}
