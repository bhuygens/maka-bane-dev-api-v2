import { Module } from '@nestjs/common';
import { FormationsService } from '../../services/formations/formations.service';
import { Formations } from '../../entities/formations/formations.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormationsController } from '../../controllers/formations/formations.controller';
import { FormationsAvailabilities } from '../../entities/formations/formations-availabilities.entity';
import { FormationsSubscribers } from '../../entities/formations/formations-subscribers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Formations, FormationsAvailabilities, FormationsSubscribers])],
  providers: [FormationsService],
  controllers: [FormationsController],
})
export class FormationsModule {}
