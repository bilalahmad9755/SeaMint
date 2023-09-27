import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { GoogleAuthStrategy } from './utils/auth.GoogleAuthStrategy';
import { SessionSerializer } from './utils/auth.Serailizer';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [AuthController],
  providers: [AuthService, GoogleAuthStrategy, SessionSerializer],
  imports: [
    UserModule,
    PassportModule.register({
      defaultStrategy: 'google',
      session: true,
    }),
  ],
  exports: [AuthService, GoogleAuthStrategy],
})
export class AuthModule {}
