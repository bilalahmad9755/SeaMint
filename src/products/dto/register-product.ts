import { IsNotEmpty } from 'class-validator';
export class RegisterProductDto {
  @IsNotEmpty()
  productId: string;

  @IsNotEmpty()
  priceId: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  items: number;

  @IsNotEmpty()
  date: string;

  @IsNotEmpty()
  price: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  properties: Record<string, any>;
}
