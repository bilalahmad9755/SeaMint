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
import { Response , Request} from 'express';
import { AuthService } from './auth.service';
import { EthereumAddressValidationPipe } from './utils/auth.validation';
import { AddUserDto } from '../user/dto/add-user';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../user/schemas/user.schema';
import { GoogleAuthGuard } from './utils/auth.GoogleAuthGuard';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // local Auth Stretegy for login credentials...
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('basic'))
  async handleLogin(@Req() req: { user: User }, @Res() res: Response) {
    console.log('user is added in request : ', req.user);
    const jwt = await this.authService.generateToken({
      name: req.user.name,
      walletAddress: req.user.walletAddress,
    });
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
  @UsePipes(new EthereumAddressValidationPipe())
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
  async handleGoogleRedirect(@Req() req: Request) {
    console.log("request user:", req.user);
    console.log('google redirect executed...');
  }

  @Get('session/')
  async handleSession(@Req() req: Request)
  {
    console.log("user request: ", req.user);
    return {msg: "session handled..."}
  }
}
