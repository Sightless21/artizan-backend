import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect(); // เมื่อ Module เริ่มต้น PrismaService จะเชื่อมต่อกับฐานข้อมูล
    }

    // ใช้สำหรับปิดการเชื่อมต่อฐานข้อมูลเมื่อแอปพลิเคชันปิดตัวลงเพื่อให้แน่ใจว่าไม่มีการเชื่อมต่อค้างอยู่
    async enableShutdownHooks(app: INestApplication) {
        this.$on('beforeExit', async () => {
          await app.close();
        });
      }

}
