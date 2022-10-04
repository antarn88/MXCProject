import { ApiProperty } from '@nestjs/swagger';

import { UserListDto } from '../dto/user-list.dto';

export class GetUsersSuccessResponse {
  @ApiProperty({ type: [UserListDto] })
  results: UserListDto[];

  @ApiProperty()
  resultsLength: number;
}
