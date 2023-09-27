import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/schemas/user.schema';
import { INestApplication } from '@nestjs/common';
import { SessionSerializer } from './utils/auth.Serailizer';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { Request, Response } from 'express';

describe('AuthController', () => {
  let app: INestApplication;
  const mockGoogleStrategy = jest.fn().mockImplementation(() => {
    return {
      authenticate: jest.fn().mockResolvedValue({
        email: 'test@example.com',
        name: 'Test User',
      }),
    };
  });

  // Create a mock response object.
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        UserService,
        mockGoogleStrategy,
        SessionSerializer,
      ],
      imports: [
        UserModule,
        PassportModule.register({
          defaultStrategy: 'google',
          session: true,
        }),
        MongooseModule.forRoot('mongodb://localhost:27017/test-db'),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
    }).compile();
    app = module.createNestApplication();
    await app.init();
  }, 100000);

  it('google authentication', async() => {
    let authController: AuthController = new AuthController();
    let request:  Request;
    let response;
    
    response = jest.fn();
    response.status = jest.fn().mockReturnValue({
      json: jest.fn(),
    });
    const authResponse = await authController.handleGoogleLogin(request, response);
    expect(response).toBe(200);

  });
  // afterAll(async () => {
  //   await app.close();
  // });
});
