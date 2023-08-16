import {
  Controller,
  Get,
  Post,
  HttpCode,
  Body,
  Put,
  UseGuards,
  Res,
  Query,
  UsePipes,
} from '@nestjs/common';
import { Response } from 'express';
import { Collection } from './schemas/collection.schema';
import { CollectionService } from './collection.service';
import { AddCollectionDto } from './dto/add-collection';
import { UpdateCollectionDto } from './dto/update-collection';
import { AuthGuard } from 'src/auth/auth.guard';
import { AddAuctionDto } from 'src/nft/dto/add-auction';
import { CollectionExistsPipe } from './collection.validation';
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
  // need to change @Param with @Query...
  @Get()
  getCollectionByName(@Query('name') name: string): Promise<Collection[]> {
    return this.collectionService.getCollectionByName(name);
  }
  @Put()
  updateCollectionByName(
    @Query('name') name: string,
    @Body() updateCollectionDto: UpdateCollectionDto,
  ): Promise<Collection> {
    return this.collectionService.updateCollectionByName(
      name,
      updateCollectionDto,
    );
  }

  
  /**
   * adding NFT to existing collection... 
   * auction is must for each NFT added in collection...
   * searching collection based on "Name" & "owner"...
   * validating duplication of NFTs based on owner/Id
  */
  @Post('addNFT')
  @UsePipes(CollectionExistsPipe)
  async addNft(
    @Body() addNftDto: AddAuctionDto,
    @Query('name') name: string,
    @Query('owner') owner:string,
    @Res() rspns: Response)
  {
    await this.collectionService.addNft(name, owner, addNftDto);
    return rspns.status(201).json({message: "NFT added..."});
  }
}
