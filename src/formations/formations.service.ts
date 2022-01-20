import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FormationsEntity } from './formations.entity';
import { Repository } from 'typeorm';
import { InsertFormationDto } from './dto/insertFormation.dto';

@Injectable()
export class FormationsService {
  constructor(
    @InjectRepository(FormationsEntity)
    private readonly formationsRepository: Repository<FormationsEntity>,
  ) {}

  getAllFormations(): Promise<FormationsEntity[]> {
    return this.formationsRepository.find({});
  }

  async insertFormation(
    insertFormationDto: InsertFormationDto,
  ): Promise<FormationsEntity> {
    const instance = this.formationsRepository.create(insertFormationDto);

    this.formationsRepository.save(instance);
    await this.formationsRepository.save(insertFormationDto);
    const newFormation = new FormationsEntity();
    newFormation.name = insertFormationDto.name;
    newFormation.description = insertFormationDto.description;
    newFormation.benefit = insertFormationDto.benefit;
    newFormation.duration = insertFormationDto.duration;
    newFormation.images_url_stringified =
      insertFormationDto.images_url_stringified;
    newFormation.tags = insertFormationDto.tags;
    newFormation.vat_price = insertFormationDto.vat_price;
    newFormation.vat_amount = insertFormationDto.vat_price;
    newFormation.duration_text = insertFormationDto.duration_text;
    newFormation.is_active = insertFormationDto.is_active;
    newFormation.vat_amount = insertFormationDto.vat_amount

    return this.formationsRepository.save(newFormation);
  }
}
