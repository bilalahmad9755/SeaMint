import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CollectionController } from './collection/collection.controller';
import { CollectionService } from './collection/collection.service';
import { Access, AccessControlModule } from 'nest-access-control';
import {
  Collection,
  CollectionSchema,
} from './collection/schemas/collection.schema';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { NFTModule } from './nft/nft.module';
import { NftController } from './nft/nft.controller';
import { NftService } from './nft/nft.service';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { StripeModule } from './stripe/stripe.module';
import { StripeController } from './stripe/stripe.controller';
import { StripeService } from './stripe/stripe.service';
import { roles } from './user/user.role';
import { ProductsController } from './products/products.controller';
import { ProductsModule } from './products/products.module';
import { ProductsService } from './products/products.service';
import { Product, ProductSchema } from './products/schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://seamint-db:27017/seaMint'),
    MongooseModule.forFeature([
      { name: Collection.name, schema: CollectionSchema },{name: Product.name, schema: ProductSchema}
    ]),
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    NFTModule,
    StripeModule,
    AccessControlModule.forRoles(roles),
    PassportModule.register({
      session: true,
    }),
    StripeModule,
    ProductsModule,
  ],
  controllers: [
    AppController,
    CollectionController,
    AuthController,
    NftController,
    StripeController,
    ProductsController,
  ],
  providers: [
    AppService,
    CollectionService,
    AuthService,
    JwtService,
    NftService,
    StripeService,
    ProductsService
  ],
})
export class AppModule {}
