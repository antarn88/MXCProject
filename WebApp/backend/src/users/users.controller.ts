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
  HttpException,
  HttpStatus,
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
  async create(
    @Body() createUserDto: CreateUserDto,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    try {
      const user = await this.usersService.create(createUserDto);
      response.status(201).send({
        isSuccess: true,
        content: { userId: user.id },
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
  async findOne(
    @Param('id') id: ObjectId,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    try {
      const user = await this.usersService.findOne(id);
      if (user.id) {
        response.status(200).send({
          isSuccess: true,
          content: user,
          statusCode: response.statusCode,
          headers: request.headers,
        });
      }
    } catch (error) {
      response.status(400).send({
        isSuccess: false,
        statusCode: response.statusCode,
      });
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: ObjectId,
    @Body() updateUserDto: UpdateUserDto,
    @Res() response: Response,
  ) {
    try {
      await this.usersService.update(id, updateUserDto);
      response.status(200).send({
        isSuccess: true,
        statusCode: response.statusCode,
      });
    } catch (error) {
      response.status(400).send({
        isSuccess: false,
        statusCode: response.statusCode,
      });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: ObjectId, @Res() response: Response) {
    try {
      const deleteResult = await this.usersService.remove(id);
      if (deleteResult.deletedCount) {
        response.status(200).send({
          isSuccess: true,
          statusCode: response.statusCode,
        });
      } else {
        throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      response.status(400).send({
        isSuccess: false,
        statusCode: response.statusCode,
      });
    }
  }
}
