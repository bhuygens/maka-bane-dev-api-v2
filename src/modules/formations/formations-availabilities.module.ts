import { Module } from '@nestjs/common';
import { FormationsAvailabilitiesController } from '../../controllers/formations/formations-availabilities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Formations } from '../../entities/formations/formations.entity';
import { FormationsAvailabilities } from '../../entities/formations/formations-availabilities.entity';
import { FormationsAvailabilitiesService } from '../../services/formations/formations-availabilities.service';

@Module({
  imports: [TypeOrmModule.forFeature([FormationsAvailabilities, Formations])],
  controllers: [FormationsAvailabilitiesController],
  providers: [FormationsAvailabilitiesService],
})
export class FormationsAvailabilitiesModule {}
