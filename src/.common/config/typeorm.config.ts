import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export default class TypeormConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: 'btlgaenyvp7aak8f9msy-postgresql.services.clever-cloud.com', // configService.get<string>('DB_HOST'),
      port: 5432,
      username: 'utxrngabylwicyhlt3io', // configService.get<string>('DB_USER'),
      password: 'lEozILeDfj2R7OArSd5p', // configService.get<string>('DB_PASS'),
      database: 'btlgaenyvp7aak8f9msy', // configService.get<string>('DB_NAME'),
      entities: ['dist/src/**/*.entity{.ts,.js}'],
      // logging: true,
    };
  }
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => {
    return TypeormConfig.getOrmConfig(configService);
  },
  inject: [ConfigService],
};
