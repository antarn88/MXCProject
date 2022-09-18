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
  @Prop({
    required: true,
  })
  lastname: string;

  @Prop({
    required: true,
  })
  firstname: string;

  @Prop({
    required: true,
    unique: true,
  })
  username: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    required: true,
  })
  phone: string;

  @Prop({
    required: true,
    unique: true,
  })
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
