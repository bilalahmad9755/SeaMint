import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as connectMongo from 'connect-mongodb-session';
import passport = require('passport');
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions: CorsOptions = 
    {
      origin: "http://localhost:3001",
      credentials: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept'
    };
    app.enableCors(corsOptions);
  const config = new DocumentBuilder()
    .setTitle('SeaMint NFT MarketPlace...')
    .setDescription('SeaMint')
    .setVersion('1.0')
    .addTag('Nest Project...')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
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
  const MongoDBStore = connectMongo(session);
  app.use(
    session({
      name: 'session',
      secret: process.env.SESSION_SECRET_KEY,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 3000000,
      },
      store: new MongoDBStore({
        uri: 'mongodb://seamint-db:27017/seaMint', // Replace with your MongoDB connection URI
        collection: 'session', // Specify the name of the collection to store sessions in
      }),
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000);
}
bootstrap();
