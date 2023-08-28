import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate{
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log("request: ", request);
    const token = request.cookies?.token;
    console.log("token: ", token);
    // const token = this.extractTokenFromHeader(request);
    if (!token) {
      console.log("token not exists...");
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET_KEY,
      });
      console.log("payload after verification: ", payload);
    } catch {
      console.log("failed token verification...");
      throw new UnauthorizedException();
    }
    return true;
  }
}
