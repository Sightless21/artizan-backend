import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth, ApiOkResponse, ApiCreatedResponse, ApiNoContentResponse } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';


class LoginDto { // สร้าง DTO สำหรับ Request Body ของ Login
    @ApiProperty({ description: 'User email', example: 'user@example.com' })
    email: string;
    @ApiProperty({ description: 'User password', example: 'password123' })
    password: string;
}
class LoginResponseDto { // สร้าง DTO สำหรับ Response ของ Login
    @ApiProperty({ description: 'JWT Access Token', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJzdWIiOiJjbHN2bTRnOTAwMDE3ZjlkM2UwcDdlMWQ5IiwiaWF0IjoxNzA0MDY3MjAwLCJleHAiOjE3MDQwNzQ0MDB9.some_jwt_token_here' })
    access_token: string;
}

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @ApiOperation({ summary: 'Log in a user and get JWT token' })
    @ApiBody({ type: LoginDto })
    @ApiResponse({ status: 200, description: 'Successful login', type: LoginResponseDto })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @UseGuards(AuthGuard('local')) // ใช้ AuthGuard ที่ใช้ LocalStrategy
    @Post('login')
    async login(@Request() req) {
        // req.user จะถูกแนบมาโดย Passport หลังจาก LocalStrategy.validate สำเร็จ
        return this.authService.login(req.user);
    }
}
