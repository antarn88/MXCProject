import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  Res,
  Req,
} from '@nestjs/common';
import { ObjectId, SortOrder } from 'mongoose';
import { Request, Response } from 'express';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(
    @Query('pageIndex') pageIndex: number,
    @Query('limit') limit: number,
    @Query('order') order: SortOrder,
    @Query('orderBy') orderBy: string,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    try {
      const users = await this.usersService.findAll(
        pageIndex,
        limit,
        order,
        orderBy,
      );
      response.send({
        isSuccess: true,
        content: {
          results: users,
          resultsLength: users.length,
        },
        statusCode: response.statusCode,
        headers: request.headers,
      });
    } catch (error) {
      response.status(400).send({
        isSuccess: false,
        content: error,
        statusCode: response.statusCode,
        headers: request.headers,
      });
    }
  }

  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: ObjectId, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: ObjectId) {
    return this.usersService.remove(id);
  }
}
