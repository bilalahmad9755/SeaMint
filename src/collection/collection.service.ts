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
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

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

  async getSpecificCollection(name: string, owner: string): Promise<any> {
    const collection = await this.collectionModel.findOne({ name, owner }).exec();
    if (collection === null || collection === undefined) {
      throw new HttpException('collection not Exists...', 500);
    } else {
      return collection;
    }
  }

  async getSpecificNFT(collection: any, nftId: string): Promise<any> {
    console.log(collection);
    const nft = await collection.find({nftId}).exec();
    console.log("nft found: ", nft);
    if (nft === undefined || nft === null) {
      throw new HttpException('NFT not exists', 500);
    }
    else
    {
      return nft;
    }
  }

  // async offerBid(name:string, owner:string, nftId:string, bid: OfferBidDto):Promise<Boolean>
  // {
  //   const collection = await this.getSpecificCollection(name, owner);
  //   if(collection == null)
  //   {
  //     throw new HttpException("collection not found", 404);
  //   }
  //   try{
  //     collection.nft.find(obj=>{obj.id === nftId}).auction.bids.push(bid);
  //   }
  //   catch(error)
  //   {
  //     throw new HttpException("NFT not found...", 404);
  //   }
  //   collection.save();
  //   return true;
  // }

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
