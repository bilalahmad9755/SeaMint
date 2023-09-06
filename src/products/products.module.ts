import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { StripeModule } from 'src/stripe/stripe.module';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Product.name, schema: ProductSchema },
  ]),
StripeModule],
  providers: [ProductsService],
  controllers: [ProductsController]
})
export class ProductsModule {}
