import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({ required: true })
  productId: string;

  @Prop({ required: true })
  priceId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  items: number;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  price: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true, type: mongoose.Schema.Types.Mixed })
  properties: Record<string, any>;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
