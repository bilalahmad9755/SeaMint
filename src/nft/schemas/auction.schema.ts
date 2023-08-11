import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IBid } from '../bid.interface';
import { Bid } from './bid.schema';
export type AuctionDocument = HydratedDocument<Auction>;

enum AuctionStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}
@Schema()
export class Auction {
  @Prop({ required: false })
  startTime: Date;

  @Prop({ required: false })
  endTime: Date;

  @Prop({ required: true })
  status: AuctionStatus;

  @Prop({ required: false })
  price: string;

  @Prop({ required: false })
  bids: IBid[];
}

export const AuctionSchema = SchemaFactory.createForClass(Auction);
