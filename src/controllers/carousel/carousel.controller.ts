import { Controller, Get } from '@nestjs/common';
import { CarouselService } from '../../services/carousel/carousel.service';

@Controller('carousel')
export class CarouselController {
  constructor(private readonly carouselService: CarouselService) {

  }

  @Get()
  async getAll() {
    return await this.carouselService.getAll();
  }
}
