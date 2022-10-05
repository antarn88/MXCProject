import { ApiProperty } from '@nestjs/swagger';

import { ProductListDto } from '../dto/product-list.dto';

export class GetProductsSuccessResponse {
  @ApiProperty({ type: [ProductListDto] })
  results: ProductListDto[];

  @ApiProperty()
  resultsLength: number;
}
