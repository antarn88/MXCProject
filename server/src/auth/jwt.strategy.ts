import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as dotenv from 'dotenv';

import { IDecodedToken } from 'src/models/decoded-token.interface';
import { IJwtPayload } from 'src/models/jwt-payload.interface';

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.TOKEN_SECRET_KEY,
    });
  }

  async validate(payload: IDecodedToken): Promise<IJwtPayload> {
    return { id: payload.sub, username: payload.username };
  }
}
