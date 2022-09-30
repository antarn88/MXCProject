import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { IJwtPayload } from 'src/models/jwt-payload.interface';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser = IJwtPayload>(err: HttpException, jwtPayload: IJwtPayload): TUser {
    if (err || !jwtPayload) {
      throw (
        err ||
        new UnauthorizedException({
          isSuccess: false,
          content: {
            statusCode: 401,
            message: 'Unauthorized',
          },
          statusCode: 401,
        })
      );
    }
    return jwtPayload as TUser;
  }
}
