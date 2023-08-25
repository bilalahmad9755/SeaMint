import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  ValidationPipe,
  UsePipes,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { EthereumAddressValidationPipe } from './auth.validation';
import { AddUserDto } from '../user/dto/add-user';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/schemas/user.schema';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // local Auth Stretegy for login credentials...
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('basic'))

  // user object is returned from basic strategy...
  async login(@Req() req: { user: User }, @Res() res: Response) {
    console.log('request : ', req.user);
    const jwt = await this.authService.generateToken({
      name: req.user.name,
      walletAddress: req.user.walletAddress,
    });
    res.cookie('token', jwt, { httpOnly: true });
    return res.status(HttpStatus.OK).send({ message: 'login successfull' });
  }
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res() res: Response) {
    res.clearCookie('token');
    return res.status(HttpStatus.OK).send({ message: 'logout successful' });
  }

  @Post('signup')
  @UsePipes(new EthereumAddressValidationPipe())
  async signUp(@Body() addUserDto: AddUserDto, @Res() res: Response) {
    await this.authService.signUp(addUserDto);
    res.status(HttpStatus.CREATED).json([{ message: 'signin successful' }]);
  }

  @Post('signup/verify')
  async signupVerify(signature: string) {
    console.log('signature for verification: ', signature);
  }
}
