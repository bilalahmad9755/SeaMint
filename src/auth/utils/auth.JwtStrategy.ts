import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';

export class JwtAuthStrategy extends PassportStrategy(Strategy, 'jwt-cookie') {
  constructor() {
    console.log('JWT strategy contructor executing...');
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.token;
        },
      ]),
      secretOrKey: process.env.JWT_SECRET_KEY,
      ignoreExpiration: true,
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
