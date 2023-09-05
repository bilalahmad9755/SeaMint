import { Controller, Req, UseGuards, Get, Session } from '@nestjs/common';
import { Request, Response } from 'express';
import { GoogleAuthGuard } from './utils/auth.GoogleAuthGuard';
import { AuthGuard } from './utils/auth.AuthGuard';
@Controller('auth')
export class AuthController {
  constructor() {}

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  async handleGoogleLogin() {
    console.log('google login...');
    return { message: 'google login...' };
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async handleGoogleRedirect(
    @Req() req: Request,
    @Session() session: Record<string, any>,
  ) {
    console.log('session in redirect: ', session);
    console.log('session in redirect: ', req['sessionID']);
    // return session to client for next frequent calls...
    session.authenticated = true;
    return { msg: 'OAuth login successfull...' };
  }

  @Get('session/')
  @UseGuards(AuthGuard)
  async handleSession(
    @Req() request: Request,
    @Session() session: Record<string, any>,
  ) {
    console.log('session object: ', session);
    console.log('sessionID: ', session.id);
    console.log('checking user: ', request['user']);
    if (request['user']) {
      return { msg: 'Authenticated...' };
    } else {
      return { msg: 'Not Authenticated...' };
    }
  }

  @Get('google/logout')
  async handleLogout(@Req() request: Request, @Session() session: Record<string, any>) {
    if (request['user']) {
      await session.destroy();
      console.log(session.id);
      return { msg: 'User logout...' };
    } else {
      return { msg: 'already logout...' };
    }
  }
}
