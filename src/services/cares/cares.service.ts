import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cares } from '../../entities/cares/cares.entity';
import { Repository } from 'typeorm';
import { CaresAvailabilities } from '../../entities/cares/cares-availabilities.entity';
import CreateCareDto from '../../dto/cares/create-care.dto';
import { FirebaseHelper } from '../../_shared/helpers/firebase.helper';
import ErrorManager from '../../_shared/utils/ErrorManager';
import UpdateCareDto from '../../dto/cares/update-care.dto';
import RequestManager from '../../_shared/utils/RequestManager';

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

  async getCareCategories() {
    return await this.caresRepository.find({ select: ['id', 'name'] });
  }

  async getCareById(id: number): Promise<Cares> {
    return await this.caresRepository.findOne(id);
  }

  async getCareAvailabilities(id: number): Promise<CaresAvailabilities[]> {
    const care = await this.caresRepository.findOne(id);
    return await this.careAvailabilities.find({ care: care });
  }

  async createCare(createCareDto: CreateCareDto): Promise<any> {
    // Get uploaded images urls
    const newImagesUrl = await FirebaseHelper.uploadImagesToFirebase(
      createCareDto.tempImages,
      createCareDto.name,
      'cares',
    );

    // Update dto and remove tempImages
    createCareDto = {
      ...createCareDto,
      imagesUrl: [...createCareDto.imagesUrl, ...newImagesUrl],
      vatAmount: 0.2,
    };
    delete createCareDto.tempImages;

    // Save cares on db
    const isCareExist = await this.caresRepository.findOne({
      name: createCareDto.name,
    });

    if (!isCareExist) {
      const care = this.caresRepository.create(createCareDto);
      return await this.caresRepository.save(care);
    } else {
      ErrorManager.alreadyExistContentException('Care name is already used');
    }
  }

  async updateCare(updateCareDto: UpdateCareDto) {
    // Find care
    const care = await this.caresRepository.findOne(updateCareDto.id);

    // Check if name isn't already used
    await this.caresRepository
      .find({
        name: updateCareDto.name,
      })
      .then(
        (res) =>
          res.length > 0 && ErrorManager.customException(' Name already used'),
      );

    // Update care
    if (care) {
      const updatedCare = await this.caresRepository.preload({
        id: +updateCareDto.id,
        ...updateCareDto,
      });
      await this.caresRepository.save(updatedCare);
      return RequestManager.successRequest(
        `Care ${updateCareDto.id} updated !`,
      );
    } else {
      ErrorManager.notFoundException(`Care ${updateCareDto.id} not found`);
    }
  }

  async deleteCare(id: number) {
    const care = await this.caresRepository.findOne(id);

    if (care) {
      // check if care availabilities are linked
      const hasAvailabilitiesLinked = await this.careAvailabilities
        .find({
          care,
        })
        .then((res) => {
          if (res.length > 0) {
            ErrorManager.customException(
              `Please delete availabilities before delete the care`,
            );
          } else {
            return 0;
          }
        });

      if (!hasAvailabilitiesLinked) {
        await this.caresRepository.remove(care);
        return RequestManager.successRequest(
          `Care ${care.id} successfully removed`,
        );
      }
    } else {
      ErrorManager.notFoundException(`Care ${id} not found !`);
    }
  }
}
