import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  handleRequest<UserDocument>(err: HttpException, user: UserDocument): UserDocument {
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
    return user;
  }
}
