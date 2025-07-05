import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    }
    ); // เรียก constructor ของ PassportStrategy
  }

  // เมธอด validate นี้จะถูกเรียกเมื่อมีการใช้ LocalStrategy
  // username และ password จะถูกส่งมาจาก HTTP request body
  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    // ถ้า validate สำเร็จ Passport จะเก็บ user object ไว้ใน request.user
    // แต่เราจะ return เฉพาะข้อมูลที่ไม่ใช่ password
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...result } = user;
    return result;
  }
}