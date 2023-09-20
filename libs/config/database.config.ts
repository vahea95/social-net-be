import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Config } from './env.config';
import { ConfigModule } from '@nestjs/config';
import { Profile } from '../entities/profile';
import { Post } from '../entities/post';

export const DefaultDatabaseConfiguration = (): DynamicModule => {
  return TypeOrmModule.forRootAsync({
    imports: [
      ConfigModule.forRoot({
        isGlobal: true,
      }),
    ],
    useFactory: () => ({
      host: Config.get<string>('DB_SQL_LOCAL_HOST'),
      port: Config.get<number>('DB_SQL_LOCAL_PORT'),
      type: 'mysql',
      username: Config.get<string>('DB_SQL_USERNAME'),
      password: Config.get<string>('DB_SQL_PASSWORD'),
      database: Config.get<string>('DB_SQL_NAME'),
      entities: [Profile, Post],
      synchronize: false,
      migrationsRun: false,
      autoLoadEntities: true,
      retryAttempts: 4,
      retryDelay: 3000,
      keepConnectionAlive: false,
    }),
  });
};
