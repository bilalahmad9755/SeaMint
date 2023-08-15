import { Prop, SchemaFactory, Schema} from '@nestjs/mongoose';
import mongoose, { HydratedDocument, SchemaTypeOptions } from 'mongoose';
import { IAuction } from '../auction.interface';
import { Auction } from './auction.schema';
export type NFTDocument = HydratedDocument<NFT>;
export interface Metadata {
  
}
export class NFT {
  @Prop({ required: true })
  id: string;
  @Prop({ required: true, type: mongoose.Schema.Types.Mixed})
  metadata: Record<string, any>;
  @Prop({ required: true, type: Auction })
  auction: IAuction;
}
export const NFTSchema = SchemaFactory.createForClass(NFT);
