import { IsNotEmpty, IsString, MinLength } from 'class-validator';
export class LoginDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  password: string;
}
