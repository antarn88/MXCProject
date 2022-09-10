import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  versionKey: false,
  timestamps: { createdAt: true, updatedAt: false },
  toJSON: {
    transform: (_doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
    },
  },
})
export class User {
  @Prop()
  lastname: string;

  @Prop()
  firstname: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
