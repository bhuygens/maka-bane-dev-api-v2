import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CaresService } from './cares.service';
import CreateCareDto from './dto/create-care.dto';
import UpdateCareDto from './dto/update-care-dto';

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

  @Post()
  async createCare(@Body() createCareRequestDto: CreateCareDto) {
    return await this.caresService.createCare(createCareRequestDto);
  }

  @Patch('update')
  async updateCare(@Body() updateCareDto: UpdateCareDto) {
    return await this.caresService.updateCare(updateCareDto);
  }
}
