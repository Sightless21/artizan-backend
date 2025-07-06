import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { Role } from '@prisma/client';
declare module 'express' {
  interface Request {
    user: {
      id: string;
      email: string;
      role: Role;
    }
  }
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private readonly logger = new Logger(JwtStrategy.name);

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

  async validate(payload: { email: string, sub: string }) {
    this.logger.debug(`Validating JWT payload: ${JSON.stringify(payload)}`);
    const user = await this.usersService.findOne(payload.sub);

    if (!user) {
      this.logger.warn(`User with ID ${payload.sub} not found during JWT validation.`);
      throw new UnauthorizedException('Invalid token or user not found');
    }
    this.logger.debug(`User ${user.email} found for JWT payload.`);

    return user;
  }
}