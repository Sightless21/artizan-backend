import { INestApplication, Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    // เชื่อมต่อกับฐานข้อมูลเมื่อโมดูลถูก initialize
    await this.$connect();
  }

  async onModuleDestroy() {
    // ตัดการเชื่อมต่อกับฐานข้อมูลเมื่อแอปพลิเคชันถูกปิด
    await this.$disconnect();
  }
}