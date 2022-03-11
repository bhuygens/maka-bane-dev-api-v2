import { Module } from '@nestjs/common';
import { FormationsAvailabilitiesController } from './formations-availabilities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Formations } from '../formations/formations.entity';
import { FormationsAvailabilities } from './formations-availabilities.entity';
import { FormationsAvailabilitiesService } from './formations-availabilities.service';

@Module({
  imports: [TypeOrmModule.forFeature([FormationsAvailabilities, Formations])],
  controllers: [FormationsAvailabilitiesController],
  providers: [FormationsAvailabilitiesService],
})
export class FormationsAvailabilitiesModule {}
