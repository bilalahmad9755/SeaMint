import { Body, Controller, Get, Post } from '@nestjs/common';
import { NftService } from './nft.service';
import { AddAuctionDto } from './dto/add-auction';
import { NFT } from './schemas/nft.schema';
@Controller('nft')
export class NftController {
  constructor(private readonly nftService: NftService) {}
  // post-addAuction
  // get-biding list of NFT
  // get-Nft data

  @Post('auction')
  async addAuction(@Body() addAuctionDto: AddAuctionDto): Promise<any> {
    return await this.nftService.addAuction(addAuctionDto);
  }
}
