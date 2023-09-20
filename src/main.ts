import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { Config } from '../libs/config/env.config';

async function bootstrap(): Promise<void> {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  const corsDomains = Config.get<string[]>('CORS_DOMAINS');
  if (Boolean(corsDomains.length)) app.enableCors({ origin: corsDomains });
  await app.listen(5000);
}

bootstrap();
