import { Controller, Get, Param, Query } from '@nestjs/common';
import { CaresService } from './cares.service';

@Controller('cares')
export class CaresController {
  constructor(private readonly caresService: CaresService) {}

  @Get()
  async getCares() {
    return await this.caresService.getCares();
  }

  @Get(':id')
  async getCareById(@Param('id') id: string) {
    return await this.caresService.getCareById(+id);
  }

  @Get()
  async getCareAvailabilities(@Query('availability') id: string) {
    return await this.caresService.getCareAvailabilities(+id);
  }
}
