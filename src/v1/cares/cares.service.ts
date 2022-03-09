import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cares } from './cares.entity';
import { Repository } from 'typeorm';
import { CaresAvailabilities } from '../cares-availabilities/cares-availabilities.entity';
import CreateCareRequestDto from './dto/create-care-request.dto';
import { FirebaseHelper } from '../../.common/helpers/firebase.helper';
import ErrorManager from '../../.common/utils/ErrorManager';

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

  async createCare(createCareDto: CreateCareRequestDto): Promise<any> {
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
      ErrorManager.alreadyExistContentException('Care names is already used');
    }
  }
}
