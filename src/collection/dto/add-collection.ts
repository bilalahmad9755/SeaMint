import { IsEmail, IsNotEmpty } from 'class-validator';
export class AddCollectionDto
{
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    owner: string;

    @IsNotEmpty()
    items: string;

    @IsNotEmpty()
    date: string;

    @IsNotEmpty()
    worth: string;

    @IsNotEmpty()
    chain: string;

    @IsNotEmpty()
    category: string;

    @IsNotEmpty()
    description: string;
}