import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, jwtPayload) {
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
    return jwtPayload;
  }
}
