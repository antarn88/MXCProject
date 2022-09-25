import { IsNotEmpty, Matches, IsEmail, MinLength } from 'class-validator';

import { PASSWORD_VALIDATION_PATTERN, PASSWORD_VALIDATION_MSG } from 'src/app.utils';

export class UpdateUserDto {
  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @Matches(PASSWORD_VALIDATION_PATTERN, PASSWORD_VALIDATION_MSG)
  @MinLength(4)
  password: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
