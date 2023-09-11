import { Controller, Req, UseGuards, Get, Session, Res } from '@nestjs/common';
import { Request, Response, response } from 'express';
import { GoogleAuthGuard } from './utils/auth.GoogleAuthGuard';
import { AuthGuard } from './utils/auth.AuthGuard';
@Controller('auth')
export class AuthController {
  constructor() {}

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  async handleGoogleLogin(@Req() request: Request, @Res() response: Response) {
    //response.set('Access-Control-Allow-Origin', 'http://localhost:3001');
    response.status(200);
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async handleGoogleRedirect(
    @Req() req: Request,
    @Session() session: Record<string, any>,
    @Res() response: Response
  ) {
    console.log("request user: ", req.user);
    response.redirect("http://localhost:3001");
  }
  

  @Get('sessions')
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
