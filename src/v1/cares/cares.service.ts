import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cares } from './cares.entity';
import { Repository } from 'typeorm';
import { CaresAvailabilities } from '../cares-availabilities/cares-availabilities.entity';

@Injectable()
export class CaresService {
  constructor(
    @InjectRepository(Cares)
    readonly caresRepository: Repository<Cares>,
    @InjectRepository(CaresAvailabilities)
    readonly careAvailabilities: Repository<CaresAvailabilities>,
  ) {}

  async getCares(): Promise<Cares[]> {
    return await this.caresRepository.find();
  }

  async getCareById(id: number): Promise<Cares> {
    return await this.caresRepository.findOne(id);
  }

  async getCareAvailabilities(id: number): Promise<CaresAvailabilities[]> {
    const care = await this.caresRepository.findOne(id);
    console.log(care);
    return await this.careAvailabilities.find({ care: care });
  }
}
