import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @ApiProperty()
  productName: string;

  @IsNotEmpty()
  @ApiProperty()
  productNumber: number;

  @IsNotEmpty()
  @ApiProperty()
  price: number;
}
