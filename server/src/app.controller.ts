import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { ApiResponse } from './models/api-response';
import { ILoginContent } from './models/login-content.interface';
import { UserDocument } from './schemas/user.schema';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Req() request: Request): Promise<ApiResponse<ILoginContent>> {
    return this.authService.login(request.user as UserDocument, request.headers);
  }
}
