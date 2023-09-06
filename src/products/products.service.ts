import { Injectable } from '@nestjs/common';
import { Product } from './schemas/product.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AddProductDto } from './dto/add-product';
import { StripeService } from 'src/stripe/stripe.service';
import { RegisterProductDto } from './dto/register-product';
import { BuyProductDto } from './dto/buy-product';
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private stripeService: StripeService,
  ) {}

  async addProduct(addProductDto: AddProductDto) {
    const product = await this.stripeService.registerProduct(
      addProductDto.name,
      addProductDto.price,
    );

    const registeredProduct: RegisterProductDto = {
      ...addProductDto,
      productId: product.productId,
      priceId: product.priceId,
    };
    const newProduct = new this.productModel(registeredProduct);
    newProduct.save();
  }

  async buyProduct(buyProductDto: BuyProductDto) {
    // creating session first then redirect to checkout url...
    return await this.stripeService.paymentSession(
      buyProductDto.priceId,
      buyProductDto.quantity,
    );
  }
}
