import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    // Add your authentication logic here
    const request = context.switchToHttp().getRequest();
    console.log("request in authguard:", request);
    return !!request.user; // Check if a user is authenticated
  }
}