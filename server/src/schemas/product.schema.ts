import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

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
export class Product {
  @Prop({
    required: true,
  })
  @ApiProperty()
  productName: string;

  @Prop({
    required: true,
    unique: true,
  })
  @ApiProperty()
  productNumber: number;

  @Prop({
    required: true,
  })
  @ApiProperty()
  price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
