import { Controller, Get } from '@nestjs/common';
import { CaresCategoriesService } from '../../services/cares/cares-categories.service';

@Controller('cares-categories')
export class CaresCategoriesController {
  constructor(private readonly careCategoriesService: CaresCategoriesService) {}

  @Get()
  async getCareCategories() {
    return await this.careCategoriesService.getAll();
  }
}
