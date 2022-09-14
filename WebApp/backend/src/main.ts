import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { GLOBAL_VALIDATION_PIPE } from './app.utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(GLOBAL_VALIDATION_PIPE);

  await app.listen(5000);
}
bootstrap();
