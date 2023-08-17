import { IsNotEmpty, IsString } from 'class-validator';
export class SignupDto {
  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  chainId: string;
}
