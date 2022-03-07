import { Module } from '@nestjs/common';
import { FormationsCategoriesService } from './formations-categories.service';
import { FormationsCategoriesController } from './formations-categories.controller';

@Module({
  providers: [FormationsCategoriesService],
  controllers: [FormationsCategoriesController]
})
export class FormationsCategoriesModule {}
