import { Module } from '@nestjs/common';
import { CaresAvailabilitiesController } from '../../controllers/cares/cares-availabilities.controller';
import { CaresAvailabilitiesService } from '../../services/cares/cares-availabilities.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cares } from '../../entities/cares/cares.entity';
import { CaresAvailabilities } from '../../entities/cares/cares-availabilities.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cares, CaresAvailabilities])],
  controllers: [CaresAvailabilitiesController],
  providers: [CaresAvailabilitiesService],
})
export class CaresAvailabilitiesModule {}
