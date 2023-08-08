import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CollectionController } from './collection/collection.controller';
import { CollectionService } from './collection/collection.service';
import {
  Collection,
  CollectionSchema,
} from './collection/schemas/collection.schema';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/seaMint'),
    MongooseModule.forFeature([
      { name: Collection.name, schema: CollectionSchema },
    ]),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController, CollectionController, AuthController],
  providers: [AppService, CollectionService, AuthService, JwtService],
})
export class AppModule {}
