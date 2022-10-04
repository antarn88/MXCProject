import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { LoggedUserDto } from '../dto/logged-user.dto';

export class LoginSuccessResponse {
  @IsNotEmpty()
  @ApiProperty()
  accessToken: string;

  @IsNotEmpty()
  @ApiProperty()
  user: LoggedUserDto;
}
