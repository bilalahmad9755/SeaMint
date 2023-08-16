import { Model } from 'mongoose';
import {
  Injectable,
  HttpException,
  UseFilters,
  ExceptionFilter,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Collection } from './schemas/collection.schema';
import { AddCollectionDto } from './dto/add-collection';
import { UpdateCollectionDto } from './dto/update-collection';
import { AddAuctionDto } from 'src/nft/dto/add-auction';
import { NFT } from 'src/nft/schemas/nft.schema';
import { OfferBidDto } from 'src/nft/dto/offer-bid';

@Injectable()
export class CollectionService {
  constructor(
    @InjectModel(Collection.name) private collectionModel: Model<Collection>,
  ) {}

  async addCollection(addCollectionDto: AddCollectionDto): Promise<Collection> {
    const addedCollection = new this.collectionModel(addCollectionDto);
    return addedCollection.save();
  }

  async getCollection(): Promise<Collection[]> {
    return this.collectionModel.find().exec();
  }

  async getCollectionByName(name: string): Promise<Collection[]> {
    return this.collectionModel.find({ name }).exec();
  }

  async getSpecificCollection(name: string, owner: string): Promise<Collection>
  {
    return await this.collectionModel.findOne({name, owner}).exec();
  }

  async getSpecificNFT(collection: Collection, nftId: string): Promise<NFT>
  {
    return collection.nft.find(obj => {obj.id === nftId});
  }

  async offerBid(name:string, owner:string, nftId:string, bid: OfferBidDto):Promise<Boolean>
  {
    const collection = await this.collectionModel.findOne({name, owner}).exec();
    if(collection == null)
    {
      throw new HttpException("collection not found", 404);
    }
    try{
      collection.nft.find(obj=>{obj.id === nftId}).auction.bids.push(bid);
    }
    catch(error)
    {
      throw new HttpException(error.resposne, 500);
    }
    collection.save();
    return true;
  }

  async updateCollectionByName(
    name: string,
    updateCollectionDto: UpdateCollectionDto,
  ): Promise<Collection> {
    return this.collectionModel
      .findOneAndUpdate({ name }, updateCollectionDto, { new: true })
      .exec();
  }

  async addNft(
    name: string,
    owner: string,
    addNftDto: AddAuctionDto,
  ): Promise<Boolean> {
    const collection = await this.collectionModel
      .findOne({ name, owner })
      .exec();
    if (collection == null) {
      throw new HttpException('collection not found', 404);
    } else {
      // checking if NFT of same Id exists...
      const duplication = collection.nft.find((obj) => obj.id === addNftDto.id);
      if (duplication != null) {
        throw new HttpException('NFT duplication not allowed', 500);
      }
      collection.nft.push(addNftDto);
      collection.save();
      return true;
    }
  }
}
