import { IsNotEmpty, IsStrongPassword, IsEmail, IsEthereumAddress, IsString} from 'class-validator';

export class AddUserDto
{
    //optional
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsStrongPassword()
    password: string;

    // add later before doing any transaction
    @IsEthereumAddress()
    walletAddress: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
}