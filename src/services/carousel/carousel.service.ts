import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Carousel } from '../../entities/carousel/carousel.entity';
import { Repository } from 'typeorm';
import CreateCarouselDto from '../../dto/carousel/create-carousel.dto';
import ErrorManager from '../../_shared/utils/ErrorManager';
import UpdateCarouselDto from '../../dto/carousel/update-carousel.dto';
import RequestManager from '../../_shared/utils/RequestManager';

@Injectable()
export class CarouselService {
  constructor(
    @InjectRepository(Carousel)
    readonly carouselRepository: Repository<Carousel>,
  ) {}

  async getAll(): Promise<Carousel[]> {
    return await this.carouselRepository.find();
  }

  async getCarouselById(id: number): Promise<Carousel> {
    return await this.carouselRepository.findOne(id);
  }

  async createCarousel(
    createCarouselDto: CreateCarouselDto,
  ): Promise<Carousel> {
    const isCarouselExist = this.carouselRepository.findOne({
      name: createCarouselDto.name,
    });

    if (!isCarouselExist) {
      const carousel = this.carouselRepository.create(createCarouselDto);
      return await this.carouselRepository.save(carousel);
    } else {
      ErrorManager.alreadyExistContentException(`Name already exist`);
    }
  }

  async updateCarousel(
    updateCarouselDto: UpdateCarouselDto,
  ): Promise<{ success: boolean; message: string }> {
    // Find carousel
    const carousel = await this.carouselRepository.findOne(updateCarouselDto.id);

    // Check if name isn't already used
    await this.carouselRepository
      .find({
        name: updateCarouselDto.name,
      })
      .then(
        (res) =>
          res.length > 0 && ErrorManager.customException('Name already used'),
      );

    // Update carousel
    if (carousel) {
      const updateCarousel = await this.carouselRepository.preload({
        id: +updateCarouselDto.id,
        ...updateCarouselDto,
      });
      await this.carouselRepository.save(updateCarousel);
      return RequestManager.successRequest(
        `Carousel ${updateCarouselDto.id} updated !`,
      );
    } else {
      ErrorManager.notFoundException(
        `Carousel ${updateCarouselDto.id} not found`,
      );
    }
  }

  async updateCarouselStatus(
    body: [id: string, status: string],
  ): Promise<Carousel> {
    const article = await this.carouselRepository.findOne(body['id']);

    if (article) {
      article.isOnline = body['status'] === true;
      return await this.carouselRepository.save(article);
    } else {
      ErrorManager.notFoundException(`carousel item not found`);
    }
  }

  // DELETE ARTICLE
  async deleteCarouselItem(id: number): Promise<Carousel> {
    const carousel = await this.carouselRepository.findOne(id);
    if (carousel) {
      return await this.carouselRepository.remove(carousel);
    } else {
      ErrorManager.notFoundException(`carousel ${id} not found`);
    }
  }
}
