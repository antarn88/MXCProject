import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProductSuccessResponse {
  @IsNotEmpty()
  @ApiProperty()
  id: string;

  @IsNotEmpty()
  @ApiProperty()
  productName: string;

  @IsNotEmpty()
  @ApiProperty()
  productNumber: number;

  @IsNotEmpty()
  @ApiProperty()
  price: number;

  @IsNotEmpty()
  @ApiProperty()
  createdAt: string;
}
