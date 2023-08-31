import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport-google-oauth20';

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
   * setting whitelist means extra fields in DTO will be excluded...
   */
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  /**
   * @note using cookie parser for authentication...
   */
  app.use(cookieParser());

  /**
   * @note default url to swagger API
   */

  app.setGlobalPrefix('api');

  app.use(
    session({
      name: "NEST_SESSION_ID",
      secret: process.env.SESSION_SECRET_KEY,
      resave: false,
      saveUninitialized: false,
      secure: true,
      cookie: {
        maxAge: 60000,
      },
    }),
  );

  await app.listen(3000);
}
bootstrap();
