import { Injectable, CanActivate, ExecutionContext, HttpException } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    // Add your authentication logic here
    const request = context.switchToHttp().getRequest();
    return request.user.role == "admin" ? true : false; // Check if a user is admin...
  }
}