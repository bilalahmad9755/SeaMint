import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from 'src/user/schemas/user.schema';
import { BasicStrategy } from 'passport-http';

@Injectable()
export class BasicAuthStrategy extends PassportStrategy(BasicStrategy) {
  constructor(private authService: AuthService) {
    super();
  }

  // username is EtereumWallet address uniquely idenftifying the user...
  /**
   * executes after authnetication and returns the USER-object in Request body which is further used in controller...
   * this function implements validation logic with services and databases...
   * returned object will be populated in controller request
   */
  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      console.log('exeception from strategy...');
      throw new UnauthorizedException();
    }
    return {username: user.email};
  }
}
