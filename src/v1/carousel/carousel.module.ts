import { Module } from '@nestjs/common';
import { CarouselController } from './carousel.controller';
import { CarouselService } from './carousel.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carousel } from './carousel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Carousel])],
  controllers: [CarouselController],
  providers: [CarouselService],
})
export class CarouselModule {}
