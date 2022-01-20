import { Module } from '@nestjs/common';
import { FormationsAvailabilitiesController } from './formations-availabilities.controller';

@Module({
  controllers: [FormationsAvailabilitiesController]
})
export class FormationsAvailabilitiesModule {}
