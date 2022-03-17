import { Module } from '@nestjs/common';
import { FormationsCategoriesService } from '../../services/formations/formations-categories.service';
import { FormationsCategoriesController } from '../../controllers/formations/formations-categories.controller';

@Module({
  providers: [FormationsCategoriesService],
  controllers: [FormationsCategoriesController],
})
export class FormationsCategoriesModule {}
