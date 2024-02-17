import { PrismaClient } from '@prisma/client';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3009, () => {
    console.log('Server running correctly');
  });
}
bootstrap();

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL_PLANET_SCALE,
    },
  },
});