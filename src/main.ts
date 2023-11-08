import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { Config } from '../libs/config/env.config';
import * as bodyParser from 'body-parser';


async function bootstrap(): Promise<void> {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  const corsDomains = Config.get<string[]>('CORS_DOMAINS');
  if (Boolean(corsDomains.length)) app.enableCors({ origin: corsDomains });
  await app.listen(5000);
}

bootstrap();
