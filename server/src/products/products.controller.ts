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

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OrderByOption } from './enums/order-by-option.enum';
import { OrderOption } from 'src/enums/order-option.enum';
import { ProductsService } from './products.service';
import { GetProductSuccessResponse } from './api-responses/get-product-success-response';
import { GetProductsSuccessResponse } from './api-responses/get-products-success-response';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductSuccessResponse } from './api-responses/create-product-success-response';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // CREATE PRODUCT
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Success', type: CreateProductSuccessResponse })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Body() createProductDto: CreateProductDto, @Req() request: Request, @Res() response: Response): Promise<void> {
    try {
      const product = await this.productsService.create(createProductDto);

      response.status(201).send({
        isSuccess: true,
        content: product,
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

  // GET ALL PRODUCTS
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBearerAuth()
  @ApiQuery({ name: 'pageIndex', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  @ApiQuery({ name: 'order', enum: OrderOption, required: false })
  @ApiQuery({ name: 'orderBy', enum: OrderByOption, required: false })
  @ApiResponse({ status: 200, description: 'Success', type: GetProductsSuccessResponse })
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
      const products = await this.productsService.findAll(pageIndex, limit, order, orderBy);

      response.send({
        isSuccess: true,
        content: {
          results: products,
          resultsLength: products.length,
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

  // GET ONE PRODUCT
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Success', type: GetProductSuccessResponse })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  async findOneById(@Param('id') id: ObjectId, @Req() request: Request, @Res() response: Response): Promise<void> {
    try {
      const product = await this.productsService.findOneById(id);

      if (product) {
        response.send({
          isSuccess: true,
          content: product,
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

  // UPDATE PRODUCT
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(@Param('id') id: ObjectId, @Body() updateProductDto: UpdateProductDto, @Res() response: Response): Promise<void> {
    try {
      const updateResult = await this.productsService.update(id, updateProductDto);

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

  // DELETE PRODUCT
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async remove(@Param('id') id: ObjectId, @Res() response: Response): Promise<void> {
    try {
      const deleteResult = await this.productsService.remove(id);

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
