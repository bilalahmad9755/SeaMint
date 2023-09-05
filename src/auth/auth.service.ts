import { HttpException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from 'src/user/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async userExists(email: string): Promise<User> {
    console.log('executing user exists...');
    const user = await this.userService.getUniqueUser(email);
    console.log('user exists: ', user);
    if (user === null) {
      throw new HttpException('Invalid User for login!', 404);
    }
    return user;
  }

  async validateOAuthUser(profile: any) {
    const user = await this.userService.getUniqueUser(profile.emails[0].value);
    if (user === null) {
      await this.userService.addOAuthUser({
        email: profile.emails[0].value,
        name: profile.displayName,
      });
    }
    return true;
  }
}
