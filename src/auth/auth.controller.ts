import { Body, Controller, Post, HttpCode, HttpStatus, ValidationPipe, UsePipes, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login';
import { SignupDto } from './dto/signup';
import { EthereumAddressValidationPipe } from './auth.validation';
import { response } from 'express';
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
  async signUp(@Body() signupDto: SignupDto) {
    return this.authService.signUp(signupDto);
  }

  @Post('signup/verify')
  async signupVerify(signature : string){
    console.log("signature for verification: ", signature);
  }
}
