import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(AuthGuard('local')) // ใช้ AuthGuard ที่ใช้ LocalStrategy
    @Post('login')
    async login(@Request() req) {
        // req.user จะถูกแนบมาโดย Passport หลังจาก LocalStrategy.validate สำเร็จ
        return this.authService.login(req.user);
    }
}
