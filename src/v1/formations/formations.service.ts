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

  // @ts-ignore
  async insertFormation(insertFormationDto: InsertFormationDto,): Promise<Formations> {
    const instance = this.formationsRepository.create(insertFormationDto);

    await this.formationsRepository.save(instance);
    await this.formationsRepository.save(insertFormationDto);
    /*
    const newFormation = new FormationsEntity();
    newFormation.name = insertFormationDto.name;
    newFormation.description = insertFormationDto.description;
    newFormation.benefit = insertFormationDto.benefit;
    newFormation.duration = insertFormationDto.duration;
    newFormation.imagesUrlStringified =
      insertFormationDto.images_url_stringified;
    newFormation.tags = insertFormationDto.tags;
    newFormation.vatPrice = insertFormationDto.vat_price;
    newFormation.vatAmount = insertFormationDto.vat_price;
    newFormation.durationText = insertFormationDto.duration_text;
    newFormation.isActive = insertFormationDto.is_active;
    newFormation.vatAmount = insertFormationDto.vat_amount;

    return this.formationsRepository.save(newFormation);
     */


  }
}
