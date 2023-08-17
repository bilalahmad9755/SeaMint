import { IsNotEmpty } from 'class-validator';
import { IAuction } from 'src/nft/auction.interface';
export interface INFT {
  id: string;
  auction: IAuction;
}
export class AddCollectionDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  owner: string;

  @IsNotEmpty()
  items: string;

  @IsNotEmpty()
  date: string;

  @IsNotEmpty()
  worth: string;

  @IsNotEmpty()
  chain: string;

  @IsNotEmpty()
  category: string;

  nft: INFT[];

  @IsNotEmpty()
  description: string;
}
