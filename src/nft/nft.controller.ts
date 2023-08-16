import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { NftService } from './nft.service';
import { OfferBidDto } from './dto/offer-bid';
@Controller('nft')
export class NftController {
  constructor(private readonly nftService: NftService) {}
  // post-addAuction
  // get-biding list of NFT
  // get-Nft data

  @Post('offerBid')
  async offerBid(@Body() offerBidDto: OfferBidDto,
  @Query('name') name: string,
  @Query('nftId') nftId: string,
  @Query('owner') owner: string)
  {
    await this.nftService.addUserBid(name, owner, nftId,  offerBidDto);
  }
}
