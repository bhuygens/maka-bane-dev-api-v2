import { Module } from '@nestjs/common';
import { FormationsService } from './formations.service';
import { Formations } from './formations.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormationsController } from './formations.controller';
import { FormationsAvailabilities } from '../formations-availabilities/formations-availabilities.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Formations, FormationsAvailabilities])],
  providers: [FormationsService],
  controllers: [FormationsController],
})
export class FormationsModule {}
