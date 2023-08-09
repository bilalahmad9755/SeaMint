import { IsNotEmpty} from 'class-validator';

export class AddUserDto
{
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    walletAddress: string;
}