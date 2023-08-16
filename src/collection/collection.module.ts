import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CollectionController } from './collection.controller';
import { CollectionService } from './collection.service';
import { Collection, CollectionSchema } from './schemas/collection.schema';
import { CollectionExistsPipe } from './collection.validation';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Collection.name, schema: CollectionSchema },
    ])
  ],
  controllers: [CollectionController],
  providers: [CollectionService, CollectionExistsPipe],
  exports: [CollectionService],
})
export class CollectionModule {}
