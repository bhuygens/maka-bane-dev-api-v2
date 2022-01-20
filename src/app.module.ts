import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FormationsModule } from './formations/formations.module';
import { FormationsService } from './formations/formations.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './config/config.service';
import { FormationsEntity } from './formations/formations.entity';
import { Connection } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'bwozsqvguehemtybe0hq-mysql.services.clever-cloud.com',
      port: 3306,
      username: 'uvqeqmhixjljedzf',
      password: 'Q2Cwt7v9Bfaed3QUAUpT',
      database: 'bwozsqvguehemtybe0hq',
      entities: [FormationsEntity],
      synchronize: true,
      keepConnectionAlive: true,
    }),
    FormationsModule,
  ],
})
export class AppModule {}
