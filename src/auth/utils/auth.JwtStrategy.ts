import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';
import { Inject } from '@nestjs/common';
import { AuthService } from '../auth.service';

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
      ignoreExpiration: true,
    });
  }

  /**
   * It will not validate jwt-cookie infact it executes after jwt-cookie verification...
   * @param payload - verified payload by passport jwt-cookie
   * this extracted payload can be verified by database to be correct user or not...
   * returned object will NOT be populated in controller request...
   */
  async validate(payload: any): Promise<any> {
    return await this.authService.userExists(payload.email);
  }
}
