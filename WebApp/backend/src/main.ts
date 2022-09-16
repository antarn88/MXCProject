import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as morgan from 'morgan';

import { AppModule } from './app.module';
import { GLOBAL_VALIDATION_PIPE } from './app.utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalPipes(GLOBAL_VALIDATION_PIPE);
  app.use(morgan('tiny'));

  const config = new DocumentBuilder()
    .setTitle('MXC Project - WebApp API')
    .setDescription('MXC Project - WebApp API swagger documentation')
    .addTag('users')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs/swagger', app, document);

  await app.listen(5000);
}
bootstrap();
