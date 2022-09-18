import * as dotenv from 'dotenv';

dotenv.config();

// TODO van értelme ezt kiszervezni?
export const jwtConstants = {
  secret: process.env.TOKEN_SECRET_KEY || 'THIS_IS_A_SECRET_KEY',
  tokenExpirationTime: process.env.TOKEN_EXPIRATION_TIME || '1d',
};
