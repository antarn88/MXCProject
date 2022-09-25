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
  UseGuards,
} from '@nestjs/common';
import { ObjectId, SortOrder } from 'mongoose';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Req() request: Request, @Res() response: Response) {
    try {
      const salt = await bcrypt.genSalt();
      const encryptedPassword = await bcrypt.hash(createUserDto.password, salt);
      createUserDto.password = encryptedPassword;

      const user = await this.usersService.create(createUserDto);

      response.status(201).send({
        isSuccess: true,
        content: user,
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

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Query('pageIndex') pageIndex: number,
    @Query('limit') limit: number,
    @Query('order') order: SortOrder,
    @Query('orderBy') orderBy: 'firstname' | 'createdAt', // TODO kiszervezni, és lekezelni
    @Req() request: Request,
    @Res() response: Response,
  ) {
    try {
      const users = await this.usersService.findAll(pageIndex, limit, order, orderBy);

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

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOneById(@Param('id') id: ObjectId, @Req() request: Request, @Res() response: Response) {
    try {
      const user = await this.usersService.findOneById(id);

      if (user) {
        const userObj = user.toJSON();
        delete userObj.password;

        response.send({
          isSuccess: true,
          content: userObj,
          statusCode: response.statusCode,
          headers: request.headers,
        });
      } else {
        response.status(404).send({
          isSuccess: false,
          statusCode: response.statusCode,
        });
      }
    } catch (error) {
      response.status(400).send({
        isSuccess: false,
        content: error,
        statusCode: response.statusCode,
        headers: request.headers,
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: ObjectId, @Body() updateUserDto: UpdateUserDto, @Res() response: Response) {
    try {
      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash(updateUserDto.password, salt);
      const updateResult = await this.usersService.update(id, { ...updateUserDto, password });

      if (updateResult.matchedCount) {
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

  @UseGuards(JwtAuthGuard)
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
