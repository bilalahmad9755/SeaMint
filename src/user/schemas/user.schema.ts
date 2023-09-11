import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserRoles } from '../user.role';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: false })
  name: string;

  @Prop({required: true})
  email: String;

  @Prop({required: false, enum: UserRoles, default: UserRoles.User})
  role: UserRoles
}

export const UserSchema = SchemaFactory.createForClass(User);
