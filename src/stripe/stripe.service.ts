import { Injectable } from '@nestjs/common';import { BuyProductDto } from 'src/products/dto/buy-product';

const stripe = require('stripe')(
  'sk_test_51NnI2GAogJxLO5L5HGYv4RFsY1uaSvOVAN2g3VkECnc9uhSQ3woRJZ1Fn0jhgvPfrtuwxSHyb0H3rVPDuTnwoMiK00cxRlIbX2',
);
@Injectable()
export class StripeService {
  async registerProduct(name: string, price: string) {
    console.log(process.env.STRIPE_PAYMENT_KEY);
    const product = await stripe.products.create({
      name: name,
      default_price_data: {
        unit_amount: price, // 2000, 20.00
        currency: 'usd',
      },
      expand: ['default_price'],
    });
    return { productId: product.id, priceId: product.default_price.id };
  }

  async paymentSession(buyProductDto: BuyProductDto) {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: buyProductDto.priceId,
          quantity: parseInt(buyProductDto.quantity),
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3001',
      cancel_url: 'http://localhost:3001',
    });

    return session.url;
  }
}
