import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from './auth.module';
import { UserModule } from '../user/user.module';


describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, UserService, JwtService],
      imports: [AuthModule, UserModule]
    }).compile();
    
    controller = module.get<AuthController>(AuthController);
  });

  const signUpInput = {name: 'bilal', password: '12345', walletAddress: '0x516DcEb2b8905ad01084FB932ee7Cc7e0a8321Dd'}
  it('should signup:', () => {
    expect(controller.signUp(signUpInput)).toBe({message: "signup successfull"});
  });

  // const loginInput = {username: 'bilal', password: '12345'};
  // it('login', ()=>{
  //   expect(controller.login(loginInput)).toBeDefined();
  // })
});
