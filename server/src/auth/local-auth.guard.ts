import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  handleRequest<TUser = UserDocument>(err: HttpException, user: UserDocument): TUser {
    if (!user) {
      throw (
        err ||
        new BadRequestException({
          isSuccess: false,
          content: {
            statusCode: 400,
            message: 'Missing username or password.',
          },
          statusCode: 400,
        })
      );
    }
    return user as TUser;
  }
}
