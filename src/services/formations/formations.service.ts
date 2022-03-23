import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Formations } from '../../entities/formations/formations.entity';
import { Repository } from 'typeorm';
import { CreateFormationDto } from '../../dto/formations/create-formation.dto';
import ErrorManager from '../../_shared/utils/ErrorManager';
import { UpdateFormationDto } from '../../dto/formations/update.formation.dto';
import RequestManager from '../../_shared/utils/RequestManager';
import { FormationsAvailabilities } from '../../entities/formations/formations-availabilities.entity';

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
}
