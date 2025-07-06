// src/common/guards/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. ดึง Roles ที่ Endpoint อนุญาตจาก @Roles() Decorator
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(), // สำหรับ method
      context.getClass(),   // สำหรับ controller class
    ]);

    // ถ้าไม่มี @Roles() Decorator กำหนดไว้ หมายความว่า Endpoint นี้ไม่ต้องใช้ Role พิเศษ (ใครเข้าก็ได้หลังจาก Auth)
    if (!requiredRoles) {
      return true;
    }

    // 2. ดึงข้อมูล User ที่ Login แล้วจาก Request
    // ตรวจสอบให้แน่ใจว่า JwtStrategy ได้แนบ user object ที่มี role มาแล้ว
    const { user } = context.switchToHttp().getRequest();

    // 3. ตรวจสอบว่า user มี role ที่จำเป็นหรือไม่
    // ใช้ includes() เพื่อตรวจสอบว่า role ของ user อยู่ใน array ของ requiredRoles หรือไม่
    // user.role จะเป็นค่าเดียว ส่วน requiredRoles จะเป็น array ของ Role ที่อนุญาต
    return requiredRoles.includes(user.role);
  }
}