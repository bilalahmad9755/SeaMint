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
  Get,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { EthereumAddressValidationPipe } from './utils/auth.validation';
import { AddUserDto } from '../user/dto/add-user';
import { AuthGuard } from '@nestjs/passport';
import { GoogleAuthGuard } from './utils/auth.GoogleAuthGuard';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // local Auth Stretegy for login credentials...
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('basic'))
  async handleLogin(@Req() req: { user: any }, @Res() res: Response) {
    console.log('user is added in request : ', req.user);
    const jwt = await this.authService.generateToken({
      name: req.user.email
    });
    console.log("jwt: ", jwt);
    res.cookie('token', jwt, { httpOnly: true });
    return res.status(HttpStatus.OK).send({ message: 'login successfull' });
  }
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async handleLogout(@Res() res: Response) {
    res.clearCookie('token');
    return res.status(HttpStatus.OK).send({ message: 'logout successful' });
  }

  @Post('signup')
  // @UsePipes(new EthereumAddressValidationPipe())// optional...
  async handleSignUp(@Body() addUserDto: AddUserDto, @Res() res: Response) {
    await this.authService.signUp(addUserDto);
    res.status(HttpStatus.CREATED).json([{ message: 'signin successful' }]);
  }

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  async handleGoogleLogin() {
    console.log('google login...');
    return {message: "google login..."}
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async handleGoogleRedirect() {
    console.log('google redirect...');
  }
}
