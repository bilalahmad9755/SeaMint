import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleAuthStrategy extends PassportStrategy(Strategy) {
  constructor() // @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  {
    console.log('google strategy executing...');
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET_KEY,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['profile', 'email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    // const user = await this.authService.validateUser({
    //   email: profile.emails[0].value,
    //   displayName: profile.displayName,
    // });
    // console.log('Validate');
    // console.log(user);
    // return user || null;
    return null;
  }
}
