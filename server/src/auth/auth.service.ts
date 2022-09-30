import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IncomingHttpHeaders } from 'http';

import { ApiResponse } from 'src/models/api-response';
import { ILoginContent } from 'src/models/login-content.interface';
import { User, UserDocument } from 'src/schemas/user.schema';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.usersService.findOneByUsername(username);

    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(pass, user.password);

    if (user && isMatch) {
      const result = { ...user.toJSON() } as User;
      delete result.password;
      return result;
    }

    return null;
  }

  async login(user: UserDocument, headers: IncomingHttpHeaders): Promise<ApiResponse<ILoginContent>> {
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
