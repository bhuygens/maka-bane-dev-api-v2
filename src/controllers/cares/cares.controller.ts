import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CaresService } from '../../services/cares/cares.service';
import CreateCareDto from '../../dto/cares/create-care.dto';
import UpdateCareDto from '../../dto/cares/update-care.dto';

@Controller('cares')
export class CaresController {
  constructor(private readonly caresService: CaresService) {}

  @Get()
  async getCares() {
    return await this.caresService.getCares();
  }

  @Get('/categories')
  async getCareCategories() {
    return await this.caresService.getCareCategories();
  }
  @Get(':id')
  async getCareById(@Param('id') id: string) {
    return await this.caresService.getCareById(+id);
  }

  @Get('availability')
  async getCareAvailabilities(@Param('availability') id: string) {
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

  @Delete(':id')
  async deleteCare(@Param('id') id: number) {
    return await this.caresService.deleteCare(id);
  }
}
