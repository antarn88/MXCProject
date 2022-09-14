import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @Matches(
    /^(?=[^a-zíáéüűúöőó]*[a-zíáéüűúöőó])(?=[^A-ZÍÁÉÜŰÚÖŐÓ]*[A-ZÍÁÉÜŰÚÖŐÓ]).{2,}$/,
    {
      message:
        'password must contain at least 1 lowercase and 1 uppercase letter',
    },
  )
  password: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
