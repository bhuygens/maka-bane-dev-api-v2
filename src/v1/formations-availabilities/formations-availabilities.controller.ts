import { Controller, Post } from '@nestjs/common';
import CreateFormationAvailabilityDto from './dto/create-formation-availability.dto';
import { FormationsAvailabilitiesService } from './formations-availabilities.service';

@Controller('formations-availabilities')
export class FormationsAvailabilitiesController {
  constructor(
    private readonly formationAvailabilityService: FormationsAvailabilitiesService,
  ) {}

  @Post()
  async createFormationAvailability(
    createFormationAvailabilityDto: CreateFormationAvailabilityDto,
  ) {
    return await this.formationAvailabilityService.createFormationAvailability(
      createFormationAvailabilityDto,
    );
  }
}
