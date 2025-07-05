import { IsString, IsOptional, IsNotEmpty, IsEmail } from 'class-validator'

export class CreateUserDto {

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsOptional()
    firstName: string;

    @IsString()
    @IsOptional()
    lastName: string;
}
