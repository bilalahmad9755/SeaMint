import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AddProductDto } from './dto/add-product';
import { ProductsService } from './products.service';
import { BuyProductDto } from './dto/buy-product';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/utils/auth.AuthGuard';
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}
  @Post('add')
  @UseGuards(AuthGuard)
  // user must have admin role to add product...
  async addProducts(@Body() addProductDto: AddProductDto) {
    await this.productService.addProduct(addProductDto);
    return { msg: 'product registered successfully...' };
  }

  @Post('buy')
  @UseGuards(AuthGuard)
  async buyProduct(
    @Body() buyProductDto: BuyProductDto,
    @Res() response: Response,
  ) {
    const paymentLink: string = await this.productService.buyProduct(
      buyProductDto,
    );
    console.log('payment link: ', paymentLink);
    response.redirect(paymentLink);
    return { msg: 'product Purchase Successful...' };
  }

  @Get('buy/success')
  async buySuccess() {
    return { msg: 'purchase success...' };
  }

  @Get('buy/failure')
  async buyFailed() {
    return { msg: 'purchase failed...' };
  }
}
