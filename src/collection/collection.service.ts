import { Model } from 'mongoose';
import {
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Collection } from './schemas/collection.schema';
import { AddCollectionDto } from './dto/add-collection';
import { UpdateCollectionDto } from './dto/update-collection';
import { AddAuctionDto } from 'src/nft/dto/add-auction';

@Injectable()
export class CollectionService {
  constructor(
    @InjectModel(Collection.name) private collectionModel: Model<Collection>,
  ) {}

  async addCollection(addCollectionDto: AddCollectionDto): Promise<Collection> {
    // same owner with same collection name should not exists twice...
    const duplicateCollection = await this.collectionModel.findOne({walletAddress: addCollectionDto.walletAddress, owner: addCollectionDto.owner});
    if(duplicateCollection !== null)
    {
      throw new HttpException("Same Collection Already Exists", HttpStatus.BAD_REQUEST);
    }
    const addedCollection = new this.collectionModel(addCollectionDto);
    return addedCollection.save();
  }

  async getCollection(): Promise<Collection[]> {
    return this.collectionModel.find().exec();
  }

  async getCollectionByName(name: string): Promise<Collection[]> {
    return this.collectionModel.find({ name }).exec();
  }

  async getCollectionByNft(name: string, owner: string, nftId: string): Promise<any> {
    const collection = await this.collectionModel.findOne({ name, owner}).exec();
    console.log("collection:", collection);
    if (collection === null || collection === undefined) {
      throw new HttpException('collection not Exists...', 500);
    } else {
      return collection;
    }
  }

  async getSpecificNFT(name: string, owner: string, nftId: string): Promise<any> {
    const nft = await this.collectionModel.find({ name, owner, 'nft.id': nftId }, { 'nft.$': 1 }).exec();
    if (nft === undefined || nft === null) {
      throw new HttpException('NFT not exists', 500);
    }
    else
    {
      return nft;
    }
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
