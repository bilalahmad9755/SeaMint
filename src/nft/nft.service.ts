import { Injectable, HttpException } from '@nestjs/common';
import { OfferBidDto } from './dto/offer-bid';
import { CollectionService } from 'src/collection/collection.service';
import { IBid } from './bid.interface';
import { Collection } from 'mongoose';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class NftService {
  constructor(private collectionService: CollectionService) {}
  async addUserBid(
    name: string,
    owner: string,
    nftId: string,
    offerBidDto: OfferBidDto,
  ) {
    const collection = await this.collectionService.getSpecificCollection(
      name,
      owner,
    );
    console.log(collection.nft[0]);
    // const nft = await this.collectionService.getSpecificNFT(collection, nftId);
    let nft = await collection.nft.findOne({nftId}).exec();
    await this.isDuplicateBid(nft, offerBidDto.buyerAddress);

    if(collection.owner === offerBidDto.buyerAddress)
    {
      throw new HttpException("owner cannot make a bid", 500);
    }
    try {
      collection.nft
        .find((obj) => obj.id === nftId)
        .auction.bid.push(offerBidDto);
    } catch (error) {
      throw new HttpException('execution failed...', 500);
    }
    collection.items = 60;
    console.log(collection.nft[0].auction.bid);
    collection.markModified('nft');
    await collection.save();
    return true;
  }

  async getBids(name: string, owner: string, nftId: string): Promise<IBid[]> {
    const collection = await this.collectionService.getSpecificCollection(
      name,
      owner,
    );
    const bids = await collection.nft.find((obj) => obj.id === nftId).auction
      .bid;
    return bids;
  }

  async isDuplicateBid(
    nft: any,
    buyer: string,
  ): Promise<Boolean> {
    try {
      let record = nft.auction.bid.findOne({buyerAddress:buyer});
      return record !== null ? true : false;
    } catch (error) {
      throw new HttpException('duplicate bid error', 500);
    }
  }
}
