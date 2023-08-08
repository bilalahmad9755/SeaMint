import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CollectionDocument = HydratedDocument<Collection>;

@Schema()
export class Collection {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  owner: string;
  
  @Prop({ required: true })
  items: number;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  worth: string;

  @Prop({ required: true })
  chain: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  description: string;
}

export const CollectionSchema = SchemaFactory.createForClass(Collection);