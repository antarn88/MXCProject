import { ApiProperty } from '@nestjs/swagger';

export class LoginData {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
