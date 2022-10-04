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
import { ApiBearerAuth, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OrderByOption } from './enums/order-by-option.enum';
import { CreateUserSuccessResponse } from './api-responses/create-user-success-response';
import { OrderOption } from 'src/enums/order-option.enum';
import { GetUsersSuccessResponse } from './api-responses/get-users-success-response';
import { GetUserSuccessResponse } from './api-responses/get-user-success-response';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // CREATE USER
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Success', type: CreateUserSuccessResponse })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Body() createUserDto: CreateUserDto, @Req() request: Request, @Res() response: Response): Promise<void> {
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

  // GET ALL USERS
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBearerAuth()
  @ApiQuery({ name: 'pageIndex', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  @ApiQuery({ name: 'order', enum: OrderOption, required: false })
  @ApiQuery({ name: 'orderBy', enum: OrderByOption, required: false })
  @ApiResponse({ status: 200, description: 'Success', type: GetUsersSuccessResponse })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll(
    @Query('pageIndex') pageIndex: number,
    @Query('limit') limit: number,
    @Query('order') order: SortOrder,
    @Query('orderBy') orderBy: OrderByOption,
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<void> {
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

  // GET ONE USER
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Success', type: GetUserSuccessResponse })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  async findOneById(@Param('id') id: ObjectId, @Req() request: Request, @Res() response: Response): Promise<void> {
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

  // UPDATE USER
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(@Param('id') id: ObjectId, @Body() updateUserDto: UpdateUserDto, @Res() response: Response): Promise<void> {
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

  // DELETE USER
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async remove(@Param('id') id: ObjectId, @Res() response: Response): Promise<void> {
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
