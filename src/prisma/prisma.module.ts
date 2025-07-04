import { Module , Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // ทำให้ PrismaService สามารถใช้ได้ทั่วทั้งแอปพลิเคชัน
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // ทำให้ PrismaService สามารถถูกใช้ในโมดูลอื่นๆ ได้
})
export class PrismaModule {}
