import {
  HttpException,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import Moralis from 'moralis';
import { Web3 } from 'web3';
import { AddUserDto } from 'src/user/dto/add-user';
import { User } from 'src/user/schemas/user.schema';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(walletAddress: string, pass: string): Promise<User> {
    const user = await this.userService.validateUser(walletAddress, pass);
    if (user === null) {
      throw new HttpException("Account not Exists!", 404);
    }
    else
    {
      return user;
    }
  }

  async generateToken(payload: Object):Promise<string>
  {
    return await this.jwtService.signAsync(payload, {
        secret: jwtConstants.secret,
      });
  }

  async signUp(addUserDto: AddUserDto)
  {
    await this.userService.addUser(addUserDto);
    return;
  }
  async requestMoralis(address: string, chain: string): Promise<any> {
    try {
      await Moralis.start({
        apiKey:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImMyMGY0OTNlLWVjMmItNDY5Yi1hMzk4LWU1YTJlNWY5OTg1NiIsIm9yZ0lkIjoiMjkzODczIiwidXNlcklkIjoiMzAwNzM0IiwidHlwZUlkIjoiZWMwMTNkNzItMTc0My00MTFkLWEwYzgtZWFiODAxMDEzY2MxIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2ODk4MDUwMTYsImV4cCI6NDg0NTU2NTAxNn0.LklkEaYzruMQXhfjKXM-Zsn6DAM5uMnlQXLEUpt5qUQ',
      });
      console.log('moralis started...');
      const response = await Moralis.Auth.requestMessage({
        address,
        chain,
        domain: 'defi.finance',
        statement: 'Please sign this message to confirm your identity.',
        uri: 'http://localhost:3000/api',
        expirationTime: '2023-01-01T00:00:00.000Z',
        timeout: 15,
      });
      console.log('Message to Sign: ', response.raw.message);

      ///@notice signing message...
      const web3 = new Web3(
        'https://eth-mainnet.g.alchemy.com/v2/FS666-4zcjeIZyzlP8JRt11rEmhAVzw2',
      );
      const account = web3.eth.accounts.privateKeyToAccount(
        '0xa8e153632fc23f66efaf648e91b34c123efeaeb755c3530e71d20f134b8ae1dd',
      );
      const _signature = account.sign(response.raw.message); // Empty string as the password
      console.log('Signed message: ', _signature);

      ///@notice verifying signed message...
      const message = response.raw.message;
      const signature = _signature.signature;
      const verified = await Moralis.Auth.verify({
        message: message,
        signature: signature,
      });
      console.log('web3 authentication: ', verified);

      return response.raw.message;
    } catch (e) {
      console.error(e);
    }
  }
}
