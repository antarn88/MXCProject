import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';

import { AuthService } from './auth.service';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<User> {
    const encodedUsername = encodeURIComponent(username);
    const encodedPassword = encodeURIComponent(password);
    const user = await this.authService.validateUser(encodedUsername, encodedPassword);

    if (!user) {
      throw new ForbiddenException({
        isSuccess: false,
        content: {
          statusCode: 403,
          message: 'Incorrect username or password.',
        },
        statusCode: 403,
      });
    }

    return user;
  }
}
