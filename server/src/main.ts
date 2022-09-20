import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as morgan from 'morgan';
import * as dotenv from 'dotenv';

import { AppModule } from './app.module';
import { GLOBAL_VALIDATION_PIPE } from './app.utils';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.setGlobalPrefix('api');
  app.use(morgan(process.env.MORGAN_FORMAT || 'tiny'));
  app.useGlobalPipes(GLOBAL_VALIDATION_PIPE);

  // Swagger section
  const config = new DocumentBuilder()
    .setTitle(process.env.SWAGGER_TITLE)
    .setDescription(process.env.SWAGGER_DESCRIPTION)
    .setVersion(process.env.SWAGGER_VERSION)
    .addTag('auth')
    .addTag('users')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(process.env.SWAGGER_ENDPOINT, app, document);

  await app.listen(process.env.PORT || 5000);
}
bootstrap();