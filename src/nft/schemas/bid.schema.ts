import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BidDocument = HydratedDocument<Bid>;

@Schema()
export class Bid {
  @Prop({ required: true })
  price: string;
  @Prop({ required: true })
  buyerAddress: string;
}

export const BidSchema = SchemaFactory.createForClass(Bid);
