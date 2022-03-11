import { Body, Controller, Post } from '@nestjs/common';
import CreateCareAvailabilityDto from './dto/create-care-availability.dto';
import { CaresAvailabilitiesService } from './cares-availabilities.service';

@Controller('cares-availabilities')
export class CaresAvailabilitiesController {
  constructor(
    private readonly caresAvailabilitiesService: CaresAvailabilitiesService,
  ) {}

  @Post()
  async createCareAvailability(
    @Body() createCareAvailability: CreateCareAvailabilityDto,
  ) {
    return this.caresAvailabilitiesService.create(createCareAvailability);
  }
}
