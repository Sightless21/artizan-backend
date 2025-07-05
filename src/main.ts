// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; // <<< เพิ่ม


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  const config = new DocumentBuilder()
    .setTitle('E-commerce API Documentation') // ตั้งชื่อ API ของคุณ
    .setDescription('The API documentation for my E-commerce application.') // คำอธิบาย API
    .setVersion('1.0') // ตั้งเวอร์ชั่น API
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
      'access-token'
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // 'api' คือ URL path ที่จะเข้าถึงเอกสาร เช่น http://localhost:3000/api

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
