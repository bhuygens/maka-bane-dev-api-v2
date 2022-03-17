import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CaresAvailabilities } from '../../entities/cares/cares-availabilities.entity';
import { Repository } from 'typeorm';
import CreateCareAvailabilityDto from '../../dto/cares/create-care-availability.dto';
import { Cares } from '../../entities/cares/cares.entity';
import ErrorManager from '../../_shared/utils/ErrorManager';

@Injectable()
export class CaresAvailabilitiesService {
  constructor(
    @InjectRepository(CaresAvailabilities)
    readonly caresAvailabilitiesRepository: Repository<CaresAvailabilities>,
    @InjectRepository(Cares)
    readonly caresRepository: Repository<Cares>,
  ) {}

  // Create care availability
  async create(
    createCareAvailability: CreateCareAvailabilityDto,
  ): Promise<CaresAvailabilities> {
    const care = await this.caresRepository.findOne(
      createCareAvailability.careId,
    );
    if (care) {
      const availability = this.caresAvailabilitiesRepository.create({
        date: createCareAvailability.date,
        leftPlaces: createCareAvailability.leftPlaces,
        progendaLink: createCareAvailability.progendaLink,
        place: createCareAvailability.place,
        careId: care.id,
      });
      return await this.caresAvailabilitiesRepository.save(availability);
    } else {
      ErrorManager.notFoundException(
        `Cares ${createCareAvailability.careId} not found !`,
      );
    }
  }
}
