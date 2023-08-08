import { IsNotEmpty, IsString, MinLength, isString} from 'class-validator';
export class SignupDto
{
    @IsNotEmpty()
    @IsString()
    address: string

    @IsNotEmpty()
    @IsString()
    chainId: string
}