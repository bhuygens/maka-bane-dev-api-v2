import { Module } from '@nestjs/common';
import { CaresController } from '../../controllers/cares/cares.controller';
import { CaresService } from '../../services/cares/cares.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cares } from '../../entities/cares/cares.entity';
import { CaresAvailabilities } from '../../entities/cares/cares-availabilities.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cares, CaresAvailabilities])],
  controllers: [CaresController],
  providers: [CaresService],
})
export class CaresModule {}
