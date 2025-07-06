import { IsString, IsOptional, IsNotEmpty, IsEmail } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

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
        description: 'Role of the user',
        example: 'USER',
        enum: ['USER', 'ADMIN'],
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    role: Role;

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
