import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Collection } from './schemas/collection.schema';
import { AddCollectionDto } from './dto/add-collection';
import { UpdateCollectionDto } from './dto/update-collection';


@Injectable()
export class CollectionService {
  constructor(@InjectModel(Collection.name) private collectionModel: Model<Collection>,) {}

  async addCollection(addCollectionDto: AddCollectionDto): Promise<Collection> {
    const addedCollection = new this.collectionModel(addCollectionDto);
    return addedCollection.save();
  }

  async getCollection(): Promise<Collection[]> {
    return this.collectionModel.find().exec();
  }
  async getCollectionByName(name: string): Promise<Collection[]>
  {
    return this.collectionModel.find({name}).exec();
  }
  async updateCollectionByName(name: string, updateCollectionDto: UpdateCollectionDto): Promise<Collection>
  {
    return this.collectionModel.findOneAndUpdate({name}, updateCollectionDto, {new: true}).exec();
  }
}
