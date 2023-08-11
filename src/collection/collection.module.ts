import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CollectionController } from './collection.controller';
import { CollectionService } from './collection.service';
import { Collection, CollectionSchema } from './schemas/collection.schema';
import { NFTModule } from 'src/nft/nft.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Collection.name, schema: CollectionSchema }]), NFTModule],
  controllers: [CollectionController],
  providers: [CollectionService],
})
export class CollectionModule {}