import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  ValidationPipe,
  UsePipes,
  Res
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login';
import { EthereumAddressValidationPipe } from './auth.validation';
import { AddUserDto } from '../user/dto/add-user';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    console.log("login dto: ", loginDto);
    const jwt = await this.authService.signIn(loginDto.username, loginDto.password);
    console.log(jwt);
    res.cookie('token', jwt, {httpOnly: true});
    return res.status(HttpStatus.OK).send({message: "login successfull"});
  }


  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res() res: Response)
  {
    res.clearCookie('token');
    return res.status(HttpStatus.OK).send({message: "logout successful"});
  }


  @Post('signup')
  @UsePipes(new EthereumAddressValidationPipe())
  async signUp(@Body() addUserDto: AddUserDto, @Res() res: Response) {
    await this.authService.signUp(addUserDto);
    res.status(HttpStatus.CREATED).json([{message: "signin successful"}]);
  }

  @Post('signup/verify')
  async signupVerify(signature: string) {
    console.log('signature for verification: ', signature);
  }
}
