import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Formations } from './formations.entity';
import { Repository } from 'typeorm';
import { CreateFormationDto } from './dto/createFormationDto';
import ErrorManager from '../../.common/utils/ErrorManager';
import { UpdateFormationDto } from './dto/updateFormationDto';
import RequestManager from '../../.common/utils/RequestManager';
import { FormationsAvailabilities } from '../formations-availabilities/formations-availabilities.entity';

@Injectable()
export class FormationsService {
  constructor(
    @InjectRepository(Formations)
    private readonly formationsRepository: Repository<Formations>,
    @InjectRepository(FormationsAvailabilities)
    private readonly formationsAvailabilitiesRepository: Repository<FormationsAvailabilities>,
  ) {}

  async getAllFormations(): Promise<Formations[]> {
    return await this.formationsRepository.find({});
  }

  async createFormation(insertFormationDto: CreateFormationDto): Promise<void> {
    const instance = this.formationsRepository.create(insertFormationDto);

    await this.formationsRepository.save(instance);
    await this.formationsRepository.save(insertFormationDto);
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

    // Update care
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
}
