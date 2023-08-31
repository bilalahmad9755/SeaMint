import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  async canActivate(context: ExecutionContext) {
    console.log('google guard executing...');
    const activate = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    console.log("executing Guard login function");
    await super.logIn(request);
    return activate;
  }
}
