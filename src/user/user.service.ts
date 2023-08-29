import { HttpException, Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AddUserDto } from './dto/add-user';
import { stringify } from 'querystring';

// This should be a real class/interface representing a user entity

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async getUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getUserByAddress(walletAddress: string): Promise<User[]> {
    return this.userModel.find({ walletAddress }).exec();
  }

  async addUser(addUserDto: AddUserDto) {
    // check for duplicated ethereum address...
    const email = await this.userModel
      .findOne({
        email: addUserDto.email,
      })
      .exec();
    console.log('duplicated user: ', email);
    if (email !== null) {
      throw new HttpException('user duplication', 500);
    }
    const addUser = new this.userModel(addUserDto);
    const saved = await addUser.save();
    console.log('data saved: ', saved);
    return;
  }

  async addOAuthUser(email: string)
  {
    const newUser = new this.userModel({email: email})
    newUser.save();
  }
  async validateUser(email: string, password: string): Promise<User> {
    return await this.userModel.findOne({ email, password });
  }

  async getUniqueUser(email: string): Promise<User> {
    try {
      console.log("query working fine...");
      return await this.userModel.findOne({ email }).exec();
    } catch (error) {
      return null;
    }
  }
}