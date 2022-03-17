import { Module } from '@nestjs/common';
import { CarouselController } from '../../controllers/carousel/carousel.controller';
import { CarouselService } from '../../services/carousel/carousel.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carousel } from '../../entities/carousel/carousel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Carousel])],
  controllers: [CarouselController],
  providers: [CarouselService],
})
export class CarouselModule {}
