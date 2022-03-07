import { Module } from '@nestjs/common';
import { CarouselController } from './carousel.controller';

@Module({
  controllers: [CarouselController]
})
export class CarouselModule {}
