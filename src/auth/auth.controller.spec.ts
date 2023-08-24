import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/schemas/user.schema';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { HttpStatusCode } from 'axios';

/**
 * @note test-db should be empty to run all tests smoothly...
 */

describe('AuthController', () => {
  let app: INestApplication;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, UserService, JwtService],
      imports: [
        MongooseModule.forRoot('mongodb://seamint-db:27017/test-db'),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
    }).compile();
    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should signup successfully:', async () => {
    const signupDto = {
      name: 'bilal',
      password: '12345',
      walletAddress: '0xc2E382BD2a62f49C95b14EEA766F2Ba14Ae1f98D',
    };
    const response = await request(app.getHttpServer())
      .post('/auth/signup')
      .send(signupDto)
      .expect(HttpStatus.CREATED);
    expect(response.body).toEqual([{ message: 'signin successful' }]);
  });

  it('should login successfully:', async () => {
    const loginDto = { username: 'bilal', password: '12345' };
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(HttpStatus.OK);
    expect(response.body[0].message).toEqual('login successful');
  });
  it('should throw user duplication:', async () => {
    const signupDto = {
      name: 'bilal',
      password: '12345',
      walletAddress: '0xc2E382BD2a62f49C95b14EEA766F2Ba14Ae1f98D',
    };
    const response = await request(app.getHttpServer())
      .post('/auth/signup')
      .send(signupDto)
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(response.body).toEqual({
      statusCode: 500,
      message: 'user duplication',
    });
  });

  it('should check empty input fields: ', async () => {
    const loginDto = { username: '', password: '12345' };
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(HttpStatus.BAD_REQUEST);
    expect(response.body).toEqual({
      message: ['username should not be empty'],
      error: 'Bad Request',
      statusCode: 400,
    });
  });

  it('should check for wrong input type: ', async () => {
    const loginDto = { username: 'bilal', password: 12345 };
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(HttpStatus.BAD_REQUEST);
    expect(response.body).toEqual({
      message: [
        'password must be longer than or equal to 5 characters',
        'password must be a string',
      ],
      error: 'Bad Request',
      statusCode: 400,
    });
  });

  it('should validate ethereum address: ', async () => {
    const signupDto = {
      name: 'bilal',
      password: '12345',
      walletAddress: '0x00000000000000000000abc',
    };
    const response = await request(app.getHttpServer())
      .post('/auth/signup')
      .send(signupDto)
      .expect(HttpStatus.BAD_REQUEST);
    expect(response.body).toEqual({
      message: 'Invalid Ethereum address',
      error: 'Bad Request',
      statusCode: 400,
    });
  });
});
