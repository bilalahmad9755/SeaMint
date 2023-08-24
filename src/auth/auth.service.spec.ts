import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AddUserDto } from '../user/dto/add-user';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/schemas/user.schema';

describe('AuthService', () => {
  let service: AuthService;
  let addUserDto: AddUserDto;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UserService, AddUserDto, JwtService],
      imports: [
        MongooseModule.forRoot('mongodb://seamint-db:27017/test-db'),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    addUserDto = module.get<AddUserDto>(AddUserDto);
  });

  it('should filter extra field: ', () => {
    const mockRequest = {
      name: 'bilal',
      password: '12345',
      extraField: 'extraValue', // An extra field not defined in the DTO
    };
    
    addUserDto = new AddUserDto();
    Object.assign(addUserDto, mockRequest);
    expect(addUserDto.hasOwnProperty('extraField')).toBe(true);
  });
});
