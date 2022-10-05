import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateProductDto {
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
