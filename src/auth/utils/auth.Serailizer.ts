import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { use } from 'passport';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {
    super();
  }

  serializeUser(user: any, done: Function) {
    console.log('Serializing User: ', user);
    done(null, user);
  }
  /**
   *
   * @param payload after google authentication
   * @param done no error / user or no-user
   * @returns
   */
  async deserializeUser(payload: any, done: Function) {
    console.log('payload on deserializer: ', payload);
    const user = await this.authService.userExists(payload.email);
    console.log('Deserializing User: ', user);
    return user ? done(null, user) : done(null, null);
  }
}
