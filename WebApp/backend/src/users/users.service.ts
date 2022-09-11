import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, SortOrder } from 'mongoose';

import { UserDocument } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return new this.userModel(createUserDto).save();
  }

  async findAll(
    pageIndex: number,
    limit: number,
    order: SortOrder,
    orderBy: string,
  ) {
    return this.userModel
      .find()
      .collation({ locale: 'hu' })
      .sort({
        [orderBy === 'firstname' || orderBy === 'createdAt'
          ? orderBy
          : 'firstname']: order ? order : 'asc',
      })
      .skip(pageIndex > 0 ? (pageIndex - 1) * limit : 0)
      .limit(limit || 0);
  }

  async findOne(id: ObjectId) {
    return this.userModel.findById(id);
  }

  async update(id: ObjectId, updateUserDto: UpdateUserDto) {
    return this.userModel.updateOne(
      { _id: id },
      { $set: { ...updateUserDto } },
    );
  }

  async remove(id: ObjectId) {
    return this.userModel.deleteOne({ _id: id });
  }
}
