import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AddUserDto } from './dto/add-user';

// This should be a real class/interface representing a user entity

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>,) {}
  async getUsers(): Promise<User[]>{
    return this.userModel.find().exec();
  }

  async getUserByAddress(walletAddress: string): Promise<User[]>
  {
    return this.userModel.find({walletAddress}).exec();
  }

  async addUser(addUserDto: AddUserDto): Promise<User>
  {
    const addUser = new this.userModel(addUserDto);
    return addUser.save();
  }

  async getUserByName(name: string):Promise<User[]>
  {
    return this.userModel.find({name}).exec();
  }
}