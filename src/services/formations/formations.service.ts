import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Formations } from '../../entities/formations/formations.entity';
import { Repository } from 'typeorm';
import { CreateFormationDto } from '../../dto/formations/create-formation.dto';
import ErrorManager from '../../_shared/utils/ErrorManager';
import { UpdateFormationDto } from '../../dto/formations/update.formation.dto';
import RequestManager from '../../_shared/utils/RequestManager';
import { FormationsAvailabilities } from '../../entities/formations/formations-availabilities.entity';
import { FormationsSubscribers } from '../../entities/formations/formations-subscribers.entity';
import { FormationPreBookingDto } from '../../dto/formations/formation-pre-booking.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FormationsService {
  constructor(
    @InjectRepository(Formations)
    private readonly formationsRepository: Repository<Formations>,
    @InjectRepository(FormationsAvailabilities)
    private readonly formationsAvailabilitiesRepository: Repository<FormationsAvailabilities>,
    @InjectRepository(FormationsSubscribers)
    private readonly formationSubscribersRepository: Repository<FormationsSubscribers>,
  ) {}

  async getAllFormations(): Promise<Formations[]> {
    return await this.formationsRepository.find({});
  }

  async createFormation(createFormationDto: CreateFormationDto): Promise<void> {
    const newFormation = this.formationsRepository.create(createFormationDto);
    await this.formationsRepository.save(newFormation);
  }

  async removeFormation(id: number) {
    const formationToDelete: Formations =
      await this.formationsRepository.findOne(id);
    if (formationToDelete) {
      // check if formation availabilities are linked
      const hasAvailabilitiesLinked =
        await this.formationsAvailabilitiesRepository
          .find({
            id: formationToDelete.id,
          })
          .then((res) => {
            if (res.length > 0) {
              ErrorManager.customException(
                `Please delete availabilities before delete the formation`,
              );
            } else {
              return 0;
            }
          });

      if (!hasAvailabilitiesLinked) {
        await this.formationsRepository.remove(formationToDelete);
        return RequestManager.successRequest(
          `Formation ${formationToDelete.id} successfully removed`,
        );
      }
    } else {
      ErrorManager.notFoundException(`Formation ${id} not found !`);
    }
  }

  async getFormationById(id: number): Promise<Formations> {
    const formation = await this.formationsRepository.findOne(id);
    if (formation) {
      return formation;
    } else {
      ErrorManager.notFoundException(`Formation ${id} not found`);
    }
  }

  async update(
    updateFormationDto: UpdateFormationDto,
  ): Promise<{ success: boolean; message: string }> {
    // Find care
    const formation = await this.formationsRepository.findOne(
      updateFormationDto.id,
    );

    // Check if name isn't already used
    await this.formationsRepository
      .find({
        name: updateFormationDto.name,
      })
      .then(
        (res) =>
          res.length > 0 && ErrorManager.customException('Name already used'),
      );

    // Update formation
    if (formation) {
      const updateFormation = await this.formationsRepository.preload({
        id: +updateFormationDto.id,
        ...updateFormationDto,
      });
      await this.formationsRepository.save(updateFormation);
      return RequestManager.successRequest(
        `Formation ${updateFormationDto.id} updated !`,
      );
    } else {
      ErrorManager.notFoundException(
        `Formation ${updateFormationDto.id} not found`,
      );
    }
  }

  async getCategories(): Promise<Formations[]> {
    try {
      return await this.formationsRepository
        .createQueryBuilder('formations')
        .where('formations.isActive = :name', { name: 1 })
        .orderBy('name')
        .select(['id', 'name'])
        .execute();
    } catch (e) {
      ErrorManager.customException(e);
    }
  }

  async getAvailabilityData(id: number) {
    try {
      return await this.formationsAvailabilitiesRepository
        .createQueryBuilder('availability')
        .select(['availability.id', 'availability.date', 'availability.hour'])
        .where('availability.id = :id', { id })
        .leftJoinAndSelect('availability.formation', 'formation')
        .getOne();
    } catch (e) {
      ErrorManager.customException(e);
    }
  }

  async storePreBooking(preBookingDto: FormationPreBookingDto) {
    console.log(preBookingDto);

    try {
      const depositDate = new Date();
      const uuid = uuidv4();
      const preBooking = this.formationSubscribersRepository.create({
        ...preBookingDto,
        depositDate,
        uuid,
      });
      return await this.formationSubscribersRepository.save(preBooking);
    } catch (e) {
      ErrorManager.customException(e);
    }
  }

  async moveBookingToPaid({
    paymentIntentId,
    numberPersons,
    formationAvailabilityId,
  }) {
    // Update formation subscription
    try {
      const formationSubscriber =
        await this.formationSubscribersRepository.findOne({
          stripeIntentDeposit: paymentIntentId,
        });
      console.log('subscriber', formationSubscriber);
      formationSubscriber.numberPersons = numberPersons;
      formationSubscriber.hasPaidDeposit = 1;
      formationSubscriber.errorMessage = '';
      formationSubscriber.hasPaymentFailed = 0;
      await this.formationSubscribersRepository.save(formationSubscriber);

      // Update formation availability
      const availability =
        await this.formationsAvailabilitiesRepository.preload({
          id: formationAvailabilityId,
        });
      availability.leftPlaces -= numberPersons;
      await this.formationsAvailabilitiesRepository.save(availability);

      // Return subscription uuid
      return formationSubscriber.uuid;
    } catch (e) {
      ErrorManager.customException(e);
    }
  }
}
