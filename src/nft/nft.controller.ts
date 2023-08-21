import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { NftService } from './nft.service';
import { OfferBidDto } from './dto/offer-bid';
import { Response } from 'express';
@Controller('nft')
export class NftController {
  constructor(private readonly nftService: NftService) {}
  // post-addAuction
  // get-biding list of NFT
  // get-Nft data

  @Post('offerBid')
  async offerBid(
    @Body() offerBidDto: OfferBidDto,
    @Query('name') name: string,
    @Query('nftId') nftId: string,
    @Query('owner') owner: string,
    @Res() rspns: Response,
  ) {
    await this.nftService.addUserBid(name, owner, nftId, offerBidDto);
    return rspns.status(201).json({ message: 'bid offered!' });
  }
}
