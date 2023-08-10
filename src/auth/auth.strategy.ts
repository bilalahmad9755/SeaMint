import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants, // Replace with your own secret key
    });
  }

//   async validate(payload: any) {
//     const user = await this.authService.validateUser(payload);
//     if (!user) {
//       throw new UnauthorizedException();
//     }
//     return user;
//   }
}