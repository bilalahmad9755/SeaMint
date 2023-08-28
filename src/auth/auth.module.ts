import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { BasicAuthStrategy } from './utils/auth.BasicStrategy';
import { GoogleAuthStrategy } from './utils/auth.GoogleAuthStrategy';
import { JwtAuthStrategy } from './utils/auth.JwtStrategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [AuthController],
  providers: [AuthService, BasicAuthStrategy, JwtAuthStrategy, GoogleAuthStrategy],
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  exports: [AuthService, JwtAuthStrategy, GoogleAuthStrategy],
})
export class AuthModule {}
