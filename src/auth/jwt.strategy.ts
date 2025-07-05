import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service'; 

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private readonly logger = new Logger(JwtStrategy.name); // <<< เพิ่ม Logger

  constructor(
    private configService: ConfigService,
    private usersService: UsersService, 
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
    this.logger.log(`JwtStrategy initialized with secret from ConfigService.`);
  }

  // payload คือข้อมูลที่คุณใส่ใน JWT ตอน sign (email, sub)
  async validate(payload: { email: string, sub: string }) {
    this.logger.debug(`Validating JWT payload: ${JSON.stringify(payload)}`);
    // สามารถใช้ sub (user ID) หรือ email เพื่อค้นหาผู้ใช้จากฐานข้อมูลได้
    const user = await this.usersService.findOne(payload.sub); // สมมติว่า findOne รับ ID

    if (!user) {
      this.logger.warn(`User with ID ${payload.sub} not found during JWT validation.`);
      throw new UnauthorizedException('Invalid token or user not found');
    }
    this.logger.debug(`User ${user.email} found for JWT payload.`);

    return user; // Return the user object directly
  }
}