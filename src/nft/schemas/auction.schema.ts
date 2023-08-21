import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IBid } from '../bid.interface';
import { defaultIfEmpty } from 'rxjs';
export type AuctionDocument = HydratedDocument<Auction>;

enum AuctionStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}
@Schema()
export class Auction {
  startTime: {required: true, type: string, defaultIfEmpty: "Date"};

  @Prop({ required: false })
  endTime: Date;

  @Prop({ required: true })
  status: AuctionStatus;

  @Prop({ required: false })
  price: string;

  @Prop({ required: false })
  bid: IBid[];

  // setDefaultStartTime(){
  //   this.startTime = new Date;
  //   console.log("time set: ", this.startTime);
  // }
}
export const AuctionSchema = SchemaFactory.createForClass(Auction);
