import { HttpException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
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

  async userExists(email: string): Promise<boolean> {
    console.log("executing user exists...");
    const user = await this.userService.getUniqueUser(email);
    console.log("user exists: ", user);
    if(user === null)
    {
      throw new HttpException("Invalid User for login!", 404);
    }
    return true;
  }
  // validating using password...
  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.userService.validateUser(email, pass);
    if (user === null) {
      throw new HttpException('Account not Exists!', 404);
    } else {
      return user;
    }
  }

  async validateOAuthUser(email: string)
  {
    const user = await this.userService.getUniqueUser(email);
    if(user === null)
    {
      await this.userService.addOAuthUser(email);
    }
    return null;
  }
  async generateToken(payload: Object): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_KEY,
    });
  }

  async signUp(addUserDto: AddUserDto) {
    await this.userService.addUser(addUserDto);
    return;
  }
  async requestMoralis(address: string, chain: string): Promise<any> {
    try {
      await Moralis.start({
        apiKey: process.env.MORALIS_API_KEY,
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
      const web3 = new Web3(process.env.ETHEREUM_MAINNET_RPC);
      const account = web3.eth.accounts.privateKeyToAccount(
        process.env.WALLET_PRIVATE_KEY,
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