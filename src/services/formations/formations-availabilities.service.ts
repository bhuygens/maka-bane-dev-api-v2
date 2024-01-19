import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FormationsAvailabilities } from '../../entities/formations/formations-availabilities.entity';
import { Repository } from 'typeorm';
import CreateFormationAvailabilityDto from '../../dto/formations/create-formation-availability.dto';
import { Formations } from '../../entities/formations/formations.entity';
import ErrorManager from '../../_shared/utils/ErrorManager';

@Injectable()
export class FormationsAvailabilitiesService {
  constructor(
    @InjectRepository(FormationsAvailabilities)
    readonly formationAvailabilitiesRepository: Repository<FormationsAvailabilities>,
    @InjectRepository(Formations)
    readonly formationsRepository: Repository<Formations>,
  ) {}

  async createFormationAvailability(
    createFormationAvailabilityDto: CreateFormationAvailabilityDto,
  ) {
    const formation = await this.formationsRepository.findOne(
      createFormationAvailabilityDto.formationId,
    );

    if (formation) {
      const availability = this.formationAvailabilitiesRepository.create({
        date: createFormationAvailabilityDto.date,
        leftPlaces: createFormationAvailabilityDto.leftPlaces,
        progendaLink: createFormationAvailabilityDto.progendaLink,
        place: createFormationAvailabilityDto.place,
        formationId: formation.id,
        hour: createFormationAvailabilityDto.hour,
      });
      return this.formationAvailabilitiesRepository.save(availability);
    } else {
      ErrorManager.notFoundException(
        `Cares ${createFormationAvailabilityDto.formationId} not found !`,
      );
    }
  }
}
