import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class UserEntity {
    @ApiProperty({
        description: 'Unique identifier of the user',
        example: 'clx0j2m7w000008jp8p8q8s8t',
        type: String,
    })
    id: string;

    @ApiProperty({
        description: 'Email address of the user',
        example: 'example@example.com',
        type: String,
    })
    email: string

    @ApiProperty({
        description: 'Password of the user',
        example: 'securepassword123',
        type: String,
        minLength: 6,
    })
    password: string;

    @ApiProperty({
        description: 'Role of the user',
        example: 'USER',
        enum: Role,
        type: String,
    })
    role: Role;

    @ApiProperty({
        description: 'First name of the user',
        example: 'John',
        type: String,
    })
    firstName: string;

    @ApiProperty({
        description: 'Last name of the user',
        example: 'Doe',
        type: String,
    })
    lastName: string;
}
