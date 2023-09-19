import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Test, TestingModule } from '@nestjs/testing';
import { DynamicModule } from '@nestjs/common';

export class TestPortProvider {
  private static instance: TestPortProvider;
  private nextPort = 8000;

  public static getInstance(): TestPortProvider {
    if (!TestPortProvider.instance) {
      TestPortProvider.instance = new TestPortProvider();
    }

    return TestPortProvider.instance;
  }

  public getNextPort(): number {
    return ++this.nextPort;
  }
}

export async function generateTestApp(
  applicationModule: unknown,
  port?: number,
): Promise<{
  app: NestFastifyApplication;
  server: unknown;
}> {
  const appModule: TestingModule = await Test.createTestingModule({
    imports: [applicationModule as DynamicModule],
  }).compile();

  const app = appModule.createNestApplication<NestFastifyApplication>(
    new FastifyAdapter(),
  );

  const server = app.getHttpServer();
  const nextPort = port || TestPortProvider.getInstance().getNextPort();
  await new Promise((resolve) => app.listen(nextPort, resolve));

  return { app, server };
}
