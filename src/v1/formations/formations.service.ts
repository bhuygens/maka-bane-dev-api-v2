import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Formations } from './formations.entity';
import { Repository } from 'typeorm';
import { InsertFormationDto } from './dto/insertFormation.dto';

@Injectable()
export class FormationsService {
  constructor(
    @InjectRepository(Formations)
    private readonly formationsRepository: Repository<Formations>,
  ) {}

  getAllFormations(): Promise<Formations[]> {
    return this.formationsRepository.find({});
  }

  async insertFormation(insertFormationDto: InsertFormationDto): Promise<void> {
    const instance = this.formationsRepository.create(insertFormationDto);

    await this.formationsRepository.save(instance);
    await this.formationsRepository.save(insertFormationDto);
  }
}
