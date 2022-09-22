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

  async validateUser(username: string, pass: string) {
    const user = await this.usersService.findByUsername(username);

    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(pass, user.password);

    if (user && isMatch) {
      const result = { ...user.toJSON() };
      delete result.password;
      return result;
    }

    return null;
  }

  async login(user, headers) {
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
