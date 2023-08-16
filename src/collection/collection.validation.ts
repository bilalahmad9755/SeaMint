import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { CollectionService } from './collection.service';
import { plainToClass } from 'class-transformer';
@Injectable()
export class CollectionExistsPipe implements PipeTransform<any> {
  constructor(private readonly collectionService: CollectionService) {}
  transform(value: any, metadata: ArgumentMetadata) {
    const data = plainToClass(metadata.metatype, value);
    console.log('data: ', data);
    if (
      this.collectionService.getSpecificCollection(data.name, data.owner) ===
      null
    ) {
      console.log('executing if...');
      throw new BadRequestException('Collection not Exists!');
    } else {
      console.log("executing else...");
      return value;
    }
  }
}
