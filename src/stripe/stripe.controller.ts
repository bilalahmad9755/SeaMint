import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { Response } from 'express';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('addProduct')
  async handleAddProduct() {
    //await this.stripeService.paymentSession();
    return { msg: 'product added in stripe...' };
  }

}
