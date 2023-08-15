import { Model } from 'mongoose';
import { Injectable, HttpException, UseFilters, ExceptionFilter} from '@nestjs/common';
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
    const addedCollection = new this.collectionModel(addCollectionDto);
    return addedCollection.save();
  }

  async getCollection(): Promise<Collection[]> {
    return this.collectionModel.find().exec();
  }

  async getCollectionByName(name: string): Promise<Collection[]> {
    return this.collectionModel.find({ name }).exec();
  }

  async updateCollectionByName(
    name: string,
    updateCollectionDto: UpdateCollectionDto,
  ): Promise<Collection> {
    return this.collectionModel
      .findOneAndUpdate({ name }, updateCollectionDto, { new: true })
      .exec();
  }

  async addNft(name: string, owner: string, addNftDto: AddAuctionDto) {
    try {
      const collection = await this.collectionModel
        .findOne({ name, owner })
        .exec();
      if (collection == null) {
        throw new HttpException("collection not found", 404);
      } else {
        collection.nft.push(addNftDto);
        collection.save();
        return;
      }
    } catch (error) {
      throw new HttpException("collection not found", 404);
    }
  }
}
