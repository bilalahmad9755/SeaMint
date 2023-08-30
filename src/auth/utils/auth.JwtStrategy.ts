import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { Inject } from '@nestjs/common';

export class JwtAuthStrategy extends PassportStrategy(Strategy, 'jwt-cookie') {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {
    console.log('JWT strategy contructor executing...');
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.token;
        },
      ]),
      secretOrKey: process.env.JWT_SECRET_KEY,
      ignoreExpiration: false,
    });
  }

  /**
   * executes after jwt-cookie verification...
   */
  async validate(payload: any) {
    console.log('JWT strategy Payload: ', payload);
    return { userId: payload.sub, username: payload.username };
  }
}
