import { Controller, Post, UseGuards } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { AuthGuard } from '../auth/utils/auth.AuthGuard';
import { AdminGuard } from '../auth/utils/auth.RoleGuard';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @UseGuards(AuthGuard, AdminGuard)
  @Post('addProduct')
  async handleAddProduct() {
    //await this.stripeService.paymentSession();
    return { msg: 'product added in stripe...' };
  }

}
