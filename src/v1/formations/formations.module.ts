import { Module } from '@nestjs/common';
import { FormationsService } from './formations.service';
import { Formations } from './formations.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormationsController } from './formations.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Formations])],
  providers: [FormationsService],
  controllers: [FormationsController],
})
export class FormationsModule {}
