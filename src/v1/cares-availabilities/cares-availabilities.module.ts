import { Module } from '@nestjs/common';
import { CaresAvailabilitiesController } from './cares-availabilities.controller';
import { CaresAvailabilitiesService } from './cares-availabilities.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cares } from '../cares/cares.entity';
import { CaresAvailabilities } from './cares-availabilities.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cares, CaresAvailabilities])],
  controllers: [CaresAvailabilitiesController],
  providers: [CaresAvailabilitiesService],
})
export class CaresAvailabilitiesModule {}
