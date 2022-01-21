import { Module } from '@nestjs/common';
import { CaresController } from './cares.controller';
import { CaresService } from './cares.service';

@Module({
  controllers: [CaresController],
  providers: [CaresService]
})
export class CaresModule {}
