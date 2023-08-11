import { IsNotEmpty } from 'class-validator';
import { IAuction } from '../auction.interface';
export class AddAuctionDto
{
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    auction: IAuction
}