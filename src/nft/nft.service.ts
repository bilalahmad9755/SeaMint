import { Injectable } from '@nestjs/common';
import { OfferBidDto } from './dto/offer-bid';
import { CollectionService } from 'src/collection/collection.service';

@Injectable()
export class NftService {
  
  constructor(private collectionService: CollectionService) {}
  async addUserBid(name: string, owner: string, nftId: string, offerBidDto: OfferBidDto)
  {
    return await this.collectionService.offerBid(name, owner, nftId, offerBidDto);
  }
}
