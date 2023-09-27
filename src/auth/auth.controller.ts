import { Controller, Req, UseGuards, Get, Session, Res, Redirect } from '@nestjs/common';
import { Request, Response } from 'express';
import { GoogleAuthGuard } from './utils/auth.GoogleAuthGuard';
import { AuthGuard } from './utils/auth.AuthGuard';
import { session } from 'passport';
import { REQUEST } from '@nestjs/core';
@Controller('auth')
export class AuthController {
  constructor() {}

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  async handleGoogleLogin(@Req() request: Request, @Res() response: Response) {
    //response.set('Access-Control-Allow-Origin', 'http://localhost:3001');
    response.status(200).json({
      message: 'Successfully logged in.',
    });
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
  @Get('google/authUser')
  @UseGuards(AuthGuard)
  async getAuthUser(@Session() session:Record<string,any>, @Res() response:Response){
    console.log("request: ", session);
    if (session) {
      console.log("session: ", session.passport.user)
      response.status(200).json({authUser: session.passport.user})
    }else
    {
      response.status(404).json({msg: "User not authenticated yet..."});
    }
  }

  @Get('sessions')
  @UseGuards(AuthGuard)
  async handleSession(
    @Req() request: Request,
    @Session() session: Record<string, any>,
  ) {
    console.log('session object: ', session);
    console.log('sessionID: ', session.id);
    console.log('checking user: ', request.user);
    if (request.user) {
      return { msg: 'Authenticated...' };
    } else {
      return { msg: 'Not Authenticated...' };
    }
  }

  @Get('google/logout')
  @UseGuards(AuthGuard)
  async handleLogout(@Req() request: Request, @Session() session: Record<string, any>, @Res() response: Response) {
    if (request.user) {
      console.log("executing logout function...");
      await session.destroy();
      response.redirect('http://localhost:3001');
    }
  }
}
