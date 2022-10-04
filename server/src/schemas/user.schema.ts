import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  lastname: string;

  @Prop({
    required: true,
  })
  @ApiProperty()
  firstname: string;

  @Prop({
    required: true,
    unique: true,
  })
  @ApiProperty()
  username: string;

  @Prop({
    required: true,
  })
  @ApiProperty()
  password: string;

  @Prop({
    required: true,
  })
  @ApiProperty()
  phone: string;

  @Prop({
    required: true,
    unique: true,
  })
  @ApiProperty()
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
