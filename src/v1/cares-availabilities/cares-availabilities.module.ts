import { Module } from '@nestjs/common';
import { CaresAvailabilitiesController } from './cares-availabilities.controller';
import { CaresAvailabilitiesService } from './cares-availabilities.service';

@Module({
  controllers: [CaresAvailabilitiesController],
  providers: [CaresAvailabilitiesService],
})
export class CaresAvailabilitiesModule {}
