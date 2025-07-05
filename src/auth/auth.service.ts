// src/auth/auth.service.ts
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common'; // <<< เพิ่ม Logger
import { UsersService } from '../users/users.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name); // <<< เพิ่มบรรทัดนี้

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {

    const user = await this.usersService.findByEmail(email);

    if (!user) {
      return null;
    }

    // ตรวจสอบรหัสผ่านที่ hash ไว้ด้วย argon2
    const isPasswordValid = await argon2.verify(user.password, pass);

    if (isPasswordValid) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user; // ลบ password ออกก่อนคืนค่า
      return result;
    }
    return null; // รหัสผ่านไม่ถูกต้อง
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}