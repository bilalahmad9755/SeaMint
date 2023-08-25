import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtAuthGuard } from './auth.jwtGuard';
import { BasicAuthStrategy } from './auth.basic.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard, BasicAuthStrategy],
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  exports: [AuthService, JwtAuthGuard],
})
export class AuthModule {}
