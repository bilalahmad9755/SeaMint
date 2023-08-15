import { IsNotEmpty } from 'class-validator';
import { IAuction } from '../auction.interface';
export class AddAuctionDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  metadata: Record<string, any>

  @IsNotEmpty()
  auction: IAuction;
}
