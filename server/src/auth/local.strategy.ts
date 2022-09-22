import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';

import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string) {
    const user = await this.authService.validateUser(username, password);

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
