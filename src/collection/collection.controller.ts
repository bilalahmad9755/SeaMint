import {
  Controller,
  Get,
  Post,
  HttpCode,
  Body,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { Collection } from './schemas/collection.schema';
import { CollectionService } from './collection.service';
import { AddCollectionDto } from './dto/add-collection';
import { UpdateCollectionDto } from './dto/update-collection';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}
  @Get()
  getCollection(): Promise<Collection[]> {
    return this.collectionService.getCollection();
  }

  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard)
  addCollection(
    @Body() addCollectionDto: AddCollectionDto,
  ): Promise<Collection> {
    return this.collectionService.addCollection(addCollectionDto);
  }

  @Get(':name')
  getCollectionByName(@Param('name') name: string): Promise<Collection[]> {
    return this.collectionService.getCollectionByName(name);
  }
  @Put(':name')
  updateCollectionByName(
    @Param('name') name: string,
    @Body() updateCollectionDto: UpdateCollectionDto,
  ): Promise<Collection> {
    return this.collectionService.updateCollectionByName(
      name,
      updateCollectionDto,
    );
  }
}
