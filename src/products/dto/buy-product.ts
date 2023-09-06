import { IsNotEmpty } from 'class-validator';
export class BuyProductDto {
  @IsNotEmpty()
  priceId: string;

  @IsNotEmpty()
  quantity: string;
}
