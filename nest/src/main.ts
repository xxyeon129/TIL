// 애플리케이션이 시작될 때마다 실행될 함수
// 이름은 반드시 bootstrap일 필요는 없지만, 흔하게 사용하는 규약

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { AppModule } from './app.module';

async function bootstrap() {
  // AppModule로부터 새로운 Nest 애플리케이션 생성 (Nest 애플리케이션의 instance 생성)
  const app = await NestFactory.create(AppModule);
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.removeHeader('x-powered-by');
    res.removeHeader('date');
    next();
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
