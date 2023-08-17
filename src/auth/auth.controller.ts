import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login';
import { EthereumAddressValidationPipe } from './auth.validation';
import { AddUserDto } from 'src/user/dto/add-user';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UsePipes(new ValidationPipe())
  login(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto.username, loginDto.password);
  }

  @Post('signup')
  @UsePipes(new EthereumAddressValidationPipe())
  async signUp(@Body() addUserDto: AddUserDto) {
    return this.authService.signUp(addUserDto);
  }

  @Post('signup/verify')
  async signupVerify(signature: string) {
    console.log('signature for verification: ', signature);
  }
}
