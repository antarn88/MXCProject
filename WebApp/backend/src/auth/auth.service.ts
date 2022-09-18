import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);

    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(pass, user.password);

    if (user && isMatch) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user.toJSON();
      return result;
    }

    return null;
  }

  async login(user: any, headers: any) {
    const payload = { username: user.username, sub: user.id };
    const response = {
      isSuccess: true,
      content: {
        accessToken: this.jwtService.sign(payload),
        user,
      },
      statusCode: 201,
      headers,
    };
    return response;
  }
}
