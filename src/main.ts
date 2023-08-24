import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('SeaMint NFT MarketPlace...')
    .setDescription('SeaMint')
    .setVersion('1.0')
    .addTag('Nest Project...')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  /**
   * @note using global validation pipe will enable all validations on Schemas and Dtos... 
   */
  app.useGlobalPipes(new ValidationPipe({whitelist: true}));
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
