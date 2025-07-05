import { IsString, IsOptional, IsNotEmpty, IsEmail } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

    @ApiProperty({
        description: 'Email of the user',
        example: 'example@exmaple.com',
        type: String,
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Password of the user',
        example: 'strongpassword123',
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        description: 'First name of the user',
        example: 'John',
        type: String,
        required: false,
    })
    @IsString()
    @IsOptional()
    firstName: string;

    @ApiProperty({
        description: 'Last name of the user',
        example: 'Doe',
        type: String,
        required: false,
    })
    @IsString()
    @IsOptional()
    lastName: string;
}
