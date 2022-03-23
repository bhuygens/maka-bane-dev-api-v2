import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CaresCategories } from '../../entities/cares/cares-categories.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CaresCategoriesService {
  constructor(
    @InjectRepository(CaresCategories)
    private readonly caresCategoriesRepository: Repository<CaresCategories>,
  ) {}

  getAll() {
    return this.caresCategoriesRepository.find();
  }
}
