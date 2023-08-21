import { Injectable, HttpException } from '@nestjs/common';
import { OfferBidDto } from './dto/offer-bid';
import { CollectionService } from 'src/collection/collection.service';
import { IBid } from './bid.interface';

@Injectable()
export class NftService {
  constructor(private collectionService: CollectionService) {}
  async addUserBid(
    name: string,
    owner: string,
    nftId: string,
    offerBidDto: OfferBidDto,
  ) {
    // owner cannot offer a bid...
    if(owner === offerBidDto.buyerAddress)
    {
      throw new HttpException("owner cannot make a bid", 500);
    }
    const collection = await this.collectionService.getCollectionByNft(name, owner, nftId);
    const duplication = collection.nft[0].auction.bid.find(obj => obj.buyerAddress === offerBidDto.buyerAddress);
    if(duplication !== undefined)
    {
      throw new HttpException("duplication bid found", 500);
    }
    else
    {
      if(parseInt(collection.nft[0].auction.price) > parseInt(offerBidDto.price))
      {
        throw new HttpException("bid price less than auction", 500);
      }
      else
      {
        collection.nft[0].auction.bid.push(offerBidDto);
      }
    }
    collection.markModified('nft');
    collection.save();

    console.log(collection.nft[0].auction);
    return true;
  }
}
