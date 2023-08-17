import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IAuction } from '../auction.interface';
import { Auction } from './auction.schema';
export type NFTDocument = HydratedDocument<NFT>;
export class NFT {
  @Prop({ required: true })
  id: string;
  @Prop({ required: true, type: mongoose.Schema.Types.Mixed })
  metadata: Record<string, any>;
  @Prop({ required: true, type: Auction })
  auction: IAuction;
}
export const NFTSchema = SchemaFactory.createForClass(NFT);
