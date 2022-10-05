import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult, UpdateResult } from 'mongodb';
import { Model, ObjectId, SortOrder } from 'mongoose';

import { ProductDocument } from 'src/schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { OrderByOption } from './enums/order-by-option.enum';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  async create(createProductDto: CreateProductDto): Promise<ProductDocument> {
    return new this.productModel(createProductDto).save();
  }

  async findAll(pageIndex: number, limit: number, order: SortOrder, orderBy: OrderByOption): Promise<ProductDocument[]> {
    return this.productModel
      .find()
      .collation({ locale: 'hu' })
      .sort({
        [orderBy === OrderByOption.PRODUCT_NAME ||
        orderBy === OrderByOption.PRODUCT_NUMBER ||
        orderBy === OrderByOption.PRICE ||
        orderBy === OrderByOption.CREATED_AT
          ? orderBy
          : OrderByOption.PRODUCT_NAME]: order ? order : 'asc',
      })
      .skip(pageIndex > 0 ? (pageIndex - 1) * limit : 0)
      .limit(limit || 0);
  }

  async findOneById(id: ObjectId): Promise<ProductDocument> {
    return this.productModel.findOne({ _id: id });
  }

  async update(id: ObjectId, updateProductDto: UpdateProductDto): Promise<UpdateResult> {
    return this.productModel.updateOne({ _id: id }, { $set: { ...updateProductDto } });
  }

  async remove(id: ObjectId): Promise<DeleteResult> {
    return this.productModel.deleteOne({ _id: id });
  }
}
