import { Controller, Get, Post } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('addProduct')
  async handleAddProduct() {
    //await this.stripeService.paymentSession();
    return { msg: 'product added in stripe...' };
  }

}
