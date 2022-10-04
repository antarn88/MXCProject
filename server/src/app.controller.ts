import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { ApiResponse as MyApiResponse } from './models/api-response';
import { ILoginContent } from './models/login-content.interface';
import { UserDocument } from './schemas/user.schema';
import { LoginSuccessResponse } from './users/api-responses/login-success-response';
import { LoginData } from './users/dto/login-data.dto';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiTags('Auth')
  @ApiBody({ type: LoginData })
  @ApiResponse({ status: 201, description: 'Success', type: LoginSuccessResponse })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async login(@Req() request: Request): Promise<MyApiResponse<ILoginContent>> {
    return this.authService.login(request.user as UserDocument, request.headers);
  }
}
