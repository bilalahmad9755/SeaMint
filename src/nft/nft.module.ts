import { Module } from '@nestjs/common';
import { NftController } from './nft.controller';
import { NftService } from './nft.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NFT } from './schemas/nft.schema';
import { NFTSchema } from './schemas/nft.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: NFT.name, schema: NFTSchema }])],
  controllers: [NftController],
  providers: [NftService],
})
export class NFTModule {}
