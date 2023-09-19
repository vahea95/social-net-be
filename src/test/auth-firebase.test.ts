/*
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { generateTestApp } from '../../test/app-factory';
import { AppModule } from '../app.module';
import { authFirebasePort } from './test-app-ports';
import { HttpStatus } from '@nestjs/common';
import * as request from 'supertest';

describe('Create user by google auth', () => {
  let app: NestFastifyApplication;
  let server;

  beforeAll(async () => {
    const testModule = await generateTestApp(AppModule, authFirebasePort);
    app = testModule.app;
    server = testModule.server;
  });

  it({});

  afterAll(async () => {
    jest.resetAllMocks();
    await app.close();
  });
});
*/
