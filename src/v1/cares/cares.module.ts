import { Module } from '@nestjs/common';
import { CaresController } from './cares.controller';
import { CaresService } from './cares.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cares } from './cares.entity';
import { CaresAvailabilities } from '../cares-availabilities/cares-availabilities.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cares, CaresAvailabilities])],
  controllers: [CaresController],
  providers: [CaresService],
})
export class CaresModule {}
