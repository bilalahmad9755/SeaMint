import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleAuthStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(AuthService) private readonly authService: AuthService)
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
    console.log("google strategy profile validation: ", profile );
    await this.authService.validateOAuthUser(profile);
    return {name: profile.displayName, email: profile.emails[0].value};
  }
}
