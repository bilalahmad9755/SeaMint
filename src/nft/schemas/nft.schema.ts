import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IAuction } from '../auction.interface';
import { Auction } from './auction.schema';
export type NFTDocument = HydratedDocument<NFT>;

export class NFT {
  @Prop({ required: true })
  id: string;
  @Prop({ required: true , type: Auction})
  auction: IAuction
}
export const NFTSchema = SchemaFactory.createForClass(NFT);
