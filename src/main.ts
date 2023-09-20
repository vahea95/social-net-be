import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap(): Promise<void> {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  const corsDomains = ['http://localhost:3000'];
  if (Boolean(corsDomains.length)) app.enableCors({ origin: corsDomains });
  await app.listen(5000);
}

bootstrap();
