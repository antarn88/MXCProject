import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

import { PASSWORD_VALIDATION_MSG, PASSWORD_VALIDATION_PATTERN } from 'src/app.utils';

export class UserListDto {
  @IsNotEmpty()
  @ApiProperty()
  id: string;

  @IsNotEmpty()
  @ApiProperty()
  lastname: string;

  @IsNotEmpty()
  @ApiProperty()
  firstname: string;

  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @Matches(PASSWORD_VALIDATION_PATTERN, PASSWORD_VALIDATION_MSG)
  @MinLength(4)
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @ApiProperty()
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  createdAt: string;
}
